import {Exchange} from '@urql/core';
import {
  makeFetchBody,
  makeFetchOptions,
  makeFetchSource,
  makeFetchURL,
} from '@urql/core/internal';
import {extractFiles, ReactNativeFile} from 'extract-files';
import RNFS from 'react-native-fs';
import {Operation} from 'urql';
import {
  filter,
  fromPromise,
  merge,
  mergeMap,
  onPush,
  pipe,
  share,
  takeUntil,
} from 'wonka';

/** Determines whether a given query contains an optimistic mutation field */

export const isFileExtractable = (value: any) => {
  if (!value) return false;

  if (value instanceof ReactNativeFile) return true;
  if (typeof value !== 'object') return false;

  // assume an object with those keys is a ReactNativeFile
  const requiredKeys = ['uri', 'type', 'name'];
  const offlineRequiredKeys = ['uri', 'type', 'name'];
  for (let key of requiredKeys) {
    if (!value[key]) return false;
  }
  return true;
};

export const AppMultipart: Exchange =
  ({forward, dispatchDebug}) =>
  ops$ => {
    const sharedOps$ = share(ops$);
    const buildDebugOpt = (
      error: any,
      operation$: any,
      url: any,
      fetchOptions: any,
      result: any,
    ) => {
      return {
        type: error ? 'fetchError' : 'fetchSuccess',
        message: `A ${
          error ? 'failed' : 'successful'
        } fetch response has been returned.`,
        operation: operation$,
        data: {
          url,
          fetchOptions,
          value: error || result,
        },
      };
    };

    const getTeardown = (operation: Operation<any, any>) => {
      return pipe(
        sharedOps$,
        filter(op => op.kind === 'teardown' && op.key === operation.key),
      );
    };

    const handleMultipartOperation =
      () => (operation$: Operation<any, any>) => {
        const teardown$ = getTeardown(operation$);

        const makeFetchOperation = async () => {
          const cleanedVariables = operation$.variables;

          const {files, clone: variables} = extractFiles(
            {
              ...cleanedVariables,
            },
            undefined,
            isFileExtractable,
          );

          const body = makeFetchBody({query: operation$.query, variables});

          let url: string;
          let fetchOptions: RequestInit;

          if (files.size) {
            url = makeFetchURL(operation$);
            fetchOptions = makeFetchOptions(operation$);
            const headers = fetchOptions.headers;

            if (headers!['content-type'] === 'application/json') {
              delete headers!['content-type'];
            }

            headers['x-apollo-operation-name'] = 'uploadFile';

            fetchOptions.method = 'POST';
            fetchOptions.body = new FormData();
            fetchOptions.body.append('operations', JSON.stringify(body));

            const map = {};
            let i = 0;
            const validFiles = await Promise.all(
              [...files.entries()].map(async ([file, paths]) => {
                const fileDoesExists = await RNFS.exists(file.uri);

                if (!fileDoesExists) return null;

                map[++i] = paths.map(path => `variables.${path}`);

                return file;
              }),
            );

            fetchOptions.body.append('map', JSON.stringify(map));

            i = 0;
            validFiles.forEach(file => {
              if (!file) return;
              (fetchOptions.body as FormData).append(`${++i}`, file);
            });
          } else {
            // console.log(operation$);
            // console.log(body);
            url = makeFetchURL(operation$, body);
            fetchOptions = makeFetchOptions(operation$, body);
          }

          dispatchDebug({
            type: 'fetchRequest',
            message: 'A fetch request is being executed.',
            operation: operation$,
            data: {
              url,
              fetchOptions,
            },
          });

          return {operation: operation$, url, fetchOptions};
        };

        return pipe(
          fromPromise(makeFetchOperation()),
          mergeMap(it =>
            makeFetchSource(it.operation, it.url, it.fetchOptions),
          ),
          takeUntil(teardown$),
        );
      };

    const queryResults$ = pipe(
      sharedOps$,
      filter(operation => {
        return operation.kind === 'query';
      }),
      mergeMap(operation$ => {
        const teardown$ = getTeardown(operation$);

        const body = makeFetchBody({
          query: operation$.query,
          variables: operation$.variables,
        });

        const fetchOptions = makeFetchOptions(operation$, body);
        const url = makeFetchURL(operation$, body);

        return pipe(
          makeFetchSource(operation$, url, fetchOptions),
          takeUntil(teardown$),
          onPush(result => {
            const error = !result.data ? result.error : undefined;

            dispatchDebug(
              buildDebugOpt(error, operation$, url, fetchOptions, result),
            );
          }),
        );
      }),
    );

    // those are normal async/await mutations without an optimistic implementation
    const mutationResults$ = pipe(
      sharedOps$,
      filter(operation => {
        return operation.kind === 'mutation';
      }),
      mergeMap(handleMultipartOperation()),
    );

    const forward$ = pipe(
      sharedOps$,
      filter(operation => {
        return operation.kind !== 'query' && operation.kind !== 'mutation';
      }),
      forward,
    );

    return merge([queryResults$, mutationResults$, forward$]);
  };
