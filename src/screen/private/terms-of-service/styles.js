import { colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 20,
        paddingVertical: 20
    },
    container: {
        marginHorizontal: 20,
    },
    paraText: {
        fontSize: 14,
        textAlign: 'left',
        fontFamily: fontFamily.SF_PRO_Regular,
        color: colors.CLR_BLACK,
        lineHeight: 26
    },
    subHeader: {
        backgroundColor: '#E0E0E0'
    },
    subHeaderText: {
        color: colors.CLR_BLACK,
        fontFamily: fontFamily.ROBOTO_Medium,
        fontWeight: '700',
        fontSize: 18,
        padding: 20
    },
    a: {
        color: colors.CLR_PERSIAN_GREEN,
    },
    p: {
        // fontWeight: '300',
        color: colors.DARK_BLACK, // make links coloured pink
      },
});

export { styles };