import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Color from '@utils/Colors';
import images from '@assets/images';
import HeaderBack from '@utils/HeaderBack';
import {fontFamily} from '@utils/Font';

const DriverListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {pickup, destinations = []} = route.params || {};

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Simulate fetching drivers from a backend API
    // Normally you'd query with pickup/destination info.
    const availableDrivers = [
      {
        id: '1',
        name: 'Ramesh Kumar',
        rating: 4.9,
        vehicle: 'Hero Splendor',
        from: 'Dewas Naka',
        to: 'Scheme 78',
        price: 50,
        time: '2 min',
        image: images.profileUser,
        coords: {latitude: 22.76, longitude: 75.88},
      },
      {
        id: '2',
        name: 'Vikram Singh',
        rating: 4.7,
        vehicle: 'Honda Activa',
        from: 'Patnipura',
        to: 'Rajendra Nagar',
        price: 45,
        time: '4 min',
        image: images.profileUser,
        coords: {latitude: 22.7615, longitude: 75.883},
      },
    ];
    setDrivers(availableDrivers);
  }, []);

  const renderDriver = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DriverDetail', {
          driver: item,
          pickup,
          destination: destinations[0],
        })
      }>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.vehicle}>{item.vehicle}</Text>
        <View style={styles.row}>
          <Icon name="star" size={14} color="gold" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.distance}> • {item.time}</Text>
        </View>
      </View>
      <Text style={styles.price}>₹ {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Map */}
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
        {drivers.map(driver => (
          <Marker
            key={driver.id}
            coordinate={driver.coords}
            title={driver.name}
            description={`${driver.from} → ${driver.to}`}
          />
        ))}
      </MapView>
      {/* Back Header */}
      <View style={styles.headerContainer}>
        <HeaderBack title="Available Drivers" />
      </View>
      {/* Driver List */}
      <View style={styles.listContainer}>
        <Text style={styles.heading}>Available Drivers</Text>
        <FlatList
          data={drivers}
          renderItem={renderDriver}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
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
  heading: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Color.black,
    marginBottom: 10,
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
  name: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: Color.black,
  },
  vehicle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: Color.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rating: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: '#555',
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: '#777',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Color.blue,
  },
});

export default DriverListScreen;
