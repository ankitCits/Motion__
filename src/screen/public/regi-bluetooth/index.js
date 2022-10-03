import { View, Text, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { IMAGES } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';

const BluetoothEnable = props => {
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
            <Text style={styles.textTitle}>New user registration</Text>
            <Text style={styles.textDetail}>
              MOTION App would like access to Bluetooth on your mobile.
            </Text>
            <TrioButton
              btnTitle={'Allow'}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('LocationEnable')}
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

export default BluetoothEnable;
