import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  useWindowDimensions,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import Header from '../../../components/atom/header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, TabBar} from 'react-native-tab-view';

import {getUserSteps} from '../../../api/syncstepsourcs';
import {Calendar} from 'react-native-calendars';
import DayRoute from './Tabs/day';
import WeekRoute from './Tabs/week';
import moment from 'moment';
import MonthRoute from './Tabs/month';
import YearRoute from './Tabs/year';
import {screenHeight} from '../../../theme';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUser} from '../../../redux/auth/authSlice';

const StepCount = props => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [routes, setRoutes] = useState([
    {key: 'day', title: 'D', data: [], average: []},
    {key: 'week', title: 'W', data: [], average: []},
    {key: 'month', title: 'M', data: [], average: []},
    {key: 'year', title: 'Y', data: [], average: []},
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  useEffect(() => {
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isFocused]);

  const renderScene = ({route, jumpTo}) => {
    if (route.title == 'D') {
      return (
        <DayRoute
          data={route.data}
          average={route.average}
          onRefresh={onRefresh}
          refreshing={refreshing}
          openCalendar={openCalender}
        />
      );
    } else if (route.title == 'W') {
      return (
        <WeekRoute
          data={route.data}
          average={route.average}
          onRefresh={onRefresh}
          refreshing={refreshing}
          openCalendar={openCalender}
        />
      );
    } else if (route.title == 'M') {
      return (
        <MonthRoute
          data={route.data}
          average={route.average}
          onRefresh={onRefresh}
          refreshing={refreshing}
          openCalendar={openCalender}
        />
      );
    } else if (route.title == 'Y') {
      return (
        <YearRoute
          data={route.data}
          average={route.average}
          onRefresh={onRefresh}
          refreshing={refreshing}
          openCalendar={openCalender}
        />
      );
    }
  };

  const handleDayPress = () => {
    console.log('Day Pressed');
    setModalVisible(false);
  };

  const openCalender = () => {
    // setModalVisible(true);
  };

  useEffect(() => {
    onAnalytics();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await onAnalytics();
    setRefreshing(false);
  };

  const onAnalytics = async () => {
    try {
      const dayResponse = await getUserSteps('today');
      const weekResponse = await getUserSteps('weekly');
      const monthResponse = await getUserSteps('months');
      const yearResponse = await getUserSteps('years');
      if (dayResponse) {
        const tempAllHours = allHours();
        Object.keys(dayResponse.analytics.total).map((key, value) => {
          const idx = tempAllHours.findIndex(
            o => o.label == dayResponse.analytics.total[value].time,
          );
          if (idx != -1) {
            tempAllHours[idx].value =
              dayResponse.analytics.total[value].total_steps;
          }
        });
        routes[0].data = tempAllHours;
        routes[0].average = dayResponse.analytics.avarage;
      }
      if (weekResponse) {
        const tempAllDays = allDays();
        Object.keys(weekResponse.analytics.total).map((key, value) => {
          const idx = tempAllDays.findIndex(
            o => o.label == weekResponse.analytics.total[value].dayname,
          );
          if (idx != -1) {
            tempAllDays[idx].value =
              weekResponse.analytics.total[value].total_steps;
          }
        });
        routes[1].data = tempAllDays;
        routes[1].average = weekResponse.analytics.avarage;
      }
      if (monthResponse) {
        const tempAllDate = allDates();
        Object.keys(monthResponse.analytics.total).map((key, value) => {
          const idx = tempAllDate.findIndex(
            o => o.label == monthResponse.analytics.total[value].day,
          );
          if (idx != -1) {
            tempAllDate[idx].value =
              monthResponse.analytics.total[value].total_steps;
          }
        });
        routes[2].data = tempAllDate;
        routes[2].average = monthResponse.analytics.avarage;
      }
      if (yearResponse) {
        const tempAllMonth = allMonths();
        Object.keys(yearResponse.analytics.total).map((key, value) => {
          const idx = tempAllMonth.findIndex(
            o => o.label == yearResponse.analytics.total[value].monthname,
          );
          if (idx != -1) {
            tempAllMonth[idx].value =
              yearResponse.analytics.total[value].total_steps;
          }
        });
        routes[3].data = tempAllMonth;
        routes[3].average = yearResponse.analytics.avarage;
      }
      setRoutes(routes);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const allHours = () => {
    const hours = [];
    for (let index = 0; index < 24; index++) {
      hours.push({label: index, value: 0});
    }
    return hours;
  };

  const allDays = () => {
    const days = [];
    const day = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    day.forEach(element => {
      days.push({label: element, value: 0});
    });
    return days;
  };

  const allDates = () => {
    const dates = [];
    for (let index = 1; index <= moment().daysInMonth(); index++) {
      dates.push({label: index, value: 0});
    }
    return dates;
  };

  const allMonths = () => {
    const months = [];
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    month.forEach(element => {
      months.push({label: element, value: 0});
    });
    return months;
  };


  console.log(">>>>>>>>>>>>>",details)
  return (
    <>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'#33313C'}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          title="Step Count"
          props={props}
          backgroundColor={'#33313C'}
          showBack={true}
          userImage={details ? details.user_image : ""}
        />

        <View style={styles.container}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="large" color="#741728" />
            </View>
          ) : (
            <TabView
              {...props}
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
              style={{backgroundColor: '#33313C'}}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{backgroundColor: 'transparent'}}
                  tabStyle={{height: 60}}
                  style={{
                    backgroundColor: '#000',
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 50,
                  }}
                  renderLabel={({route}) => (
                    <>
                      <Text
                        style={[
                          styles.label,
                          route.key === props.navigationState.routes[index].key
                            ? styles.selectedTabText
                            : styles.tabText,
                        ]}>
                        {route.title}
                      </Text>
                    </>
                  )}
                  labelStyle={styles.noLabel}
                />
              )}
            />
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 400,
              marginTop: screenHeight(25),
            }}
            onDayPress={day => {
              handleDayPress(day);
            }}
          />
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default StepCount;
