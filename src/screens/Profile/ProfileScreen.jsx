// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Alert,
//   Modal,
//   ActivityIndicator,
// } from 'react-native';
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import HeaderBack from '@utils/HeaderBack';
// import Color from '@utils/Colors';
// import {getUserData} from '@utils/authService';
// import {updateProfile} from '@utils/authService';
// import {uploadProfileImage} from '@utils/authService';

// const ProfileScreen = () => {
//   const [isEditing, setIsEditing] = useState(true);
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     profilePicture: '',
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await getUserData();
//       if (response.status === '200') {
//         let data = {
//           firstName: response.data.first_name,
//           lastName: response.data.last_name,
//           email: response.data.email,
//           phone: response.data.mobile_no,
//           profilePicture: response.data.profile_image,
//         };

//         setProfile(data);
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (key, value) => {
//     setProfile({...profile, [key]: value});
//   };

//   const handlePasswordChange = (key, value) => {
//     setPasswordData({...passwordData, [key]: value});
//   };

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       const response = await updateProfile({
//         first_name: profile.firstName,
//         last_name: profile.lastName,
//         email: profile.email,
//         mobile_no: profile.phone,
//         profile_image: profile.profilePicture,
//       });
//       if (response.success) {
//         setIsEditing(false);
//         Alert.alert('Success', 'Profile updated successfully!');
//       } else {
//         Alert.alert('Error', 'Failed to update profile');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangePassword = async () => {
//     if (
//       !passwordData.currentPassword ||
//       !passwordData.newPassword ||
//       !passwordData.confirmPassword
//     ) {
//       Alert.alert('Error', 'Please fill all password fields.');
//       return;
//     }
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       Alert.alert('Error', 'New passwords do not match.');
//       return;
//     }
//     if (passwordData.newPassword.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long.');
//       return;
//     }

//     try {
//       const response = await updateProfile({
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword,
//       });
//       if (response.success) {
//         Alert.alert('Success', 'Password changed successfully!');
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: '',
//         });
//         setShowPasswordModal(false);
//       } else {
//         Alert.alert('Error', response.message || 'Failed to change password');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to change password');
//     }
//   };

//   const selectImage = type => {
//     const options = {
//       mediaType: 'photo',
//       quality: 0.8,
//       maxWidth: 500,
//       maxHeight: 500,
//     };

//     const callback = async response => {
//       if (response.assets && response.assets[0]) {
//         try {
//           const formData = new FormData();
//           formData.append('profilePicture', {
//             uri: response.assets[0].uri,
//             type: response.assets[0].type,
//             name: response.assets[0].fileName || 'profile.jpg',
//           });

//           const uploadResponse = await uploadProfileImage(formData);

//           if (uploadResponse.success) {
//             setProfile({uri: response.assets[0].uri});
//             Alert.alert('Success', 'Profile image updated!');
//           } else {
//             Alert.alert('Error', 'Failed to upload image');
//           }
//         } catch (error) {
//           Alert.alert('Error', 'Failed to upload image');
//         }
//       }
//       setShowImageModal(false);
//     };

//     if (type === 'camera') {
//       launchCamera(options, callback);
//     } else {
//       launchImageLibrary(options, callback);
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" />
//         <HeaderBack title="Profile" />
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color={Color.blue} />
//           <Text style={styles.loadingText}>Loading profile...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <HeaderBack title="Profile" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => setShowImageModal(true)}>
//             <Image
//               source={{uri: profile.profilePicture}}
//               style={styles.avatar}
//             />
//             <View style={styles.cameraIcon}>
//               <Text style={styles.cameraText}>📷</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
//             <Text style={styles.editText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>First Name</Text>
//           <TextInput
//             style={[styles.input, !isEditing && styles.disabledInput]}
//             value={profile.firstName}
//             editable={isEditing}
//             onChangeText={text => handleChange('firstName', text)}
//           />
//         </View>
//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>Last Name</Text>
//           <TextInput
//             style={[styles.input, !isEditing && styles.disabledInput]}
//             value={profile.lastName}
//             editable={isEditing}
//             onChangeText={text => handleChange('lastName', text)}
//           />
//         </View>

//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, !isEditing && styles.disabledInput]}
//             value={profile.email}
//             editable={isEditing}
//             onChangeText={text => handleChange('email', text)}
//             keyboardType="email-address"
//           />
//         </View>

//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>Phone</Text>
//           <TextInput
//             style={[styles.input, !isEditing && styles.disabledInput]}
//             value={profile.phone}
//             editable={isEditing}
//             onChangeText={text => handleChange('phone', text)}
//             keyboardType="phone-pad"
//           />
//         </View>
//         {isEditing && (
//           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity
//           style={styles.passwordButton}
//           onPress={() => setShowPasswordModal(true)}>
//           <Text style={styles.passwordButtonText}>Change Password</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <Modal
//         visible={showPasswordModal}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowPasswordModal(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Change Password</Text>

//             <View style={styles.fieldContainer}>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 value={passwordData.currentPassword}
//                 onChangeText={text =>
//                   handlePasswordChange('currentPassword', text)
//                 }
//                 secureTextEntry
//                 placeholder="Enter email address"
//               />
//             </View>

//             <View style={styles.fieldContainer}>
//               <Text style={styles.label}>New Password</Text>
//               <TextInput
//                 style={styles.input}
//                 value={passwordData.newPassword}
//                 onChangeText={text => handlePasswordChange('newPassword', text)}
//                 secureTextEntry
//                 placeholder="Enter new password"
//               />
//             </View>

//             <View style={styles.fieldContainer}>
//               <Text style={styles.label}>Confirm New Password</Text>
//               <TextInput
//                 style={styles.input}
//                 value={passwordData.confirmPassword}
//                 onChangeText={text =>
//                   handlePasswordChange('confirmPassword', text)
//                 }
//                 secureTextEntry
//                 placeholder="Confirm new password"
//               />
//             </View>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setShowPasswordModal(false)}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.confirmButton}
//                 onPress={handleChangePassword}>
//                 <Text style={styles.confirmButtonText}>Update</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         visible={showImageModal}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowImageModal(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.imageModalContent}>
//             <Text style={styles.modalTitle}>Change Profile Picture</Text>

//             <TouchableOpacity
//               style={styles.imageOption}
//               onPress={() => selectImage('camera')}>
//               <Text style={styles.imageOptionText}>Take Photo</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.imageOption}
//               onPress={() => selectImage('gallery')}>
//               <Text style={styles.imageOptionText}>Choose from Gallery</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setShowImageModal(false)}>
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#f8f9fa'},
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#666',
//   },
//   scrollContent: {padding: 20, paddingBottom: 40},
//   header: {
//     alignItems: 'center',
//     marginBottom: 30,
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   avatar: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     marginBottom: 15,
//     borderWidth: 3,
//     borderColor: Color.blue,
//   },
//   cameraIcon: {
//     position: 'absolute',
//     bottom: 15,
//     right: 0,
//     backgroundColor: Color.blue,
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   cameraText: {
//     fontSize: 12,
//   },
//   editText: {
//     color: Color.blue,
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   fieldContainer: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   label: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#e1e5e9',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#333',
//     backgroundColor: '#fff',
//   },
//   disabledInput: {
//     backgroundColor: '#f8f9fa',
//     color: '#666',
//   },
//   passwordButton: {
//     backgroundColor: '#fff',
//     borderWidth: 2,
//     borderColor: Color.blue,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   passwordButtonText: {
//     color: Color.blue,
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: Color.blue,
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//     shadowColor: Color.blue,
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 25,
//     width: '90%',
//     maxWidth: 400,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 25,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 25,
//     gap: 15,
//   },
//   cancelButton: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e1e5e9',
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   confirmButton: {
//     flex: 1,
//     backgroundColor: Color.blue,
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   imageModalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 25,
//     width: '85%',
//     maxWidth: 350,
//   },
//   imageOption: {
//     backgroundColor: '#f8f9fa',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#e1e5e9',
//   },
//   imageOptionText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
// });

// export default ProfileScreen;
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  TextInput,
} from 'react-native';
import HeaderBack from '@utils/HeaderBack';
import Color from '@utils/Colors';
const {height} = Dimensions.get('window');
const ProfileScreen = ({visible, close}) => {
  const [showNameSheet, setShowNameSheet] = useState(false);
  const slideAnim = new Animated.Value(height);

  const [firstName, setFirstName] = useState('Kuldeep');
  const [lastName, setLastName] = useState('');

  const profile = {
    name: 'Kuldeep',
    phone: '+91 6260175335',
    email: '',
    gender: 'Male',
    dob: '',
    memberSince: 'June 2023',
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  const onSave = () => {
    close();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title="Profile" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* NAME */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowNameSheet(true)}>
          <View>
            <Text style={styles.key}>Name</Text>
            <Text style={styles.value}>{profile.name}</Text>
          </View>
        </TouchableOpacity>

        {/* PHONE */}
        <View style={styles.row}>
          <View>
            <Text style={styles.key}>Phone Number</Text>
            <Text style={styles.value}>{profile.phone}</Text>
          </View>
        </View>

        {/* EMAIL */}
        <TouchableOpacity style={styles.row}>
          <View>
            <Text style={styles.key}>Email</Text>
            <Text style={styles.required}>Required</Text>
          </View>
        </TouchableOpacity>

        {/* GENDER */}
        <View style={styles.row}>
          <View>
            <Text style={styles.key}>Gender</Text>
            <Text style={styles.value}>{profile.gender}</Text>
          </View>
        </View>

        {/* DOB */}
        <TouchableOpacity style={styles.row}>
          <View>
            <Text style={styles.key}>Date of Birth</Text>
            <Text style={styles.required}>Required</Text>
          </View>
        </TouchableOpacity>

        {/* MEMBER SINCE */}
        <View style={styles.row}>
          <View>
            <Text style={styles.key}>Member Since</Text>
            <Text style={styles.value}>{profile.memberSince}</Text>
          </View>
        </View>

        {/* Emergency Contact */}
        <TouchableOpacity style={styles.row}>
          <View>
            <Text style={styles.key}>Emergency Contact</Text>
            <Text style={styles.required}>Required</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {/* Bottom Sheet for Name Editing */}
      {/* <EditNameSheet
        visible={showNameSheet}
        close={() => setShowNameSheet(false)}
      /> */}

      {/* Bottom Sheet for Name Editing */}
      <Modal transparent visible={showNameSheet} animationType="none">
        {/* Dim Background */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={close}
          style={styles.overlay}
        />

        <Animated.View
          style={[styles.sheet, {transform: [{translateY: slideAnim}]}]}>
          <View style={styles.dragIndicator} />

          <View style={styles.headerRow}>
            <Text style={styles.title}>Edit Name</Text>
            <TouchableOpacity onPress={close}>
              <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>
          </View>

          {/* FIRST NAME */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* LAST NAME */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {paddingHorizontal: 18},

  row: {
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 20,
  },

  key: {
    fontSize: 14,
    color: '#666',
  },

  value: {
    fontSize: 16,
    marginTop: 3,
    color: '#000',
  },

  required: {
    fontSize: 16,
    marginTop: 3,
    color: 'red',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000070',
  },

  sheet: {
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },

  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  closeIcon: {
    fontSize: 28,
    color: '#333',
  },

  inputWrapper: {
    marginVertical: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },

  saveBtn: {
    backgroundColor: Color.green || '#0a8a3a',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
