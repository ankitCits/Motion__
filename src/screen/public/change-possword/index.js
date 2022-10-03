import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import TrioButton from '../../../components/atom/trio-button';
import { validatePassword } from '../../../utils';
import { submitForgetPassword } from '../../../api/auth';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const ChangePassword = props => {
  console.log('page ChangePassword');
  const { t } = useTranslation();

  const [isEye, setEye] = useState(false);
  const [isEyeN, setEyeN] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setFormValues] = useState({
    newPwd: '',
    confirmNewPwd: '',
  });
  const setPassword = async () => {
    if (form.newPwd.trim() == '') {
      ToastAndroid.showWithGravity(
        t('new_password_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }

    const isValidPassword = validatePassword(form.newPwd);
    if (!isValidPassword) {
      ToastAndroid.showWithGravity(
        t('password_invalid'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }

    if (form.confirmNewPwd.trim() == '') {
      ToastAndroid.showWithGravity(
        t('confirm_new_password_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }

    if (form.newPwd != form.confirmNewPwd) {
      ToastAndroid.showWithGravity(
        t('password_must_be_same'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }

    try {
      setIsLoading(true);
      const response = await submitForgetPassword({
        email: props.route.params.email,
        otp: props.route.params.otp,
        new_password: form.newPwd,
        confirm_password: form.confirmNewPwd,
      });
      if (response.status == 200) {
        setIsLoading(false);
        props.navigation.navigate('Login');
      } else {
        ToastAndroid.showWithGravity(
          response.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.log('catch > error', error);
      setIsLoading(false);
      ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
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
              {t('change_password')}
            </Text>
            <Text style={styles.textDetail}>
              {t('change_password_note')}
            </Text>

            <InputView
              title={t('new_password')}
              secureTextEntry={!isEye}
              isSecure={true}
              isOpen={isEye}
              maxLength={14}
              value={form.newPwd}
              onClickEye={() => setEye(!isEye)}
              onChangeText={text => setFormValues({ ...form, newPwd: text })}
            />
            <InputView
              title={t('confirm_new_password')}
              secureTextEntry={!isEyeN}
              isSecure={true}
              isOpen={isEyeN}
              maxLength={14}
              value={form.confirmNewPwd}
              onClickEye={() => setEyeN(!isEyeN)}
              onChangeText={text =>
                setFormValues({ ...form, confirmNewPwd: text })
              }
            />
            <TrioButton
              btnTitle={t('done')}
              backPress={() => props.navigation.goBack()}
              nextPress={() => setPassword()}
              isLoading={isLoading}
              cancelPress={() => props.navigation.pop()}
            />

          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default ChangePassword;
