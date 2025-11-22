import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useNavigation } from '@react-navigation/native';

const NotificationHandler = () => {
  const navigation = useNavigation();

  const listenerInitialized = useRef(true);

  messaging().getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification opened app:', remoteMessage);
        navigation.navigate('Notification');
      }
    });


  messaging().onNotificationOpenedApp(remoteMessage => {
    //  Alert.alert("123456--OnNotiOpernApp");
    navigation.navigate('Notification', { data: remoteMessage.data });
    console.log('Notification opened app:', remoteMessage);
  });


  messaging().onMessage(async remoteMessage => {
    // Alert.alert("12345678--Onmessage");
    console.log("received in foreground ", remoteMessage);
    // navigation.navigate('Dashboard', { data: remoteMessage.data });
    PushNotification.localNotification({
      channelId: 'default_channel_id',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      bigText: remoteMessage.notification.body,

    });
    //navigation.navigate('Notification', { data: remoteMessage.data });
  });

  messaging().getDidOpenSettingsForNotification().then(remoteMessage => {
    // Alert.alert("123456789-GetDidOpenSettForNoti");
    //navigation.navigate('Notification', { data: remoteMessage.data });
    if (remoteMessage) {
      console.log('open in quit state', remoteMessage.notification,);
      //navigation.navigate('Notification', { data: remoteMessage.data });

    }
  })

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert("Notification Received", remoteMessage.notification.title);
  //     console.log("Received in foreground", remoteMessage);
  //     // Navigate to Dashboard page
  //     //navigation.navigate('Notification', { data: remoteMessage.data });
  //     // Show local notification
  //     PushNotification.localNotification({
  //       channelId: 'default_channel_id',
  //       title: remoteMessage.notification.title,
  //       message: remoteMessage.notification.body,
  //       bigText: remoteMessage.notification.body,
  //     });
  //   });
  //   return unsubscribe;
  // }, []);


  useEffect(() => {
    if (!listenerInitialized.current) {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        // console.log("Notification received in foreground:", remoteMessage);
        // Alert.alert("Notification Received", remoteMessage.notification?.title || "No Title");

        // Show local notification
        PushNotification.localNotification({
          channelId: 'default_channel_id',
          title: remoteMessage.notification?.title || "No Title",
          message: remoteMessage.notification?.body || "No Body",
          bigText: remoteMessage.notification?.body || "No Body",
        });
      });

      listenerInitialized.current = false; // Mark listener as initialized

      // Cleanup on unmount
      return unsubscribe;
    }
  }, []); // Empty dependency array ensures effect runs once


  return null; // This component does not render anything
};

export default NotificationHandler;