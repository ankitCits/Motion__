import {
    View,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, commonStyle, fontFamily, screenHeight, screenWidth, VIDEOS } from '../../../theme';
import Video from "react-native-video";

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const SplashScreen = ({ navigation }) => {
    console.log('page splash-screen');
    const { t } = useTranslation();
    const [count, setCount] = useState(null);
    const goTo = async (page) => {
        clearTimeout(count);
        navigation.navigate(page)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            goTo('Landing');
        }, 5000);
        setCount(timer)
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="transparent"
            />
            <SafeAreaView style={commonStyle.safeAreaView}>
                <Text style={styles.title}>{t('welcome_to')} MOTION</Text>
                <Text style={styles.termsText}>
                    {t('by_continuing_you_accept_our')}{' '}
                    <Text
                        onPress={() => {
                            navigation.navigate('PrivacyPolicy');
                        }}>
                        {t('privacy_policy')}
                    </Text>
                    ,{' '}
                    <Text
                        onPress={() => {
                            navigation.navigate('TermsOfService');
                        }}>
                        {t('terms_of_use')}
                    </Text>{' '}
                    & {t('subscription_terms')}

                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{
                            ...styles.buttonView,
                            backgroundColor: colors.CLR_PERSIAN_GREEN,
                        }}
                        onPress={() => goTo('Landing')}>
                        <Text
                            style={{
                                ...styles.buttonTitle,
                                color: colors.CLR_WHITE,
                            }}>
                            {t('continue')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Video
                    source={VIDEOS.splash}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={"cover"}
                    rate={1.0}
                    ignoreSilentSwitch={"obey"}
                    fullscreen={true}
                />

            </SafeAreaView>
        </>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    title: {
        color: colors.CLR_WHITE,
        zIndex: 1,
        marginTop: screenHeight(70),
        textAlign: 'center',
        fontSize: 28,
        fontFamily: fontFamily.ROBOTO_Regular,
    },
    termsText: {
        zIndex: 1,
        paddingHorizontal: 20,
        marginTop: screenHeight(2),
        textAlign: 'center',
        color: colors.CLR_WHITE,
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '600',
        fontFamily: fontFamily.ROBOTO_Regular,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    buttonView: {
        zIndex: 1,
        width: screenWidth(40),
        paddingHorizontal: 24,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderRadius: 50,
    },
    buttonTitle: {
        fontSize: screenWidth(4.2),
        fontWeight: '600'
    },
});