// src/redux/store.js
import {configureStore} from '@reduxjs/toolkit';
import rideReducer from './slices/rideSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ride: rideReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // allow non-serializable if needed (dates), adjust as needed
    }),
});

export default store;
