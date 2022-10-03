import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { colors, commonStyle, IMAGES } from '../../../theme';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const Landing = ({ navigation }) => {
  console.log('Page Landing');
  const { t } = useTranslation();
  const goTo = async page => {
    navigation.navigate(page);
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
          source={IMAGES.background_image}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                ...styles.buttonView,
                backgroundColor: colors.CLR_PERSIAN_GREEN,
              }}
              onPress={() => goTo('UserName')}>
              <Text
                style={{
                  ...styles.buttonTitle,
                  color: colors.CLR_WHITE,
                }}>
                {t('get_started')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.buttonView,
                backgroundColor: colors.CLR_WHITE,
              }}
              onPress={() => goTo('Login')}>
              <Text
                style={{
                  ...styles.buttonTitle,
                  color: colors.CLR_BLACK,
                }}>
                {t('i_already_have_an_account')}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default Landing;
