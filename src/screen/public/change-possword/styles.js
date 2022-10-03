import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    marginBottom: screenHeight(4),
  },
  titleText: {
    marginBottom: screenHeight(4),
  },
  borderView: {
    height: 18,
    width: 1,
    backgroundColor: colors.CLR_WHITE,
    marginHorizontal: 6,
    alignSelf: 'center',
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginBottom: screenHeight(4),
    width: screenWidth(80),
  },
});
export { styles };
