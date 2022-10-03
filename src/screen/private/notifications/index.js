import { Text, FlatList, View, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { colors, IMAGES } from '../../../theme';
import { TextAvatar } from '../../../components/atom';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setInitialRoute } from '../../../redux/auth/authSlice';

const Notifications = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  dispatch(setInitialRoute({ route: 'Dashboard' }));

  const isFocused = useIsFocused();
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  useEffect(() => {
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isFocused]);
  const DATA = [
    {
      name: 'Amy',
      notification:
        'This handy tool helps you create dummy text for all your layout needs.',
      date: '27/08/2022',
    },
    {
      name: 'Chris',
      notification: 'Your quote #123 has been approved.',
      date: '27/08/2022',
    },
    {
      name: 'Amy Lol',
      notification: 'Your quote #123 has been approved.',
      date: '27/08/2022',
    },
    {
      name: 'Chris',
      notification:
        'This handy tool helps you create dummy text for all your layout needs.',
      date: '27/08/2022',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.listStartContainer}>
          <TextAvatar text={item.name} size={34} />
          <Text style={styles.listTitle}>{item.notification}</Text>
        </View>
        <View style={styles.listEndContainer}>
          <Image source={IMAGES.notification_black} />
          <Text style={styles.subTitle}>{item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={colors.SKY_BLUE}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          title={t('notification')}
          props={props}
          backgroundColor={colors.SKY_BLUE}
          showBack={true}
          userImage={details ? details.user_image : ""}
        />
        <View style={styles.container}>
          <FlatList
            nestedScrollEnabled
            data={DATA}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Notifications;
