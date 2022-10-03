import { colors, screenHeight } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    height: screenHeight(90),
  },
  titleText: {
    marginBottom: screenHeight(5),
  },
  primaryColorText: {
    fontWeight: '700',
    color: colors.CLR_PERSIAN_GREEN
  },
});
export { styles };
