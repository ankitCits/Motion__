import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { colors } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HTMLView from 'react-native-htmlview';
import { getCMSPage } from '../../../api/common';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/auth/authSlice';

const TermsOfService = props => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const isFocused = useIsFocused();
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  useEffect(() => {
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isFocused]);

  const onGetCMSPage = async () => {
    setIsLoading(true);
    try {
      // Process
      const response = await getCMSPage(3);
      console.log(response);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      ToastAndroid.showWithGravity(
        error.errors ?? 'Invalid Token',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  useEffect(() => {
    onGetCMSPage();
  }, []);

  return (
    <>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={colors.SKY_BLUE}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          title={t('term_of_service')}
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          props={props}
          showProfileIcon={props.showProfileIcon ?? true}
          userImage={details ? details.user_image : ""}
        />
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>{t('term_of_service')}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.CLR_PERSIAN_GREEN} />
          ) : (
            <View style={styles.container}>
              {data && <HTMLView value={data.detail} stylesheet={styles} />}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default TermsOfService;
