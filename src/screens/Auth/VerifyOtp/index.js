import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {verifyOtp, resendOtp} from '@utils/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '@utils/Colors';
import {fontFamily} from '@utils/Font';
import BackButton from '@utils/BackBtn';

export default function VerifyOtp() {
  const navigation = useNavigation();
  const route = useRoute();
  const {phone} = route.params || {};

  const OTP_LENGTH = 6;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const refs = useRef([...Array(OTP_LENGTH)].map(() => React.createRef()));
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  const COOLDOWN_TIME = 30;

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const onChangeDigit = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '');

    if (!digit) {
      const next = [...otp];
      next[index] = '';
      setOtp(next);
      return;
    }

    const next = [...otp];
    next[index] = digit[0];
    setOtp(next);

    if (index < OTP_LENGTH - 1) {
      refs.current[index + 1].current.focus();
    } else {
      Keyboard.dismiss();
      handleVerify(next.join(''));
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      setCooldown(COOLDOWN_TIME);
      await resendOtp({mobile: phone});
    } catch (err) {
      console.log('Resend OTP error:', err);
    }
  };

  const handleVerify = async finalOtp => {
    if (finalOtp.length !== OTP_LENGTH) return;

    try {
      setLoading(true);

      const res = await verifyOtp({
        mobile: phone,
        otp: finalOtp,
      });

      console.log('Verify OTP FULL RESPONSE:', res);

      const userData = {
        user: res.data,
        token: res.token,
      };

      // console.log('FINAL USER DATA TO STORE:', userData);
      const result = await AsyncStorage.setItem('user_token', res.token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      const get_result = await AsyncStorage.getItem('user_token');
      console.log('Stored Token:', get_result);

      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'VerifyOtp'}], // or SendOtp, doesn't matter
      // });
      navigation.navigate('VerifyOtp');
    } catch (err) {
      console.log('Verify OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.backButton}>
        <BackButton />
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Enter Verification Code</Text>
        <Text style={styles.sub}>A code has been sent to {phone}</Text>

        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={refs.current[i]}
              value={digit}
              onChangeText={t => onChangeDigit(t, i)}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              maxLength={1}
              style={styles.otpBox}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.verifyButton, loading && styles.disabled]}
          onPress={() => handleVerify(otp.join(''))}
          disabled={loading}>
          <Text style={styles.verifyText}>
            {loading ? 'Verifying...' : 'Verify Now'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.changeText}>Didn't receive a code?</Text>
        <TouchableOpacity disabled={cooldown > 0} onPress={handleResend}>
          <Text
            style={[styles.resendText, cooldown > 0 && styles.disabledText]}>
            {cooldown > 0 ? `${cooldown}s` : 'Resend OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Color.white},
  container: {
    marginTop: 120,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {position: 'absolute', top: 30, left: 20, zIndex: 1},
  heading: {
    color: Color.black,
    fontSize: 24,
    fontFamily: fontFamily.bold,
  },
  sub: {
    marginBottom: 20,
    fontSize: 14,
    color: Color.gray,
    fontFamily: fontFamily.regular,
  },
  otpRow: {flexDirection: 'row', justifyContent: 'center', marginVertical: 20},
  otpBox: {
    width: 48,
    height: 56,
    marginHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.gray,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fontFamily.regular,
  },
  verifyButton: {
    width: '90%',
    marginTop: 20,
    backgroundColor: Color.blue,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
  },
  verifyText: {
    fontSize: 18,
    color: Color.white,
    fontFamily: fontFamily.medium,
  },
  disabled: {opacity: 0.5},
  row: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  resendText: {
    marginLeft: 6,
    color: Color.blue,
    fontFamily: fontFamily.medium,
  },
  changeText: {
    color: Color.black,
    fontFamily: fontFamily.regular,
  },
  disabledText: {color: Color.gray},
});
