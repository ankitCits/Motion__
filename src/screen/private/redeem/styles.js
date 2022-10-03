import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { Platform, StyleSheet } from 'react-native';

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
    width: screenWidth(80)
    // marginLeft: screenWidth(10)
  },
  loginText: {
    fontFamily: fontFamily.ROBOTO_Bold,
    fontSize: screenWidth(8),
    color: colors.CLR_WHITE,
    marginBottom: screenHeight(5),
  },
  textDetail: {
    fontFamily: fontFamily.ROBOTO_Regular,
    fontSize: screenWidth(4.3),
    color: colors.CLR_WHITE,
    marginBottom: screenHeight(3),
  },
  resendContainer: {
    height: 30,
    alignItems: 'flex-end',
    paddingRight: 10
  },
  smallText: {
    color: colors.CLR_WHITE,
    fontFamily: fontFamily.SF_PRO_Medium,
    fontSize: screenWidth(3.6),
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  privacyText: {
    color: colors.CLR_WHITE,
    fontFamily: fontFamily.ROBOTO_Regular,
  },
});
export { styles };
