import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { Dimensions, StatusBar, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#A6DBFF',
    },
    titleText: {
        color: '#002AFF',
        fontSize: 22,
        fontWeight: '900',
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: fontFamily.AVENIR_BLACK
    },
    container: {
        //paddingHorizontal: 28,
        //paddingVertical:5,
    },
    mainChartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        //height:screenHeight(25),
    },
    topContainer: {
        justifyContent: 'center',
        borderColor: "white",
        marginHorizontal: 20,
        marginVertical: 0,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 40,
        backgroundColor: "#70baff",
    },
    miniContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    miniChartContainer: {
    },
    chartValue: {
        fontFamily: fontFamily.AVENIR_BLACK,
        fontWeight: '700',
        fontSize: 15,
        color: '#002AFF',
        textAlign: 'center',
        marginTop: 8,
    },
    lineChartContainer: {
        flex: 1,
        flexDirection: 'row',
    }
});

export { styles };