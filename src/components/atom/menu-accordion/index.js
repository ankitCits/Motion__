import React from 'react';
import {
    Image,
    TouchableOpacity,
    View,
    Text,
    FlatList
} from 'react-native';
import { fontFamily, IMAGES } from '../../../theme';
import { StyleSheet } from 'react-native';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const MenuAccordion = ({ item, props, toggle, open, ...rest }) => {
    const { t } = useTranslation();

    const handleRedirect = (item) => {
        if (item && item.page) {
            props.navigation.navigate(item.page)
        }
    }

    const renderSubItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleRedirect(item)}>
                <View style={styles.subItem}>
                    <Text style={styles.subItemTitle}>- {t(item.title)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <TouchableOpacity onPress={() => (item.subItem) ? toggle(item.id) : handleRedirect(item)}>
                <View style={styles.item}>
                    <Image source={item.icon} />
                    <Text style={styles.listItemTitle}>{t(item.title)}</Text>
                    <Image style={styles.arrow} source={(open) ? IMAGES.down_arrow_black : IMAGES.arrow} />
                </View>
            </TouchableOpacity>
            {
                item.subItem && open &&
                <View >
                    <FlatList
                        data={item.subItem}
                        renderItem={renderSubItem}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            }
        </View>
    );
}

export default MenuAccordion;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F0F0F',
        marginLeft: 10,
        fontFamily: fontFamily.AVENIR_HEAVY
    },
    arrow: {
        position: 'absolute',
        marginRight: 20,
        right: 0,
    },
    subItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        marginLeft: 46,
    },
    subItemTitle: {
        color: '#0F0F0F',
        fontFamily: fontFamily.AVENIR_BOOK
    },
});
