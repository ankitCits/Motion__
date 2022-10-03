import {screenHeight, screenWidth, colors, fontFamily} from '../../../theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: screenHeight(8),
    width: screenWidth(80),
    marginHorizontal:0,
  },
  textTitle: {
    marginHorizontal:-11,
    marginBottom: screenHeight(5.5),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: screenWidth(5),
    color: colors.CLR_WHITE,
    lineHeight: 24,
    fontWeight:'600',
    marginHorizontal:-10,
    marginBottom: screenHeight(15),
  },
});
export {styles};
