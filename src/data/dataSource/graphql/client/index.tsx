import {
  cacheExchange,
  fetchExchange,
  errorExchange,
  Provider,
  createClient,
} from 'urql';
import {authExchange} from '@urql/exchange-auth';
import {authConfig} from './auth';
import {AppMultipart} from './Multer';
import {FC, PropsWithChildren} from 'react';

const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetch: (input, init) => {
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
      },
    }).then(async resp => {
      return resp;
    });
  },
  exchanges: [
    cacheExchange,
    errorExchange({
      onError: error => {
        console.log('onError', error);
      },
    }),
    authExchange(authConfig),
    AppMultipart,
    fetchExchange,
  ],
});

const UrqlProvider: FC<PropsWithChildren> = ({children}) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;
