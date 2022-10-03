import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    container: {
        paddingHorizontal: 30,
        backgroundColor: '#FAFAFA',
    },
    cardOne: {
        marginVertical: 15,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10
    },
    cardText: {
        width: 300,
        textAlign: 'center',
        fontFamily: fontFamily.ROBOTO_Medium,
        fontWeight: '700',
        fontSize: 14,
    },
    versionText: {
        margin: 30,
        fontFamily: fontFamily.ROBOTO_Regular,
        fontSize: 12,
        fontWeight: '700'
    },
    shareText: {
        width: screenWidth(50),
        fontFamily: fontFamily.AVENIR_HEAVY,
        color: colors.CLR_BLACK,
        paddingHorizontal: 4,
        fontSize: 14,
    },
    cardTwo: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    actionBlock: {
        backgroundColor: '#FFFFFF',
        marginTop: 45,
        margin: 5,
        width: 105,
        height: 105,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        fontSize: 11,
    },
    actionText: { fontWeight: '400', fontSize: 11, fontFamily: fontFamily.ROBOTO_Medium, marginTop: 7 }

});

export { styles };