import {View, Image, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Color from '@utils/Colors';
import images from '@assets/images';
import {fontFamily} from '@utils/Font';
import {useDispatch} from 'react-redux';
import {loadUserFromStorage} from 'store/slices/authSlice';

const SplashScreen = navigation => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load token/user from async storage → redux
    dispatch(loadUserFromStorage());
  }, []);

  return (
    <View style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        {/* <StatusBar backgroundColor={'#45708D'} barStyle="light-content" /> */}
        <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={images.logo} />
        </View>
        <View style={styles.logoContainer}>
          <Image style={styles.splashCar} source={images.Splash_car} />
        </View>
        {/* <Text style={styles.heading}>Lift Karade</Text> */}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    backgroundColor: 'fff',
    flex: 1,
  },
  logoContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  splashCar: {
    width: 420,
    height: 420,
    resizeMode: 'contain',
  },
  heading: {
    color: Color.black,
    fontSize: 26,
    fontFamily: fontFamily.bold,
    alignSelf: 'center',
    marginVertical: 60,
  },
});
