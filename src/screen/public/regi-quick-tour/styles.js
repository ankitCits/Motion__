import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    marginBottom: screenHeight(10),
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fontFamily.AVENIR_BLACK,
    lineHeight: 30,
    marginBottom: screenHeight(3),
    width: screenWidth(90),
  },
  coverImage: {
    height: 200,
    width: screenWidth(90),
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    width: 125,
    textAlign: 'center',
  },
});
export { styles };
