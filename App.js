/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import StackNavigation from './src/navigation';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/redux/store';
import {LogBox, AsyncStorage} from 'react-native';
import {updateTheme} from './src/redux/slices/portfolioSlice';
import {lightTheme, darkTheme} from './src/utils/constants';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const ThemedComponent = () => {
  const themed = useSelector(state => state.portfolios.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem('theme')
      .then(item => {
        if (item == 'light') {
          dispatch(updateTheme(lightTheme));
        } else {
          dispatch(updateTheme(darkTheme));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <ThemeProvider theme={themed}>
      <StackNavigation />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <ThemedComponent />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
