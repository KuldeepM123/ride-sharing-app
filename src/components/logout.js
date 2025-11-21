// logout.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

export const logoutUser = async navigation => {
  try {
    // Remove stored token
    await AsyncStorage.removeItem('authToken');

    // Optional: Clean other persistent data
    // await AsyncStorage.multiRemove(['userProfile', 'refreshToken']);

    // Reset navigation so they can't navigate back
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};
