import React, { useRef, useState, useEffect } from 'react';
import { Image, AppState } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IMAGES, colors } from '../theme';
import Dashboard from '../screen/private/dashboard';
import Profile from '../screen/private/profile';
import Settings from '../screen/private/settings';
import Wallet from '../screen/private/wallet';
import StepHistory from '../screen/private/step-history';
import InviteFriends from '../screen/private/invite-friends';
import PrivacyPolicy from '../screen/private/privacy-policy';
import TermsOfService from '../screen/private/terms-of-service';
import MontHistory from '../screen/private/mont-history';
import Notifications from '../screen/private/notifications';
import PairWatch from '../screen/private/pair-watch';
import HelpSupport from '../screen/private/help-support';
import PairWatchCharge from '../screen/private/pair-watch-charge';
import PairWatchOtp from '../screen/private/pair-watch-otp';
import PairWatchSelect from '../screen/private/pair-watch-otp';
import PairWatchSuccessfully from '../screen/private/pair-watch-successfully';
import SelectWatch from '../screen/private/regi-select-watch';
import Redeem from '../screen/private/redeem';
import RedeemStatus from '../screen/private/redeem-status';
import ContactUs from '../screen/private/contact-us';
import AppSettings from '../screen/private/app-settings';
import EditProfile from '../screen/private/edit-profile';
import ChangePassword from '../screen/private/change-password';
import StepCount from '../screen/private/step-count';
import About from '../screen/private/about';
import HelpSupportDetail from '../screen/private/help-support/help-support-detail';
import StepCountTrands from '../screen/private/stepCountTrands';
import ConnectStep from '../screen/private/connect-your-steps';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const stackArray = [
  {
    name: 'Profile',
    component: props => <Profile {...props} />,
  },
  {
    name: 'Settings',
    component: props => <Settings {...props} />,
  },
  {
    name: 'StepHistory',
    component: props => <StepHistory {...props} />,
  },
  {
    name: 'InviteFriends',
    component: props => <InviteFriends {...props} />,
  },
  {
    name: 'PrivacyPolicy',
    component: props => <PrivacyPolicy {...props} />,
  },
  {
    name: 'TermsOfService',
    component: props => <TermsOfService {...props} />,
  },
  {
    name: 'MontHistory',
    component: props => <MontHistory {...props} />,
  },
  {
    name: 'Notifications',
    component: props => <Notifications {...props} />,
  },
  {
    name: 'PairWatch',
    component: props => <PairWatch {...props} />,
  },
  {
    name: 'PairWatchCharge',
    component: props => <PairWatchCharge {...props} />,
  },
  {
    name: 'PairWatchOtp',
    component: props => <PairWatchOtp {...props} />,
  },
  {
    name: 'PairWatchSelect',
    component: props => <PairWatchSelect {...props} />,
  },
  {
    name: 'PairWatchSuccessfully',
    component: props => <PairWatchSuccessfully {...props} />,
  },
  {
    name: 'Redeem',
    component: props => <Redeem {...props} />,
  },
  {
    name: 'RedeemStatus',
    component: props => <RedeemStatus {...props} />,
  },
  {
    name: 'ContactUs',
    component: props => <ContactUs {...props} />,
  },
  {
    name: 'HelpSupport',
    component: props => <HelpSupport {...props} />,
  },
  {
    name: 'HelpSupportDetail',
    component: props => <HelpSupportDetail {...props} />,
  },
  {
    name: 'AppSettings',
    component: props => <AppSettings {...props} />,
  },
  {
    name: 'EditProfile',
    component: props => <EditProfile {...props} />,
  },
  {
    name: 'SelectWatch',
    component: props => <SelectWatch {...props} />,
  },
  {
    name: 'ChangePassword',
    component: props => <ChangePassword {...props} />
  },
  {
    name: 'StepCount',
    component: props => <StepCount {...props} />
  },
  {
    name: 'StepCountTrands',
    component: props => <StepCountTrands {...props} />
  },
  {
    name: 'ConnectStep',
    component: props => <ConnectStep {...props} />
  },
  {
    name: 'About',
    component: props => <About {...props} />
  },
];

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.CLR_BLACK,
      },
    }}>
    <Tab.Screen
      name='Wallet'
      component={Wallet}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => (
          <Image source={IMAGES.wallet} style={{ tintColor: color }} />
        ),
      }}
    />
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => (
          <Image source={IMAGES.motion_ai} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => (
          <Image source={IMAGES.setting} style={{ tintColor: color }} />
        ),
      }}
    />
  </Tab.Navigator>
);
import { useSelector } from 'react-redux';
import { getInitialRoute } from '../redux/auth/authSlice';

const PrivateRoute = props => {
  const navigation = useNavigation();
  const routeDetails = useSelector(getInitialRoute);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        setTimeout(() => {
          // console.log("App has come to the foreground!", routeDetails);
          if (routeDetails === 'Notifications') {
            navigation.navigate(routeDetails);
            return;
          }
        }, 400);
      }

      appState.current = nextAppState;
      // console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  console.log('PrivateRoute');
  return (
    <Stack.Navigator initialRouteName={'Dashboard'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      {stackArray.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            options={{ headerShown: false }}>
            {p => <item.component {...p} {...props} />}

          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};

export default PrivateRoute;
