import * as React from 'react';
import {View, Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import SettingsScreen from '../screens/setting';
import SplashScreen from '../screens/splash';
import InvestmentHomeScreen from '../screens/investment/home';
import StockInvestmentScreen from '../screens/investment/stock';
import StockDetailScreen from '../screens/investment/stock-detail';
import CryptoHomeScreen from '../screens/crypto';
import CryptoDetailScreen from '../screens/crypto/crypto-detail';
import RealEstateHomeScreen from '../screens/realestate';
import RealEstatePropertyScreen from '../screens/realestate/property';
import RealEstateDetailScreen from '../screens/realestate/realestate-detail';

//custom styles
import navigationStyles from './style.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Stack1 = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        animationEnabled
        headerMode="none"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Navigation" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        keyboardHidesTabBar: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 20,
          height: 60,
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',

          unmountOnBlur: true,
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/home_icon_active.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/home_icon.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            }
          },
        }}
        name="Home"
        component={HomeScreen}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Investment',

          unmountOnBlur: true,
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/invest_icon_active.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/invest_icon.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            }
          },
        }}
        name="Investment"
        component={InvestmentStack}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Wallet',

          unmountOnBlur: true,
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/wallet_icon.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/wallet_icon.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            }
          },
        }}
        name="Wallet"
        component={InvestmentStack}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Loans',

          unmountOnBlur: true,
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/loans_icon.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/loans_icon.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            }
          },
        }}
        name="Loans"
        component={SettingsScreen}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Threads',

          unmountOnBlur: true,
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/thread.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/thread.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            }
          },
        }}
        name="Threads"
        component={SettingsScreen}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',

          unmountOnBlur: true,
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/profile_icon.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Image
                    source={require('../assets/icons/profile_icon.png')}
                    style={{width: 24, height: 24}}
                  />
                </View>
              );
            }
          },
        }}
        name="Profile"
        component={SettingsScreen}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
    </Tab.Navigator>
  );
};

function InvestmentStack() {
  return (
    <Stack1.Navigator
      animationEnabled
      headerMode="none"
      initialRouteName={InvestmentHomeScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack1.Screen
        name="InvestmentHomeScreen"
        component={InvestmentHomeScreen}
      />
      <Stack1.Screen
        name="StockInvestmentScreen"
        component={StockInvestmentScreen}
      />
      <Stack1.Screen name="StockDetailScreen" component={StockDetailScreen} />
      <Stack1.Screen name="CryptoHomeScreen" component={CryptoHomeScreen} />
      <Stack1.Screen name="CryptoDetailScreen" component={CryptoDetailScreen} />
      <Stack1.Screen
        name="RealEstateHomeScreen"
        component={RealEstateHomeScreen}
      />
      <Stack1.Screen
        name="RealEstatePropertyScreen"
        component={RealEstatePropertyScreen}
      />
      <Stack1.Screen
        name="RealEstateDetailScreen"
        component={RealEstateDetailScreen}
      />
    </Stack1.Navigator>
  );
}
