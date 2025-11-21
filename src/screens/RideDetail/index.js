import images from '@assets/images';
import HeaderBack from '@utils/HeaderBack';
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {ScaledSheet} from 'react-native-size-matters';

const RideDetail = ({navigation}) => {
  const [drivers] = useState([
    {
      id: '1',
      name: 'Ramesh Kumar',
      route: 'Dewas Naka to Scheme No. 18',
      image: images.profileUser,
    },
    {
      id: '2',
      name: 'Vikram Singh',
      route: 'Dewas Naka to Scheme No. 18',
      image: images.profileUser,
    },
    {
      id: '3',
      name: 'Arjun Patel',
      route: 'Dewas Naka to Scheme No. 18',
      image: images.profileUser,
    },
  ]);

  return (
    <View style={styles.container}>
      <HeaderBack title="Ride Route" />
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.1765,
          longitude: 75.7885,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {drivers.map(driver => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: 23.1765 + Math.random() * 0.002,
              longitude: 75.7885 + Math.random() * 0.002,
            }}
            title={driver.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {flex: 1},
  map: {flex: 1},
  header: {
    position: 'absolute',
    top: '50@s',
    left: '20@s',
    right: '20@s',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '16@s',
    fontWeight: '600',
    marginLeft: '10@s',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: '20@s',
    borderTopRightRadius: '20@s',
    paddingTop: '10@s',
    paddingHorizontal: '15@s',
    height: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '10@s',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: '50@s',
    height: '50@s',
    borderRadius: '25@s',
    marginRight: '12@s',
  },
  info: {flex: 1},
  name: {fontSize: '15@s', fontWeight: '600', color: '#000'},
  row: {flexDirection: 'row', alignItems: 'center', marginVertical: '2@s'},
  rating: {fontSize: '13@s', marginLeft: '3@s', color: '#555'},
  distance: {fontSize: '12@s', color: '#777'},
  vehicle: {fontSize: '12@s', color: '#888'},
  priceBox: {alignItems: 'flex-end'},
  time: {fontSize: '12@s', color: '#777'},
  price: {fontSize: '16@s', fontWeight: '700', color: '#111'},
});

export default RideDetail;
