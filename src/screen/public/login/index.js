import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { colors, commonStyle, IMAGES, screenHeight, screenWidth } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import Button from '../../../components/atom/button';
import { singIn } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../../redux/auth/authSlice';
import { setAccessToken, setUserLocal } from '../../../storage';
import AuthContext from '../../../context/authContext/AuthContext';
import CheckBox from '@react-native-community/checkbox';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const Login = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onAuthentication } = useContext(AuthContext);
  const [isEye, setEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    // email: 'ankit7890patel@gmail.com',
    // password: '121212@Aa'
    // email: 'sunilgupta4417@gmail.com',
    // password: 'Admin@123'
  });

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const isIOS = Platform.OS === 'ios';

  const iosCheckbox = () => (
    <CheckBox
      disabled={false}
      value={toggleCheckBox}
      tintColors={'#9E663C'}
      onCheckColor={'#6F763F'}
      onFillColor={'#4DABEC'}
      onTintColor={'#F4DCF8'}
      onValueChange={newValue => setToggleCheckBox(newValue)}
    />
  );

  const androidCheckbox = () => (
    <CheckBox
      disabled={false}
      value={toggleCheckBox}
      tintColors={{ true: colors.CLR_PERSIAN_GREEN, false: '#fff' }}
      onValueChange={newValue => setToggleCheckBox(newValue)}
    />
  );

  const onSubmit = async () => {
    setIsLoading(true);
    try {

      if (formValues.email.trim() == '') {
        ToastAndroid.showWithGravity(
          t('email_mandatory'),
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        setIsLoading(false);
        return;
      }
      if (formValues.password.trim() == '') {
        ToastAndroid.showWithGravity(
          t('password_mandatory'),
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        setIsLoading(false);
        return;
      }

      if (toggleCheckBox === false) {
        ToastAndroid.showWithGravity(
          t('agree_required'),
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        setIsLoading(false);
        return;
      }

      // Process Login
      const response = await singIn(formValues);
      console.log(response);
      dispatch(setUser(response));
      dispatch(setToken(response));
      await setUserLocal(response.user);
      await setAccessToken(response.token);
      await onAuthentication(response.token);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
            <Text style={[commonStyle.titleText, styles.titleText]}>Login</Text>
            <InputView
              title={t('email_address')}
              // isLoginEmail={true}
              value={formValues.email}
              onChangeText={text => setFormValues({ ...formValues, email: text })}
            />
            <InputView
              title={t('password')}
              secureTextEntry={!isEye}
              isSecure={true}
              isOpen={isEye}
              maxLength={14}
              value={formValues.password}
              onClickEye={() => setEye(!isEye)}
              onChangeText={text =>
                setFormValues({ ...formValues, password: text })
              }
            />
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ForgotEmail')}
            >
              <Text
                style={{
                  color: colors.CLR_WHITE,
                  fontSize: 14,
                  alignSelf: 'flex-end',
                  marginRight: screenWidth(10)
                }}>
                {t('forgot_password')}?
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate('UserName')}>
                <Text
                  style={{
                    color: colors.CLR_WHITE,
                    fontSize: 16,
                    alignSelf: 'center',
                    marginLeft: screenWidth(5)
                  }}>
                  {t('create_account')}
                </Text>
              </TouchableWithoutFeedback>
              <Button
                title={t('login')}
                titleColor={colors.CLR_WHITE}
                buttonBackColor={colors.CLR_PERSIAN_GREEN}
                onPress={() => onSubmit()}
                isLoading={isLoading}
              />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: screenHeight(4) }}>
              {isIOS ? iosCheckbox() : androidCheckbox()}

              <Text
                style={{
                  width: '75%',
                  color: colors.CLR_WHITE,
                  paddingLeft: 10,
                }}>
                {t('i_agree')}
                <Text
                  style={styles.primaryColorText}
                  onPress={() => {
                    props.navigation.navigate('TermsOfService');
                  }}>
                  {' '}
                  {t('terms_of_use')}{' '}
                </Text>
                {t('and')}
                <Text
                  style={styles.primaryColorText}
                  onPress={() => {
                    props.navigation.navigate('PrivacyPolicy');
                  }}>
                  {' '}
                  {t('privacy_policy')}
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default Login;
