import { View, Text, StatusBar, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import TrioButton from '../../../components/atom/trio-button';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const EmailOtp = props => {
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
              New user registration
            </Text>
            <Text style={styles.textDetail}>
              Please enter the Verification Code from e-mail you received.
            </Text>
            <InputView
              title={'4 Digit verification code'}
            />
            <View style={styles.resendContainer}>
              <Text
                style={styles.resendText}
                onPress={() => alert('under progress')}>
                Resend code
              </Text>
            </View>
            <TrioButton
              btnTitle={'Next'}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('UserVerification')}
              cancelPress={() => props.navigation.goBack()}
            />
            {/* <View style={commonStyle.privacyContainer}>
              <Text style={commonStyle.privacyText}> Privacy</Text>
            </View> */}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default EmailOtp;
