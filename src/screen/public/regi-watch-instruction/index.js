import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const WatchInstruction = props => {
  console.log('regi-watch-instruction, WatchInstruction');
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
              {t('pair_watch_note')}
            </Text>
            <TrioButton
              btnTitle={t('yes')}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('SelectWatch')}
              cancelPress={() => console.log('log new data')}
            />
            <Text style={styles.textDetail}>
              {t('pair_watch_later_note')}
            </Text>
            <TouchableOpacity
              style={styles.instructionContainer}
              onPress={() => props.navigation.navigate('QuickTour')}>
              <Text style={styles.instructionText}>{t('skip')}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default WatchInstruction;
