import { colors, fontFamily, screenHeight, screenWidth } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    listTitle: {
        marginLeft: 30,
        fontSize: 12,
        fontWeight: '800',
        textAlign: 'center',
        fontFamily: fontFamily.ROBOTO_Medium,
        justifyContent: 'center'
    },
    listEndContainer: {
        paddingHorizontal: 50,
    },
    listItem: {
        backgroundColor: colors.CLR_WHITE,
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    // 
    selectedTabText: {
        color: colors.CLR_PERSIAN_GREEN,
        backgroundColor: '#fff',
        width: 75,
        textAlign: 'center',
        padding: 8,
        borderRadius: 50,
        color: '#000',
        fontSize: 18,
        fontWeight: '500'
    },
    // selectedTabBorder: {
    //     backgroundColor: colors.CLR_BLACK,
    //     height: 3,
    //     top: '30%',
    // },
    tabText: {
        color: '#fff',
        fontSize: 18,
    },
    label: {
        fontFamily: fontFamily.ROBOTO_REGULAR,
        fontWeight: '400',
    },
    noLabel: {
        display: 'none',
        height: 0,
    },
    // 
    timeContainer: {
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    timeText: { color: '#FFF', fontSize: 17 },
    // 
    stepContainer: { flexDirection: 'row', width: screenWidth(90), height: screenHeight(20), },
    stepIconContainer: {
        width: screenWidth(20),
        height: screenWidth(20),
        borderRadius: screenWidth(30) / 2,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 10
    },
    stepDetailsContainer: {
        paddingHorizontal: 10,
        backgroundColor: 'blue',
        width: screenWidth(80),
        height: screenHeight(25),
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderRadius: 20
    },
    //
    chartcontainer: {
        flexDirection: 'row', paddingTop: 60,
    },
    chartDetailContainer: {
        paddingHorizontal: 10,
        width: screenWidth(100),
        flexDirection: 'column',
        borderRadius: 20,
    },
});

export { styles };