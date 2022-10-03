import {screenHeight, screenWidth, colors, fontFamily} from '../../../theme';
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundView: {
    width: screenWidth(100),
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputViewContainer: {
    marginBottom: screenHeight(11),
    width: screenWidth(85),
  },
  textTitle: {
    fontFamily: fontFamily.SF_PRO_Black,
    fontSize: screenWidth(6.8),
    color: colors.CLR_WHITE,
    marginBottom: screenHeight(7),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: screenWidth(4.9),
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginBottom: screenHeight(3),
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop:screenHeight(9)
  },
  privacyText: {
    color: colors.CLR_WHITE,
    fontFamily: fontFamily.ROBOTO_Regular,
    fontSize: screenWidth(4.4),
  },
});
export {styles};
