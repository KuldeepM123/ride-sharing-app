// let AsyncStorage;
// try {
//   AsyncStorage = require('@react-native-async-storage/async-storage').default;
// } catch (error) {
//   console.log('AsyncStorage module not available:', error);
//   AsyncStorage = null;
// }

// // Safe AsyncStorage wrapper utilities
// export const getAsyncStorageItem = async (key) => {
//   try {
//     if (AsyncStorage && typeof AsyncStorage.getItem === 'function') {
//       return await AsyncStorage.getItem(key);
//     }
//     return null;
//   } catch (error) {
//     console.log('AsyncStorage getItem error:', error);
//     return null;
//   }
// };

// export const setAsyncStorageItem = async (key, value) => {
//   try {
//     if (AsyncStorage && typeof AsyncStorage.setItem === 'function') {
//       return await AsyncStorage.setItem(key, value);
//     }
//     return null;
//   } catch (error) {
//     console.log('AsyncStorage setItem error:', error);
//     return null;
//   }
// };

// export const removeAsyncStorageItem = async (key) => {
//   try {
//     if (AsyncStorage && typeof AsyncStorage.removeItem === 'function') {
//       return await AsyncStorage.removeItem(key);
//     }
//     return null;
//   } catch (error) {
//     console.log('AsyncStorage removeItem error:', error);
//     return null;
//   }
// };

// export const clearAsyncStorage = async () => {
//   try {
//     if (AsyncStorage && typeof AsyncStorage.clear === 'function') {
//       return await AsyncStorage.clear();
//     }
//     return null;
//   } catch (error) {
//     console.log('AsyncStorage clear error:', error);
//     return null;
//   }
// };
