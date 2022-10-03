import { View, Text, StatusBar, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';

const EmailNotic = props => {
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
            <Text style={[commonStyle.titleText, styles.titleText]}>New user registration</Text>
            <Text style={styles.textDetail}>
              Please check your E-mail for verification code.
            </Text>
            <TrioButton
              btnTitle={'Next'}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('EmailOtp')}
              cancelPress={() => console.log('log new data')}
            />
            <View style={commonStyle.privacyContainer}>
              <Text style={commonStyle.privacyText}> Privacy</Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default EmailNotic;
