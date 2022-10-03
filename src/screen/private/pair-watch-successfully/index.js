import { View, Text, StatusBar, ImageBackground, Dimensions, TouchableHighlight, SafeAreaView, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors, commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';
import Ring from '../../../components/animation/ring';
import { validateStepsourceAuth } from '../../../api/authstepsource';
import { getFitbitToken, setFitbitToken } from '../../../storage';
import googleFit from 'react-native-google-fit';
// import {validateStepsourceAuth} from '../../../redux/auth/stepsource';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const PairWatchSuccessfully = props => {
  const { t } = useTranslation();
  const [pairingText, setPairingText] = useState('Fitbit');
  const [circleColor, setCircleColor] = useState('#66D4F1')


  useEffect(() => {
    getStart()

  }, [])

  const getStart = async () => {
    let oldFitbitToken = await getFitbitToken()
    if (oldFitbitToken) {
      setCircleColor('#66D4F1')
      setPairingText("Successfull..")
      console.log("OLD_TOKEN", oldFitbitToken)
    } else {
      try {
        let response = await validateStepsourceAuth();
        setCircleColor('#66D4F1')
        setPairingText("Successfull..")
        console.log(response)
        await setFitbitToken(response);
        googleFit.disconnect()
        props.navigation.navigate('Dashboard')
      } catch (error) {
        console.log("catch > error", error);
        setIsLoading(false);
        setCircleColor('#db4453')
        setPairingText("Failed..")
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    }
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
            <Text style={[commonStyle.titleText, styles.textTitle]}>Pair Watch</Text>
            <View style={styles.statusContainer}>
              <TouchableHighlight
                style={{
                  borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                  width: Dimensions.get('window').width * 0.5,
                  height: Dimensions.get('window').width * 0.5,
                  backgroundColor: `${circleColor}`,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                underlayColor='#ccc'
              >
                <View style={styles.textView}>
                  <Text style={styles.imageText}>{t('pairing')} {pairingText}</Text>
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
              nextPress={() => props.navigation.navigate('Dashboard')}
              cancelPress={() => props.navigation.pop()}
            />

          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default PairWatchSuccessfully;
