// import React, {createContext, useContext, useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {loginUser, logoutUser} from './auth';

// const AuthContext = createContext();

// export function AuthProvider({children}) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const role = await AsyncStorage.getItem('role');
//         const userData = await AsyncStorage.getItem('userData');

//         if (token && userData) {
//           setUser({token, role, ...JSON.parse(userData)});
//         }
//       } catch (error) {
//         console.error('Auto-login error', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkToken();
//   }, []);

//   //login in and store tokem + user info
//   const signIn = async credential => {
//     const data = await loginUser(credential);
//     const {token, user: userDetails} = data;
//     await AsyncStorage.setItem('token', token);
//     await AsyncStorage.setItem('role', userDetails.role);
//     await AsyncStorage.setItem('userData', JSON.stringify(userDetails));
//     setUser({token, ...userDetails});
//   };
//   //logout and remove token + user info
//   const signOut = async () => {
//     await logoutUser();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{user, signIn, signOut, loading}}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
