import React, { useState } from 'react';
import { View, Text, StatusBar, ImageBackground, SafeAreaView, ToastAndroid } from 'react-native';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import TrioButton from '../../../components/atom/trio-button';
import { userVerifyByMobile, resendOTP } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../../redux/auth/authSlice';
import { setAccessToken, setUserLocal } from '../../../storage';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const MobileOtp = ({ route, navigation }) => {
  console.log('regi-mobile-otp, MobileOTP', data);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = route.params.data;
  const [isLoading, setIsLoading] = useState(false);
  const [values, setOtpValues] = useState({
    otp: '',
  });

  const onResendOTP = async () => {
    setIsLoading(true);
    try {
      const param = {
        mobile: data.mobile,
        country_code: data.country_code
      };
      const response = await resendOTP(param);
      ToastAndroid.showWithGravity(
        t('otp_sent'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("onResendOTP > Errors", error);
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  const onVerifyOtp = async () => {
    setIsLoading(true);
    if (values.otp.trim() == '') {
      ToastAndroid.showWithGravity(
        ('otp_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      setIsLoading(false);
      return;
    }
    try {
      const param = {
        otp: values.otp,
        mobile: data.mobile,
        user_id: data.id,
        country_code: data.country_code
      };
      const response = await userVerifyByMobile(param);
      dispatch(setUser(response));
      dispatch(setToken(response));
      await setAccessToken(response.token);
      await setUserLocal(response.user);
      setIsLoading(false);
      navigation.navigate('UserVerification');
    } catch (error) {
      setIsLoading(false);
      console.log("verifyOtp > errors", error);
      ToastAndroid.showWithGravity(
        error.errors,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };
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
          source={IMAGES.background_un_bg}>
          <View style={styles.inputViewContainer}>
            <Text style={[commonStyle.titleText, styles.titleText]}>
              {t('new_user_registration')}
            </Text>
            <Text style={styles.textDetail}>
              {t('otp_note')}
            </Text>
            <InputView
              title={t('verification_code')}
              value={values.otp}
              onChangeText={(text) => setOtpValues({ ...values, otp: text })}
            />
            <View style={styles.resendContainer}>
              {!isLoading &&
                <Text
                  style={styles.resendText}
                  onPress={() => onResendOTP()}
                >
                  {t('resend_code')}
                </Text>
              }
              {isLoading &&
                <Text
                  style={styles.resendText}
                >
                  {t('loading')}
                </Text>
              }
            </View>

            <TrioButton
              btnTitle={t('next')}
              backPress={() => navigation.goBack()}
              nextPress={() => onVerifyOtp()}
              isLoading={isLoading}
              cancelPress={() => props.navigation.goBack()}
            />

          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default MobileOtp;
