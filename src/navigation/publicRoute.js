import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingPage from '../screen/public/landing';
import Login from '../screen/public/login';
import UserName from '../screen/public/regi-name';
import ForgotEmail from '../screen/public/forgot-email';
import ForgotPassword from '../screen/public/forgot-password';
import ChangePassword from '../screen/public/change-possword';
import BluetoothEnable from '../screen/public/regi-bluetooth';
import LocationEnable from '../screen/public/regi-location';
import MobileNumber from '../screen/public/regi-mobile';
import MobileOtp from '../screen/public/regi-mobile-otp';
import EmailId from '../screen/public/regi-email';
import EmailNotic from '../screen/public/regi-email-notic';
import EmailOtp from '../screen/public/regi-email-otp';
import UserVerification from '../screen/public/regi-verification';
import NotificationEnable from '../screen/public/regi-notification';
import WatchInstruction from '../screen/public/regi-watch-instruction';
import WatchChargeNotic from '../screen/public/regi-pair-watch-notic';
import WatchOtp from '../screen/public/regi-watch-otp';
import SelectWatch from '../screen/public/regi-select-watch';
import PairSuccessfully from '../screen/public/regi-pair-suceesfully';
import QuickTour from '../screen/public/regi-quick-tour';

import PrivacyPolicy from '../screen/private/privacy-policy';
import TermsOfService from '../screen/private/terms-of-service';
import SplashScreen from '../screen/public/splash-screen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const stackArray = [
  {
    name: 'Splash',
    component: props => <SplashScreen {...props} />,
  },
  {
    name: 'Landing',
    component: props => <LandingPage {...props} />,
  },
  {
    name: 'Login',
    component: props => <Login {...props} />,
  },
  {
    name: 'UserName',
    component: props => <UserName {...props} />,
  },
  {
    name: 'ForgotEmail',
    component: props => <ForgotEmail {...props} />,
  },
  {
    name: 'ForgotPassword',
    component: props => <ForgotPassword {...props} />,
  },
  {
    name: 'ChangePassword',
    component: props => <ChangePassword {...props} />,
  },
  {
    name: 'BluetoothEnable',
    component: props => <BluetoothEnable {...props} />,
  },
  {
    name: 'LocationEnable',
    component: props => <LocationEnable {...props} />,
  },
  {
    name: 'MobileNumber',
    component: props => <MobileNumber {...props} />,
  },
  {
    name: 'MobileOtp',
    component: props => <MobileOtp {...props} />,
  },
  {
    name: 'EmailId',
    component: props => <EmailId {...props} />,
  },
  {
    name: 'EmailNotic',
    component: props => <EmailNotic {...props} />,
  },
  {
    name: 'EmailOtp',
    component: props => <EmailOtp {...props} />,
  },
  {
    name: 'UserVerification',
    component: props => <UserVerification {...props} />,
  },
  {
    name: 'NotificationEnable',
    component: props => <NotificationEnable {...props} />,
  },
  {
    name: 'WatchInstruction',
    component: props => <WatchInstruction {...props} />,
  },
  {
    name: 'WatchChargeNotic',
    component: props => <WatchChargeNotic {...props} />,
  },
  {
    name: 'WatchOtp',
    component: props => <WatchOtp {...props} />,
  },
  {
    name: 'SelectWatch',
    component: props => <SelectWatch {...props} />,
  },
  {
    name: 'PairSuccessfully',
    component: props => <PairSuccessfully {...props} />,
  },
  {
    name: 'QuickTour',
    component: props => <QuickTour {...props} />,
  },
  // Private Apps
  {
    name: 'PrivacyPolicy',
    component: props => <PrivacyPolicy {...props} showProfileIcon={false} />,
  },
  {
    name: 'TermsOfService',
    component: props => <TermsOfService {...props} showProfileIcon={false} />,
  },
];

const PublicRoute = props => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Splash"
      screenOptions={{ animation: 'slide_from_right', headerShown: false }}
    >
      {stackArray.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            screenOptions={{ headerShown: false }}
            options={{ headerShown: false }}>
            {p => <item.component {...p} {...props} />}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};

export default PublicRoute;
