import React from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import SavedScreen from '../screens/saved/SavedScreen';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import Colors from '../theme/Colors';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: Colors.primary,

        tabBarInactiveTintColor: '#94A3B8',

        tabBarStyle: styles.tabBar,

        tabBarLabelStyle: styles.label,

        tabBarIcon: ({color, size, focused}) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;

            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;

            case 'Saved':
              iconName = focused ? 'bookmark' : 'bookmark-outline';
              break;

            case 'Notifications':
              iconName = focused
                ? 'notifications'
                : 'notifications-outline';
              break;

            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',

    left: 15,

    right: 15,

    bottom: 18,

    borderRadius: 20,

    height: 72,

    backgroundColor: Colors.white,

    elevation: 12,

    borderTopWidth: 0,

    paddingBottom: 10,

    paddingTop: 10,
  },

  label: {
    fontSize: 12,

    fontWeight: '600',
  },
});