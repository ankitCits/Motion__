import {
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { colors, commonStyle, IMAGES } from '../../../theme';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextView } from '../../../components/atom/text-input';
import Button from '../../../components/atom/button';
import { getUser, setUser } from '../../../redux/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { emailValidation, IMAGE_URL, validatePhone } from '../../../utils';
import { updateProfile } from '../../../api/auth';
import { setUserLocal } from '../../../storage';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const EditProfile = props => {
  const { t } = useTranslation();
  const userDetails = useSelector(getUser);
  const dispatch = useDispatch();
  const [details, setUserDetails] = useState({ ...userDetails });
  const [isLoading, setIsLoading] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();
  const [profilePic, setProfilePic] = useState(null);

  const options = [t('camera'), t('gallery'), t('cancel')];
  const cancelButtonIndex = 2;
  const imageOptions = {
    mediaType: 'photo',
    maxWidth: 512,
    maxHeight: 512,
    cameraType: 'front',
    quality: 1,
  };
  const imageSelected = response => {
    if (response.assets.length) {
      setProfilePic({
        fileUri: response.assets[0].uri,
      });
    }
  };
  const captureImage = async () => {
    try {
      const result = await launchCamera(imageOptions);
      imageSelected(result);
    } catch (error) {
      console.log(error);
    }
  };
  const pickFromGallery = async () => {
    try {
      const result = await launchImageLibrary(imageOptions);
      if (result.assets.length) {
        imageSelected(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const takePicture = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          captureImage();
        } else if (buttonIndex === 1) {
          pickFromGallery();
        }
      },
    );
  };

  const renderFileUri = () => {
    if (details.user_image) {
      if (profilePic && profilePic.fileUri) {
        return (
          <Image
            source={{
              uri: profilePic.fileUri
                ? profilePic.fileUri
                : `${IMAGE_URL}${details.user_image}`,
            }}
            style={styles.images}
          />
        );
      } else {
        return (
          <Image
            source={{
              uri: details.user_image
                ? `${IMAGE_URL}${details.user_image}`
                : profilePic.fileUri,
            }}
            style={styles.images}
          />
        );
      }
    } else {
      return <Image source={IMAGES.profile} />;
    }
  };

  const onUpdateProfile = async () => {
    if (details.name.trim() == '') {
      ToastAndroid.showWithGravity(
        t('name_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    if (details.email.trim() == '') {
      ToastAndroid.showWithGravity(
        t('email_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    const isValidEmail = emailValidation(details.email);
    if (!isValidEmail) {
      ToastAndroid.showWithGravity(
        t('email_invalid'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    if (details.first_name.trim() == '') {
      ToastAndroid.showWithGravity(
        t('first_name_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    if (details.last_name.trim() == '') {
      ToastAndroid.showWithGravity(
        t('last_name_required!'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    if (details.mobile.trim() == '') {
      ToastAndroid.showWithGravity(
        t('mobile_required'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    const isMobileValid = validatePhone(details.mobile);
    if (!isMobileValid) {
      ToastAndroid.showWithGravity(
        t('mobile_invalid'),
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    try {
      // Process Update Profile
      if (profilePic && profilePic.fileUri)
        details.profile = profilePic.fileUri;
      const response = await updateProfile(details);
      await setUserLocal(response.user);
      dispatch(setUser(response));
      setIsLoading(false);
      props.navigation.navigate('Profile');
    } catch (error) {
      console.log('catch', error);
      setIsLoading(false);
      ToastAndroid.showWithGravity(t('update_profile_error'), ToastAndroid.LONG, ToastAndroid.TOP);
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
        <Header
          title={t('edit_profile')}
          props={props}
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          showProfileIcon={false}
        />
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => takePicture()}>
              {renderFileUri()}
              <Text style={styles.instructionText}>
                {t('tap_on_image')}
              </Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextView
                labelText={t('username')}
                value={details.name}
                onChangeText={text => setUserDetails({ ...details, name: text })}
              />

              <TextView
                labelText={t('email_address')}
                value={details.email}
                onChangeText={text => setUserDetails({ ...details, email: text })}
              />

              <TextView
                labelText={t('first_name')}
                value={details.first_name}
                onChangeText={text =>
                  setUserDetails({ ...details, first_name: text })
                }
              />

              <TextView
                labelText={t('last_name')}
                value={details.last_name}
                onChangeText={text =>
                  setUserDetails({ ...details, last_name: text })
                }
              />

              <TextView
                labelText={t('mobile_number')}
                value={details.mobile}
                onChangeText={text =>
                  setUserDetails({ ...details, mobile: text })
                }
              />
            </View>
            {/* <TouchableOpacity style={styles.logoutButton}
                            onPress={() => onUpdateProfile()}>
                            <Text style={styles.buttonText}>
                                Submit
                            </Text>
                        </TouchableOpacity> */}
            <Button
              title={t('submit')}
              titleColor={colors.CLR_WHITE}
              buttonBackColor={colors.CLR_PERSIAN_GREEN}
              onPress={() => onUpdateProfile()}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default EditProfile;
