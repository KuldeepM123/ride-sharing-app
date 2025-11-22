import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@screens/Auth/Login';
import Signup from '@screens/Auth/Signup';
import VerifyOtp from '@screens/Auth/VerifyOtp';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
    </Stack.Navigator>
  );
};
