import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  ToastAndroid,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { commonStyle, IMAGES, screenHeight } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import TrioButton from '../../../components/atom/trio-button';
import { singUp } from '../../../api/auth';
import { validatePhone } from '../../../utils';
import { getCountries } from '../../../api/common';
import { getFCMToken } from '../../../storage';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const MobileNumber = ({ route, navigation }) => {
  console.log('regi-mobile, MobileNumber');
  const { t } = useTranslation();
  const formData = route.params.data;
  const [form, setForm] = useState({
    country_code: '',
    mobile: '',
    country: ''
  });
  const [countryList, setCountryList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countryPicker, setCountryPicker] = useState(false);
  const [country, setCountry] = useState(null);

  const onGetCountries = async () => {
    setIsLoading(true);
    try {
      const response = await getCountries();
      setCountryList(response.country_codes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('onGetCountries errors', error);
      ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };

  const onOpenModal = async () => {
    setCountryPicker(true);
    await onGetCountries();
  }

  const onSubmit = async () => {
    if (form.country_code == '') {
      ToastAndroid.showWithGravity(
        t('country_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    if (form.mobile == '') {
      ToastAndroid.showWithGravity(
        t('mobile_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    const isMobileValid = validatePhone(form.mobile);
    if (!isMobileValid) {
      ToastAndroid.showWithGravity(
        t('mobile_invalid'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    formData.country_code = form.country_code;
    formData.mobile = form.mobile;
    formData.fcm_token = await getFCMToken() ?? '9716949401';

    setIsLoading(true);
    try {
      const response = await singUp(formData);
      console.log('reg-mobile response', response);
      setIsLoading(false);
      navigation.navigate('MobileOtp', { data: response.user });
    } catch (error) {
      console.log('reg-mobile response errors', error);
      ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
      setIsLoading(false);
    }
  };

  const searchCountry = (text) => {
    if (text.trim() != '') {
      const country = countryList.filter(item => item.country.toLowerCase().includes(text.toLowerCase()) || item.code.includes(text));
      setCountry(country);
    } else {
      setCountry('');
    }
  };

  const setSelectedCountry = item => {
    setForm({ country: item.country, country_code: item.code });
    setCountry('');
    setCountryPicker(false);
  }

  const onCloseModal = () => {
    setCountryPicker(false);
    setCountry(null);
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
          source={IMAGES.background_un_bg}>

          <View style={styles.inputViewContainer}>
            <Text style={[commonStyle.titleText, styles.titleText]}>
              {t('new_user_registration')}
            </Text>
            <Text style={styles.textDetail}>
              {t('enter_mobile_note')}
            </Text>

            <TouchableOpacity onPress={() => onOpenModal()}>
              <View style={styles.containerView}>
                <Text>{form.country ? form.country + ' (' + form.country_code + ')' : t('select_country')}</Text>
              </View>
            </TouchableOpacity>
            <InputView
              title={t('mobile_number')}
              value={form.mobile}
              onChangeText={text => setForm({ ...form, mobile: text })}
            />
            <TrioButton
              btnTitle={t('next')}
              backPress={() => navigation.goBack()}
              nextPress={() => onSubmit()}
              isLoading={isLoading}
              cancelPress={() => navigation.goBack()}
            />
          </View>

          {countryPicker && (
            <Modal
              animationIn="slideInUp"
              animationInTiming={100}
              transparent={true}
              visible={countryPicker}
              onBackButtonPress={() => onCloseModal()}
              onRequestClose={() => onCloseModal()}
              statusBarTranslucent={true}
            >
              <SafeAreaView style={styles.modalOuterContainer}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modelTitle}></Text>
                    <TouchableOpacity onPress={() => onCloseModal()}>
                      <Text style={styles.backButton}>{t('close')}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>

                    {isLoading &&
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignSelf: 'center',
                          marginTop: screenHeight(40)
                        }}>
                        <ActivityIndicator size="large" color="#741728" />
                      </View>
                    }
                    {!isLoading &&
                      <>
                        <View style={styles.searchContainer}>
                          <TextInput style={styles.searchBox}
                            onChangeText={text => searchCountry(text)}
                            placeholder={t('search_country')}
                          />
                        </View>
                        <View>
                          <FlatList
                            keyboardShouldPersistTaps={'handled'}
                            data={(country && country.length > 0) ? country : countryList}
                            renderItem={({ item }) => (
                              <View>
                                <TouchableOpacity onPress={() => setSelectedCountry(item)}>
                                  <View style={styles.itemContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <Text
                                        style={styles.itemText}>
                                        {item.country}  {'(' + item.code + ')'}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            )}
                          />
                        </View>
                      </>
                    }
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default MobileNumber;
