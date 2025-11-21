import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Pressable,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {horizScale} from './Layout';
import {NotificationContext} from '../../context/NotificationContext';
import images from '../../assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../theme/colors';
import {fontFamily} from './Font';

function SmallHeader({title}) {
  const navigation = useNavigation();
  const {notificationCount, fetchNotificationCount} =
    useContext(NotificationContext);

  useEffect(() => {
    fetchNotificationCount(navigation);
  }, []);

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
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          {/* <Image style={styles.menu} source={images.backArrow} /> */}
          <Ionicons name="reorder-three-outline" size={28} color="#000" />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textVihicle}>{title}</Text>
        </View>

        <Pressable
          style={styles.main_menu2}
          onPress={() => navigation.navigate('Notification')}>
          <Image source={images.bell} style={styles.icon} />
          {notificationCount > 0 && (
            <View style={styles.notiIcon}>
              <Text style={styles.notiIconText}>{notificationCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  smallheaderlist: {
    backgroundColor: Color.blue,
  },
  notificationIcon: {
    padding: horizScale(10),
  },
  menu: {
    height: horizScale(24),
    width: horizScale(24),
    tintColor: 'black',
  },
  menubar: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 30,
  },
  main_menu: {
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
  main_menu2: {
    position: 'relative',
    backgroundColor: Color.white,
    width: horizScale(40),
    height: horizScale(40),
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notiIcon: {
    position: 'absolute',
    top: -10,
    backgroundColor: Color.black,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 22,
  },
  notiIconText: {
    textAlign: 'center',
    color: Color.white,
    fontSize: 9,
    fontFamily: fontFamily.bold,
  },
});
export default SmallHeader;
