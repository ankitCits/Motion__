import { StyleSheet } from 'react-native';
import { colors, fontFamily, screenHeight, screenWidth } from '../../../theme';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        // marginTop: '6%',
        backgroundColor: "#A6DBFF"
    },
    headerContainer: {
        paddingTop: 10,
        paddingLeft: 35,
    },
    headerText: {
        color: colors.CLR_WHITE,
        fontSize: 18,
        fontWeight: '600',
    },
    subHeader: {
        margin: 5,
        paddingTop: 10,
        paddingLeft: 32,
        justifyContent: "center"
    },
    subHeaderText: {
        color: colors.CLR_WHITE,
        fontSize: 16,
    },
    bodyContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderColor: colors.CLR_WHITE,
        borderWidth: 1,
        borderRadius: 5,
        height: 80,
        margin: 15,
        backgroundColor: "#70baff",
    },
    containerText: {
        color: colors.CLR_WHITE,
        fontSize: 16,
    },
    pt20: {
        paddingTop: 20
    }
});
export { styles };
