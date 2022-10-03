import React, { useEffect } from 'react';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AuthState from './context/authContext/authState';
import { requestUserPermission, notificationListener } from './utils/notificationServices';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
const index = () => {

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, [])


  return (
    <>
      <ActionSheetProvider>
        <Provider store={store}>
          <AuthState>
            <Navigation />
          </AuthState>
        </Provider>
      </ActionSheetProvider>
    </>
  );
};

export default index;
