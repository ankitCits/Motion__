import { screenHeight, screenWidth } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    paddingBottom: screenHeight(5),
  },
  buttonView: {
    width: screenWidth(80),
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 8,
  },
  buttonTitle: {
    fontSize: screenWidth(4.2),
    fontWeight: '600'
  },
});
export { styles };
