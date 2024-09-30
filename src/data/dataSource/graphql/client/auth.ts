import {AuthUtilities, AuthConfig} from '@urql/exchange-auth';
import {makeOperation} from 'urql';
import storage from '../../localData/storage';
import {cachKeys} from '../../localData/storage/cacheKeys';

const getToken = async () => {
  try {
    const token = await storage.load({key: cachKeys.token});
    console.log('token', token);
    return Promise.resolve(token);
  } catch (error) {
    console.log(error);
    return Promise.resolve('');
  }
};

export const authConfig = async (utils: AuthUtilities): Promise<AuthConfig> => {
  let token = '';
  if (!token) {
    token = await getToken();
  }

  return {
    addAuthToOperation: operation => {
      if (!token) {
        getToken().then(res => {
          token = res;
        });
        return operation;
      }

      const fetchOptions =
        typeof operation.context.fetchOptions === 'function'
          ? operation.context.fetchOptions()
          : operation.context.fetchOptions || {};

      return makeOperation(operation.kind, operation, {
        ...operation.context,
        fetchOptions: {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            authorization: `Bearer ${token}`,
          },
        },
      });
    },
    didAuthError: err => {
      return err.graphQLErrors.some(it => it.extensions.statusCode === 401);
    },
    refreshAuth: async () => {
      // Implement token refresh logic here if needed
    },
  };
};
