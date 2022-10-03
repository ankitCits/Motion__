import { View, Text, StatusBar, ImageBackground, SafeAreaView, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import TrioButton from '../../../components/atom/trio-button';
import { emailValidation } from '../../../utils';
import { forgotPasswordByEmail } from '../../../api/auth';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const ForgotEmail = ({ navigation }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getOtp = async () => {
    setIsLoading(true);
    if (email.trim() == "") {
      setIsLoading(false);
      ToastAndroid.showWithGravity(
        t('email_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    const isValidEmail = emailValidation(email);
    if (!isValidEmail) {
      setIsLoading(false);
      ToastAndroid.showWithGravity(
        t('email_invalid'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    try {
      const response = await forgotPasswordByEmail({ email: email });
      setIsLoading(false);
      navigation.navigate('ForgotPassword', { email, otp: response.otp_code });
    } catch (error) {
      console.log("catch > error", error);
      setIsLoading(false);
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  }
  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <SafeAreaView style={commonStyle.safeAreaView}>

        <ImageBackground
          style={commonStyle.backgroundView}
          source={IMAGES.background_lg_bg}>
          <View style={styles.inputViewContainer}>
            <Text style={[commonStyle.titleText, styles.titleText]}>
              {t('forgot_password')}
            </Text>
            <Text style={styles.textDetail}>
              {t('forgot_password_note')}
            </Text>
            <InputView title={t('email_address')}
              value={email}
              onChangeText={text => { setEmail(text) }}
            />
            <TrioButton
              btnTitle={t('next')}
              backPress={() => navigation.goBack()}
              nextPress={() => getOtp()}
              cancelPress={() => navigation.pop()}
              isLoading={isLoading}
            />

          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default ForgotEmail;
