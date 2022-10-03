import { colors, fontFamily, screenHeight, screenWidth } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    container: {
        flex: 1,
    },
    tabContainer: {
        marginTop: -21,
        padding: 8,

    },
    tabSubContainer: {
        backgroundColor: '#f7f7f7',
        flex: 1
    },
    tabStyle: {
        backgroundColor: 'transparent',
        width: '90%',
        height: screenHeight(6),
        color: '#44A62A',
        margin: 10,
        padding: 0,
        alignContent: "center",
        borderColor: '#83B981',
        borderWidth: 2,
        elevation: 1,
        alignSelf: 'center',

    },
    indicatorStyle: {
        backgroundColor: 'transparent',
    },
    label: {
        fontFamily: fontFamily.ROBOTO_REGULAR,
        fontWeight: '400',
    },
    selectedTabText: {
        color: colors.CLR_PERSIAN_GREEN,
        backgroundColor: '#8bc24a',
        color: '#fff',
        padding: 8,
        width: screenWidth(30),
        textAlign: 'center',
        height: 100,
        fontSize: 18,
        fontWeight: '500'
    },
    tabText: {
        color: '#8bc24a',
        padding: 8,
        width: screenWidth(30),
        height: 100,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        backgroundColor: '#f7f7f7'
    },
    noLabel: {
        display: 'none',
        height: 0,
    },

})

export { styles };