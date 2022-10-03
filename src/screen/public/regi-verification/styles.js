import { screenHeight, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    marginBottom: screenHeight(5),
  },
  titleText: {
    marginBottom: screenHeight(5),
  },
  statusContainer: {
    backgroundColor: colors.CLR_WHITE,
    height: screenHeight(40),
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImage: {
    marginBottom: 20,
  },
  successTitleText: {
    fontSize: 30,
    fontFamily: fontFamily.ROBOTO_Black,
    color: colors.CLR_GRAY_TEXT,
  },
  successSubTitleText: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: fontFamily.SF_PRO_Regular,
    fontWeight: '700',
    color: colors.CLR_PERSIAN_GREEN
  },
});
export { styles };
