import React from 'react';
import {View, Text, StyleSheet, Linking, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import images from '@assets/images';
import HeaderBack from '@utils/HeaderBack';

const Support = () => {
  // Function to handle email link
  const handleEmail = () => {
    Linking.openURL('mailto:support@example.com');
  };

  // Function to handle phone call
  const handlePhoneCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  return (
    <View style={styles.container}>
      <HeaderBack title="Help & Support" />

      <View style={{marginHorizontal: 20}}>
        <Image
          style={{
            height: 100,
            width: 100,
            marginBottom: 20,
            alignSelf: 'center',
          }}
          source={images.support}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Image style={{height: 22, width: 22}} source={images.phoneCall} />
          <Text
            style={{
              fontSize: 16,
              color: '#3B3B3B',
              fontWeight: '500',
              marginLeft: 17,
            }}>
            Call us : 613-859-9119
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Image style={{height: 26, width: 26}} source={images.message} />
          <Text
            style={{
              fontSize: 16,
              color: '#3B3B3B',
              fontWeight: '500',
              marginLeft: 10,
            }}>
            {' '}
            Email : info@marketingblendz.com
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            paddingVertical: 5,
          }}>
          <Image style={{height: 26, width: 26}} source={images.location} />
          <Text
            style={{
              fontSize: 16,
              color: '#3B3B3B',
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Find us on the Map : 1109 Rocky Harbour Crescent, Ottawa, ON K1V 1V4
          </Text>
        </View>

        <View style={styles.container2}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          <Text style={styles.faqItem}>1. How do I book a taxi?</Text>
          <Text style={styles.faqItem}>
            2. Can I change or cancel my booking?
          </Text>
          <Text style={styles.faqItem}>
            3. How can I contact customer support?
          </Text>
          <Text style={styles.faqItem}>
            4. What payment methods are accepted?
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    // marginBottom: 10,
    textAlign: 'center',
  },
  contactSection: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  contactDetail: {
    fontSize: 16,
    color: '#1870E5',
  },
  container2: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#3B3B3B',
  },
  faqItem: {
    fontSize: 16,
    marginVertical: 5,
    color: '#3B3B3B',
  },
});

export default Support;
