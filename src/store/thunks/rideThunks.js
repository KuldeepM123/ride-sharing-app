import {createAsyncThunk} from '@reduxjs/toolkit';
import {navigate} from '../../navigation/NavigationService';
import {searchShareRide, shareRide} from '../../services/rideApi';

export const searchRideThunk = createAsyncThunk(
  'ride/searchRide',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {pickup, destination} = getState().ride;

      const payload = {
        from_address: pickup.description,
        to_address: destination.description,
        from_lat: pickup.location.lat,
        to_lat: destination.location.lat,
        from_long: pickup.location.lng,
        to_long: destination.location.lng,
      };

      await searchShareRide(payload);

      navigate('DriverListScreen');
      return true;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const shareRideThunk = createAsyncThunk(
  'ride/shareRide',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {pickup, destination, selectedDays, scheduledDate, timeMode} =
        getState().ride;

      const dateObj = timeMode === 'Now' ? new Date() : scheduledDate;
      const payload = {
        from_address: pickup.description,
        to_address: destination.description,
        from_lat: pickup.location.lat,
        to_lat: destination.location.lat,
        from_long: pickup.location.lng,
        to_long: destination.location.lng,
        date: dateObj.toISOString().split('T')[0],
        time: dateObj.toTimeString().split(' ')[0],
        days: selectedDays,
      };

      await shareRide(payload);

      navigate('VehicleInformation');
      return true;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
