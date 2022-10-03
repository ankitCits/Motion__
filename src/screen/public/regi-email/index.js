import { View, Text, StatusBar, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import TrioButton from '../../../components/atom/trio-button';

const EmailId = props => {
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
              Please enter your E-mail ID. Verification code will be send to your
              e-mail ID.
            </Text>
            <InputView title={'E-mail ID'} />
            <TrioButton
              btnTitle={'Next'}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('EmailNotic')}
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

export default EmailId;
