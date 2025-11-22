const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert, Modal,
  Pressable,
  ImageBackground,
  ScrollView,
} = require('react-native');
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import { horizScale } from './Layout';
import GlobalCss from './GlobalCss';
import { PostAPI } from '../Services/Service';
import { flashM } from '../../helper/WSManager';
import Loader from './Loader';

function ShowBookingModel({ modalVisible, setmodalVisible, OrderData, onStatusUpdate,onStatusUpdate2}) {

  const navigation = useNavigation();
  const rideId = OrderData.ride_booking_id;

  const [currentStatus, setCurrentStatus] = useState(OrderData?.status || 'pending');
  const [loader, setLoader] = useState(false);

  // Use `useEffect` to update `currentStatus` when `OrderData` changes
  useEffect(() => {
    if (OrderData && OrderData.status) {
      setCurrentStatus(OrderData.status);
    }
  }, [OrderData]);

  
  const fetchBookingStatus = async (newStatus) => {
    const payload = {
      "ride_booking_id": rideId,
      "status": newStatus,
    }
    const res = await PostAPI('driver_booking/change_booking_status_by_driver', payload, navigation);
    if (res.status == '200') {
      setCurrentStatus(newStatus);
        onStatusUpdate();
      setLoader(false);
    // flashM(res.message, "success");
    } else if (res.status == '400') {
      setLoader(false);
      flashM(res.error[0], 'danger');
    } else {
      setLoader(false);
      flashM(res.error[0], 'danger');
    }
    setLoader(false);
  };

  const CancleOrderApi = async () => {
    const payload = {
      "ride_booking_id": rideId,
    }
    console.log('MYOrder_CancelId Payload...',payload);

    const res = await PostAPI('driver_booking/cancel_ride_by_driver', payload, navigation);
    if (res.status == '200') {
      console.log('MYOrder_CancelId Success...');
      setmodalVisible(!modalVisible);
      onStatusUpdate2(); 
      setLoader(false);
    } else if (res.status == '404') {
      console.log('MYOrder_CancelId Cancel 400...');
      setLoader(false);
    } else {
      setLoader(false);
      console.log('MYOrder_CancelId Cancel...');
    }
    setLoader(false);
  };

const renderButton = (status) => {
  switch (status) {
    case 'accepted':
      return (
        <TouchableOpacity style={GlobalCss.actionbutton} onPress={() => fetchBookingStatus('running')}>
          <Text style={GlobalCss.actionButtonText}>Start Ride</Text>
        </TouchableOpacity>
      );
    case 'running':
      return (
        <TouchableOpacity style={GlobalCss.actionbutton} onPress={() => fetchBookingStatus('completed')}>
          <Text style={GlobalCss.actionButtonText}>Running</Text>
        </TouchableOpacity>
      );
    case 'completed':
      return (
        <TouchableOpacity style={GlobalCss.actionbutton}>
          <Text style={GlobalCss.actionButtonText}>Ride Completed</Text>
        </TouchableOpacity>
      );
    case 'rejected':
      return (
        <TouchableOpacity style={GlobalCss.actionbutton}>
          <Text style={GlobalCss.actionButtonText}>Order Rejected</Text>
        </TouchableOpacity>
      );
    case 'cancelled':
      return (
        <TouchableOpacity style={GlobalCss.actionbutton}>
          <Text style={GlobalCss.actionButtonText}>Order Cancelled</Text>
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

  return (
    <View style={{ flex: 1 }}>
      <Loader loading={loader} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
        <View style={styles.mainpage_container_modal}>
          <ScrollView style={styles.mainpage_modal}>
            {/* <View style={}> */}
            <TouchableOpacity
              onPress={() => {
                setmodalVisible(!modalVisible);
              }}>
              <View style={styles.logoContainerlogin}>
                <Image
                  style={styles.icon}
                  source={require('../../assests/close.png')}
                />
              </View>
            </TouchableOpacity>
            {/* </View> */}
            {/* <StatusBar backgroundColor={'#355bb7'} /> */}
            <View style={styles.itemContainerHeader}>
              <Text style={styles.contendHeadertxt}>My Booking Details</Text>
            </View>
            <View style={{ marginBottom:20,   marginHorizontal:10,marginRight:50}}>
              <View style={{ ...styles.itemContainer, marginTop: 15 }}>
                <View style={styles.leftSection}>
                  <Text style={styles.itemText}>Name :</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.first_name} {OrderData.last_name}</Text>
                </View>
              </View>


              <View style={styles.itemContainer}>
                <View style={styles.leftSection}>
                  <Text style={styles.itemText}>Mobile No. :</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.mobile_no}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={styles.leftSection}>
                  <Text style={styles.itemText}>Email :</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.email}</Text>
                </View>
              </View>

              <View style={styles.itemContainer}>
                <View style={styles.leftSection}>
                  <Text style={styles.itemText}>From :</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.pickup_address}</Text>
                </View>
              </View>

              <View style={styles.itemContainer}>
                <View style={styles.leftSection}>
                  <Text style={styles.itemText}>To :</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.drop_address}</Text>
                </View>
              </View>

              <View style={styles.itemContainer}>
                <View style={styles.leftSection}>
                  <Text style={styles.itemText}>No. Of Persons :</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.no_of_persons}</Text>
                </View>
              </View>

              <View style={styles.itemContainer}>
                <View style={styles.leftSection}>
                  <Text style={styles.itemText}>Luggage :</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.luggage}</Text>
                </View>
              </View>


              <View style={styles.itemContainer}>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>Date: </Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.booking_date}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>Time: </Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.itemText}>{OrderData.booking_time}</Text>
                </View>
              </View>

              {/* <View style={{flexDirection:'row',justifyContent:'space-between',
              alignItems:'center' }}>
              <TouchableOpacity style={styles.itemContainer_button}
              onPress={() => navigation.navigate('MapScreen',{BookingId : OrderData.ride_booking_id})}>
                {renderButton(currentStatus)}
              </TouchableOpacity>
              {OrderData.status == 'running' ? '' :
              <TouchableOpacity style={GlobalCss.actionbutton_cancel}
              onPress={() => CancleOrderApi()}>
          <Text style={GlobalCss.actionButtonText}>Order Cancel</Text>
        </TouchableOpacity>
        }
              </View> */}

            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    flex: 1,
    resizeMode: 'cover',

  },
  container: {
    flex: 1,
    height: '100%',
    flexGrow: 1,
  },
  logoContainerlogin: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: 'flex-end',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  paint: {
    borderRadius: 30,
  },
  mainpage: {
    flex: 1,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    // marginTop: -10,
  },
  mainpage_container_modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  mainpage_modal: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    marginTop: 200,

  },
  itemContainer: {
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 15,
    borderBottomColor: 'darkgray',
    borderBottomWidth: 0.6,
  },

  itemContainer_button: {
    marginVertical: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizScale(20),
  },

  itemContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
    borderBottomColor: '#C70039',
    borderBottomWidth: 2,
    marginHorizontal:60
  },
  contendHeadertxt: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    paddingBottom: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 15,
    width: 15,
    marginLeft: 320,
    marginTop: 10,

  },
  itemText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#3B3B3B',
    fontWeight: '500',
  },
  itemText_tital: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '400',
    color: 'gray',
    marginTop: 15,
  },
});
export default ShowBookingModel;
