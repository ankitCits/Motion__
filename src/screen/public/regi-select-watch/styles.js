import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    marginBottom: screenHeight(5),
  },
  titleText: {
    marginBottom: screenHeight(3),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginBottom: screenHeight(5),
    width: screenWidth(80),
  },
  selectListContainer:{
    paddingBottom:150,
  }

});
export { styles };
