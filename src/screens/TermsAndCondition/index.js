// import images from '@assets/images';
// import Color from '@utils/Colors';
// import {horizScale} from '@utils/Layout';
// import React, {useState} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,
//   ImageBackground,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
//   Image,
// } from 'react-native';

// const TermsAndCondition = ({navigation}) => {
//   return (
//     <View style={{flex: 1}}>
//       <ImageBackground source={images.taxi} style={styles.back}>
//         {/* <StatusBar backgroundColor={Color.blue} barStyle="light-content" /> */}
//         <View style={{flexDirection: 'row', padding: 10}}>
//           <TouchableOpacity
//             style={[
//               Platform.OS == 'ios' ? styles.main_menu_ios : styles.main_menu,
//             ]}
//             onPress={() => navigation.goBack()}>
//             <Image style={styles.menu} source={images.backArrow} />
//           </TouchableOpacity>
//           <Text style={styles.headerTxt}>Terms & Conditions</Text>
//         </View>

//         <ScrollView style={styles.container}>
//           <Text style={styles.headerTxtMain}>
//             App : Refers to Lift Karade, including all associated services and
//             features.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             User : Refers to anyone using the app, including both riders and
//             drivers.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Service : Refers to the transportation services provided through the
//             app.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Driver : Refers to independent contractors who provide rides via the
//             app.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Rider : Refers to customers booking rides using the app
//           </Text>
//           <Text style={styles.title}>Terms of Use:</Text>

//           <Text style={styles.headerTxtMain}>
//             Users must provide accurate and up-to-date personal information
//             during the registration process.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Riders are responsible for arriving at the designated pickup
//             location at the scheduled time.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Drivers must comply with all local traffic regulations and maintain
//             a valid driver’s license and insurance.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Users agree not to use the app for any unlawful activities or
//             purposes.
//           </Text>
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.white,
//     padding: 15,
//     marginTop: 5,
//   },
//   headerTxt: {
//     fontSize: 20,
//     marginTop: 57,
//     color: Color.white,
//     marginLeft: 70,
//   },
//   headerTxtMain: {
//     fontSize: 14,
//     marginTop: 5,
//     color: Color.black,
//     paddingVertical: 2,
//   },

//   menu: {
//     height: horizScale(24),
//     width: horizScale(24),
//     tintColor: Color.black,
//   },
//   main_menu: {
//     backgroundColor: Color.white,
//     width: horizScale(40),
//     height: horizScale(40),
//     borderRadius: 20,
//     padding: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//   },
//   main_menu_ios: {
//     backgroundColor: Color.white,
//     width: horizScale(40),
//     height: horizScale(40),
//     borderRadius: 20,
//     padding: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 6,
//     marginTop: 50,
//   },
//   back: {
//     height: '100%',
//     color: 'fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '500',
//     marginTop: 10,
//     color: '#333',
//   },
// });

// export default TermsAndCondition;
// import images from '@assets/images';
// import Color from '@utils/Colors';
// import {horizScale} from '@utils/Layout';
// import React, {useState} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,
//   ImageBackground,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
//   Image,
// } from 'react-native';

// const TermsAndCondition = ({navigation}) => {
//   return (
//     <View style={{flex: 1}}>
//       <ImageBackground source={images.taxi} style={styles.back}>
//         <StatusBar backgroundColor={'#45708D'} barStyle="light-content" />
//         <View style={{flexDirection: 'row', padding: 10}}>
//           <TouchableOpacity
//             style={[
//               Platform.OS == 'ios' ? styles.main_menu_ios : styles.main_menu,
//             ]}
//             onPress={() => navigation.goBack()}>
//             <Image style={styles.menu} source={images.backArrow} />
//           </TouchableOpacity>
//           <Text style={styles.headerTxt}>Terms & Conditions</Text>
//         </View>

//         <ScrollView style={styles.container}>
//           <Text style={styles.headerTxtMain}>
//             App : Refers to Lift Karade, including all associated services and
//             features.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             User : Refers to anyone using the app, including both riders and
//             drivers.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Service : Refers to the transportation services provided through the
//             app.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Driver : Refers to independent contractors who provide rides via the
//             app.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Rider : Refers to customers booking rides using the app
//           </Text>
//           <Text style={styles.title}>Terms of Use:</Text>

//           <Text style={styles.headerTxtMain}>
//             Users must provide accurate and up-to-date personal information
//             during the registration process.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Riders are responsible for arriving at the designated pickup
//             location at the scheduled time.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Drivers must comply with all local traffic regulations and maintain
//             a valid driver’s license and insurance.
//           </Text>
//           <Text style={styles.headerTxtMain}>
//             Users agree not to use the app for any unlawful activities or
//             purposes.
//           </Text>
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.white,
//     padding: 15,
//     marginTop: 5,
//   },
//   headerTxt: {
//     fontSize: 20,
//     marginTop: 57,
//     color: Color.white,
//     marginLeft: 70,
//   },
//   headerTxtMain: {
//     fontSize: 14,
//     marginTop: 5,
//     color: Color.black,
//     paddingVertical: 2,
//   },

//   menu: {
//     height: horizScale(24),
//     width: horizScale(24),
//     tintColor: Color.black,
//   },
//   main_menu: {
//     backgroundColor: Color.white,
//     width: horizScale(40),
//     height: horizScale(40),
//     borderRadius: 20,
//     padding: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//   },
//   main_menu_ios: {
//     backgroundColor: Color.white,
//     width: horizScale(40),
//     height: horizScale(40),
//     borderRadius: 20,
//     padding: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 6,
//     marginTop: 50,
//   },
//   back: {
//     height: '100%',
//     color: 'fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '500',
//     marginTop: 10,
//     color: '#333',
//   },
// });

// export default TermsAndCondition;
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderBack from '@utils/HeaderBack';
import Color from '@utils/Colors';
import {fontFamily} from '@utils/Font';

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderBack title="Terms & Conditions" />
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Terms and Conditions</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to LiftKaraDe! By using our app, you agree to comply with and
          be bound by the following terms and conditions.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of the App</Text>
        <Text style={styles.text}>
          You agree to use this app only for lawful purposes. You may not use it
          in a way that could damage, disable, or interfere with our services.
        </Text>

        <Text style={styles.sectionTitle}>3. Data & Privacy</Text>
        <Text style={styles.text}>
          We value your privacy. Any personal information you provide will be
          handled in accordance with our Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>4. Liability</Text>
        <Text style={styles.text}>
          LiftKaraDe is provided “as is.” We are not liable for any damages
          arising from your use of this app.
        </Text>

        <Text style={styles.sectionTitle}>5. Updates</Text>
        <Text style={styles.text}>
          We may modify these terms at any time. Continued use of the app after
          changes indicates acceptance.
        </Text>

        <Text style={styles.footer}>Last updated: November 2025</Text>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>I Agree</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    // padding: 20,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    marginBottom: 15,
    textAlign: 'center',
    color: Color.black,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    marginTop: 20,
    color: Color.black,
  },
  text: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    lineHeight: 22,
    color: Color.gray,
    marginTop: 5,
  },
  footer: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: Color.gray,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: Color.blue,
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: Color.white,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
});

export default TermsAndConditions;
