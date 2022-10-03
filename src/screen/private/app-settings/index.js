import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  Modal,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';
import { colors, commonStyle, screenHeight } from '../../../theme';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import ToggleSwitch from 'toggle-switch-react-native';
import { getCountries } from '../../../api/common';
import timeZoneList from '../../../utils/timeZoneList.json';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const weekJson = [
  'Sunday',
  'Monday'
];

const LangJson = [
  'english',
  'arabic'
];

const AppSettings = props => {
  console.log('Page app-settings');
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState(i18n.language);
  const [langPicker, setLangPicker] = useState(false);
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const [timeZone, setTimeZone] = useState(true);
  const [timeZoneText, setTimeZoneText] = useState(null);
  const [location, setLocation] = useState(false);
  const [locationText, setLocationText] = useState(null);

  const toggleTimeZone = () => {
    // rest of code
    setTimeZone(timeZone => !timeZone);
  };
  const toggleLocation = () => {
    // rest of code
    if (!location) {
      setLocationText(RNLocalize.getCountry());
    }
    setLocation(location => !location);
  };

  useEffect(() => {
    getTimeZone();
  }, []);
  const getTimeZone = async () => {
    setTimeZoneText(RNLocalize.getTimeZone());
    setLocationText(RNLocalize.getCountry());
  };

  // GET, SET, SEARCH COUNTRY ==========
  const [countryList, setCountryList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countryPicker, setCountryPicker] = useState(false);
  const [timeZonePicker, setTimeZonePicker] = useState(false);
  const [dayPicker, setDayPicker] = useState(false);
  const [day, setDay] = useState('Sunday')
  const [country, setCountry] = useState(null);
  const [zone, setZone] = useState(null);

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
  };

  const searchCountry = text => {
    if (text.trim() != '') {
      const country = countryList.filter(
        item =>
          item.country.toLowerCase().includes(text.toLowerCase()) ||
          item.code.includes(text),
      );
      setCountry(country);
    } else {
      setCountry('');
    }
  };

  const searchZone = text => {
    if (text.trim() != '') {
      const zone = timeZoneList.filter(item =>
        item.text.toLowerCase().includes(text.toLowerCase()),
      );
      setZone(zone);
    } else {
      setZone('');
    }
  };

  const onCloseModal = () => {
    setCountryPicker(false);
    setCountry(null);
  };

  const onOpenZoneModal = async () => {
    setTimeZonePicker(true);
  };
  const onCloseZoneModal = () => {
    setTimeZonePicker(false);
  };

  const onOpenDayModal = async () => {
    setDayPicker(true);
  };
  const onCloseDayModal = () => {
    setDayPicker(false);
  };

  const toggleLanguageModal = async () => {
    setLangPicker(!langPicker);
  }


  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.SKY_BLUE}
      />
      <SafeAreaView style={commonStyle.safeAreaView}>
        <Header
          title={t('app_settings')}
          props={props}
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          showProfileIcon={false}
        />
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.titleText}>{t('automatic_time_zone')}</Text>
              <View style={styles.toggleContainer}>
                <ToggleSwitch
                  isOn={timeZone}
                  onColor={colors.SKY_BLUE}
                  offColor={colors.CLR_GRAY_TEXT}
                  size="medium"
                  onToggle={() => {
                    setZone(null);
                    toggleTimeZone();
                  }}
                />
              </View>
            </View>
            <Text style={styles.subText}>{t('network_provider_time')}</Text>
          </View>

          {!timeZone && (
            <TouchableOpacity
              style={styles.subContainer}
              onPress={() => {
                onOpenZoneModal();
              }}>
              <Text style={styles.titleText}>{t('select_zone')}</Text>
              <Text style={styles.subText}>
                {zone ? zone.text : timeZoneText}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.subContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.titleText}>{t('auto_location')}</Text>
              <View style={styles.toggleContainer}>
                <ToggleSwitch
                  isOn={location}
                  onColor={colors.SKY_BLUE}
                  offColor={colors.CLR_GRAY_TEXT}
                  size="medium"
                  onToggle={() => {
                    setCountry(null);
                    toggleLocation();
                  }}
                />
              </View>
            </View>
            <Text style={styles.subText}>{t('network_provider_location')}</Text>
          </View>

          {!location && (
            <TouchableOpacity
              style={styles.subContainer}
              onPress={() => onOpenModal()}>
              <Text style={styles.titleText}>{t('select_location')}</Text>
              <Text style={styles.subText}>
                {country ? country.country : locationText}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.subContainer} onPress={() => onOpenDayModal()}>
            <Text style={styles.titleText}>{t('start_week_on')}</Text>
            <Text style={styles.subText}>{day}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subContainer} onPress={() => toggleLanguageModal()}>
            <Text style={styles.titleText}>{t('select_language')}</Text>
            <Text style={[styles.subText, { textTransform: 'capitalize' }]}>{currentLanguage}</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      {countryPicker && (
        <Modal
          animationIn="slideInUp"
          animationInTiming={100}
          transparent={true}
          visible={countryPicker}
          // style={{ margin: 110 }}
          onBackButtonPress={() => onCloseModal()}
          onRequestClose={() => onCloseModal()}
          statusBarTranslucent={true}>
          <SafeAreaView style={styles.modalOuterContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modelTitle}></Text>
                <TouchableOpacity onPress={() => onCloseModal()}>
                  <Text style={styles.backButton}>{t('close')}</Text>
                </TouchableOpacity>
              </View>
              <View>
                {isLoading && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: screenHeight(40),
                    }}>
                    <ActivityIndicator size="large" color="#741728" />
                  </View>
                )}
                {!isLoading && (
                  <>
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.searchBox}
                        onChangeText={text => searchCountry(text)}
                        placeholder={t('search_country')}
                      />
                    </View>
                    <View>
                      <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        data={
                          country && country.length > 0 ? country : countryList
                        }
                        renderItem={({ item }) => (
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                setLocationText(item.country);
                                onCloseModal();
                              }}>
                              <View style={styles.itemContainer}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  {/* <Image style={styles.flag} source={{ uri: item.uri }} /> */}
                                  <Text style={styles.itemText}>
                                    {item.country}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                  </>
                )}
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}

      {timeZonePicker && (
        <Modal
          animationIn="slideInUp"
          animationInTiming={100}
          transparent={true}
          visible={timeZonePicker}
          // style={{ margin: 110 }}
          onBackButtonPress={() => onCloseZoneModal()}
          onRequestClose={() => onCloseZoneModal()}
          statusBarTranslucent={true}>
          <SafeAreaView style={styles.modalOuterContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modelTitle}></Text>
                <TouchableOpacity onPress={() => onCloseZoneModal()}>
                  <Text style={styles.backButton}>{t('close')}</Text>
                </TouchableOpacity>
              </View>
              <View>
                {isLoading && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: screenHeight(40),
                    }}>
                    <ActivityIndicator size="large" color="#741728" />
                  </View>
                )}
                {!isLoading && (
                  <>
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.searchBox}
                        onChangeText={text => searchZone(text)}
                        placeholder={t('select_zone')}
                      />
                    </View>
                    <View>
                      <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        data={zone && zone.length > 0 ? zone : timeZoneList}
                        renderItem={({ item }) => (
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                setZone(item);
                                onCloseZoneModal();
                              }}>
                              <View style={styles.itemContainer}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  {/* <Image style={styles.flag} source={{ uri: item.uri }} /> */}
                                  <Text style={styles.itemText}>
                                    {item.text}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                  </>
                )}
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}

      {dayPicker && (
        <Modal
          animationIn="slideInUp"
          animationInTiming={100}
          transparent={true}
          visible={dayPicker}
          // style={{ margin: 110 }}
          onBackButtonPress={() => onCloseDayModal()}
          onRequestClose={() => onCloseDayModal()}
          statusBarTranslucent={true}>
          <SafeAreaView style={styles.modalOuterContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modelTitle}></Text>
                <TouchableOpacity onPress={() => onCloseDayModal()}>
                  <Text style={styles.backButton}>{t('close')}</Text>
                </TouchableOpacity>
              </View>
              <View>
                {isLoading && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: screenHeight(40),
                    }}>
                    <ActivityIndicator size="large" color="#741728" />
                  </View>
                )}
                {!isLoading && (
                  <>
                    <View>
                      <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        data={weekJson}
                        renderItem={({ item }) => (
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                setDay(item);
                                onCloseDayModal();
                              }}>
                              <View style={styles.itemContainer}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  {/* <Image style={styles.flag} source={{ uri: item.uri }} /> */}
                                  <Text style={styles.itemText}>
                                    {item}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                  </>
                )}
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}

      {langPicker && (
        <Modal
          animationIn="slideInUp"
          animationInTiming={100}
          transparent={true}
          visible={langPicker}
          onBackButtonPress={() => toggleLanguageModal()}
          onRequestClose={() => toggleLanguageModal()}
          statusBarTranslucent={true}>
          <SafeAreaView style={styles.modalOuterContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modelTitle}></Text>
                <TouchableOpacity onPress={() => toggleLanguageModal()}>
                  <Text style={styles.backButton}>{t('close')}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  keyboardShouldPersistTaps={'handled'}
                  data={LangJson}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          changeLanguage(item);
                          toggleLanguageModal();
                        }}>
                        <View style={styles.itemContainer}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={[styles.itemText, , { textTransform: 'capitalize' }]}>
                              {item}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
};

export default AppSettings;
