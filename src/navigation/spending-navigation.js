import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpendingHomeScreen from '../screens/spending';
const Stack = createNativeStackNavigator();
function SpendingStack() {
  return (
    <Stack.Navigator
      animationEnabled
      headerMode="none"
      initialRouteName={SpendingHomeScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SpendingHomeScreen" component={SpendingHomeScreen} />
    </Stack.Navigator>
  );
}
export default SpendingStack;