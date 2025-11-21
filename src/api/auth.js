import axiosClient from './axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendOtp = async payload => {
  try {
    const res = await axiosInstance.post('/send_otp', payload);
    return res.data;
  } catch (error) {
    if (error.response) return error.response.data;
    throw error;
  }
};

export const verifyOtp = async payload => {
  try {
    const res = await axiosInstance.post('/verify_otp', payload);
    return res.data;
  } catch (error) {
    if (error.response) return error.response.data;
    throw error;
  }
};

export const registerUser = async payload => {
  const res = await axiosClient.post('/auth/register', payload);
  return res.data;
};

export const loginUser = async payload => {
  const res = await axiosClient.post('/auth/login', payload);
  const token = res.data?.token;
  if (token) {
    await AsyncStorage.setItem('token', token);
  }
  return res.data;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('token');
};
