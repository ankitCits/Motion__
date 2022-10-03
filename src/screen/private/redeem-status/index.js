import { View, Text, StatusBar, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { IMAGES } from '../../../theme';
import { styles } from './styles';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const RedeemStatus = props => {
    const { t } = useTranslation();
    return (
        <>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="transparent"
            />
            <View style={{ flex: 1 }}>

                <ImageBackground
                    style={styles.backgroundView}
                    source={IMAGES.background_un_bg}>
                    <View style={styles.statusContainer}>
                        <View style={styles.closeContainer} >
                            <TouchableOpacity onPress={() => props.navigation.navigate('Wallet')}>
                                <Image source={IMAGES.close_white} />
                            </TouchableOpacity>
                        </View>
                        <Image style={styles.successImage} source={IMAGES.success_arrow} />
                        <Text style={styles.titleText}>{t('successful')}</Text>
                        <Text style={styles.subText}>{t('check_your_wallet')}</Text>
                    </View>
                    <View style={styles.privacyContainer}>
                        <Text style={styles.privacyText}> {t('privacy')}</Text>
                    </View>
                </ImageBackground >
            </View >
        </>
    );
};

export default RedeemStatus;
