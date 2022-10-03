import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputViewContainer: {
        marginBottom: screenHeight(8),
        width: screenWidth(80),
        marginLeft: -20,
    },
    titleText: {
        marginBottom: screenHeight(5),
    },
    textDetail: {
        marginBottom: screenHeight(2),
        fontFamily: fontFamily.SF_PRO_Regular,
        fontSize: 18,
        color: colors.CLR_WHITE,

    },
    instructionContainer: {
        backgroundColor: colors.RED,
        flexDirection: 'row',
        // borderTopLeftRadius: 10,
        width: screenWidth(80),
        marginHorizontal: 1,
        marginVertical:30,
        // borderBottomLeftRadius: 10,
        alignItems:'center',
        borderRadius:10
    },
    instructionText: {
        fontFamily: fontFamily.AVENIR_BOOK,
        fontSize: 14,
        padding: 10,
        marginLeft: '40%',
        color: 'white',
        padding: 15,
    },
    instructionButton: {
        backgroundColor: '#D94452',
        padding: 15,
        paddingHorizontal: 30,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        right: 0,
        position: 'absolute'
    }
});
export { styles };
