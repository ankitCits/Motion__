import { colors, fontFamily, screenHeight, screenWidth } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginVertical: 28,
        marginHorizontal: screenWidth(4),
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: screenHeight(6),
    },
    instructionText: {
        fontSize: 12,
        color: '#333333',
        fontFamily: fontFamily.AVENIR_BOOK,
        marginVertical: 10
    },
    inputLabel: {
        color: colors.CLR_BLACK,
    },
    inputContainer: {
        marginBottom: screenHeight(2),
    },
    images: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderColor: colors.CLR_PERSIAN_GREEN,
        borderWidth: 1,
    },
});

export { styles };