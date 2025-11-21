import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import RideStack from './RideStack';
import ProfileStack from './ProfileStack';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      {/* Ride-related screens */}
      <Drawer.Screen
        name="Ride"
        component={RideStack}
        options={{title: 'Find & Share Rides'}}
      />

      {/* User Profile */}
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{title: 'Profile'}}
      />

      {/* Settings */}
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'App Settings'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
