import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Color from '@utils/Colors';
import images from '@assets/images';
import HeaderBack from '@utils/HeaderBack';
import {fontFamily} from '@utils/Font';

const CustomerListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {pickup, destination} = route.params || {};

  const [customers, setCustomers] = useState([]);

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    // Simulate fetching passengers heading toward similar routes
    const availableCustomers = [
      {
        id: '1',
        name: 'Aditi Sharma',
        pickup: 'Dewas Naka',
        destination: 'Scheme 78',
        distance: '1.2 km away',
        fare: '₹ 50',
        image: images.profileUser,
        coords: {latitude: 22.7595, longitude: 75.8815},
      },
      {
        id: '2',
        name: 'Rohit Patel',
        pickup: 'Patnipura',
        destination: 'Rajendra Nagar',
        distance: '1.8 km away',
        fare: '₹ 60',
        image: images.profileUser,
        coords: {latitude: 22.762, longitude: 75.886},
      },
      {
        id: '3',
        name: 'Neha Verma',
        pickup: 'Vijay Nagar',
        destination: 'Scheme 78',
        distance: '2.4 km away',
        fare: '₹ 55',
        image: images.profileUser,
        coords: {latitude: 22.764, longitude: 75.889},
      },
    ];
    setCustomers(availableCustomers);
  }, []);

  const renderCustomer = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('CustomerDetail', {
          customer: item,
          pickup,
          destination,
        })
      }>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.route}>
          {item.pickup} → {item.destination}
        </Text>
        <View style={styles.row}>
          <Icon name="location-outline" size={14} color="#555" />
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </View>
      {/* <Text style={styles.price}>{item.fare}</Text> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Map showing customer pins */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 22.76,
          longitude: 75.88,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        // showsUserLocation
      >
        {customers.map(customer => (
          <Marker
            key={customer.id}
            coordinate={customer.coords}
            title={customer.name}
            description={`${customer.pickup} → ${customer.destination}`}
            pinColor="blue"
          />
        ))}
      </MapView>
      {/* Back Header */}
      <View style={styles.headerContainer}>
        <HeaderBack title="Available Customers" />
      </View>

      {/* Bottom sheet list */}
      <View style={styles.listContainer}>
        <View style={styles.availableContainer}>
          <Text style={styles.heading}>Available Customers</Text>
          {/* stop sharing button  */}
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <FlatList
          data={customers}
          renderItem={renderCustomer}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  listContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: '45%',
    elevation: 5,
  },
  availableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: Color.gray,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  viewAllBtn: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: Color.blue,
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    color: Color.black,
  },
  route: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: Color.gray,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  distance: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: Color.gray,
    marginLeft: 4,
  },
});

export default CustomerListScreen;
