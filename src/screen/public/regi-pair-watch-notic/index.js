import { View, Text, StatusBar, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { IMAGES, commonStyle } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const WatchChargeNotic = props => {
  console.log('regi-pair-watch-notic WatchChargeNotic');
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
              {t('pair_watch')}
            </Text>
            <Text style={styles.textDetail}>
              {t('pair_watch_charge_note')}

            </Text>
            <TrioButton
              btnTitle={t('next')}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('WatchOtp')}
              cancelPress={() => console.log('log new data')}
            />

          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default WatchChargeNotic;
