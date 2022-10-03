import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';
import { ActivityIndicator, View } from 'react-native';
import { navigationRef } from './rootNavigation';
import AuthContext from '../context/authContext/AuthContext';

const Navigation = () => {
  const authContext = useContext(AuthContext);
  const { userToken, isLoading } = authContext;
  return (
    <NavigationContainer ref={navigationRef}>
      {
        isLoading ?
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size="large" color="#741728" />
          </View>
          :
          userToken == null ? <PublicRoute /> : <PrivateRoute />
      }
    </NavigationContainer>
  );
};

export default Navigation;
