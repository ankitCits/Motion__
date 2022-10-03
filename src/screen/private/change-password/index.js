import {
    View,
    Text,
    StatusBar,
    ScrollView,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';
import React, { useState } from 'react';
import { colors, commonStyle } from '../../../theme';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextView } from '../../../components/atom/text-input';
import Button from '../../../components/atom/button';
import { validatePassword } from '../../../utils';
import { changeUserPassword } from '../../../api/auth';


import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const ChangePassword = props => {
    const { t } = useTranslation();
    const [isEye, setEye] = useState(false);
    const [isEyeN, setEyeN] = useState(false);
    const [isEyeC, setEyeC] = useState(false);
    const [form, setFormValues] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const onChange = async () => {
        setIsLoading(true);
        if (form.old_password.trim() == "") {
            ToastAndroid.showWithGravity(
                t('current_password_required'),
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
        }
        if (form.new_password.trim() == "") {
            ToastAndroid.showWithGravity(
                t('new_password_required'),
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
        }
        if (form.confirm_password.trim() == "") {
            ToastAndroid.showWithGravity(
                t('confirm_password_required'),
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
        }

        const isValidPassword = validatePassword(form.new_password);
        if (!isValidPassword) {
            ToastAndroid.showWithGravity(
                t('password_invalid'),
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
        }

        if (form.new_password != form.confirm_password) {
            ToastAndroid.showWithGravity(
                t('password_must_be_same'),
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
        }
        try {
            const response = await changeUserPassword(form);
            ToastAndroid.showWithGravity(
                t('password_change_successfully'),
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            ToastAndroid.showWithGravity(
                error,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
        }
    };
    return (
        <>
            <StatusBar
                translucent
                barStyle={'dark-content'}
                backgroundColor={colors.SKY_BLUE}
            />
            <SafeAreaView style={commonStyle.safeAreaView}>
                <Header title={t('change_password')} props={props} backgroundColor={colors.SKY_BLUE} showBack={true} showProfileIcon={false} />
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    enabled
                    style={styles.avoid}
                    keyboardVerticalOffset={10}
                >
                    <ScrollView>
                        <View style={styles.container}>

                            <View style={styles.inputContainer}>
                                <TextView labelText={t('current_password')}
                                    value={form.old_password}
                                    secureTextEntry={!isEye}
                                    isOpen={isEye}
                                    onClickEye={() => setEye(!isEye)}
                                    isSecure={true}
                                    onChangeText={text => setFormValues({ ...form, old_password: text })} />

                                <TextView labelText={t('new_password')}
                                    value={form.new_password}
                                    secureTextEntry={!isEyeN}
                                    isOpen={isEyeN}
                                    onClickEye={() => setEyeN(!isEyeN)}
                                    isSecure={true}
                                    onChangeText={text => setFormValues({ ...form, new_password: text })}
                                />

                                <TextView labelText={t('confirm_new_password')}
                                    value={form.confirm_password}
                                    secureTextEntry={!isEyeC}
                                    isOpen={isEyeC}
                                    onClickEye={() => setEyeC(!isEyeC)}
                                    isSecure={true}
                                    onChangeText={text => setFormValues({ ...form, confirm_password: text })}
                                />
                            </View>
                            <View style={styles.note}>
                                <Text>{t('password_six_characters')}</Text>
                            </View>
                            <Button
                                title={t('change')}
                                titleColor={colors.CLR_WHITE}
                                buttonBackColor={colors.SKY_BLUE}
                                onPress={() => onChange()}
                                isLoading={isLoading}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

export default ChangePassword;