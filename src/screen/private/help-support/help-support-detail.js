import {
    Image,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { IMAGES, colors, commonStyle } from '../../../theme';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { SafeAreaView } from 'react-native-safe-area-context'
import HTMLView from 'react-native-htmlview';

const HelpSupportDetail = props => {
    const [data, setData] = useState(props.route.params);
    const [openKey, setOpenKey] = useState();

    const handleToggle = key => {
        setOpenKey(openKey !== key ? key : null)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.8 }}>
                <TouchableOpacity onPress={() => handleToggle(item.que)}>
                    <View style={styles.item}>
                        <Text style={styles.listItemTitle}>{item.que}</Text>
                        <Image style={styles.arrow} source={(openKey === item.que) ? IMAGES.down_arrow_black : IMAGES.arrow} />
                    </View>
                </TouchableOpacity>
                {openKey === item.que &&
                    <View style={styles.subItem}>
                        <HTMLView
                            value={item.ans}
                            stylesheet={styles.subItemTitle}
                        />
                    </View>
                }
            </View>
        )
    }

    const profileHeader = () => {
        return (
            <View>
                <Header title={data.que} props={props} showProfileIcon={false} backgroundColor={colors.SKY_BLUE} showBack={true} />
            </View>
        )
    }
    return (
        <>
            <StatusBar
                translucent
                barStyle={'dark-content'}
                backgroundColor={colors.SKY_BLUE}
            />
            <SafeAreaView style={commonStyle.safeAreaView}>
                <FlatList
                    data={data.data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={profileHeader}
                />
            </SafeAreaView >
        </>
    );
}

export default HelpSupportDetail;
