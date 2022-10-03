import { View, Text, StatusBar, ImageBackground, Dimensions, TouchableHighlight, SafeAreaView } from 'react-native';
import React from 'react';
import { colors, commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';
import Ring from '../../../components/animation/ring';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const PairSuccessfully = props => {
  console.log('regi-pair-successfully, PairSuccessfully');
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
          style={styles.backgroundView}
          source={IMAGES.background_un_bg}>
          <View style={styles.inputViewContainer}>
            <Text style={styles.titleText}>
              {t('pair_watch')}

            </Text>
            <View style={styles.statusContainer}>
              <TouchableHighlight
                style={{
                  borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                  width: Dimensions.get('window').width * 0.5,
                  height: Dimensions.get('window').width * 0.5,
                  backgroundColor: colors.CLR_PERSIAN_GREEN,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                underlayColor='#ccc'
              >
                <View style={styles.textView}>
                  <Text style={styles.imageText}>
                    {t('pair_success')}
                  </Text>
                </View>
              </TouchableHighlight>
              <Ring delay={0} />
              <Ring delay={1000} />
              <Ring delay={2000} />
              <Ring delay={3000} />

            </View>

            <TrioButton
              btnTitle={t('next')}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('QuickTour')}
              cancelPress={() => props.navigation.goBack()}
            />

          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default PairSuccessfully;
