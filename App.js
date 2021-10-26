/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StackNavigation} from './src/navigation';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from './src/redux/store';
const App = () => {
  //create cryptocurrency list model from CMC
  // axios
  //   .get(
  //     'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=100',
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY,
  //       },
  //     },
  //   )
  //   .then(res => {
  //     console.log(res.data.data.length);
  //     updateCryptoCurrencyList(res.data.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  return (
    <Provider store={store}>
      <PaperProvider>
        <StackNavigation />
      </PaperProvider>
    </Provider>
  );
};

export default App;
