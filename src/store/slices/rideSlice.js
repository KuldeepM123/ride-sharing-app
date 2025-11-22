import {searchRide as searchRideAPI, shareRide as shareRideAPI} from '@api/customer';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {searchShareRide, shareRide} from '../../api/rideApi';

// Create async thunks
export const searchRide = createAsyncThunk(
  'ride/searchRide',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await searchRideAPI(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to search ride');
    }
  },
);

export const shareRide = createAsyncThunk(
  'ride/shareRide',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await shareRideAPI(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to share ride');
    }
  },
);

const initialState = {
  region: null,
  pickup: null,
  destination: null,
  hasPermission: false,
  activeTab: 'Search Ride',
  timeMode: 'Now',
  scheduledDate: new Date(),
  selectedDays: [],
  price: 0,
  numberOfSeat: 1,
  loading: false,
  error: null,

  // results
  searchRideResult: null,
  shareRideResult: null,
};

/* ---------------------- SLICE ----------------------- */

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setPickup: (state, action) => {
      state.pickup = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setHasPermission: (state, action) => {
      state.hasPermission = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setTimeMode: (state, action) => {
      state.timeMode = action.payload;
    },
    setScheduledDate: (state, action) => {
      state.scheduledDate = action.payload;
    },
    toggleDay: (state, action) => {
      const d = action.payload;
      if (state.selectedDays.includes(d)) {
        state.selectedDays = state.selectedDays.filter(x => x !== d);
      } else {
        state.selectedDays.push(d);
      }
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setNumberOfSeat: (state, action) => {
      state.numberOfSeat = action.payload;
    },
    resetRideState: () => initialState,
  },

  /* ----------- HERE THUNKS UPDATE STATE ----------- */
  extraReducers: builder => {
    builder

      // SEARCH RIDE
      .addCase(searchRide.pending, state => {
        state.loading = true;
      })
      .addCase(searchRide.fulfilled, (state, action) => {
        state.loading = false;
        state.searchRideResult = action.payload;
      })
      .addCase(searchRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SHARE RIDE
      .addCase(shareRide.pending, state => {
        state.loading = true;
      })
      .addCase(shareRide.fulfilled, (state, action) => {
        state.loading = false;
        state.shareRideResult = action.payload;
      })
      .addCase(shareRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setRegion,
  setPickup,
  setDestination,
  setHasPermission,
  setActiveTab,
  setTimeMode,
  setScheduledDate,
  toggleDay,
  setPrice,
  setNumberOfSeat,
  resetRideState,
} = rideSlice.actions;

export default rideSlice.reducer;
