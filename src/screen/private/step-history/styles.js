import { colors, fontFamily } from '../../../theme';
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
        fontFamily:fontFamily.ROBOTO_Medium,
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
});

export { styles };