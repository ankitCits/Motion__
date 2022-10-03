import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    subContainer: {
        alignItems: 'center',
        marginVertical: 25,
    },
    profileTitleText: {
        fontSize: 18,
        color: '#000',
        fontFamily: fontFamily.AVENIR_HEAVY,
        marginRight: 10
    },
    profileText: {
        color: '#000',
        fontSize: 14,
        fontFamily: fontFamily.AVENIR_BOOK
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
    images: {
        width: 85,
        height: 85,
        borderRadius: 85 / 2,
        borderColor: colors.CLR_PERSIAN_GREEN,
        borderWidth: 1,
    },
});

export { styles };