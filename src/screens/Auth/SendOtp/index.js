import GlobalCss from '@utils/GlobalCss';
import {horizScale} from '@utils/Layout';
import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import {Image} from 'react-native-elements';
import {flashM} from '../../../../helper/WSManager';
import Loader from '@utils/Loader';
// import {PostAPI} from 'Services/Service';
import images from '@assets/images';
import axiosClient from '@api/axiosClient';
import {verifyOtp} from '@utils/authService';
// import {verifyOtp} from '../../../../utils/authService';
// import GlobalCss from '../../../../../../utils/GlobalCss';
// import {horizScale} from '../../../../../../utils/Layout';
// import {flashM} from '../../../../../../../helper/WSManager';
// import Loader from '../../../../../../utils/Loader';
// import {PostAPI} from '../../../../../../Services/Service';
// import images from '../../../../../../../assets/images';

const SendOtp = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loader, setLoader] = useState(false);

  const otpInputs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      otpInputs.current[index + 1].focus();
    }

    if (text === '' && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleSubmitOtp = async () => {
    setLoader(true);

    const otpValue = otp.join('');
    console.log('OTP entered:', otpValue);

    const payload = {
      otp: otpValue,
    };

    // const res = await axiosClient(
    //   'auth/verify_forgot_otp',
    //   payload,
    //   navigation,
    // );
    const res = await verifyOtp(payload);
    if (res.status == '200') {
      flashM(res.message, 'success');

      console.log('OTP Virifyed Success');
      const routeData = {
        user_id: res.data[0].user_id,
        otp: res.data[0].otp,
      };

      navigation.navigate('CreatePassword', routeData);
      setLoader(false);
    } else if (res.status == '400') {
      flashM(res.message, 'danger');
      setLoader(false);
    } else {
      flashM(res.message, 'danger');
      setLoader(false);
    }
    return true;
  };

  return (
    <ImageBackground source={images.taxi} style={GlobalCss.back}>
      <StatusBar backgroundColor={'#45708D'} barStyle="light-content" />
      <Pressable
        style={[Platform.OS == 'ios' ? styles.main_menu_ios : styles.main_menu]}
        onPress={() => navigation.goBack()}>
        <Image style={styles.menu} source={images.backArrow} />
      </Pressable>
      <View style={styles.container}>
        <Loader loading={loader} />
        <View style={GlobalCss.image_container}>
          <Image style={GlobalCss.logo} source={images.logo} />
        </View>

        <Text style={GlobalCss.headerTxt}>OTP Verification</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (otpInputs.current[index] = el)}
              style={styles.otpInput}
              value={digit}
              onChangeText={text => handleChangeText(text, index)}
              keyboardType="numeric"
              maxLength={1} // Limit to 1 digit per input
              textAlign="center"
              returnKeyType="next"
            />
          ))}
        </View>

        <View style={{...GlobalCss.button, marginTop: 10}}>
          <TouchableOpacity
            style={GlobalCss.loginButton}
            onPress={() => handleSubmitOtp()}>
            <Text style={GlobalCss.loginButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 45,
    height: 45,
    fontSize: 18,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  menu: {
    height: horizScale(24),
    width: horizScale(24),
    tintColor: 'black',
  },
  main_menu: {
    backgroundColor: 'white',
    width: horizScale(40),
    height: horizScale(40),
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  main_menu_ios: {
    backgroundColor: 'white',
    width: horizScale(40),
    height: horizScale(40),
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    marginTop: 50,
  },
});

export default SendOtp;
