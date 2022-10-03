import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 28,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundDesign: {
        position: 'absolute',
        backgroundColor: 'white',
        top: -175,
        left: -30,
        width: screenWidth(114),
        height: screenHeight(60),
        borderRadius: screenWidth(100) * 2,
    },
    walletContainer: {
        alignItems: 'center',
        width: screenWidth(100),
        height: screenHeight(42),
    },
    walletTitleText: {
        marginTop: screenHeight(10),
        color: colors.BLUE,
        fontSize: 30,
        fontWeight: '700'
    },
    walletSubTitleText: {
        color: colors.BLUE,
        fontSize: 19,
    },
    redeemList: {
        paddingVertical: 15, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'
    },
    walletIconContainer: {
        height: 40, width: 40, backgroundColor: 'lightgrey', flexDirection: 'row', justifyContent: 'center', borderRadius: 30
    },
    walletIcon: { height: 45, width: 45, alignSelf: 'center' },
    walletListTitle: { marginLeft: 15, color: colors.BLUE, fontWeight: 'bold' },
    walletListSubTitle: { marginLeft: 15, color: colors.BLUE, fontSize: 10 },
    walletRedeemButtonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
    walletRedeemButton: { backgroundColor: '#66D4F1', paddingHorizontal: 24, paddingVertical: 8, borderRadius: 50 },
    row: { flex: 1 },
    list: {
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
    },
    walletItems: {
        borderColor: colors.CLR_GRAY_TEXT,
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 20,
        margin: 12,
        width: 100,
        alignItems: 'center',
    }
});

export { styles };