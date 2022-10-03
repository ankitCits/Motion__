import { View, Text, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { colors, IMAGES } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';
import SolidInput from '../../../components/atom/solid-input';
import { useTranslation } from 'react-i18next';

const Redeem = props => {
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
                    source={IMAGES.background_lg_bg}>
                    <View style={styles.inputViewContainer}>

                        <SolidInput
                            title={t('wallet_address')}
                            placeholder={t('your_wallet_address')}
                        />

                        <SolidInput
                            title={t('amount')}
                            placeholder={t('enter_amount_token')}
                            backgroundColor={colors.CLR_PERSIAN_GREEN}
                            placeholderTextColor={colors.CLR_WHITE}
                            textColor={colors.CLR_WHITE}
                            isLight={false}
                        />
                        <View style={styles.resendContainer}>
                            <Text style={styles.smallText} >{t('max')} :100</Text>
                        </View>
                        <TrioButton
                            btnTitle={t('next')}
                            backPress={() => props.navigation.goBack()}
                            nextPress={() => props.navigation.navigate('RedeemStatus')}
                            cancelPress={() => props.navigation.pop()}
                        />

                        <View style={styles.privacyContainer}>
                            <Text style={styles.privacyText}> {t('privacy')}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    );
};

export default Redeem;
