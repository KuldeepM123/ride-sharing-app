import React, {createContext, useEffect, useState, useContext} from 'react';
import {PostAPI} from '../src/Services/Service';
import {PermissionsAndroid, Alert, Platform, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {flashM} from '../helper/WSManager';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

// Create the context
const LocationContext = createContext();

// Create a provider component
const LocationProvider = ({children, navigation}) => {
  const [location, setLocation] = useState({});

  const checkLocationPermission = async () => {
    let permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    const result = await check(permission);
    if (result === RESULTS.GRANTED) {
      return true;
    }
    const requestResult = await request(permission);
    return requestResult === RESULTS.GRANTED;
  };

  const checkGPS = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('✅ GPS is enabled');
      },
      error => {
        if (error.code === 2) {
          Alert.alert(
            'GPS Disabled',
            'Please enable GPS for location services.',
            // [{
            //   text: 'Open Settings', onPress: () => { openSettings(); },
            // }, { text: 'Cancel', style: 'cancel' },
            // ]
          );
        }
      },
    );
  };

  const getLocation = async () => {
    const isPermissionGranted = await checkLocationPermission();
    if (!isPermissionGranted) {
      flashM('Location permission is required.', 'danger');
      return;
    }
    checkGPS(); // Ensure GPS is enabled

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Location fetched:', latitude, longitude);
        setLocation({latitude, longitude});
      },
      error => {
        flashM(`${error.message}`, 'danger');
        console.log('ErrorgetLoc....>>>', error.message);
      },
      // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const SendLocation = async (latitude, longitude) => {
    const payload = {
      latitude: latitude,
      longitude: longitude,
    };
    // const token = await AsyncStorage.getItem('token');
    if (token) {
      const res = await PostAPI(
        'driver_booking/current_location_add',
        payload,
        navigation,
      );
      if (res.status == '200') {
        console.log('Send Lan&lot', res.message);
      } else {
        if (res.status == '400') {
          console.log('Location Send failed 400');
        }
        // flashM('Location permission is required.', 'danger')
        console.log('Location Send failed');
      }
    }
  };

  useEffect(() => {
    const fetchAndSendLocation = async () => {
      await getLocation(); // Fetch location
      console.log('Fetched Location:', JSON.stringify(location));
      if (location) {
        SendLocation(location.latitude, location.longitude);
      }
    };
    const intervalId = setInterval(() => {
      fetchAndSendLocation();
    }, 10000);
    console.log('LocationContex....', location);

    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <LocationContext.Provider
      value={{
        location,
        getLocation,
        location,
        setLocation,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
export {LocationProvider, LocationContext};
