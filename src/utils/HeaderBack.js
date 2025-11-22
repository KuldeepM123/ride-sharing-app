const {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ImageBackground,
} = require('react-native');
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {horizScale} from './Layout';
import images from '../../assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../theme/colors';
import {fontFamily} from './Font';

function HeaderBack({title}) {
  const navigation = useNavigation();

  return (
    <ImageBackground style={styles.smallheaderlist}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.menubar}>
        <TouchableOpacity
          style={styles.main_menu}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24}></Ionicons>
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textVihicle}>{title}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  smallheaderlist: {
    elevation: 5,
    backgroundColor: Color.blue,
  },

  menubar: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 30,
  },
  main_menu: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'white',
    width: horizScale(40),
    height: horizScale(40),
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textVihicle: {
    fontSize: 21,
    color: Color.white,
    fontFamily: fontFamily.bold,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    width: horizScale(24),
    height: horizScale(24),
    tintColor: Color.black,
  },
});
export default HeaderBack;
