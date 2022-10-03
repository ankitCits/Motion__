import {screenHeight, screenWidth, colors, fontFamily} from '../../../theme';
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundView: {
    width: screenWidth(100),
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: screenHeight(4),
    width: screenWidth(80),
    justifyContent: 'space-between',
    marginBottom: screenHeight(6),
  },
  inputViewContainer: {
    marginBottom: screenHeight(4),
    width: screenWidth(80),
  },
  loginText: {
    fontFamily: fontFamily.ROBOTO_Bold,
    fontSize: screenWidth(7.6),
    color: colors.CLR_WHITE,
    marginBottom: screenHeight(5),
  },
  textDetail: {
    fontFamily: fontFamily.ROBOTO_Regular,
    fontSize: screenWidth(4.3),
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginBottom: screenHeight(3),
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  privacyText: {
    color: colors.CLR_WHITE,
    fontFamily: fontFamily.ROBOTO_Regular,
    fontSize: screenWidth(4.5),
  },
  borderView: {
    marginTop: 1,
    height: 16,
    width: 2,
    backgroundColor: colors.CLR_WHITE,
  },
});
export {styles};