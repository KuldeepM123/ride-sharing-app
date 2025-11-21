const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
  Pressable,
  ImageBackground,
} = require('react-native');
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {horizScale} from './Layout';
import {NotificationContext} from '../../context/NotificationContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {PostAPIFileUpload} from '../Services/Service';
import {flashM} from '../../helper/WSManager';
import AddVehicle from '../assets/Modules/Customer/Screens/Screens/AddVehicle';

const CommonHeader2 = ({title1, vehicleImage, vehicleId, imagehendlerType}) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [imageBack, setImageBack] = useState(null);

  const {notificationCount} = useContext(NotificationContext);
  const UploadImageApi = async () => {
    const result = await launchImageLibrary({
      mediaTypes: 'photo',
      quality: 1,
      cameraType: 'back',
      includeBase64: false,
    });

    const formData = new FormData();
    if (result.assets[0]?.uri == '' || result.assets[0]?.uri == null) {
    } else {
      let obj = {
        uri: result.assets[0].uri,
        name: result.assets[0].uri,
        type: 'image/jpeg',
      };
      formData.append('image', obj);
    }
    console.log('imagesssss', JSON.stringify({formData: formData}));

    const res = await PostAPIFileUpload('vehicle/add_vehicle_image', formData);
    console.log('thisImage..ssss.>>>', res.image);
    if (res.status == '200') {
      console.log('thisImage...>>>', res.image);

      const randomNumber2 = Math.floor(Math.random() * 100) + 1;
      if (vehicleId) {
        console.log('vecal d', vehicleId);
        navigation.navigate('AddVehicle', {randomNumber2});
      } else {
        imagehendlerType(res.image);
        //imagehendlerType("Hi this is testing");
      }
      flashM('Vehicle Upload Image successfully', 'success');
      console.log('AddImageVMess--->>', res.message);
    } else {
      console.log(res);
      if (res.status == '400') {
        console.log('Imaga Failed Upload', res.message);
        flashM('Image not uploadet Please Try Again', 'danger');
      }
      console.log('Image update failed');
    }
  };

  return (
    <ImageBackground
      source={require('../../assests/bg.png')}
      style={{height: 280, position: 'relative'}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.menubar}>
        <Pressable style={styles.main_menu} onPress={() => navigation.goBack()}>
          <Image
            style={styles.menu}
            source={require('../../assests/back.png')}
          />
        </Pressable>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textVihicle}>{title1}</Text>
        </View>

        <Pressable
          style={styles.main_menu2}
          onPress={() => navigation.navigate('Notification')}>
          <Image
            source={require('../../assests/bell.png')}
            style={styles.icon}
          />
          {notificationCount > 0 && (
            <View style={styles.notiIcon}>
              <Text style={styles.notiIconText}>{notificationCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <View>
        <TouchableOpacity
          style={styles.profileimage}
          onPress={() => {
            UploadImageApi();
          }}>
          {vehicleId ? (
            <>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  alignContent: 'center',
                  borderRadius: 60,
                  resizeMode: 'cover',
                }}
                source={
                  vehicleImage == null
                    ? require('../../assests/user_s.png')
                    : {uri: vehicleImage}
                }
              />
              <Image
                style={{
                  height: 22,
                  width: 22,
                  alignSelf: 'center',
                  tintColor: 'white',
                }}
                source={require('../../assests/camera.png')}
              />
            </>
          ) : (
            <>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  alignContent: 'center',
                  borderRadius: 60,
                  resizeMode: 'cover',
                }}
                source={
                  image == null
                    ? require('../../assests/user_s.png')
                    : {uri: image}
                }
              />
              <Image
                style={{
                  height: 22,
                  width: 22,
                  alignSelf: 'center',
                  tintColor: 'white',
                }}
                source={require('../../assests/camera.png')}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 18,
          marginTop: 5,
        }}>
        Choose Vehicle Image
      </Text>
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
    marginTop: 35,
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
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
export default CommonHeader2;
