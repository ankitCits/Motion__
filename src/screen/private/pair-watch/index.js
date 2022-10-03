import React from 'react';
import { View, Text, StatusBar, ImageBackground, SafeAreaView } from 'react-native';
import { commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const PairWatch = props => {
    console.log('pair-watch');
    const { t } = useTranslation();

    return (
        <>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="transparent"
            />
            <SafeAreaView style={commonStyle.safeAreaView}>
                <ImageBackground
                    style={commonStyle.backgroundView}
                    source={IMAGES.background_un_bg}>
                    <View style={styles.inputViewContainer}>
                        <Text style={[commonStyle.titleText, styles.titleText]}>{t('pair_watch')}</Text>
                        <Text style={styles.textDetail}>
                            {t('pair_watch_note')}
                        </Text>
                        <TrioButton
                            btnTitle={t('yes')}
                            backPress={() => props.navigation.goBack()}
                            nextPress={() => props.navigation.navigate('PairWatchCharge')}
                            cancelPress={() => props.navigation.goBack()}
                        />
                        <Text style={styles.textDetail}>
                            {t('pair_watch_later_note')}
                        </Text>
                        <View style={styles.instructionContainer}>
                            <Text style={styles.instructionText} >
                                {t('skip')}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </>
    );
};

export default PairWatch;
