import {screenHeight, screenWidth, colors, fontFamily} from '../../../theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: screenHeight(15),
    width: screenWidth(80),
    marginHorizontal:0,
  },
  textTitle: {
    marginHorizontal:-11,
    marginBottom: screenHeight(5.5),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginHorizontal:-8,
    marginBottom: screenHeight(20),
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
  // borderView: {
  //   marginTop: 1,
  //   height: 16,
  //   width: 2,
  //   backgroundColor: colors.CLR_WHITE,
  // },
});
export {styles};
