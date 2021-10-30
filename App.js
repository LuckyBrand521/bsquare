/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import StackNavigation from './src/navigation';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider} from 'react-native-elements';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {store} from './src/redux/store';
import {LogBox} from 'react-native';
import {lightTheme, darkTheme} from './src/utils/constants';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const theme = darkTheme;
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider theme={darkTheme}>
          <StackNavigation />
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
