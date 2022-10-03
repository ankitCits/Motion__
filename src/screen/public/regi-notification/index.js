import { View, Text, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { colors, IMAGES } from '../../../theme';
import { styles } from './styles';
import { InputView } from '../../../components/atom';
import Button from '../../../components/atom/button';
import TrioButton from '../../../components/atom/trio-button';

const NotificationEnable = props => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <View style={{ flex: 1 }}>

        <ImageBackground
          style={styles.backgroundView}
          source={IMAGES.background_un_bg}>
          <View style={styles.inputViewContainer}>
            <Text style={styles.loginText}>New User Registration</Text>
            <Text style={styles.textDetail}>
              MOTION App would like to send you notification.
            </Text>
            <TrioButton
              btnTitle={'Allow'}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('WatchInstruction')}
              cancelPress={() => console.log('log new data')}
            />
            <View style={styles.privacyContainer}>
              <Text style={styles.privacyText}> Privacy</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default NotificationEnable;
