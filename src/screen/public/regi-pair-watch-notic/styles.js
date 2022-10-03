import {screenHeight, screenWidth, colors, fontFamily} from '../../../theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  
  inputViewContainer: {
    marginBottom: screenHeight(15),
    width: screenWidth(80),
  },
  titleText: {
    marginBottom: screenHeight(5.5),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginHorizontal:-1,
    marginBottom: screenHeight(16),
  },
});
export {styles};
