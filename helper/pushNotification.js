
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import Notification from '../src/Screens/Screens/Notification';

import { useNavigation } from '@react-navigation/native';


PushNotification.createChannel(
  {
    channelId: 'default_channel_id',
    channelName: 'Default Channel',
    channelDescription: 'A default channel',
    sound: 'default',
    importance: PushNotification.Importance.HIGH,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
}

const getFcmToken = async () => {

  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("New token generated", fcmToken);
      AsyncStorage.setItem('fcmToken', fcmToken);
    }
  } catch (error) {
  }

};

export const notificationListener = async () => {

  const navigation = useNavigation();


  messaging().onNotificationOpenedApp(remoteMessage => {
    navigation.navigate('Notification', { data: remoteMessage.data });
    console.log("open in background ", remoteMessage);
  });


  messaging().onMessage(async remoteMessage => {
    // navigation.navigate('Dashboard', { data: remoteMessage.data });
    PushNotification.localNotification({
      channelId: 'default_channel_id',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      bigText: remoteMessage.notification.body,

    });

  });

  messaging().getDidOpenSettingsForNotification().then(remoteMessage => {
    navigation.navigate('Dashboard', { data: remoteMessage.data });
    if (remoteMessage) {
      console.log('open in quit state', remoteMessage.notification,);
      //navigation.navigate('Notification', { data: remoteMessage.data });
    }
  })

}
