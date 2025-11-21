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
  Alert,
  Modal,
  Pressable,
  ImageBackground,
  ScrollView,
} = require('react-native');
import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
//   import { ThemeContext } from '../context/themeContext';
//   import { lightTheme, darkTheme, otherTheme } from '../context/theme';
import {horizScale} from './Layout';
import GlobalCss from './GlobalCss';
import images from '../../assets/images';

function MyModal({modalVisible, setmodalVisible, OrderData, myOrderBook}) {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  // let themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const navigation = useNavigation();
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
        <View style={styles.mainpage_container_modal}>
          <View style={styles.mainpage_modal}>
            <ScrollView>
              <TouchableOpacity
                onPress={() => {
                  setmodalVisible(!modalVisible);
                }}>
                <View style={styles.logoContainerlogin}>
                  <Image style={styles.icon} source={images.close} />
                </View>
              </TouchableOpacity>
              {/* <StatusBar backgroundColor={'#355bb7'} /> */}
              <View style={styles.itemContainerHeader}>
                <Text style={styles.contendHeadertxt}>
                  {' '}
                  NEW BOOKING REQUEST
                </Text>
              </View>
              <View style={styles.rightSection2}>
                <View style={{...styles.itemContainer, marginTop: 15}}>
                  <View style={styles.leftSection}>
                    <Text style={styles.itemText}>No. Of Person :</Text>
                  </View>
                  <View style={styles.rightSection}>
                    <Text style={styles.itemText}>
                      {OrderData.no_of_persons}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemContainer}>
                  <View style={styles.leftSection}>
                    <Text style={styles.itemText}>Pick :</Text>
                  </View>
                  <View style={styles.rightSection}>
                    <Text style={styles.itemText}>
                      {OrderData.pickup_address}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemContainer}>
                  <View style={styles.leftSection}>
                    <Text style={styles.itemText}>Drop :</Text>
                  </View>
                  <View style={styles.rightSection}>
                    <Text style={styles.itemText}>
                      {OrderData.drop_address}
                    </Text>
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
                    <Text style={styles.itemText}>
                      {OrderData.booking_date}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemContainer}>
                  <View style={styles.rightSection}>
                    <Text style={styles.itemText}>Time: </Text>
                  </View>
                  <View style={styles.rightSection}>
                    <Text style={styles.itemText}>
                      {OrderData.booking_time}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.itemContainer_button}>
                <TouchableOpacity
                  style={GlobalCss.actionbutton}
                  onPress={() => myOrderBook(OrderData)}>
                  <Text style={GlobalCss.actionButtonText}>ACCEPT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    // setNotificationDelete(prevData =>
                    //   prevData.filter(item => item.ride_booking_id !== OrderData.ride_booking_id)
                    // );
                    setmodalVisible(!modalVisible);
                  }}
                  style={{
                    ...GlobalCss.actionbutton,
                    backgroundColor: '#FDD26A',
                  }}>
                  <Text
                    style={{...GlobalCss.actionButtonText, color: '#2B2412'}}>
                    REJECT
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
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

  logoContainerlogin: {
    flexDirection: 'row',
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
    marginTop: 270,
  },
  itemContainer: {
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: horizScale(20),
    borderBottomColor: 'darkgray',
    borderBottomWidth: 0.6,
  },
  rightSection2: {
    marginRight: horizScale(61),
  },
  itemContainer_button: {
    marginTop: 30,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizScale(20),
    marginBottom: 20,
  },
  itemContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    marginBottom: 0,
    borderBottomColor: '#C70039',
    borderBottomWidth: 2,
    marginHorizontal: 30,
  },
  contendHeadertxt: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 3,
    // justifyContent:'flex-start',
    // marginHorizontal:15,
    // paddingHorizontal:15,
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
    paddingHorizontal: 3,
  },
  itemText_tital: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '400',
    color: 'gray',
    marginTop: 15,
  },
});
export default MyModal;
