import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetTo} from '../../navigation/NavigationService';
import {loginApi} from '../../services/authApi';
import {verifyOtpApi} from '@api/auth';

// Restore user from storage
export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async (_, {rejectWithValue}) => {
    try {
      const userJSON = await AsyncStorage.getItem('user');
      if (!userJSON) return null;

      const user = JSON.parse(userJSON);
      resetTo('Ride'); // go to Home (DrawerNavigator → RideStack)
      return user;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
// 🔥 Send OTP
export const sendOtpThunk = createAsyncThunk(
  'auth/sendOtp',
  async (phone, {rejectWithValue}) => {
    try {
      const res = await sendOtpApi({phone});
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'OTP sending failed',
      );
    }
  },
);

// 🔥 Verify OTP
export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async ({phone, otp}, {rejectWithValue}) => {
    try {
      const res = await verifyOtpApi({phone, otp});

      // After successful verification → navigate to Home
      resetTo('AppDrawer'); // redirect to drawer
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'OTP verification failed',
      );
    }
  },
);
// Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const res = await loginApi({email, password});

      await AsyncStorage.setItem('user', JSON.stringify(res.user));

      resetTo('Ride');

      return res.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    splashChecked: false, // 🔥 this is important
    error: null,
  },

  reducers: {
    logout(state) {
      state.user = null;
      AsyncStorage.removeItem('user');
      resetTo('Login');
    },
  },

  extraReducers: builder => {
    // SPLASH LOAD
    builder
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.splashChecked = true;
      })
      .addCase(loadUserFromStorage.rejected, state => {
        state.splashChecked = true;
      });

    // LOGIN
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Verify OTP
    builder.addCase(verifyOtpThunk.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtpThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(verifyOtpThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Verify OTP
    // builder.addCase(verifyOtpThunk.pending, state => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(verifyOtpThunk.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload.user;
    //   state.error = null;
    // });
    // builder.addCase(verifyOtpThunk.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
