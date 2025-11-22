import React, {createContext, useEffect, useState, useContext} from 'react';
// import {PostAPI} from '../src/Services/Service';
// Create the context
const NotificationContext = createContext();

// Create a provider component
const NotificationProvider = ({children}) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [location, setLocation] = useState('');

  const fetchNotificationCount = async (navigation = null) => {
    // try {
    //   const res = await PostAPI(
    //     'driver_booking/booking_notification_count',
    //     {},
    //     navigation,
    //   );
    //   if (res?.status == '200' && res.data?.[0]?.total) {
    //     setNotificationCount(res.data[0].total);
    //   } else if (res?.status === '401') {
    //     // console.log('Unauthorized: Notification count not fetched');
    //   }
    // } catch (error) {
    //   console.error('Failed to fetch notification count:', error);
    // }
  };

  useEffect(() => {
    const fetchNoti = async () => {
      await fetchNotificationCount(); // Fetch location
    };

    const intervalId = setInterval(() => {
      fetchNoti();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <NotificationContext.Provider
      value={{
        notificationCount,
        setNotificationCount,
        fetchNotificationCount,
        selectedPhoto,
        setSelectedPhoto,
        location,
        setLocation,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
export {NotificationProvider, NotificationContext};
