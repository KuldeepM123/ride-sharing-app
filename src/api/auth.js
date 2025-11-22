import axiosClient from '../api/axiosClient';
export const loginApi = async payload => {
  try {
    const res = await axiosClient.post('auth/login', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const registerUser = async payload => {
  try {
    const res = await axiosClient.post('auth/register', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// Verify OTP
export const verifyOtpApi = async payload => {
  try {
    const res = await axiosClient.post('auth/verify_otp', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const resendOtp = async payload => {
  try {
    const res = await axiosClient.post('auth/authlogin', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// Forgot Password
export const forgotPassword = async payload => {
  try {
    const res = await axiosClient.post('auth/forgot_password', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// Reset Password
export const resetPassword = async payload => {
  try {
    const res = await axiosClient.post('auth/reset_password', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// update profile
export const updateProfile = async payload => {
  try {
    const res = await axiosClient.post('auth/update_profile', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// update profile
export const changePassword = async payload => {
  try {
    const res = await axiosClient.post('auth/change_password', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
