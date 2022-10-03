import { View, Text, StatusBar, ImageBackground, SafeAreaView, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import TrioButton from '../../../components/atom/trio-button';
import { forgotPasswordByEmail } from '../../../api/auth';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const Forgotpassword = ({ route, navigation }) => {
  const { t } = useTranslation();
  const otp = route.params.otp;
  const email = route.params.email;
  const [tempPass, setTempPassword] = useState(null);
  const [newOtp, setNewOtp] = useState(otp);
  const [isLoading, setIsLoading] = useState(false);

  const getOtp = () => {
    setIsLoading(true);
    if (newOtp == tempPass.trim()) {
      setIsLoading(false);
      navigation.navigate('ChangePassword', { otp: newOtp, email });
    } else {
      setIsLoading(false);
      ToastAndroid.showWithGravity(
        t('otp_invalid'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  }

  const onResendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await forgotPasswordByEmail({ email: email });
      console.log("onResendOTP > Response", response);
      setNewOtp(response.otp_code);
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
              {t('forgot_password_add')}
            </Text>
            <InputView
              title={t('temporary_password')}
              value={tempPass}
              onChangeText={text => setTempPassword(text)}
              secureTextEntry={true}
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
              nextPress={() => getOtp()}
              isLoading={isLoading}
              cancelPress={() => navigation.pop()}
            />

          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default Forgotpassword;
