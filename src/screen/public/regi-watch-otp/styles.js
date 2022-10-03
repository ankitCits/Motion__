import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    marginBottom: screenHeight(8),
    width: screenWidth(80),
  },
  titleText: {
    marginBottom: screenHeight(7),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 22,
    marginBottom: screenHeight(12),
  },
});
export { styles };
