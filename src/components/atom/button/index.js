import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { fontFamily, screenWidth } from '../../../theme';

const Button = ({
  title,
  titleColor,
  buttonBackColor,
  onPress,
  isLoading
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonStyle, backgroundColor: buttonBackColor }}
      onPress={onPress}>
      {isLoading ?
        (
          <ActivityIndicator size="small" color="#ffffff" />
        )
        :
        (
          <Text
            style={{
              color: titleColor,
              fontFamily: fontFamily.ROBOTO_Medium,
              fontSize: screenWidth(4.6),
            }}>
            {title}
          </Text>
        )
      }
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: screenWidth(36),
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
