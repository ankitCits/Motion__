import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    marginBottom: screenHeight(8),
  },
  titleText: {
    marginBottom: screenHeight(5),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginBottom: screenHeight(4),
    width: screenWidth(80),
  },
  resendContainer: {
    height: 40,
    alignItems: 'flex-end',
    width: screenWidth(80),
  },
  resendText: {
    color: colors.CLR_WHITE,
    fontFamily: fontFamily.ROBOTO_Regular,
    fontSize: 14,
    textDecorationLine: 'underline'
  },
});
export { styles };
