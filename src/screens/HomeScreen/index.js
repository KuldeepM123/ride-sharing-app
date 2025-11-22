import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Color from '@utils/Colors';
import SmallHeader from '@utils/SmallHeader';
import LocationSearch from '@components/LocationSearch';
import {fontFamily} from '@utils/Font';

// Redux
// import {
//   setPickup,
//   setDestination,
//   toggleDay,
//   setTimeMode,
//   setScheduledDate,
//   setRegion,
// } from '../../store/slices/rideSlice';
import {searchRideThunk, shareRideThunk} from 'store/thunks/rideThunks';
import {
  setDestination,
  setPickup,
  setRegion,
  setScheduledDate,
  setTimeMode,
  toggleDay,
} from 'store/slices/rideSlice';

const {width} = Dimensions.get('window');

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const ride = useSelector(state => state.ride);
  const mapRef = useRef(null);

  // Local UI-only state
  const [activeTab, setActiveTab] = useState('Search Ride');
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Redux state
  const {pickup, destination, selectedDays, timeMode, scheduledDate, region} =
    useSelector(state => state.ride);

  // Request location permission on mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Get current location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => console.log('Location Error:', error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatch]);

  const animateToRegion = loc => {
    if (mapRef.current && loc) {
      mapRef.current.animateToRegion(
        {
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        800,
      );
    }
  };

  const weekDays = [
    {label: 'Son', value: 'Sunday'},
    {label: 'Mon', value: 'Monday'},
    {label: 'Tue', value: 'Tuesday'},
    {label: 'Wed', value: 'Wednessday'},
    {label: 'Thu', value: 'Thursday'},
    {label: 'Fri', value: 'Friday'},
    {label: 'Sat', value: 'Saturday'},
  ];

  const handleSearchRide = () => {
    dispatch(searchRideThunk({navigation}));
  };

  const handleShareRide = () => {
    dispatch(shareRideThunk({navigation}));
  };

  return (
    <View style={styles.container}>
      <SmallHeader title="Dashboard" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          {/* Tabs */}
          <View style={styles.tabRow}>
            {['Search Ride', 'Share Ride'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab)}>
                <Ionicons
                  name={tab === 'Search Ride' ? 'search' : 'car-sport'}
                  size={18}
                  color={activeTab === tab ? '#fff' : '#666'}
                  style={styles.tabIcon}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* ================ SEARCH RIDE UI ================= */}
          {activeTab === 'Search Ride' && (
            <View style={styles.SearchRideTabContainer}>
              {timeMode === 'Now' && (
                <View style={styles.currentTimeCard}>
                  <Ionicons name="time" size={18} color={Color.blue} />
                  <Text style={styles.currentTimeText}>
                    {new Date().toLocaleString()}
                  </Text>
                </View>
              )}

              {timeMode === 'Schedule' && (
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(true)}>
                  <Ionicons name="calendar" size={18} color={Color.blue} />
                  <Text style={styles.datePickerText}>
                    {scheduledDate.toLocaleString()}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color="#999" />
                </TouchableOpacity>
              )}
              {/* Pickup */}
              <View style={styles.inputWrapper}>
                <View style={styles.iconCircle}>
                  <MaterialIcons
                    name="my-location"
                    size={16}
                    color={Color.blue}
                  />
                </View>
                <Text style={styles.label}>Pickup Location</Text>
              </View>
              <LocationSearch
                placeholder="Where from?"
                onSelect={loc => {
                  dispatch(
                    setPickup({
                      description: loc.name,
                      location: {lat: loc.latitude, lng: loc.longitude},
                    }),
                  );
                  animateToRegion(loc);
                }}
              />
              {/* Drop */}
              <View style={styles.destinationSection}>
                <View style={styles.inputWrapper}>
                  <View style={[styles.iconCircle, styles.iconCircleDest]}>
                    <MaterialIcons
                      name="location-on"
                      size={16}
                      color="#FF5252"
                    />
                  </View>
                  <Text style={styles.label}>Drop Location</Text>
                </View>
                <LocationSearch
                  placeholder="Where to?"
                  onSelect={loc => {
                    dispatch(
                      setDestination({
                        description: loc.name,
                        location: {lat: loc.latitude, lng: loc.longitude},
                      }),
                    );
                  }}
                />
              </View>
            </View>
          )}
          {/* ================ SHARE RIDE UI ================= */}
          {activeTab === 'Share Ride' && (
            <View style={styles.ShareRideTabContainer}>
              <View style={styles.weekdaysContainer}>
                <Text style={styles.headingText}>Select Your Working Days</Text>
                <View style={styles.checkboxContainer}>
                  {weekDays.map(day => (
                    <TouchableOpacity
                      key={day.value}
                      style={[
                        styles.checkbox,
                        selectedDays.includes(day.value) &&
                          styles.checkBoxSelected,
                      ]}
                      onPress={() => dispatch(toggleDay(day.value))}>
                      <Text
                        style={[
                          styles.checkboxLabel,
                          selectedDays.includes(day.value) &&
                            styles.checkboxLabelSelected,
                        ]}>
                        {day.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/* Time Mode */}
              </View>
              <View style={styles.timeContainer}>
                <TouchableOpacity
                  style={[
                    styles.timeButton,
                    timeMode === 'Now' && styles.activeTimeButton,
                  ]}
                  onPress={() => dispatch(setTimeMode('Now'))}>
                  <Ionicons
                    name="flash"
                    size={16}
                    color={timeMode === 'Now' ? '#fff' : '#666'}
                  />
                  <Text
                    style={[
                      styles.timeText,
                      timeMode === 'Now' && styles.activeTimeText,
                    ]}>
                    For Now
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.timeButton,
                    timeMode === 'Schedule' && styles.activeTimeButton,
                  ]}
                  onPress={() => dispatch(setTimeMode('Schedule'))}>
                  <Ionicons
                    name="calendar"
                    size={16}
                    color={timeMode === 'Schedule' ? '#fff' : '#666'}
                  />
                  <Text
                    style={[
                      styles.timeText,
                      timeMode === 'Schedule' && styles.activeTimeText,
                    ]}>
                    Schedule
                  </Text>
                </TouchableOpacity>
              </View>

              {timeMode === 'Now' && (
                <View style={styles.currentTimeCard}>
                  <Ionicons name="time" size={18} color={Color.blue} />
                  <Text style={styles.currentTimeText}>
                    {new Date().toLocaleString()}
                  </Text>
                </View>
              )}

              {timeMode === 'Schedule' && (
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(true)}>
                  <Ionicons name="calendar" size={18} color={Color.blue} />
                  <Text style={styles.datePickerText}>
                    {scheduledDate.toLocaleString()}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color="#999" />
                </TouchableOpacity>
              )}

              <View style={styles.inputWrapper}>
                <View style={styles.iconCircle}>
                  <MaterialIcons
                    name="my-location"
                    size={16}
                    color={Color.blue}
                  />
                </View>
                <Text style={styles.label}>Pickup Location</Text>
              </View>
              <LocationSearch
                placeholder="Where from?"
                onSelect={loc => {
                  dispatch(
                    setPickup({
                      description: loc.name,
                      location: {lat: loc.latitude, lng: loc.longitude},
                    }),
                  );
                  animateToRegion(loc);
                }}
              />

              <View style={styles.destinationSection}>
                <View style={styles.inputWrapper}>
                  <View style={[styles.iconCircle, styles.iconCircleDest]}>
                    <MaterialIcons
                      name="location-on"
                      size={16}
                      color="#FF5252"
                    />
                  </View>
                  <Text style={styles.label}>Drop Location</Text>
                </View>

                <LocationSearch
                  placeholder="Where to?"
                  onSelect={loc => {
                    dispatch(
                      setPickup({
                        description: loc.name,
                        location: {lat: loc.latitude, lng: loc.longitude},
                      }),
                    );
                    animateToRegion(loc);
                  }}
                />
              </View>
            </View>
          )}

          <View style={styles.btnContainer}>
            {activeTab === 'Search Ride' && (
              <TouchableOpacity
                style={styles.searchRideBtn}
                onPress={handleSearchRide}>
                <Ionicons name="search" size={20} color="#fff" />
                <Text style={styles.searchRideText}>Search Ride</Text>
              </TouchableOpacity>
            )}
            {activeTab === 'Share Ride' && (
              <TouchableOpacity
                style={styles.shareRideBtn}
                onPress={handleShareRide}>
                <Ionicons name="car-sport" size={20} color="#fff" />
                <Text style={styles.shareRideText}>Share Ride</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <DateTimePicker
        isVisible={showDatePicker}
        mode="datetime"
        date={scheduledDate}
        onConfirm={date => {
          dispatch(setScheduledDate(date));
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchContainer: {
    // position: 'relative',
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: '#F8F9FA',
  },
  weekdaysContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headingText: {
    color: Color.black,
    fontFamily: fontFamily.regular,
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  checkBoxSelected: {
    backgroundColor: Color.blue,
    borderColor: '#007bff',
  },
  checkboxLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: '#333',
  },
  checkboxLabelSelected: {
    color: '#fff',
  },
  selectedDaysText: {
    fontSize: 16,
    marginTop: 10,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  activeTabButton: {
    backgroundColor: Color.blue,
    shadowColor: Color.blue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabIcon: {
    marginRight: 4,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontFamily: fontFamily.semiBold,
  },
  activeTabText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
  },
  SearchRideTabContainer: {
    marginTop: 8,
  },
  ShareRideTabContainer: {
    // marginTop: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  timeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 12,
    paddingVertical: 10,
    gap: 6,
  },
  activeTimeButton: {
    backgroundColor: Color.blue,
  },
  timeText: {
    fontSize: 13,
    color: '#666',
    fontFamily: fontFamily.medium,
  },
  activeTimeText: {
    color: '#fff',
    fontFamily: fontFamily.semiBold,
  },
  currentTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 10,
  },
  currentTimeText: {
    fontSize: 13,
    color: '#1976D2',
    fontFamily: fontFamily.medium,
    flex: 1,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 10,
  },
  datePickerText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    fontFamily: fontFamily.medium,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleDest: {
    backgroundColor: '#FFEBEE',
  },
  label: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: '#333',
  },
  destinationSection: {
    marginTop: 16,
  },
  btnContainer: {
    marginTop: 24,
  },
  searchRideBtn: {
    flexDirection: 'row',
    backgroundColor: Color.blue,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    shadowColor: Color.blue,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  shareRideBtn: {
    flexDirection: 'row',
    backgroundColor: Color.blue,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    shadowColor: Color.blue,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  searchRideText: {
    fontFamily: fontFamily.bold,
    color: '#fff',
    fontSize: 16,
  },
  shareRideText: {
    fontFamily: fontFamily.bold,
    color: '#fff',
    fontSize: 16,
  },
  quickActionsContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: '#333',
    marginBottom: 16,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: (width - 64) / 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: '#666',
    textAlign: 'center',
  },
  recentSection: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  recentIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentTextWrapper: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: '#333',
    marginBottom: 4,
  },
  recentSubtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: '#999',
  },
});

const autoCompleteStyles = {
  textInputContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    fontFamily: fontFamily.regular,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#333',
  },
};

export default HomeScreen;
