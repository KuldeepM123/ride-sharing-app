// import images from '@assets/images';
// import BackButton from '@utils/BackBtn';
// import Color from '@utils/Colors';
// import HeaderBack from '@utils/HeaderBack';
// // import {Color}from '@utils/Colors';
// import React from 'react';
// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import {ScaledSheet} from 'react-native-size-matters';

// const DriverDetail = ({route, navigation}) => {
//   const {driver, pickup, destination} = route.params || {};

//   return (
//     <View style={styles.container}>
//       {/* <BackButton /> */}
//       <View style={styles.backBtn}>
//         <HeaderBack title="Driver Detail" />
//       </View>
//       {/* Ride Details Bottom Sheet */}
//       <View style={styles.bottomSheet}>
//         {/* Driver Info */}
//         <View style={styles.driverRow}>
//           <Image
//             source={driver?.image || images.profileUser}
//             style={styles.avatar}
//           />
//           <View style={{flex: 1}}>
//             <Text style={styles.driverName}>
//               {driver?.name || 'Ramesh Kumar'}
//             </Text>
//             <View style={styles.ratingRow}>
//               <Text style={styles.rating}>{driver?.rating || 4.8}</Text>
//               <Text style={styles.vehicle}>
//                 {driver?.vehicle || 'Hero Splendor'}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.priceContainer}>
//             <Text style={styles.price}>{driver?.totalPrice || '₹ 50'}</Text>
//             <Text style={styles.eta}>{driver?.time || '2 min'}</Text>
//           </View>
//         </View>
//         {/* Driver Scedule */}
//         <View style={styles.driverDescription}>
//           <View style={styles.scheduleContainer}>
//             <Text style={styles.scheduleHeadinText}>
//               {driver.schedule || 'Mon - Fri'}
//             </Text>

//             <Text style={styles.scheduleText}>
//               Up - {driver?.schedule || ' 10:00 AM'}
//             </Text>
//             <Text style={styles.scheduleText}>
//               Dawn - {driver?.schedule || ' 7:00 AM'}
//             </Text>
//           </View>
//           <View style={styles.scheduleContainer}>
//             <Text style={styles.scheduleHeadinText}>
//               {driver.totalPrice || 'Prices'}
//             </Text>

//             <Text style={styles.scheduleText}>
//               Up - {driver?.upPrice || '₹ 30'}
//             </Text>
//             <Text style={styles.scheduleText}>
//               Dawn - {driver?.downPrice || '₹ 30'}
//             </Text>
//           </View>
//         </View>
//         {/* Mobile number */}
//         <View style={styles.mobileContainer}>
//           <Text style={styles.mobileText}>+91 9874563210</Text>
//           <View style={styles.callBtnContainer}>
//             <TouchableOpacity
//               style={styles.callBtn}
//               onPress={() => navigation.navigate('Call', {driver})}>
//               <Image source={images.phoneCall} style={styles.callIcon}></Image>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.callBtn}
//               onPress={() => navigation.navigate('Call', {driver})}>
//               <Image source={images.chat} style={styles.callIcon}></Image>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Ride Route Info */}
//       <View style={styles.routeContainer}>
//         <View style={styles.timeline}>
//           <View style={styles.dotPickup} />
//           <View style={styles.line} />
//           <View style={styles.dotDrop} />
//         </View>

//         <View style={{flex: 1}}>
//           <Text style={styles.locationLabel}>Pickup</Text>
//           <Text style={styles.locationText}>
//             {pickup || 'Neemuch RD. Gopalbari, Bari Sad'}
//           </Text>

//           <View style={{height: 15}} />

//           <Text style={styles.locationLabel}>Destination</Text>
//           <Text style={styles.locationText}>
//             {destination || 'Rajendra Nagar, Mandsaur'}
//           </Text>
//         </View>
//       </View>
//       {/* Confirm Button */}
//       <View style={styles.confirmBtnContainer}>
//         <TouchableOpacity
//           style={styles.confirmBtn}
//           onPress={() => navigation.navigate('RideDetail', {driver})}>
//           <Text style={styles.confirmText}>Request Ride</Text>
//         </TouchableOpacity>
//         {/* <TouchableOpacity
//           style={styles.confirmBtn}
//           onPress={() => navigation.navigate('RideTracking', {driver})}>
//           <Text style={styles.confirmText}>Chat</Text>
//         </TouchableOpacity> */}
//       </View>
//     </View>
//   );
// };

// const styles = ScaledSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   backBtn: {
//     // marginTop: '20@s',
//     // position: 'absolute',
//     // top: '50@s',
//     // left: '20@s',
//     // backgroundColor: '#fff',
//     // padding: '8@s',
//     // borderRadius: '50@s',
//     // elevation: 5,
//   },
//   bottomSheet: {
//     borderTopLeftRadius: '20@s',
//     borderTopRightRadius: '20@s',
//     marginHorizontal: '10@s',
//     padding: '20@s',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   driverRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: '20@s',
//   },
//   avatar: {
//     width: '55@s',
//     height: '55@s',
//     borderRadius: '27@s',
//     marginRight: '12@s',
//   },
//   driverName: {
//     fontSize: '16@s',
//     fontWeight: '600',
//     color: '#000',
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: '4@s',
//   },
//   rating: {
//     fontSize: '13@s',
//     color: '#555',
//     marginHorizontal: '3@s',
//   },
//   vehicle: {
//     fontSize: '13@s',
//     color: '#777',
//     marginLeft: '5@s',
//   },
//   priceContainer: {
//     // position: 'absolute',
//     // top: '20@s',
//     // right: '20@s',
//     alignItems: 'flex-end',
//   },
//   price: {
//     fontSize: '18@s',
//     fontWeight: '700',
//     color: '#000',
//   },
//   driverDescription: {
//     flexDirection: 'row',
//     // alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: '10@s',
//   },
//   scheduleHeadinText: {
//     fontSize: '14@s',
//     fontWeight: '500',
//     color: Color.black,
//     marginBottom: '5@s',
//   },
//   scheduleText: {
//     fontSize: '12@s',
//     fontWeight: '500',
//     color: Color.gray,
//   },
//   scheduleContainer: {
//     // alignItems: 'center',
//   },

//   eta: {
//     fontSize: '12@s',
//     color: '#555',
//   },
//   routeContainer: {
//     flexDirection: 'row',
//     marginTop: '20@s',
//   },
//   timeline: {
//     alignItems: 'center',
//     marginHorizontal: '15@s',
//     marginVertical: '15@s',
//   },
//   dotPickup: {
//     width: '12@s',
//     height: '12@s',
//     borderRadius: '6@s',
//     backgroundColor: 'green',
//   },
//   line: {
//     width: 2,
//     height: '25@s',
//     backgroundColor: '#ccc',
//   },
//   dotDrop: {
//     width: '12@s',
//     height: '12@s',
//     borderRadius: '6@s',
//     backgroundColor: 'red',
//   },
//   locationLabel: {
//     fontSize: '12@s',
//     color: '#777',
//   },
//   locationText: {
//     fontSize: '14@s',
//     fontWeight: '500',
//     color: '#000',
//   },
//   mobileContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: '10@s',
//   },
//   mobileText: {
//     fontSize: '14@s',
//     fontWeight: '500',
//     color: '#000',
//   },
//   callBtnContainer: {
//     flexDirection: 'row',
//     marginTop: '10@s',
//   },
//   callBtn: {
//     backgroundColor: '#fff',
//     borderRadius: '50@s',
//     padding: '10@s',
//     marginRight: '10@s',
//   },
//   callIcon: {
//     width: '20@s',
//     height: '20@s',
//   },
//   confirmBtnContainer: {
//     position: 'absolute',
//     bottom: 20,
//     left: '20@s',
//     right: '20@s',
//     // flexDirection: 'row',
//   },
//   confirmBtn: {
//     // width: '100%',
//     // backgroundColor: '#000',
//     // paddingHorizontal: '20@s',
//     // paddingVertical: '10@s',
//     // borderRadius: '50@s',
//     // alignItems: 'center',
//     // marginBottom: '10@s',
//     // justifyContent: 'center',
//     backgroundColor: Color.blue,
//     borderRadius: '25@s',
//     paddingVertical: '12@s',
//     marginHorizontal: '10@s',
//     // width: '45%',
//     alignItems: 'center',
//   },
//   confirmText: {
//     fontSize: '16@s',
//     fontWeight: '600',
//     color: Color.white,
//   },
// });

// export default DriverDetail;

// {
//   /* Map Section */
// }
// {
//   /* <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 23.1765,
//           longitude: 75.7885,
//           latitudeDelta: 0.02,
//           longitudeDelta: 0.02,
//         }}>
//         <Marker
//           coordinate={{latitude: 23.1765, longitude: 75.7885}}
//           title="Pickup"
//           pinColor="green"
//         />
//         <Marker
//           coordinate={{latitude: 23.1815, longitude: 75.7905}}
//           title="Destination"
//           pinColor="red"
//         />
//       </MapView> */
// }
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useRoute, useNavigation} from '@react-navigation/native';
import images from '@assets/images';
import Color from '@utils/Colors';
import HeaderBack from '@utils/HeaderBack';
import {fontFamily} from '@utils/Font';

const {height} = Dimensions.get('window');

const DriverDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {driver, pickup, destination} = route.params || {};

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.1765,
          longitude: 75.7885,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker
          coordinate={{latitude: 23.1765, longitude: 75.7885}}
          title="Pickup"
          pinColor="green"
        />
        <Marker
          coordinate={{latitude: 23.1815, longitude: 75.7905}}
          title="Destination"
          pinColor="red"
        />
      </MapView>

      {/* Back Header */}
      <View style={styles.headerContainer}>
        <HeaderBack title="Driver Detail" />
      </View>

      {/* Driver Info Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Driver Info */}
        <View style={styles.driverRow}>
          <Image
            source={driver?.image || images.profileUser}
            style={styles.avatar}
          />
          <View style={{flex: 1}}>
            <Text style={styles.driverName}>
              {driver?.name || 'Ramesh Kumar'}
            </Text>
            <View style={styles.ratingRow}>
              <Text style={styles.rating}>{driver?.rating || '4.8'} ★</Text>
              <Text style={styles.vehicle}>
                {driver?.vehicle || 'Hero Splendor'}
              </Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{driver?.totalPrice || '₹50'}</Text>
            <Text style={styles.eta}>{driver?.time || '2 min'}</Text>
          </View>
        </View>

        {/* Schedule and Price */}
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoTitle}>Schedule</Text>
            <Text style={styles.infoText}>
              Up: {driver?.upTime || '10:00 AM'}
            </Text>
            <Text style={styles.infoText}>
              Down: {driver?.downTime || '7:00 PM'}
            </Text>
          </View>

          <View>
            <Text style={styles.infoTitle}>Price</Text>
            <Text style={styles.infoText}>Up: {driver?.upPrice || '₹30'}</Text>
            <Text style={styles.infoText}>
              Down: {driver?.downPrice || '₹30'}
            </Text>
          </View>
        </View>

        {/* Contact Info */}
        {/* <View style={styles.contactRow}>
          <Text style={styles.contactText}>+91 9874563210</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Call', {driver})}>
              <Image source={images.phoneCall} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Chat', {driver})}>
              <Image source={images.chat} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Route Info */}
        <View style={styles.routeContainer}>
          <View style={styles.timeline}>
            <View style={styles.dotPickup} />
            <View style={styles.line} />
            <View style={styles.dotDrop} />
          </View>

          <View style={{flex: 1, marginTop: 8}}>
            <Text style={styles.locationLabel}>Pickup</Text>
            <Text style={styles.locationText}>
              {pickup || 'Neemuch Rd, Gopalbari, Bari Sad'}
            </Text>

            <View style={{height: 20}} />

            <Text style={styles.locationLabel}>Destination</Text>
            <Text style={styles.locationText}>
              {destination || 'Rajendra Nagar, Mandsaur'}
            </Text>
          </View>
        </View>

        {/* Confirm Button */}
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate('RideDetail', {driver})}>
        <Text style={styles.confirmText}>Request Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
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

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: 380,
    backgroundColor: Color.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    height: height * 0.55,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  driverName: {
    fontSize: 17,
    fontFamily: fontFamily.medium,
    color: Color.black,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  rating: {
    fontSize: 13,
    color: Color.gray,
    fontFamily: fontFamily.medium,
    marginRight: 8,
  },
  vehicle: {
    fontSize: 13,
    color: Color.gray,
    fontFamily: fontFamily.medium,
  },

  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    color: Color.black,
    fontFamily: fontFamily.bold,
  },
  eta: {
    fontSize: 12,
    color: Color.gray,
    fontFamily: fontFamily.medium,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },

  infoTitle: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: Color.black,
  },
  infoText: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: Color.gray,
    marginTop: 3,
  },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  contactText: {
    fontSize: 14,
    color: Color.black,
    fontFamily: fontFamily.medium,
  },

  contactButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#f1f3f5',
    borderRadius: 25,
    padding: 10,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },

  routeContainer: {
    flexDirection: 'row',
    // marginTop: 10,
    // marginBottom: 15,
  },

  timeline: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  dotPickup: {
    width: 20,
    height: 30,
    borderRadius: 10,
    backgroundColor: Color.green,
  },
  line: {
    width: 2,
    height: 35,
    backgroundColor: '#ccc',
  },
  dotDrop: {
    width: 20,
    height: 30,
    borderRadius: 10,
    backgroundColor: Color.red,
  },

  locationLabel: {
    fontSize: 12,
    color: Color.gray,
    fontFamily: fontFamily.medium,
    // marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: Color.black,
  },

  confirmButton: {
    backgroundColor: Color.blue,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    // marginTop: 10,
  },

  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.white,
  },
});

export default DriverDetail;
