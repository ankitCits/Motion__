import { View, Text, StatusBar, ImageBackground, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { IMAGES, commonStyle } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';
import AuthContext from '../../../context/authContext/AuthContext';
import { getAccessToken } from '../../../storage';
// import Video from 'react-native-video';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const QuickTour = props => {
  console.log('regi-quick-tour, QuickTour');
  const { t } = useTranslation();

  const { onAuthentication } = useContext(AuthContext)

  const onSubmit = async () => {
    const token = await getAccessToken();
    await onAuthentication(token);
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
              {t('quick_tour_note')}
            </Text>
            <View>
              <ImageBackground
                style={styles.coverImage}
                source={IMAGES.video_bg}>
                <View style={styles.textView}>
                  <Text style={styles.imageText}>
                    {t('video')}
                  </Text>
                </View>
              </ImageBackground>

              {/* It causing issue due to Background image */}
              {/* <Video source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}   // Can be a URL or a local file.
                controls={true}
                poster={'https://baconmockup.com/300/200/'}
              /> */}
            </View>
            <View>
              <TrioButton
                btnTitle={t('next')}
                backPress={() => props.navigation.goBack()}
                nextPress={() => onSubmit()}
                cancelPress={() => props.navigation.goBack()}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default QuickTour;
