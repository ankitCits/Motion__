import {
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { colors, fontFamily, IMAGES } from '../../../theme';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import MenuAccordion from '../../../components/atom/menu-accordion';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from '../../../components/atom/star-ratings';
import {
  removeAccessToken,
  removeFitbitToken,
  removeUserLocal,
} from '../../../storage';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setToken, setUser } from '../../../redux/auth/authSlice';

import AuthContext from '../../../context/authContext/AuthContext';
import { formattedDate } from '../../../utils/helper';
import { IMAGE_URL } from '../../../utils';
import { useIsFocused } from '@react-navigation/native';
import GoogleFit from 'react-native-google-fit';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const DATA = [
  {
    id: '1',
    title: 'transaction_history',
    icon: IMAGES.transaction,
    subItem: [
      // {
      //   id: '0',
      //   title: 'Steps Count',
      //   page: 'StepCount',
      // },
      {
        id: '1',
        title: 'step_history',
        page: 'StepHistory',
      },
      {
        id: '2',
        title: 'motion_history',
        page: 'MontHistory',
      },
      {
        id: '3',
        title: 'step_count',
        page: 'StepCountTrands',
      },
    ],
  },
  {
    id: '2',
    title: 'motion_watch',
    icon: IMAGES.watch,
    subItem: [
      {
        id: '1',
        title: 'watch_settings',
        // page: 'WatchSettings'
      },
      {
        id: '2',
        title: 'pair_watch',
        page: 'SelectWatch',
      },
      {
        id: '3',
        title: 'buy_watch',
        // page: 'BuyWatch'
      },
    ],
  },
  {
    id: '6',
    title: 'invite_friends',
    icon: IMAGES.invite,
    page: 'InviteFriends',
  },
  {
    id: '7',
    title: 'subscription_plan',
    icon: IMAGES.invite,
    // page: 'InviteFriends'
  },
  {
    id: '8',
    title: 'change_password',
    icon: IMAGES.invite,
    page: 'ChangePassword',
  },
];

const Profile = props => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const { userSignOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  useEffect(() => {
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isFocused]);

  const [openKey, setOpenKey] = useState();
  const handleToggle = key => {
    setOpenKey(openKey !== key ? key : null);
  };

  const onLogout = async () => {
    await removeUserLocal();
    await removeAccessToken();
    await removeFitbitToken();
    GoogleFit.disconnect();
    dispatch(setUser([]));
    dispatch(setToken([]));
    await userSignOut();
  };

  const renderItem = ({ item }) => {
    return (
      <MenuAccordion
        item={item}
        props={props}
        toggle={handleToggle}
        open={openKey === item.id}
      />
    );
  };

  const profileHeader = () => {
    return (
      <View>
        <Header
          title={t('profile')}
          props={props}
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          userImage={details ? details.user_image : ''}
        />
        <View style={styles.container}>
          <View style={styles.subContainer}>
            {details.user_image ? (
              <Image
                source={{
                  uri: `${IMAGE_URL}${details.user_image}`,
                }}
                style={styles.images}
              />
            ) : (
              <Image source={IMAGES.profile} />
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.profileTitleText}>{details.name}</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('EditProfile')}>
                <Image source={IMAGES.edit} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileText}>{details.email}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.profileText, { marginRight: 10 }]}>
                {t('member_since')} {formattedDate(details.created_at, 'MMM yyyy')}
              </Text>
              {/* <StarRating isEdit={false} size="4" /> */}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const footerComponent = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => onLogout()}>
          <Image source={IMAGES.logout} />
          <Text
            style={{
              marginLeft: 10,
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: fontFamily.AVENIR_HEAVY,
              fontWeight: 'bold',
            }}>
            {t('logout')}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.SKY_BLUE}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={profileHeader}
          ListFooterComponent={footerComponent}
        />
      </SafeAreaView>
    </>
  );
};

export default Profile;
