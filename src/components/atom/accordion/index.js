import {
    Image,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import React, { useState } from 'react';
import { colors, fontFamily, IMAGES } from '../../../theme';
import { StyleSheet } from 'react-native';
const Accordion = ({ item, props, ...rest }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.8 }}>
            <TouchableOpacity onPress={() => setIsActive(!isActive)}>
                <View style={styles.item}>
                    <Image source={item.icon} />
                    <Text style={styles.listItemTitle}>{item.title}</Text>
                    <Image style={styles.arrow} source={(isActive) ? IMAGES.down_arrow_black : IMAGES.arrow} />
                </View>
            </TouchableOpacity>
            {isActive &&
                <View style={styles.subItem}>
                    <Text style={styles.subItemTitle}>{item.description}</Text>
                </View>
            }
        </View>
    );
}

export default Accordion;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    listItemTitle: {
        width: '85%',
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
