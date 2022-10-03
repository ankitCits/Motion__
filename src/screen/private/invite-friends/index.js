import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from '../../../components/atom/header';
import {colors, IMAGES} from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Share from 'react-native-share';
import {SHARE_OPTION} from '../../../config/GlobalConfig';
import '../../../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUser} from '../../../redux/auth/authSlice';
import {useState} from 'react';
import { useEffect } from 'react';

const title = SHARE_OPTION.title;
const message = SHARE_OPTION.message;
const options = Platform.select({
  default: {
    title,
    subject: title,
    message: `${message}`,
  },
});

const InviteFriends = props => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  useEffect(() => {
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isFocused]);
  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.SKY_BLUE}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          title="Invite Friends"
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          props={props}
          userImage={details ? details.user_image : ""}
        />
        <View style={styles.container}>
          <View style={styles.cardOne}>
            <Text style={styles.shareText}>
              {t('share_your_code')} xxx MOTN
            </Text>
            <Image source={IMAGES.profile_img} />
          </View>

          <LinearGradient
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            locations={[0.0, 0.99]}
            colors={['#FFFFFF', '#E53CE514']}
            style={styles.cardTwo}>
            <TouchableOpacity
              onPress={() =>
                Share.open(options)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    err && console.log(err);
                  })
              }
              style={styles.personalCodeBlock}>
              <View style={styles.personalCodeText}>
                <Text style={styles.shareText}>{t('personal_code')}</Text>
                <Text
                  style={[styles.linkText, {color: colors.CLR_PERSIAN_GREEN}]}>
                  Lifecoin.ai/r/rajwindersingh
                </Text>
              </View>
              <Image source={IMAGES.invite} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Share.open(options)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    err && console.log(err);
                  })
              }
              style={[styles.personalCodeBlock, {marginTop: 24}]}>
              <View style={styles.personalCodeText}>
                <Text style={styles.shareText}>{t('share_link')}</Text>
                <Text style={styles.linkText}>
                  {t('share_your_code')} xxx MOTN
                </Text>
              </View>
              <Image source={IMAGES.invite} />
            </TouchableOpacity>
          </LinearGradient>

          {/* <TouchableOpacity onPress={() => console.log('Redeem Pressed')}
                        style={styles.sendInviteButton}>
                        <Text style={styles.sendInviteText}>Send Invite</Text>
                    </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </>
  );
};

export default InviteFriends;
