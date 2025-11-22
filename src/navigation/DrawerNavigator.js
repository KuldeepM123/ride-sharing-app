// import React from 'react';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
// } from '@react-navigation/drawer';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Color from '@utils/Colors';
// import {fontFamily} from '@utils/Font';
// import images from '@assets/images';

// const Drawer = createDrawerNavigator();
// const customerMenu = [
//   {label: 'Dashboard', icon: images.home, screen: 'HomeScreen'},
//   {label: 'My Route', icon: images.booking, screen: 'MyBookings'},
//   {label: 'Profile', icon: images.userprofile, screen: 'Profile'},
//   {label: 'Support', icon: images.support, screen: 'Support'},
//   {label: 'FAQ', icon: images.faq, screen: 'FAQs'},
//   {label: 'T&C', icon: images.TermsAndCondition, screen: 'TermsAndCondition'},
// ];
// const handleLogout = () => {
//   Alert.alert('Logout', 'Are you sure want to log out?', [
//     {text: 'Cancel', style: 'cancel'},
//     {
//       text: 'Logout',
//       style: 'destructive',
//       onPress: async () => {
//         try {
//           await AsyncStorage.removeItem('user_token');
//           navigation.dispatch(
//             navigation.closeDrawer(),
//             CommonActions.reset({
//               index: 0,
//               routes: [{name: 'Login'}],
//             }),
//           );
//           //close drawer
//         } catch (error) {
//           console.error('Logout failed:', error);
//           throw error;
//         }
//       },
//     },
//   ]);
// };
// const DrawerNavigator = () => {
//   return (
//     <View style={styles.container}>
//       {/* Scrollable menu */}
//       <DrawerContentScrollView contentContainerStyle={styles.scrollArea}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Customer Menu</Text>
//         </View>

//         {customerMenu.map((item, i) => (
//           <TouchableOpacity
//             key={i}
//             style={styles.item}
//             onPress={() => navigation.navigate(item.screen)}>
//             <Image source={item.icon} style={styles.icon} />
//             <Text style={styles.label}>{item.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </DrawerContentScrollView>

//       {/* Fixed footer logout button */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//           <Image source={images.logout} style={styles.logoutIcon} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.white,
//   },
//   scrollArea: {
//     paddingBottom: 80,
//   },
//   header: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: fontFamily.medium,
//     color: Color.black,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginRight: 12,
//     tintColor: Color.black,
//   },
//   label: {
//     fontFamily: fontFamily.regular,
//     fontSize: 16,
//     color: Color.gray,
//   },
//   footer: {
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   logoutBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoutIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//     tintColor: '#d9534f',
//   },
//   logoutText: {
//     color: '#d9534f',
//     fontSize: 16,
//     fontFamily: fontFamily.medium,
//   },
// });
// export default DrawerNavigator;
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Color from '@utils/Colors';
import {fontFamily} from '@utils/Font';
import images from '@assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ProfileStack, RideStack} from './StackNavigattor';
import SupportScreen from '@screens/Support';
import FAQScreen from '@screens/FAQs';
import TermsAndConditions from '@screens/TermsAndCondition';
import {useDispatch} from 'react-redux';
import {logout} from 'store/slices/authSlice';

const Drawer = createDrawerNavigator();

const customerMenu = [
  {label: 'Dashboard', icon: images.home, screen: 'RideStack'},
  {label: 'My Route', icon: images.booking, screen: 'MyBookings'},
  {label: 'Profile', icon: images.userprofile, screen: 'ProfileStack'},
  {label: 'Support', icon: images.support, screen: 'Support'},
  {label: 'FAQ', icon: images.faq, screen: 'FAQ'},
  {label: 'T&C', icon: images.TermsAndCondition, screen: 'TermsAndCondition'},
];

// 🔥 Custom Drawer Content
const CustomDrawer = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('user_token');
            dispatch(logout()); // 🔥 trigger RootNavigator switch
            props.navigation.closeDrawer();
          } catch (error) {
            console.error('Logout failed:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Menu */}
      <DrawerContentScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Customer Menu</Text>
        </View>

        {customerMenu.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.item}
            onPress={() => props.navigation.navigate(item.screen)}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      {/* Logout Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Image source={images.logout} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 🔥 Main Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="RideStack" component={RideStack} />
      <Drawer.Screen name="ProfileStack" component={ProfileStack} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="FAQScreen" component={FAQScreen} />
      <Drawer.Screen name="TermsAndCondition" component={TermsAndConditions} />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollArea: {
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: Color.black,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 12,
    tintColor: Color.black,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: Color.gray,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#d9534f',
  },
  logoutText: {
    color: '#d9534f',
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
});

export default DrawerNavigator;
