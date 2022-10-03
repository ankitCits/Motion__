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
    fontFamily: fontFamily.ROBOTO_Regular,
    fontSize: screenWidth(4.3),
    color: colors.CLR_WHITE,
    marginBottom: screenHeight(3),
  },
  borderView: {
    height: 18,
    width: 1,
    backgroundColor: colors.CLR_WHITE,
    marginHorizontal: 6,
    alignSelf: 'center',
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
