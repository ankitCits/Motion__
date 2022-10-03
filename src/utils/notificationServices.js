import messaging from '@react-native-firebase/messaging';
import { getFCMToken, setFCMToken } from '../storage';

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        // console.log('Authorization status:', authStatus);
        getFcmToken();
    }
}

const getFcmToken = async () => {
    const fcmToken = await getFCMToken();
    // console.log('Existing FCM Token', fcmToken);
    if (!fcmToken) {
        try {
            const newFcmToken = await messaging().getToken();
            if (newFcmToken) {
                // console.log('New Token is generated', newFcmToken);
                await setFCMToken(newFcmToken);
            }
        } catch (error) {
            console.log('Failed to generate new FCM Token', error);
        }
    }
}

import { setInitialRoute } from '../redux/auth/authSlice';
import { store } from './../store/store';
export const notificationListener = async () => {
    console.log('notificationListener');
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );

        messaging()
            .getInitialNotification()
            .then(async remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    store.dispatch(setInitialRoute({ route: 'Notifications' }));
                }
            });
    });

    messaging().onMessage(async remoteMessage => {
        console.log('Received Messaged in Foreground', remoteMessage);
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        // Send a notification alert
        console.log('setBackgroundMessageHandler', remoteMessage)
    });
}