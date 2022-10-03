import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundView: {
        height: '100%',
        alignItems: 'center',
    },
    statusContainer: {
        flexDirection: 'column',
        backgroundColor: colors.CLR_PERSIAN_GREEN,
        marginTop: screenHeight(30),
        height: screenHeight(50),
        width: screenWidth(90),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    closeContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 16
    },
    successImage: {
        marginTop: 30,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 40,
        fontFamily: fontFamily.ROBOTO_Black,
        fontWeight: '700',
        color: colors.CLR_WHITE,
        marginBottom: 20,
    },
    subText: {
        textAlign: 'center',
        width: screenWidth(80),
        fontSize: 18,
        fontFamily: fontFamily.SF_PRO_Regular,
        color: colors.CLR_WHITE
    },
    privacyContainer: {
        marginTop: screenHeight(10),
    },
    privacyText: {
        color: colors.CLR_WHITE,
        fontFamily: fontFamily.ROBOTO_Regular,
    },

});
export { styles };
