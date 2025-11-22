// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// // import * as RNIap from 'react-native-iap';
// // import firestore from '@react-native-firebase/firestore';
// // import auth from '@react-native-firebase/auth';
// import Color from '@utils/Colors';
// import {fontFamily} from '@utils/Font';
// import HeaderBack from '@utils/HeaderBack';

// const productIds = ['monthly_premium', 'yearly_premium'];

// const SubscriptionScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     let purchaseUpdateSubscription;
//     let purchaseErrorSubscription;

//     // const init = async () => {
//     //   try {
//     //     await RNIap.initConnection();
//     //     const available = await RNIap.getSubscriptions(productIds);
//     //     setProducts(available);
//     //   } catch (err) {
//     //     console.warn(err);
//     //   } finally {
//     //     setLoading(false);
//     //   }

//     //   // Listen for purchase updates
//     //   purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
//     //     async purchase => {
//     //       const receipt = purchase.transactionReceipt;
//     //       if (receipt) {
//     //         await verifyAndStoreSubscription(purchase);
//     //         RNIap.finishTransaction(purchase, false);
//     //       }
//     //     },
//     //   );

//     //   // Listen for errors
//     //   purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
//     //     console.warn('Purchase Error', error);
//     //     Alert.alert('Error', 'Purchase failed. Please try again.');
//     //   });
//     // };

//     // init();

//     //     return () => {
//     //       if (purchaseUpdateSubscription) purchaseUpdateSubscription.remove();
//     //       if (purchaseErrorSubscription) purchaseErrorSubscription.remove();
//     //       RNIap.endConnection();
//     //     };
//   }, []);

//   //   const handleSubscribe = async productId => {
//   //     try {
//   //       setProcessing(true);
//   //       await RNIap.requestSubscription(productId);
//   //     } catch (err) {
//   //       console.warn(err);
//   //       Alert.alert('Purchase Failed', err.message);
//   //     } finally {
//   //       setProcessing(false);
//   //     }
//   //   };

//   // 🔥 Step 2 — Verify and Update Firestore
//   const verifyAndStoreSubscription = async purchase => {
//     try {
//       //   const user = auth().currentUser;
//       if (!user) throw new Error('User not authenticated');

//       // Optional: send receipt to your server or cloud function for real validation
//       // await fetch('https://your-cloud-function/verifySubscription', {
//       //   method: 'POST',
//       //   headers: {'Content-Type': 'application/json'},
//       //   body: JSON.stringify({receipt: purchase}),
//       // });

//       //   await firestore()
//       //     .collection('users')
//       //     .doc(user.uid)
//       //     .set(
//       //       {
//       //         isPremium: true,
//       //         subscription: {
//       //           productId: purchase.productId,
//       //           purchaseDate: purchase.transactionDate,
//       //         },
//       //       },
//       //       {merge: true},
//       //     );

//       Alert.alert('Subscription Activated', 'Enjoy your premium features!');
//     } catch (error) {
//       console.error('Verification error:', error);
//       Alert.alert('Error', 'Could not verify subscription.');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color={Color.blue} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <HeaderBack title="Subscription" />
//       <Text style={styles.heading}>Upgrade to Premium</Text>
//       <Text style={styles.subHeading}>
//         Get unlimited access to all premium features.
//       </Text>

//       {products.map(p => (
//         <TouchableOpacity
//           key={p.productId}
//           style={styles.planCard}
//           disabled={processing}
//           onPress={() => handleSubscribe(p.productId)}>
//           <Text style={styles.planTitle}>{p.title}</Text>
//           <Text style={styles.planDesc}>{p.description}</Text>
//           <Text style={styles.planPrice}>{p.localizedPrice}</Text>
//         </TouchableOpacity>
//       ))}

//       {processing && (
//         <ActivityIndicator color={Color.blue} style={{marginTop: 20}} />
//       )}
//     </View>
//   );
// };

// export default SubscriptionScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.white,
//     paddingHorizontal: 20,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 22,
//     fontFamily: fontFamily.bold,
//     color: Color.black,
//     textAlign: 'center',
//     marginTop: 15,
//   },
//   subHeading: {
//     textAlign: 'center',
//     color: '#555',
//     marginVertical: 10,
//     fontSize: 14,
//   },
//   planCard: {
//     backgroundColor: '#f2f4f8',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 15,
//   },
//   planTitle: {
//     fontSize: 16,
//     fontFamily: fontFamily.semiBold,
//     color: Color.black,
//   },
//   planDesc: {
//     fontSize: 13,
//     color: '#777',
//     marginVertical: 6,
//   },
//   planPrice: {
//     fontSize: 18,
//     fontFamily: fontFamily.bold,
//     color: Color.blue,
//   },
// });
//=======================================================================================================
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
// import * as RNIap from 'react-native-iap';
import Color from '@utils/Colors';
import {fontFamily} from '@utils/Font';
import HeaderBack from '@utils/HeaderBack';
import images from '@assets/images';

const productIds = ['monthly_premium', 'yearly_premium']; // must match Play Store / App Store

const SubscriptionScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   initIAP();
  //   return () => {
  //     RNIap.endConnection();
  //   };
  // }, []);

  const initIAP = async () => {
    // try {
    //   await RNIap.initConnection();
    //   const available = await RNIap.getSubscriptions(productIds);
    //   setProducts(available);
    // } catch (err) {
    //   console.warn(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSubscribe = async productId => {
    // try {
    //   const purchase = await RNIap.requestSubscription(productId);
    //   console.log('PURCHASE SUCCESS:', purchase);
    //   Alert.alert('Subscription Successful', 'Thank you for subscribing!');
    // } catch (err) {
    //   console.warn('Purchase error', err);
    //   Alert.alert('Purchase failed', err.message);
    // }
    navigation.navigate('CustomerListScreen');
  };

  // if (loading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color={Color.blue} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <HeaderBack title="Subscription" />
      <View style={styles.scrollContainer}>
        <Image source={images.subscription} style={styles.banner} />

        <Text style={styles.heading}>Upgrade to Premium</Text>
        <Text style={styles.subHeading}>
          Get unlimited access to all features and enjoy an ad-free experience.
        </Text>

        <View style={styles.cardContainer}>
          {products.map(p => (
            <TouchableOpacity
              key={p.productId}
              style={styles.planCard}
              onPress={() => handleSubscribe(p.productId)}>
              <Text style={styles.planTitle}>{p.title}</Text>
              <Text style={styles.planDesc}>{p.description}</Text>
              <Text style={styles.planPrice}>{p.localizedPrice}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footerText}>
          Payment will be charged to your Google Play / Apple ID account. You
          can cancel anytime from your subscription settings.
        </Text>
      </View>
      {/* subscribe now button */}
      <TouchableOpacity
        style={styles.SbscbBtnContainer}
        onPress={() => navigation.navigate('CustomerListScreen')}>
        <Text style={styles.SbscbBtn}>Subscribe Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    // paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 150,
    marginTop: 20,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: Color.black,
    textAlign: 'center',
    marginTop: 15,
  },
  subHeading: {
    textAlign: 'center',
    color: '#555',
    marginVertical: 10,
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  cardContainer: {
    marginTop: 25,
  },
  planCard: {
    backgroundColor: '#f2f4f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: Color.black,
  },
  planDesc: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: '#777',
    marginVertical: 6,
  },
  planPrice: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: Color.blue,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: Color.gray,
    marginTop: 20,
  },
  SbscbBtnContainer: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    backgroundColor: Color.blue,
    padding: 10,
    // paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SbscbBtn: {
    color: Color.white,
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
});
