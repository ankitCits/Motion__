import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundView: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputViewContainer: {
    marginBottom: screenHeight(8),
  },
  titleText: {
    fontFamily: fontFamily.ROBOTO_Bold,
    fontSize: screenWidth(7.6),
    color: colors.CLR_WHITE,
    marginBottom: screenHeight(5),
    fontWeight: 'bold'
  },

  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
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
    fontWeight: 'bold',
    width: 125,
    textAlign: 'center',
  },
});
export { styles };
