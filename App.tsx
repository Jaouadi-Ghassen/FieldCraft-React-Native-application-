import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import UrqlProvider from './src/data/dataSource/graphql/client';
import {Provider} from 'react-redux';
import AppProvider from './src/screens';
import {getStore} from './src/helpers/store';

const App = () => {
  return (
    <Provider store={getStore()}>
      <PaperProvider>
        <UrqlProvider>
          <AppProvider />
        </UrqlProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
