import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import AuthStack from './AuthStack';
import SplashScreen from '../screens/Splash/SplashScreen';

import {useSelector} from 'react-redux';
import {navigationRef} from './NavigationService';

const AppNavigator = () => {
  const {user, splashChecked} = useSelector(state => state.auth);

  return (
    <NavigationContainer ref={navigationRef}>
      {/* Show splash first */}
      {!splashChecked ? (
        <SplashScreen />
      ) : user ? (
        <DrawerNavigator /> // HOME
      ) : (
        <AuthStack /> // LOGIN
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
