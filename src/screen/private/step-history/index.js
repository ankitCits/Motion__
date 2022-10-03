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
const StepHistory = props => {
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
      steps: '2000',
    },
    {
      id: '2',
      title: '5th June 2022',
      steps: '2000',
    },
    {
      id: '3',
      title: '4th June 2022',
      steps: '2000',
    },
    {
      id: '4',
      title: '4th June 2022',
      steps: '2000',
    },
    {
      id: '5',
      title: '2th June 2022',
      steps: '2000',
    },
    {
      id: '6',
      title: '1th June 2022',
      steps: '2000',
    },
    {
      id: '1',
      title: '6th June 2022',
      steps: '2000',
    },
    {
      id: '2',
      title: '5th June 2022',
      steps: '2000',
    },
    {
      id: '3',
      title: '4th June 2022',
      steps: '2000',
    },
    {
      id: '4',
      title: '4th June 2022',
      steps: '2000',
    },
    {
      id: '5',
      title: '2th June 2022',
      steps: '2000',
    },
    {
      id: '6',
      title: '1th June 2022',
      steps: '20000',
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
              fontSize: 14,
              fontFamily: fontFamily.ROBOTO_Medium,
              color: '#333333',
            }}>
            {item.steps}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontFamily: fontFamily.ROBOTO_Regular,
              color: '#333333',
              textAlign: 'center',
            }}>
            STEPS
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
          title={t('step_history')}
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

export default StepHistory;
