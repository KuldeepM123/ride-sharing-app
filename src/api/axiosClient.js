import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://103.191.208.131:9005/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('user_token');
  // console.log('token', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.token = token;
  }

  return config;
});

export default axiosClient;
