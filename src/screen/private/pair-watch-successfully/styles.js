import { screenHeight, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    marginBottom: screenHeight(15),
  },
  titleText: {
    paddingBottom:5,
    fontFamily:fontFamily.AVENIR_BLACK,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom:18,
    marginTop:screenHeight(9),
  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageText: {
    fontSize: 18,
    color: colors.CLR_WHITE,
    fontFamily: fontFamily.AVENIR_BLACK,
    width: 125,
    textAlign: 'center',
  },
});
export { styles };
