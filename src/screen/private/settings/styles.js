import { screenHeight, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    walletContainer: {
        alignItems: 'center',
        marginVertical: 25,
    },
    walletTitleText: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fontFamily.AVENIR_BLACK
    },
    walletSubTitleText: {
        color: colors.CLR_GRAY_TEXT,
        fontSize: 16,
        fontFamily: fontFamily.AVENIR_BLACK
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.CLR_PERSIAN_GREEN,
        borderRadius: 5,
        width: 120,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    versionText: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F0F0F',
        marginLeft: 10,
        fontFamily: fontFamily.AVENIR_HEAVY
    },
    toggleContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginHorizontal: 8
    },
});

export { styles };