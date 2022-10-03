import { View, Text, Image, StatusBar } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { colors, IMAGES } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/auth/authSlice';
import { useEffect, useState } from 'react';

const ContactUs = props => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  useEffect(() => {
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isFocused]);

  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.SKY_BLUE}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          title={t('tech_support')}
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          props={props}
          userImage={details ? details.user_image : ""}
        />
        <View style={styles.container}>
          <View style={styles.cardOne}>
            <Image source={IMAGES.support} />
            <Text style={styles.versionText}> {t('version')} </Text>
            <Text style={styles.cardText}> {t('for_technical_issue')} </Text>
            <Text style={[styles.cardText, { paddingBottom: 35 }]}>
              {' '}
              {t('e_mail_to')} :
              <Text style={{ color: '#257FE6' }}> xxxxx@themotion.app</Text>{' '}
            </Text>
            <Text style={styles.cardText}> {t('contact_our_technical')}</Text>
            <Text style={[styles.cardText, { paddingBottom: 11 }]}>
              {t('support_these_channels')}
            </Text>
            <Text style={[styles.cardText, { paddingBottom: 10 }]}>
              {' '}
              {t('phone_no')} :{' '}
              <Text style={{ textDecorationLine: 'underline', color: '#257FE6' }}>
                +91-8851360214
              </Text>{' '}
            </Text>
            <Text style={styles.cardText}>
              {t('website')} :{' '}
              <Text style={{ color: '#257FE6' }}>https://themotion.app/</Text>{' '}
            </Text>
          </View>

          <View style={styles.cardTwo}>
            <View style={styles.actionBlock}>
              <Image source={IMAGES.invite} />
              <View>
                <Text style={styles.actionText}>{t('chat')}</Text>
              </View>
            </View>
            <View style={[styles.actionBlock]}>
              <Image source={IMAGES.invite} />
              <View>
                <Text style={styles.actionText}>{t('call')}</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ContactUs;
