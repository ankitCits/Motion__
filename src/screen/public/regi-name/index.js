import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Platform,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { colors, commonStyle, IMAGES, } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import TrioButton from '../../../components/atom/trio-button';
import CheckBox from '@react-native-community/checkbox';
import { emailValidation, validatePassword } from '../../../utils';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const UserName = ({ navigation }) => {
  console.log('regi-name, UserName');
  const { t } = useTranslation();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    name: '',
    email: '',
    password: '',
    mobile: '',
    country_code: '',
    user_id: ''
  });
  const [isEye, setEye] = useState(false);
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
      tintColors={{ true: colors.CLR_PERSIAN_GREEN, false: colors.CLR_WHITE }}
      onValueChange={newValue => setToggleCheckBox(newValue)}
    />
  );

  const onSubmit = async () => {
    if (form.first_name.trim() == "") {
      ToastAndroid.showWithGravity(
        t('first_name_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    if (form.last_name.trim() == "") {
      ToastAndroid.showWithGravity(
        t('last_name_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    if (form.email.trim() == "") {
      ToastAndroid.showWithGravity(
        t('email_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    const isValidEmail = emailValidation(form.email);
    if (!isValidEmail) {
      ToastAndroid.showWithGravity(
        t('email_invalid'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    if (form.password.trim() == "") {
      ToastAndroid.showWithGravity(
        t('password_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    const isValidPassword = validatePassword(form.password);
    if (!isValidPassword) {
      ToastAndroid.showWithGravity(
        t('password_invalid'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    if (toggleCheckBox === false) {
      ToastAndroid.showWithGravity(
        t('agree_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    form.name = form.first_name + ' ' + form.last_name;
    navigation.navigate('MobileNumber', { data: form });
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

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            enabled
            keyboardVerticalOffset={10}
          >
            <ScrollView>

              <View style={styles.inputViewContainer}>
                <Text style={[commonStyle.titleText, styles.titleText]}>
                  {t('new_user_registration')}
                </Text>
                <InputView
                  title={t('first_name')}
                  value={form.first_name}
                  onChangeText={(text) => setForm({ ...form, first_name: text })}
                />
                <InputView
                  title={t('last_name')}
                  value={form.last_name}
                  onChangeText={text => setForm({ ...form, last_name: text })}
                />
                <InputView
                  title={t('email_address')}
                  value={form.email}
                  onChangeText={text => setForm({ ...form, email: text })}
                />
                <InputView
                  title={t('password')}
                  secureTextEntry={!isEye}
                  isSecure={true}
                  isOpen={isEye}
                  maxLength={14}
                  onClickEye={() => setEye(!isEye)}
                  value={form.password}
                  onChangeText={text => setForm({ ...form, password: text })}
                />

                <View style={{ flexDirection: 'row' }}>
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
                        navigation.navigate('TermsOfService');
                      }}>
                      {' '}
                      {t('terms_of_use')}{' '}
                    </Text>
                    {t('and')}
                    <Text
                      style={styles.primaryColorText}
                      onPress={() => {
                        navigation.navigate('PrivacyPolicy');
                      }}>
                      {' '}
                      {t('privacy_policy')}{' '}
                    </Text>
                  </Text>
                </View>
                <TrioButton
                  btnTitle={t('next')}
                  backPress={() => navigation.goBack()}
                  nextPress={() => onSubmit()}
                  cancelPress={() => navigation.goBack()}
                />
              </View>

            </ScrollView>
          </KeyboardAvoidingView>

        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default UserName;
