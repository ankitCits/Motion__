import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundView: {
    width: screenWidth(100),
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputViewContainer: {
    marginBottom: screenHeight(10),
    width: screenWidth(80),
  },
  titleText: {
    marginBottom: screenHeight(6),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginBottom: screenHeight(4),
  },
  instructionContainer: {
    backgroundColor: '#db4453',
    flexDirection: 'row',
    // borderTopLeftRadius: 5,
    width: screenWidth(80),
    marginHorizontal: 12,
    marginVertical: 10,
    // borderBottomLeftRadius: 5,
    alignItems: 'center',
    borderRadius:10
  },
  instructionText: {
    fontFamily: fontFamily.AVENIR_BOOK,
    fontSize: 14,
    padding: 10,
    marginLeft: '40%',
    color: 'white',
    padding: 15,
  },
  instructionButton: {
    backgroundColor: '#D94452',
    padding: 15,
    paddingHorizontal: 30,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    right: 0,
    position: 'absolute'
  },
});
export { styles };
