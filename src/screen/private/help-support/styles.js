import { colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cashingOut: {
        marginTop: 10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 13,
        borderBottomWidth: 1,
        borderBottomColor: colors.CLR_GRAY_TEXT
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F0F0F',
        marginLeft: 12,
        fontFamily: fontFamily.AVENIR_HEAVY,
    },
    arrow: {
        position: 'absolute',
        marginRight: 20,
        right: 0,
    },
    subItem: {
        padding: 8,
        marginLeft: 14,
    },
    subItemTitle: {
        color: colors.CLR_BACKGROUND,
        fontFamily: fontFamily.ROBOTO_Regular,
        lineHeight: 18,
        fontSize: 13
    },
});

export { styles };