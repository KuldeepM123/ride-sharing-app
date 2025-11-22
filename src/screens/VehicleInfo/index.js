import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import images from '@assets/images';
import Color from '@utils/Colors';
import HeaderBack from '@utils/HeaderBack';
import {fontFamily} from '@utils/Font';

const VehicleInformation = ({navigation}) => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Registration Card',
      description: 'Vehicle Registration Certificate',
    },
    {id: 2, title: 'Insurance', description: 'Vehicle insurance document'},
    {
      id: 3,
      title: 'Pollution Certificate',
      description: 'Emission compliance document',
    },
    {
      id: 4,
      title: 'Driver License',
      description: 'Proof of driver authorization',
    },
  ]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleUploadPress = doc => {
    setSelectedDoc(doc);
    setModalVisible(true);
  };

  const handlePickImage = async type => {
    const options = {mediaType: 'photo', quality: 0.8};
    try {
      const result =
        type === 'camera'
          ? await launchCamera(options)
          : await launchImageLibrary(options);

      if (!result.didCancel && result.assets && selectedDoc) {
        setDocuments(prev =>
          prev.map(doc =>
            doc.id === selectedDoc.id
              ? {...doc, image: result.assets[0].uri}
              : doc,
          ),
        );
      }
    } catch (e) {
      console.log('Image Picker Error:', e);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack title="Vehicle Information" />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {documents.map(doc => (
          <View key={doc.id} style={styles.card}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.title}>{doc.title}</Text>
              <Text style={styles.subtitle}>{doc.description}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.uploadButton,
                doc.image && {backgroundColor: Color.blue},
              ]}
              onPress={() => handleUploadPress(doc)}>
              <Image
                source={doc.image ? images.uploadDone : images.uploadInactive}
                style={[styles.uploadIcon, doc.image && {tintColor: '#fff'}]}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* <Text style={styles.note}>* These fields are required</Text> */}
      </ScrollView>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('SubscriptionScreen')}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>

      {/* Upload Option Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select upload option</Text>

            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => handlePickImage('camera')}>
              <Image source={images.camera} style={styles.optionIcon} />
              <Text style={styles.optionText}>Take a photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => handlePickImage('gallery')}>
              <Image source={images.gallery} style={styles.optionIcon} />
              <Text style={styles.optionText}>Choose from gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.containerBgColor,
  },
  scrollContainer: {
    marginTop: 10,
    marginBottom: 80,
  },
  card: {
    backgroundColor: Color.white,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    marginVertical: 8,
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    color: Color.black,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: Color.gray,
    marginTop: 3,
  },
  uploadButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E9ECF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
  note: {
    color: Color.red,
    fontSize: 12,
    fontFamily: fontFamily.medium,
    marginTop: 10,
    marginLeft: 5,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: Color.blue,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextText: {
    color: Color.white,
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Color.black,
    textAlign: 'center',
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionIcon: {
    width: 22,
    height: 22,
    tintColor: '#333',
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: Color.gray,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: Color.white,
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    color: Color.red,
    fontSize: 15,
    fontFamily: fontFamily.medium,
  },
});

export default VehicleInformation;
