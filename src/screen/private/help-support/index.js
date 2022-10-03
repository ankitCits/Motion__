import {
    Image,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    StatusBar,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMAGES, colors, commonStyle } from '../../../theme';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFAQ } from '../../../api/common';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

import HTMLView from 'react-native-htmlview';

// const DATA = [
//     {
//         id: '1',
//         que: 'Cashing Out',
//         data: [{
//             qa: 'Whats ',
//             a: 'this is'
//         }]
//     },
//     {
//         id: '2',
//         que: 'Offers & Market Place',
//         data: {
//             qa: 'Whats ',
//             a: 'this is'
//         }
//     },
//     {
//         id: '3',
//         que: 'Subscription Plans',
//     },
//     {
//         id: '4',
//         que: 'Technical Question & Fixes',
//     },
//     {
//         id: '5',
//         que: 'Sweat Economy(Crypto)',
//     }
// ];



const HelpSupport = props => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(false);


    useEffect(() => {
        onGetFAQ();
    }, [])

    const onGetFAQ = async () => {
        setIsLoading(true);
        try {
            const response = await getFAQ();
            if (response.data.length > 0) {
                setData(response.data);
                setIsLoading(false);
            } else {
                setData(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            ToastAndroid.showWithGravity(
                error,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
        }
    }

    const handleRedirect = item => {
        if (item.data.length) {
            props.navigation.navigate('HelpSupportDetail', item);
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.8 }}>
                <TouchableOpacity onPress={() => handleRedirect(item)}>
                    <View style={styles.item}>
                        <Text style={styles.listItemTitle}>{item.que}</Text>
                        <Image style={styles.arrow} source={IMAGES.arrow} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const profileHeader = () => {
        return (
            <View>
                <Header title={t('help_support')} props={props} showProfileIcon={false} backgroundColor={colors.SKY_BLUE} showBack={true} />
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
                {isLoading ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>
                        <ActivityIndicator size="large" color="#741728" />
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={profileHeader}
                    />
                )}
            </SafeAreaView >
        </>
    );
}

export default HelpSupport;
