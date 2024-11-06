import React from 'react';
// Screens
import Login from '../screens/Login';
import Register from '../screens/Register';
import SendEmail from '../screens/SendEmail';
import ChangePassword from '../screens/ChangePassword';
// Navigation
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AuthStackScreens() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SendEmail" component={SendEmail} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />

    </Stack.Navigator>
  );
}
