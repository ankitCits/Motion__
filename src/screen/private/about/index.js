import { produceWithPatches } from 'immer';
import {
  Text,
  StatusBar,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { colors, commonStyle } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HTMLView from 'react-native-htmlview';
import { getCMSPage } from '../../../api/common';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/auth/authSlice';
import { useIsFocused } from '@react-navigation/native';

const About = props => {
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
      const response = await getCMSPage(1);
      console.log(response);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
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
      <SafeAreaView style={commonStyle.safeAreaView}>
        <Header
          title={t('about')}
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          props={props}
          showProfileIcon={props.showProfileIcon ?? true}
          userImage={details ? details.user_image : ""}
        />

        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>{t('about')}</Text>
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
export default About;
