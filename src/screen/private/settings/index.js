import {
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {IMAGES, colors} from '../../../theme';
import {styles} from './styles';
import Header from '../../../components/atom/header';
import MenuAccordion from '../../../components/atom/menu-accordion';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import AuthContext from '../../../context/authContext/AuthContext';
import {
  removeAccessToken,
  removeFitbitToken,
  removeUserLocal,
} from '../../../storage';
import {getUser, setToken, setUser} from '../../../redux/auth/authSlice';
import ToggleSwitch from 'toggle-switch-react-native';
import googleFit from 'react-native-google-fit';
import '../../../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
 
const DATA = [
  {
    id: '1',
    title: 'profile',
    icon: IMAGES.person,
    page: 'Profile',
  },

  {
    id: '2',
    title: 'appearance',
    icon: IMAGES.eyeOutline,
  },
  {
    id: '3',
    title: 'app_settings',
    icon: IMAGES.settings,
    page: 'AppSettings',
  },
  {
    id: '4',
    title: 'help_support',
    icon: IMAGES.headPhone,
    page: 'HelpSupport',
  },
  {
    id: '5',
    title: 'about',
    icon: IMAGES.about,
    page: 'About',
  },
  {
    id: '7',
    title: 'term_of_service',
    icon: IMAGES.terms,
    page: 'TermsOfService',
  },
  {
    id: '8',
    title: 'contact_us',
    icon: IMAGES.contact,
    page: 'ContactUs',
  },
  {
    id: '9',
    title: 'privacy_policy',
    icon: IMAGES.policy,
    page: 'PrivacyPolicy',
  },
];

const Settings = props => {
  const {t} = useTranslation();
  const {userSignOut} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  useEffect(() => {
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isFocused]);
  const dispatch = useDispatch();
  const onLogout = async () => {
    await removeUserLocal();
    await removeAccessToken();
    await removeFitbitToken();
    googleFit.disconnect();
    dispatch(setUser([]));
    dispatch(setToken([]));
    await userSignOut();
  };

  const [openKey, setOpenKey] = useState();
  const handleToggle = key => {
    setOpenKey(openKey !== key ? key : null);
  };

  const renderItem = ({item}) => {
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
          title={t('settings')}
          props={props}
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          userImage={details ? details.user_image : ""}
        />
      </View>
    );
  };

  const footerComponent = () => {
    const [notification, setNotification] = useState(true);
    const toggleNotification = () => {
      // rest of code
      setNotification(notification => !notification);
    };
    return (
      <>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image source={IMAGES.notification} />
            <Text style={styles.itemTitle}>{t('notification')}</Text>
            <View style={styles.toggleContainer}>
              <ToggleSwitch
                isOn={notification}
                onColor={colors.SKY_BLUE}
                offColor={colors.CLR_GRAY_TEXT}
                size="small"
                onToggle={() => toggleNotification()}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.versionText}>
          <Text>{t('app_version')} 3.5.1</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => onLogout()}>
          <Image source={IMAGES.logout} />
          <Text style={{marginLeft: 10, color: '#fff', fontWeight: 'bold'}}>
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
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={profileHeader}
          ListFooterComponent={footerComponent}
        />
      </SafeAreaView>
    </>
  );
};

export default Settings;
