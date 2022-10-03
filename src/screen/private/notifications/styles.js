import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { ImageBackground, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    listItem: {
        // width: screenWidth(100),
        flex: 1,
        backgroundColor: colors.CLR_WHITE,
        paddingVertical: 15,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: colors.CLR_GRAY_TEXT,
        borderBottomWidth: 1
    },
    listTitle: {
        marginLeft: 10,
        fontSize: 12,
        fontFamily: fontFamily.SF_PRO_Regular,
        textAlign: 'left',
        justifyContent: 'center',
        color: colors.CLR_BLACK,
       
    },
    listStartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth(55),
    },
    listEndContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 10,
        fontFamily: fontFamily.AVENIR_BOOK,
        color: colors.CLR_BLACK,
        marginTop: 5
    },
  

});

export { styles };