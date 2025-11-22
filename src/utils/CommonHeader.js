import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {horizScale} from './Layout';
import images from '@assets/images';

const CommonHeader = ({title1}) => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={images.backgroundSkyblue}
      style={{position: 'relative'}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.menubar}>
        <Pressable
          style={styles.main_menu}
          onPress={() => navigation.toggleDrawer()}>
          <Image source={images.menudone} style={styles.icon} />
        </Pressable>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textVihicle}>{title1}</Text>
        </View>

        <Pressable style={styles.main_menu2}>
          <Image source={images.bell} style={styles.icon} />

          <View style={styles.notiIcon}>
            <Text style={styles.notiIconText}>2</Text>
          </View>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    marginHorizontal: 10,
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
  main_menu2: {
    position: 'relative',
    backgroundColor: 'white',
    width: horizScale(40),
    height: horizScale(40),
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textVihicle: {
    fontSize: 23,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: '500',
  },
  icon: {
    width: horizScale(24),
    height: horizScale(24),
    tintColor: 'black',
  },
  profileimage: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  profilename: {
    marginVertical: 15,
    alignSelf: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  notiIcon: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#9e1b32',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 22,
  },
  notiIconText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
export default CommonHeader;
