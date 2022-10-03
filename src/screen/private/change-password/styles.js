import { screenHeight, screenWidth } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        marginHorizontal: screenWidth(4),
    },
    inputContainer: {
        marginBottom: screenHeight(2),
    },
    note: {
        marginBottom: screenHeight(5),
        marginLeft: screenHeight(1),
    }
});

export { styles };