import { View, Text, Image, StatusBar, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const UserVerification = props => {
  console.log('regi-verification, UserVerification');
  const { t } = useTranslation();

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
            <View style={styles.statusContainer}>
              <Image style={styles.successImage} source={IMAGES.success} />
              <Text style={styles.successTitleText}>{t('thanks_for')}</Text>
              <Text style={styles.successSubTitleText}>{t('verification')}</Text>
            </View>

            <TrioButton
              btnTitle={t('next')}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('WatchInstruction')}
              cancelPress={() => console.log('log new data')}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default UserVerification;
