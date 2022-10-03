import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, fontFamily, IMAGES, screenWidth } from '../../../theme';
import { Switch } from 'react-native-switch';

const InputView = ({
  placeholder,
  title,
  value,
  isSecure,
  isOpen,
  onClickEye,
  isLoginEmail,
  onBlur,
  onFocus,
  onChangeText,
  ...rest
}) => {
  const [isToggle, setIsToggle] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState(value);
  const labelStyle = {
    fontSize: isFocused || textValue ? 12 : 14,
    color: isFocused || textValue ? "#707070" : "#333333",
    fontFamily: fontFamily.SF_PRO_Regular,
    paddingLeft: 10
  };


  const inputRef = useRef(null)
  const focusAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || textValue ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [focusAnim, isFocused, textValue])

  return (
    <View style={styles.containerView}>
      <View>
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.Text style={[labelStyle,
            {
              transform: [
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 10],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0],
                  }),
                },
              ],
            }]}>
            {title}
          </Animated.Text>
        </TouchableWithoutFeedback>
        <TextInput
          value={textValue}
          onChangeText={text => { onChangeText(text); setTextValue(text); }}
          style={{
            flex: 1,
            color: colors.CLR_BLACK,
            paddingRight: isSecure ? 8 : isLoginEmail ? 110 : 8,
            paddingLeft: 10
          }}
          // placeholder={placeholder}
          // placeholderTextColor={colors.CLR_PLACEHOLDER}
          onBlur={(event) => {
            setIsFocused(false)
            onBlur?.(event)
          }}
          onFocus={(event) => {
            setIsFocused(true)
            onFocus?.(event)
          }}
          ref={inputRef}
          {...rest}
        />

      </View>
      {isLoginEmail && (
        <View
          style={{
            width: 100,
            height: 50,
            position: 'absolute',
            right: 10,
            justifyContent: 'center',
          }}>
          <Switch
            value={isToggle}
            onValueChange={val => setIsToggle(!isToggle)}
            disabled={false}
            activeText={'Reminder'}
            inActiveText={'   Off   '}
            circleSize={24}
            barHeight={30}
            circleBorderWidth={1}
            backgroundActive={colors.CLR_PERSIAN_GREEN}
            backgroundInactive={'gray'}
            circleActiveColor={colors.CLR_WHITE}
            circleInActiveColor={colors.CLR_PERSIAN_GREEN}
            // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
            outerCircleStyle={{}} // style for outer animated circle
            renderActiveText={true}
            renderInActiveText={true}
            switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={4} // multiplied by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={24} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
          />
        </View>
      )}

      {isSecure && (
        <TouchableOpacity style={styles.eyeContainer} onPress={onClickEye}>
          <Image
            style={styles.eyeImage}
            source={isOpen ? IMAGES.eye_open : IMAGES.eye_close}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { InputView };

const styles = StyleSheet.create({
  containerView: {
    width: screenWidth(80),
    height: 62,
    borderRadius: 30,
    backgroundColor: colors.CLR_WHITE,
    paddingLeft: 16,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  eyeContainer: {
    position: 'absolute',
    right: 8,
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeImage: {
    width: 22,
    resizeMode: 'contain',
  },
});
