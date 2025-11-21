import axiosClient from '../api/axiosClient';
export const loginUser = async payload => {
  try {
    const res = await axiosClient.post('/login', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const registerUser = async payload => {
  try {
    const res = await axiosClient.post('/register', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// Verify OTP
export const verifyOtp = async payload => {
  try {
    const res = await axiosClient.post('/verify_otp', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const resendOtp = async payload => {
  try {
    const res = await axiosClient.post('login', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// Forgot Password
export const forgotPassword = async payload => {
  try {
    const res = await axiosClient.post('/forgot_password', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// Reset Password
export const resetPassword = async payload => {
  try {
    const res = await axiosClient.post('/reset_password', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// update profile
export const updateProfile = async payload => {
  try {
    const res = await axiosClient.post('/update_profile', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// update profile
export const changePassword = async payload => {
  try {
    const res = await axiosClient.post('/change_password', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
//get user data
export const getUserData = async () => {
  try {
    const res = await axiosClient.post('/get_user_profile');
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// upload profile image
export const uploadProfileImage = async payload => {
  try {
    const res = await axiosClient.post('/upload_profile_image', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
