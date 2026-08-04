import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import AppNavigator from './AppNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
   App: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="App"
         component={AppNavigator}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;