import * as React from 'react';
import {View, Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import {withTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import SettingsScreen from '../screens/setting';
import SplashScreen from '../screens/splash';
import InvestmentHomeScreen from '../screens/investment/home';
import StockHomeScreen from '../screens/investment/stock';
import StockDetailScreen from '../screens/investment/stock-detail';
import CryptoHomeScreen from '../screens/crypto';
import CryptoDetailScreen from '../screens/crypto/crypto-detail';
import RealEstateHomeScreen from '../screens/realestate';
import RealEstatePropertyScreen from '../screens/realestate/property';
import RealEstateDetailScreen from '../screens/realestate/realestate-detail';
import IdeaHomeScreen from '../screens/ideas';
import IdeaDetailScreen from '../screens/ideas/idea-detail';
// spending screens
import SpendingHomeScreen from '../screens/spending';
import {
  CreateNewCardScreen,
  CreateNewCardConfirmScreen,
  CreateNewCardCompleteScreen,
  ActivateCardScreen,
} from '../screens/spending/credit-card';
import {
  TransferChoiceScreen,
  WithdrawScreen,
  WithdrawCompleteScreen,
} from '../screens/spending/transfer';

//custom styles
import navigationStyles from './style.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Stack1 = createNativeStackNavigator();

const StackNavigation = props => {
  return (
    <Stack.Navigator
      animationEnabled
      // headerMode="none"
      mode="card"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      {/* Spending Screens */}
      <Stack.Screen
        name="CreateNewCardScreen"
        component={CreateNewCardScreen}
      />
      <Stack.Screen
        name="CreateNewCardConfirmScreen"
        component={CreateNewCardConfirmScreen}
      />
      <Stack.Screen
        name="CreateNewCardCompleteScreen"
        component={CreateNewCardCompleteScreen}
      />
      <Stack.Screen name="ActivateCardScreen" component={ActivateCardScreen} />
      <Stack.Screen
        name="TransferChoiceScreen"
        component={TransferChoiceScreen}
      />
      <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
      <Stack.Screen
        name="WithdrawComplete"
        component={WithdrawCompleteScreen}
      />
    </Stack.Navigator>
  );
};

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 20,
          height: 60,
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',

          // unmountOnBlur: true,
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Icon name="home" size={24} color={'white'} />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Icon name="home" size={22} color="#A5A7A8" />
                </View>
              );
            }
          },
        }}
        name="Home"
        component={HomeScreen}
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
          tabBarLabel: 'Spending',
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
        name="SpendingHomeScreen"
        component={SpendingHomeScreen}
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
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',

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
      <Stack1.Screen name="StockHomeScreen" component={StockHomeScreen} />
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
      <Stack1.Screen name="IdeaHomeScreen" component={IdeaHomeScreen} />
      <Stack1.Screen name="IdeaDetailScreen" component={IdeaDetailScreen} />
    </Stack1.Navigator>
  );
}

export default StackNavigation;
