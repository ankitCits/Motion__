import React from "react";
import { styles } from './styles';
import { StatusBar, Text, TouchableOpacity, View, Image } from 'react-native';
import Header from '../../../components/atom/header';
import { IMAGES } from '../../../theme';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

import {
    check,
    PERMISSIONS,
    request,
    RESULTS,
} from 'react-native-permissions';
const ConnectStep = (props) => {
    const { t } = useTranslation();
    const connectGoogleFit = () => {
        GoogleFit.checkIsAuthorized().then(res => {
            if (GoogleFit.isAuthorized) {
                props.navigation.navigate('Dashboard')
            } else {
                makeAuth();
            }
        });
    }
    const makeAuth = async () => {
        const googleFitPackageName = 'com.google.android.apps.fitness';
        let installed = true;
        try {
            installed = await SharedGroupPreferences.isAppInstalledAndroid(
                googleFitPackageName,
            );
            console.log('Google fit is installed on this device', installed);
            installed = true;
            if (installed) {
                const options = {
                    scopes: [
                        Scopes.FITNESS_ACTIVITY_READ,
                        Scopes.FITNESS_BODY_READ,
                        Scopes.FITNESS_LOCATION_READ,
                    ],
                };
                GoogleFit.authorize(options)
                    .then(authResult => {
                        if (authResult.success) {
                            askPermission();
                        } else {
                            alert('You Need to Connect Google Fit to Fetch Data.');
                        }
                    })
                    .catch(() => {
                        console.log('AUTH_ERROR');
                    });
            }
        } catch (err) {
            console.log('Google fit is not installed');
            installed = false;
        }
    };

    const askPermission = async () => {
        check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(async result => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log(
                        'This feature is not available (on this device / in this context)',
                    );
                    break;
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied');
                    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(() => {
                        askPermission();
                    });
                    break;
                case RESULTS.GRANTED:
                    props.navigation.navigate('Dashboard')
                    break;
            }
        });
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar
                translucent
                barStyle={'light-content'}
                backgroundColor={'#3A7EE8'}
            />
            <Header
                title={t('connect')}
                props={props}
                backgroundColor={'#3A7EE8'}
                showBack={true}
                showProfileIcon={false}
            />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{t('connect_to_motion')}</Text>
            </View>
            <View style={styles.subHeader}>
                <Text style={styles.subHeaderText}>{t('track_your_step')}</Text>
            </View>
            <View style={styles.subHeader}>
                <Text style={styles.subHeaderText}>
                    {t('access_your_step')}
                </Text>
            </View>
            <TouchableOpacity style={styles.pt20}
                onPress={() => props.navigation.navigate('SelectWatch')}>
                <View style={styles.bodyContainer}>
                    <View style={{ justifyContent: "center" }}>
                        <Text style={styles.containerText}>{t('sync_fitbit')}</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Image source={IMAGES.arrow} />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pt20}
                onPress={() => connectGoogleFit()}>
                <View style={styles.bodyContainer}>
                    <View style={{ justifyContent: "center" }}>
                        <Text style={styles.containerText}>{t('sync-googlefit')}</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Image source={IMAGES.arrow} />
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView >

    )
};
export default ConnectStep;