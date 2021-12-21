import * as React from 'react';
import {View} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
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
import ArrivalScreen from '../screens/home/arrivals';
// spending screens
import SpendingHomeScreen from '../screens/spending';
import {
  CreateNewCardScreen,
  CreateNewCardConfirmScreen,
  CreateNewCardCompleteScreen,
  ActivateCardScreen,
} from '../screens/spending/credit-card';
import {
  ReportChoiseScreen,
  FindATMScreen,
} from '../screens/spending/credit-card/report';
import {
  TransferChoiceScreen,
  WithdrawScreen,
  WithdrawCompleteScreen,
  DepositInterestAccountScreen,
  DepositInterestAccountComplete,
} from '../screens/spending/transfer';
import {
  GoalCatogorySelectScreen,
  CreateGoalWhereScreen,
  CreateGoalAmountScreen,
  CreateGoalDateScreen,
  CreateGoalPrepayConfirmScreen,
  CreateGoalPrepayScreen,
  CreateNewGoalPayMethodScreen,
  CreateNewGoalCompleteScreen,
} from '../screens/spending/goals';
import {
  GoalDetailScreen,
  BoostGoalInvestScreen,
  BoostSubscribeScreen,
  BoostMethodScreen,
  BoostReceiptScreen,
  BoostCompleteScreen,
} from '../screens/spending/goals/edit';
import {
  BorrowingHomeScreen,
  BorrowingRepayScreen,
  BorrowingStep1Screen,
  BorrowingStep2Screen,
  BorrowingStep3Screen,
  BorrowingStep4Screen,
  BorrowingStep5Screen,
  BorrowingStep6Screen,
} from '../screens/borrowing';

//Profile screens
import ProfileHomeScreen, {
  WithdrawChoiceScreen,
  ProfileDepositScreen,
  ProfileAddCardScreen,
  ProfileCardListScreen,
  ProfileDepositAmountScreen,
  ProfileDepositConfirmScreen,
} from '../screens/setting';
import {
  StatementHomeScreen,
  StatementTypeScreen,
  StatementCategoryScreen,
  StatementHistoryScreen,
  StatementRecentHistoryScreen,
} from '../screens/setting/statements';
import {
  AppSettingHomeScreen,
  AppSettingNMScreen,
  AppSettingPNScreen,
  AppSettingENScreen,
  AppSettingDUScreen,
} from '../screens/setting/setting';
import {
  ReinvestmentHomeScreen,
  ReinvestmentTypeScreen,
  ReinvestmentSelectCategoryScreen,
} from '../screens/setting/reinvestment';
import {
  ProfileTransferScreen,
  BankTransferScreen,
} from '../screens/setting/transfer';

//Auth Screens
import AuthScreen from '../screens/authentication';
import {
  RegisterOneScreen,
  RegisterTwoScreen,
  VerificationCodeScreen,
  SetPasswordScreen,
  SetAllScreen,
  SetFaceIDScreen,
  UploadIDScreen,
  UploadAddressScreen,
  RegisterCompleteScreen,
} from '../screens/authentication/register';
import {
  LoginScreen,
  LoginVerificationCodeScreen,
} from '../screens/authentication/login';
//Funding Screens
import {FundingMethodSelectScreen} from '../screens/authentication/funding';
//custom styles

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Stack1 = createNativeStackNavigator();

const StackNavigation = props => {
  return (
    <Stack.Navigator
      animationEnabled
      // headerMode="none"
      presentation="transparentModal"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack1.Screen name="ArrivalScreen" component={ArrivalScreen} />
      {/* Investment screens */}
      <Stack1.Screen name="CryptoHomeScreen" component={CryptoHomeScreen} />
      <Stack1.Screen name="CryptoDetailScreen" component={CryptoDetailScreen} />
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
      <Stack.Screen
        name="DepositInterestAccountScreen"
        component={DepositInterestAccountScreen}
      />
      <Stack.Screen
        name="DepositInterestAccountComplete"
        component={DepositInterestAccountComplete}
      />
      <Stack.Screen
        name="GoalCatogorySelectScreen"
        component={GoalCatogorySelectScreen}
      />
      <Stack.Screen
        name="CreateGoalWhereScreen"
        component={CreateGoalWhereScreen}
      />
      <Stack.Screen
        name="CreateGoalAmountScreen"
        component={CreateGoalAmountScreen}
      />
      <Stack.Screen
        name="CreateGoalDateScreen"
        component={CreateGoalDateScreen}
      />
      <Stack.Screen
        name="CreateGoalPrepayConfirmScreen"
        component={CreateGoalPrepayConfirmScreen}
      />
      <Stack.Screen
        name="CreateGoalPrepayScreen"
        component={CreateGoalPrepayScreen}
      />
      <Stack.Screen
        name="CreateNewGoalPayMethodScreen"
        component={CreateNewGoalPayMethodScreen}
      />
      <Stack.Screen
        name="CreateNewGoalCompleteScreen"
        component={CreateNewGoalCompleteScreen}
      />
      {/* spending-goal-edit screens */}
      <Stack.Screen name="GoalDetailScreen" component={GoalDetailScreen} />
      <Stack.Screen
        name="BoostGoalInvestScreen"
        component={BoostGoalInvestScreen}
      />
      <Stack.Screen
        name="BoostSubscribeScreen"
        component={BoostSubscribeScreen}
      />
      <Stack.Screen name="BoostMethodScreen" component={BoostMethodScreen} />
      <Stack.Screen name="BoostReceiptScreen" component={BoostReceiptScreen} />
      <Stack.Screen
        name="BoostCompleteScreen"
        component={BoostCompleteScreen}
      />
      {/* spending-report screens */}
      <Stack.Screen name="ReportChoiseScreen" component={ReportChoiseScreen} />
      <Stack.Screen name="FindATMScreen" component={FindATMScreen} />
      {/* borrowing screens */}
      <Stack.Screen
        name="BorrowingRepayScreen"
        component={BorrowingRepayScreen}
      />
      <Stack.Screen
        name="BorrowingStep1Screen"
        component={BorrowingStep1Screen}
      />
      <Stack.Screen
        name="BorrowingStep2Screen"
        component={BorrowingStep2Screen}
      />
      <Stack.Screen
        name="BorrowingStep3Screen"
        component={BorrowingStep3Screen}
      />
      <Stack.Screen
        name="BorrowingStep4Screen"
        component={BorrowingStep4Screen}
      />
      <Stack.Screen
        name="BorrowingStep5Screen"
        component={BorrowingStep5Screen}
      />
      <Stack.Screen
        name="BorrowingStep6Screen"
        component={BorrowingStep6Screen}
      />
      {/* Profile Screens */}
      <Stack.Screen
        name="ProfileDepositScreen"
        component={ProfileDepositScreen}
      />
      <Stack.Screen
        name="WithdrawChoiceScreen"
        component={WithdrawChoiceScreen}
      />
      <Stack.Screen
        name="ProfileAddCardScreen"
        component={ProfileAddCardScreen}
      />
      <Stack.Screen
        name="ProfileCardListScreen"
        component={ProfileCardListScreen}
      />
      <Stack.Screen
        name="ProfileDepositAmountScreen"
        component={ProfileDepositAmountScreen}
      />
      <Stack.Screen
        name="ProfileDepositConfirmScreen"
        component={ProfileDepositConfirmScreen}
      />
      <Stack.Screen
        name="StatementHomeScreen"
        component={StatementHomeScreen}
      />
      <Stack.Screen
        name="StatementTypeScreen"
        component={StatementTypeScreen}
      />
      <Stack.Screen
        name="StatementCategoryScreen"
        component={StatementCategoryScreen}
      />
      <Stack.Screen
        name="StatementHistoryScreen"
        component={StatementHistoryScreen}
      />
      <Stack.Screen
        name="StatementRecentHistoryScreen"
        component={StatementRecentHistoryScreen}
      />
      <Stack.Screen
        name="AppSettingHomeScreen"
        component={AppSettingHomeScreen}
      />
      <Stack.Screen name="AppSettingNMScreen" component={AppSettingNMScreen} />
      <Stack.Screen name="AppSettingPNScreen" component={AppSettingPNScreen} />
      <Stack.Screen name="AppSettingENScreen" component={AppSettingENScreen} />
      <Stack.Screen name="AppSettingDUScreen" component={AppSettingDUScreen} />
      <Stack.Screen
        name="ReinvestmentHomeScreen"
        component={ReinvestmentHomeScreen}
      />
      <Stack.Screen
        name="ReinvestmentTypeScreen"
        component={ReinvestmentTypeScreen}
      />
      <Stack.Screen
        name="ReinvestmentSelectCategoryScreen"
        component={ReinvestmentSelectCategoryScreen}
      />
      <Stack.Screen
        name="ProfileTransferScreen"
        component={ProfileTransferScreen}
      />
      <Stack.Screen name="BankTransferScreen" component={BankTransferScreen} />
      {/* Auth screens */}
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="RegisterOneScreen" component={RegisterOneScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="LoginVerificationCodeScreen"
        component={LoginVerificationCodeScreen}
      />
      <Stack.Screen name="RegisterTwoScreen" component={RegisterTwoScreen} />
      <Stack.Screen
        name="VerificationCodeScreen"
        component={VerificationCodeScreen}
      />
      <Stack.Screen name="SetPasswordScreen" component={SetPasswordScreen} />
      <Stack.Screen name="SetAllScreen" component={SetAllScreen} />
      <Stack.Screen name="SetFaceIDScreen" component={SetFaceIDScreen} />
      <Stack.Screen name="UploadIDScreen" component={UploadIDScreen} />
      <Stack.Screen
        name="UploadAddressScreen"
        component={UploadAddressScreen}
      />
      <Stack.Screen
        name="RegisterCompleteScreen"
        component={RegisterCompleteScreen}
      />
      {/* Funding screens */}
      <Stack.Screen
        name="FundingMethodSelectScreen"
        component={FundingMethodSelectScreen}
      />
    </Stack.Navigator>
  );
};

export const TabNavigation = () => {
  const theme = React.useContext(ThemeContext).theme;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 20,
          height: 60,
          backgroundColor: theme.colors.background_primary,
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
                  <Icon
                    name="home"
                    size={28}
                    color={theme.colors.text_primary}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Icon
                    name="home"
                    size={22}
                    color={theme.colors.text_secondary}
                  />
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
                  <Icon
                    name="trophy"
                    size={28}
                    color={theme.colors.text_primary}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Icon
                    name="trophy"
                    size={22}
                    color={theme.colors.text_secondary}
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
                  <Icon
                    name="credit-card-alt"
                    size={28}
                    color={theme.colors.text_primary}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Icon
                    name="credit-card-alt"
                    size={20}
                    color={theme.colors.text_secondary}
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
                  <Icon
                    name="bank"
                    size={28}
                    color={theme.colors.text_primary}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Icon
                    name="bank"
                    size={20}
                    color={theme.colors.text_secondary}
                  />
                </View>
              );
            }
          },
        }}
        name="BorrowingHomeScreen"
        component={BorrowingHomeScreen}
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
                  <Icon
                    name="user-circle-o"
                    size={28}
                    color={theme.colors.text_primary}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    height: 49,
                  }}>
                  <Icon
                    name="user-circle-o"
                    size={20}
                    color={theme.colors.text_secondary}
                  />
                </View>
              );
            }
          },
        }}
        name="Profile"
        component={ProfileHomeScreen}
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
