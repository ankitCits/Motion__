import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { ImageBackground, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 28,
    },
    cardOne: {
        marginVertical: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#EDEDED'
    },
    shareText: {
        width: screenWidth(50),
        fontFamily: fontFamily.AVENIR_HEAVY,
        color: colors.CLR_BLACK,
        paddingHorizontal: 4,
        fontSize: 14,
    },
    cardTwo: {
        backgroundColor: '#EDEDED',
        padding: 16,
        borderRadius: 6
    },
    personalCodeBlock: {
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.CLR_PERSIAN_GREEN,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#EBF3FC'
    },
    personalCodeText: {
        width: screenWidth(60),
    },
    linkText: {
        fontFamily: fontFamily.AVENIR_BOOK,
        paddingHorizontal: 4,
        fontSize: 12,
    },
    sendInviteButton: {
        marginVertical: 24,
        backgroundColor: colors.CLR_PERSIAN_GREEN,
        borderRadius: 5,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendInviteText: {
        color: 'white',
        fontSize: 16,
        fontFamily: fontFamily.SF_PRO_Medium
    }

});

export { styles };