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
} = require('react-native');
import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {horizScale} from './Layout';
import GlobalCss from './GlobalCss';
import images from '../../assets/images';

function DefaultModel({
  modalVisible,
  setmodalVisible,
  type,
  messageTitle,
  messageData,
}) {
  const navigation = useNavigation();

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
            <TouchableOpacity
              onPress={() => {
                setmodalVisible(!modalVisible);
              }}>
              <View style={styles.logoContainerlogin}>
                <Image style={styles.icon} source={images.close} />
              </View>
            </TouchableOpacity>
            {/* <StatusBar backgroundColor={'#355bb7'} /> */}
            {type == 'Success' ? (
              <View>
                <View style={styles.itemContainerHeader}>
                  <Text style={styles.contendHeadertxt}>{messageTitle}</Text>
                </View>

                <View style={styles.itemContainer}>
                  <View style={{width: '100%'}}>
                    <View style={styles.iconContainer}>
                      <Image source={images.like} style={styles.icon2} />
                    </View>
                    <View style={{alignSelf: 'center', width: '100%'}}>
                      <Text style={styles.textBooking}>{messageData}</Text>
                    </View>
                  </View>

                  <View style={styles.smallContainer}>
                    <TouchableOpacity
                      style={styles.smallButton}
                      onPress={() => navigation.navigate('MapScreen')}>
                      <Text style={styles.smallButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.itemContainerHeader}>
                  <Text style={styles.contendHeadertxt1}>{messageTitle}</Text>
                </View>
                <View>
                  <View>
                    <View style={styles.iconContainer2}>
                      <Image source={images.balloon} style={styles.icon2} />
                    </View>
                    <View>
                      <Text style={styles.textBooking}>{messageData}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
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
  container: {
    flex: 1,
    height: '100%',
    flexGrow: 1,
  },
  logoContainerlogin: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
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
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    marginTop: '80%',
    marginBottom: '35%',
  },
  itemContainer: {
    paddingVertical: 17,
    borderRadius: 5,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizScale(20),
    borderBottomColor: 'darkgray',
    borderBottomWidth: 0.6,
  },
  itemContainer_button: {
    marginTop: 35,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizScale(20),
  },
  itemContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  contendHeadertxt: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
    borderBottomColor: 'green',
    borderBottomWidth: 3,
    paddingBottom: 15,
  },
  contendHeadertxt1: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
    borderBottomColor: 'red',
    borderBottomWidth: 3,
    paddingBottom: 15,
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
  textBooking: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  icon2: {
    height: 45,
    width: 45,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer2: {
    // alignItems:"center",
    marginLeft: 150,
  },
  smallContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  smallButton: {
    width: 100,
    padding: 5,
    backgroundColor: '#FDD26A',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  smallButtonText: {
    color: 'black',
    fontSize: 16,
  },
});
export default DefaultModel;
