import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import images from '../../assets/images';
import Color from './Colors';
// import {Color} from './Colors';

const BackButton = style => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backBtn}>
      <View style={styles.backArrowContainer}>
        <Image
          source={images.backArrow} // your back icon path
          style={styles.backArrow}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.gray,
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  backArrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  goBackTxt: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});
export default BackButton;
