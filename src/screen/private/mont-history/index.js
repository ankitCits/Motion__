import {View, Text, FlatList, StatusBar} from 'react-native';
import React from 'react';
import {colors, fontFamily} from '../../../theme';
import {styles} from './styles';
import Header from '../../../components/atom/header';
import {SafeAreaView} from 'react-native-safe-area-context';
import '../../../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUser} from '../../../redux/auth/authSlice';
import {useState} from 'react';
import {useEffect} from 'react';

const MontHistory = props => {
  const {t} = useTranslation();
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
      id: '1',
      title: '6th June 2022',
      mont: '20',
    },
    {
      id: '2',
      title: '5th June 2022',
      mont: '40',
    },
    {
      id: '3',
      title: '4th June 2022',
      mont: '50',
    },
    {
      id: '4',
      title: '6th June 2022',
      mont: '60',
    },
    {
      id: '5',
      title: '1th June 2022',
      mont: '70',
    },
    {
      id: '6',
      title: '2th June 2022',
      mont: '20',
    },
    {
      id: '7',
      title: '3th June 2022',
      mont: '80',
    },
    {
      id: '8',
      title: '4th June 2022',
      mont: '90',
    },
    {
      id: '3',
      title: '5th June 2022',
      mont: '10',
    },
    {
      id: '2',
      title: '6th June 2022',
      mont: '20',
    },
    {
      id: '1',
      title: '4th June 2022',
      mont: '30',
    },
    {
      id: '2',
      title: '6th June 2022',
      mont: '20',
    },
    {
      id: '1',
      title: '4th June 2022',
      mont: '30',
    },
    {
      id: '2',
      title: '6th June 2022',
      mont: '20',
    },
    {
      id: '1',
      title: '4th June 2022',
      mont: '100',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.listItem,
          item.id % 2 == 1
            ? {backgroundColor: colors.Light_GRAY}
            : {backgroundColor: colors.CLR_WHITE},
        ]}>
        <View>
          <Text style={styles.listTitle}>{item.title}</Text>
        </View>
        <View style={styles.listEndContainer}>
          <Text
            style={{
              fontFamily: fontFamily.ROBOTO_Medium,
              color: '#333333',
              fontSize: 14,
            }}>
            {item.mont}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.SKY_BLUE}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          title={t('motion_history')}
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

export default MontHistory;
