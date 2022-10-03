import {screenHeight, screenWidth, colors, fontFamily} from '../../../theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: screenHeight(12),
    width: screenWidth(80),
    justifyContent:'space-around',
    marginHorizontal:5,
  },
  listContainer:{
    paddingTop:58
  },
  textTitle: {
    marginHorizontal:-11,
    marginBottom: screenHeight(3),
  },
  selectListContainer:{
    paddingBottom:150,
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 24,
    fontWeight:'600',
    marginHorizontal:-8,
    marginBottom: screenHeight(6),
  },
});
export {styles};
