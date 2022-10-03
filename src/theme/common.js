import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fontFamily } from './fonts';
import { screenHeight, screenWidth } from './metrices';
export const commonStyle = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor:'#fff'
    },
    backgroundView: {
        width: screenWidth(100),
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: fontFamily.SF_PRO_Black,
        fontSize: 26,
        color: colors.CLR_WHITE,
        letterSpacing: 0
    },
    privacyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    privacyText: {
        color: colors.CLR_WHITE,
        fontFamily: fontFamily.SF_PRO_Regular,
        fontSize: 14,
    },
});
