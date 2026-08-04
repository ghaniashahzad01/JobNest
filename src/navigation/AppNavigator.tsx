import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;