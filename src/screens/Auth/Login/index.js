// import React, {useState} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Platform,
//   KeyboardAvoidingView,
// } from 'react-native';
// import {Image} from 'react-native-elements';
// import Loader from '@utils/Loader';
// import {flashM} from '../../../../../helper/WSManager';
// import {fontFamily} from '@utils/Font';
// import images from '@assets/images';
// import Color from '@utils/Colors';
// import {useSendOtp} from '@hooks/auth/useAuth';

// const uData = {email: '', password: ''};

// const Login = ({navigation}) => {
//   const [loader, setLoader] = useState(false);
//   const [userDetails, setUserDetails] = useState(uData);
//   const [phone, setPhone] = useState('');
//   const {mutate: sendOtp, isPending} = useSendOtp();

//   const handleSendOtp = async () => {
//     sendOtp(
//       {mobile_no: phone},
//       {
//         onSuccess: res => {
//           navigation.navigate('VerifyOtp', {phone});
//         },
//         onError: err => {
//           flashM('Failed to send OTP', 'danger');
//         },
//       },
//     );
//     if (!phone) {
//       flashM('Please enter a valid phone number', 'danger');
//       return;
//     }

//     const payload = {mobile_no: phone, user_group: 'customer'};

//     try {
//       setLoader(true);
//       const res = await sendOtp_service(payload);

//       if (res.status === 200) {
//         flashM('OTP sent successfully', 'success');
//         navigation.navigate('VerifyOtp', {phone});
//       } else {
//         flashM(res.message || 'Failed to send OTP', 'danger');
//       }
//     } catch (err) {
//       flashM('Network error while sending OTP', 'danger');
//     } finally {
//       setLoader(false);
//     }
//   };
//   const handleChange = e => {
//     setUserDetails(prevState => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import images from '@assets/images';
import Color from '@utils/Colors';
import {flashM} from '../../../../helper/WSManager';
import {fontFamily} from '@utils/Font';
import {loginUser} from 'store/slices/authSlice';

const LoginScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSendOtp = async () => {
    if (!phone) {
      flashM('Please enter a valid phone number', 'danger');
      return;
    }

    const payload = {mobile: phone};
    // setTimeout(() => sendOtpNow(), 20);
    try {
      setLoader(true);
      // const res = loginUser(payload);
      flashM('OTP sent successfully', 'success');
      navigation.navigate('VerifyOtp', {phone});
    } catch (err) {
      flashM(err?.message || 'Failed to send OTP', 'danger');
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView style={styles.back}>
      {/* <Loader loading={isPending} /> */}

      <View
        style={[
          Platform.OS === 'ios' ? styles.container_ios : styles.container,
        ]}>
        <View style={styles.image_container}>
          <Image style={styles.logo} source={images.logo} />
          {/* <Text style={styles.logoText}>LiftKarade</Text> */}
        </View>

        {/* <View style={styles.image_container}>
            <Image style={styles.logo} source={images.logo} />
          </View> */}

        <Text style={styles.headerTxt}>Login</Text>
        <Text style={styles.discriptionTxt}>Login with your phone number</Text>

        <View style={styles.textInContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.placeholderTxt}
              placeholder="Enter Your Phone Number"
              placeholderTextColor="gray"
              value={phone}
              onChangeText={setPhone}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSendOtp}>
              <Text style={styles.loginButtonText}>Send Code</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottmTxt}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.underlineText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  back: {
    color: Color.white,
  },
  image_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  headerTxt: {
    fontFamily: fontFamily.medium,
    fontSize: 30,
    color: Color.black,
    alignSelf: 'center',
    marginVertical: 20,
  },
  discriptionTxt: {
    fontFamily: fontFamily.regular,
    fontSize: 20,
    color: Color.black,
    alignSelf: 'center',
    marginVertical: 20,
  },
  textInContainer: {
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 50,
    paddingHorizontal: 25,
    backgroundColor: '#f9f9f9',
    marginBottom: 18,
  },
  logo: {
    width: 220,
    height: 190,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 30,
    fontFamily: fontFamily.bold,
    color: Color.black,
    // marginLeft: 10,
  },
  button: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 50,
  },
  loginButton: {
    backgroundColor: Color.blue,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: fontFamily.medium,
    color: Color.white,
    fontSize: 18,
  },
  placeholderTxt: {
    fontSize: 14,
    color: Color.black,
  },
  container_ios: {
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 50,
  },
  footerLinks: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  bottmTxt: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: Color.black,
    fontFamily: fontFamily.regular,
  },
  underlineText: {
    color: Color.blue,
    fontFamily: fontFamily.regular,
    fontSize: 15,
  },
});

export default LoginScreen;
