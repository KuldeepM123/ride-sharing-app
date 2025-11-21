import GlobalCss from '@utils/GlobalCss';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Color from '@utils/Colors';
import Loader from '@utils/Loader';
import {flashM} from '../../../../../helper/WSManager';
import images from '@assets/images';
import {fontFamily} from '@utils/Font';
import {registerUser} from '@utils/authService';

const Signup = ({navigation}) => {
  // const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsAppNo, setWhatsAppNo] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    console.log('handleSignUp::::::::::::::::::::');

    // if (!fullName.trim()) {
    //   flashM('Full name is required', 'danger');
    //   return;
    // }

    // if (!email.includes('@')) {
    //   flashM('Please enter a valid email', 'danger');
    //   return;
    // }

    // if (!phone || phone.length < 10) {
    //   flashM('Please enter a valid phone number', 'danger');
    //   return;
    // }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile_no: phone,
      user_group: 'customer',
      password: password,
      whatsapp_no: whatsAppNo,
    };
    console.log('payload', payload);

    try {
      setLoader(true);
      const res = await registerUser(payload);
      console.log('respons', res);

      if (res.status === 200) {
        flashM('OTP sent successfully', 'success');

        navigation.navigate('VerifyOtp', {
          firstName,
          lastName,
          email,
          phone,
        });
      } else {
        flashM(res.message || 'Failed to send OTP', 'danger');
      }
    } catch (err) {
      console.log('OTP ERROR ==>', err);
      console.log('OTP ERROR RESPONSE ==>', err?.response);
      flashM('Network error while sending OTP', 'danger');
    } finally {
      setLoader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground // source={require('../../../../assests/taxi.png')}
        style={styles.back}>
        <StatusBar barStyle="light-content" />
        {/* backgroundColor={'#45708D'} */}
        <Loader loading={loader} />

        <ScrollView>
          <View
            style={[
              Platform.OS === 'ios' ? styles.container_ios : styles.container,
            ]}>
            <View style={{...styles.image_container}}>
              <Image style={styles.logo} source={images.logo} />
            </View>
            <Text style={styles.heading}>Sign Up</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="gray"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="gray"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="gray"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="WhatsAppNo"
                placeholderTextColor="gray"
                keyboardType="phone-pad"
                maxLength={10}
                value={whatsAppNo}
                onChangeText={setWhatsAppNo}
              />
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={{
                  ...styles.loginButton,
                  backgroundColor: Color.blue,
                }}
                onPress={handleSignUp}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerLinks}>
          <Text style={styles.footerText}>Already Have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.underlineText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container1: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  back: {
    height: '100%',
    color: 'fff',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 14,
    color: 'black',
    borderRadius: 50,
    backgroundColor: '#f9f9f9',
  },
  input1: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 14,
    color: 'black',
    backgroundColor: '#f9f9f9',
  },
  container: {
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  container_ios: {
    justifyContent: 'center',
    marginHorizontal: 8,
    marginTop: 20,
  },
  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 220,
    height: 60,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 18,
  },
  loginButtonText: {
    color: Color.white,
    fontFamily: fontFamily.medium,
    fontSize: 18,
  },
  heading: {
    fontSize: 30,
    fontFamily: fontFamily.regular,
    color: Color.black,
    alignSelf: 'center',
    marginVertical: 60,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 17,
    marginTop: 5,
  },
  rememberText_ios: {
    color: '#fff',
    marginLeft: 10,
  },
  rememberText: {
    color: '#fff',
  },
  rememberTextTerm: {
    color: 'lightblue',
    fontSize: 12,
    paddingLeft: 47,
    marginBottom: 20,
  },
  rememberTextTerm_ios: {
    fontSize: 12,
    color: 'lightblue',
    paddingLeft: 55,
    marginBottom: 20,
  },
  button: {
    // alignSelf: 'center',
    // width: '100%',
    marginVertical: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 50,
    // marginHorizontal: 10,
  },
  loginButton: {
    backgroundColor: Color.blue,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    // marginBottom: 10,
  },
  footerLinks: {
    // position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: Color.black,
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  underlineText: {
    textDecorationLine: 'none',
    color: Color.blue,
    fontSize: 15,
    fontFamily: fontFamily.regular,
  },
  icon: {
    height: 21,
    width: 19,
    marginLeft: 10,
  },
  icon2: {
    height: 21,
    width: 19,
    marginLeft: 2,
  },
});

export default Signup;
