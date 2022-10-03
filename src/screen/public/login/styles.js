import { screenHeight, screenWidth, colors } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: screenHeight(4),
    width: screenWidth(80),
    justifyContent: 'space-between',
    marginBottom: screenHeight(6),
  },
  inputViewContainer: {
    marginBottom: screenHeight(4),
  },
  titleText: {
    marginBottom: screenHeight(4),
  },
  borderView: {
    height: 18,
    width: 1,
    backgroundColor: colors.CLR_WHITE,
    marginHorizontal: 6,
    alignSelf: 'center',
  },
  primaryColorText: { fontWeight: '700', color: '#66D4F1' },
});
export { styles };
