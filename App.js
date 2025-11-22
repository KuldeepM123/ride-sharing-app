import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {NotificationProvider} from './context/NotificationContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <>
      <NotificationProvider>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </NotificationProvider>
    </>
  );
};

export default App;
