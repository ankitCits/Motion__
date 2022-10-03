import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { colors, fontFamily, IMAGES, screenHeight } from '../../../theme';

const TextView = ({
  onChangeText,
  labelText,
  value,
  isSecure,
  isOpen,
  onClickEye,
  ...rest
}) => {
  return (
    <>
      {labelText && <Text style={styles.inputLabel}>{labelText}</Text>}
      <View style={styles.containerView}>
        <TextInput
          value={value}
          style={styles.input}
          onChangeText={onChangeText}
          isSecure={isSecure}
          {...rest}
        />

        {isSecure && (
          <TouchableOpacity style={styles.eyeContainer} onPress={onClickEye}>
            <Image
              style={styles.eyeImage}
              source={isOpen ? IMAGES.eye_open : IMAGES.eye_close}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export { TextView };

const styles = StyleSheet.create({
  containerView: {
    height: screenHeight(6),
    borderBottomColor: colors.Light_GRAY,
    borderBottomWidth: 1,
    marginBottom: screenHeight(2),
  },
  inputLabel: {
    color: colors.CLR_BLACK,
    fontFamily: fontFamily.ROBOTO_Regular,
    fontWeight: '600',
    fontSize: 14,
    paddingLeft: 4
  },
  input: {
    color: '#838383',
    fontFamily: fontFamily.ROBOTO_Regular,
    fontSize: 14,
    fontWeight: '500',
  },
  eyeContainer: {
    position: 'absolute',
    right: 8,
    width: 40,
    height: screenHeight(6),
    justifyContent: 'center',
  },
  eyeImage: {
    width: 22,
    resizeMode: 'contain',
  },
});
