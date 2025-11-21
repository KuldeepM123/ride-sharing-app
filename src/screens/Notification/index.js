import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Loader from '../../../../../../utils/Loader';
import {horizScale} from '../../../../../../utils/Layout';
import SmallHeader from '../../../../../../utils/SmallHeader';
import {PostAPI} from '../../../../../../Services/Service';
import GlobalCss from '../../../../../../utils/GlobalCss';
import Modal from '../../../../../../utils/MyModal';
import {flashM} from '../../../../../../../helper/WSManager';
import SuccessModel from '../../../../../../utils/DefaultModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {NotificationContext} from '../../../../../../../context/NotificationContext';
import {useFocusEffect} from '@react-navigation/native';

const Notification = ({navigation}) => {
  const {fetchNotificationCount} = useContext(NotificationContext);
  const [loader, setLoader] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [bookingData, setbookingData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [messageType, setmessageType] = useState('');
  const [messageTitle, setmessageTitle] = useState('');
  const [messageData, setmessageData] = useState('');
  const [reloadData, setReloadData] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleModal = data => {
    setbookingData(data);
    setModalVisible(!modalVisible);
  };
  const handleSuccess = () => {
    setSuccessVisible(!successVisible);
  };

  const myOrderBookConfirmation = data => {
    Alert.alert(
      'Booking Confirmation',
      'Are you sure you want to book this ride?',
      [
        {
          text: 'No',
          style: 'no',
        },
        {
          text: 'Yes',
          onPress: () => {
            confirmBooking(data);
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const confirmBooking = async data => {
    const payloaddata = {
      ride_booking_id: data.ride_booking_id,
      // creater_id: data.creater_id,
    };

    setLoader(true);
    const res = await PostAPI(
      'driver_booking/accept_booking',
      payloaddata,
      navigation,
    );
    if (res.status == '200') {
      setLoader(false);
      setModalVisible(false);
      // setSuccessVisible(true);
      setmessageType('Success');
      setmessageTitle('Successfull Booking');
      setmessageData(res.message);
      fetchNotificationCount();
      setReloadData(prev => prev + 1);
      navigation.navigate('MapScreen', {BookingId: data.ride_booking_id});
    } else if (res.status == '401') {
      setModalVisible(false);
      flashM(res.message, 'danger');
      setReloadData(prev => prev + 1);
      setLoader(false);
    } else if (res.status == '400') {
      setLoader(false);
      setModalVisible(false);
      setSuccessVisible(true);
      setmessageType('Error');
      setmessageTitle('Oops!');
      setmessageData(res.message);
      setReloadData(prev => prev + 1);
    } else {
      setLoader(false);
      setModalVisible(false);
      setReloadData(prev => prev + 1);
      flashM(res.message, 'danger');
    }
    setLoader(false);
  };

  const fetchNotification = async (pageNum = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);

    const res = await PostAPI(
      'driver_booking/booking_notification_list',
      {
        page: pageNum,
        limit: 5,
      },
      navigation,
    );

    setLoading(false);

    if (res.status == '200') {
      // console.log('MyNOtiBokkinsg...',res.data);
      if (res.data.length === 0) {
        setHasMore(false);
      }
      if (pageNum === 1) {
        setNotificationData(res.data);
      } else {
        setNotificationData(prevData => [...prevData, ...res.data]);
      }
      setLoader(false);
    } else {
      setLoader(false);
      flashM(res.message || res.error, 'danger');
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {
      setReloadData(prev => prev + 1);
    });
    return unsubscribe;
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(page + 1);
    }
  };

  const onScroll = ({nativeEvent}) => {
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const distanceFromBottom =
      contentSize.height - (contentOffset.y + layoutMeasurement.height);

    if (distanceFromBottom < 100) {
      // Trigger when user is 100px from bottom
      handleLoadMore();
    }
  };
  const handleDeleteNotification = updatedData => {
    setNotificationData(updatedData); // ✅ Update notificationData in parent
  };

  useEffect(() => {
    fetchNotification(page);
  }, [page, reloadData]);

  useFocusEffect(
    React.useCallback(() => {
      setPage(1);
      setNotificationData([]);
      fetchNotification(page);
      setHasMore(true);
      fetchNotificationCount();
    }, [fetchNotificationCount]),
  );

  const renderNotificationItem = ({item}) => (
    <View key={item.ride_booking_id} style={styles.newsItem}>
      <Text style={styles.newsTitle}>Notification for Ride</Text>
      <View style={styles.newsContent}>
        <Text style={styles.newsText}>
          Pick: <Text style={styles.newsText2}>{item.pickup_address}</Text>
        </Text>
      </View>
      <View style={styles.newsContent}>
        <Text style={styles.newsText}>
          Drop: <Text style={styles.newsText2}>{item.drop_address}</Text>
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignContent: 'center'}}>
        <View style={styles.newsContent}>
          <Text style={styles.newsText}>
            No of persons:{' '}
            <Text style={styles.newsText2}>{item.no_of_persons}</Text>
          </Text>
        </View>
        <View style={styles.newsContent}>
          <Text style={styles.newsText}>
            Luggage: <Text style={styles.newsText2}>{item.luggage}</Text>
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignContent: 'center'}}>
        <View style={styles.newsContent}>
          <Text style={styles.newsText}>
            Date: <Text style={styles.newsText2}>{item.booking_date}</Text>
          </Text>
        </View>
        <View style={styles.newsContent}>
          <Text style={styles.newsText}>
            Time: <Text style={styles.newsText2}>{item.booking_time}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.newsContent}>
        <Text style={styles.newsText}>
          Status:{' '}
          <Text style={styles.newsText2}>
            {item.status === 'pending' ? 'Book Now' : ''}
          </Text>
        </Text>
      </View>

      <View style={styles.smallContainer}>
        <TouchableOpacity
          style={GlobalCss.smallButton}
          onPress={() => handleModal(item)}>
          <Text style={GlobalCss.smallButtonText}>See Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SmallHeader title="Notification" />
      <ScrollView onScroll={onScroll}>
        <Loader loading={loader} />

        <FlatList
          data={notificationData}
          renderItem={renderNotificationItem}
          keyExtractor={item => String(item.ride_booking_id)}
          ListEmptyComponent={() => (
            <View style={styles.newsItem}>
              <Text style={styles.newsTitle}>No data found</Text>
            </View>
          )}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator size="large" />}
        />

        <Modal
          modalVisible={modalVisible}
          setmodalVisible={handleModal}
          OrderData={bookingData}
          myOrderBook={myOrderBookConfirmation}
        />

        <SuccessModel
          modalVisible={successVisible}
          setmodalVisible={handleSuccess}
          type={messageType}
          messageTitle={messageTitle}
          messageData={messageData}
          // setNotificationDelete={handleDeleteNotification}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'black',
    fontSize: 25,
    padding: 10,
  },
  newsItem: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: horizScale(10),
    marginTop: 15,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 2,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#454545',
  },
  newsText: {
    fontSize: 16,
    color: '#454545',
    fontWeight: 'bold',
    marginTop: 5,
  },
  newsText3: {
    fontSize: 14,
    color: '#555',
    backgroundColor: 'red',
  },
  smallContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  newsText2: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },
});

export default Notification;
