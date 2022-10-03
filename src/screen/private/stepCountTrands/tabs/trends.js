import moment from 'moment';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { TabBar, TabView } from 'react-native-tab-view';
import { getUserSteps } from '../../../../api/syncstepsourcs';
import { getPairedDecision } from '../../../../storage';

import {
  colors,
  fontFamily,
  IMAGES,
  screenHeight,
  screenWidth,
} from '../../../../theme';
import { nFormatter } from '../../../../utils/helper';

import '../../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const TrendsRoute = ({ props, data }) => {
  const { t } = useTranslation();
  const refRBSheet = useRef();
  const [selectedItem, setSelectedItem] = useState('Month');
  const [selectedChartData, setSelectedChartData] = useState([]);
  const months = [
    { key: 1, title: 'Jan' },
    { key: 2, title: 'Feb' },
    { key: 3, title: 'Mar' },
    { key: 4, title: 'Apr' },
    { key: 5, title: 'May' },
    { key: 6, title: 'Jun' },
    { key: 7, title: 'Jul' },
    { key: 8, title: 'Aug' },
    { key: 9, title: 'Sep' },
    { key: 10, title: 'Oct' },
    { key: 11, title: 'Nov' },
    { key: 12, title: 'Dec' },
  ];
  const [chartData, setChartData] = useState({});
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState(months);
  const DATA = [
    {
      id: '1',
      title: 'Days',
    },
    {
      id: '2',
      title: 'Weeks',
    },
    {
      id: '3',
      title: 'Months',
    },
  ];

  useEffect(() => {
    onGetMoreAnalytics();
  }, []);

  const onGetMoreAnalytics = async () => {

    let decision = await getPairedDecision()
    console.log("DECISION>>", decision)

    try {
      const postDataToday = {
        response_type: `${decision}`,
        type: 'today',
      };

      const postDataWeek = {
        response_type: `${decision}`,
        type: 'weekly',
      };

      const postDataMonth = {
        response_type: `${decision}`,
        type: 'months',
      };
      const dayResponse = await getUserSteps(postDataToday);
      const weekResponse = await getUserSteps(postDataWeek);
      const monthResponse = await getUserSteps(postDataMonth);
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

        //console.log("day data",tempAllHours);
        chartData.days = tempAllHours;
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
        //console.log("week data",tempAllDays);
        chartData.week = tempAllDays;
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
        //console.log("months data",tempAllDate);
        chartData.months = tempAllDate;
        setSelectedChartData(tempAllDate);
      }
      setChartData(chartData);
      // console.log('chart Data > ', chartData);
      setRoutes(routes);
    } catch (error) {
      console.log('stepCountTrends > onAnalytics > catch > ', error);
    }
  };

  const allHours = () => {
    const hours = [];
    for (let index = 0; index < 24; index++) {
      hours.push({ label: index, value: 0 });
    }
    return hours;
  };

  const allDates = () => {
    const dates = [];
    for (let index = 1; index <= moment().daysInMonth(); index++) {
      dates.push({ label: index, value: 0 });
    }
    return dates;
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
      days.push({ label: element, value: 0 });
    });
    return days;
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
      months.push({ label: element, value: 0 });
    });
    return months;
  };

  const setItem = title => {
    const dates = [];
    for (let index = 1; index <= moment().daysInMonth(); index++) {
      dates.push({ key: index, title: index.toString() });
    }
    if (title === 'Days') {
      setRoutes(dates);
      // console.log('selected chart Data >', chartData.days);
      setSelectedChartData(chartData.days);
    } else if (title == 'Weeks') {
      const weeks = [
        { key: 1, title: 'Monday' },
        { key: 2, title: 'Tuesday' },
        { key: 3, title: 'Wednesday' },
        { key: 4, title: 'Thursday' },
        { key: 5, title: 'Friday' },
        { key: 6, title: 'Saturday' },
        { key: 7, title: 'Sunday' },
      ];
      // console.log('selected chart Data >', chartData.week);
      setSelectedChartData(chartData.week);
      setRoutes(weeks);
    } else if (title == 'Months') {
      setRoutes(months);
      // console.log('selected chart Data >', chartData.months);
      setSelectedChartData(chartData.months);
    } else {
      setRoutes(months);
      // console.log('selected chart Data >', chartData.months);
      setSelectedChartData(chartData.months);
    }
  };

  const renderScene = ({ route, jumpTo }) => {
    return (
      <View style={[styles.header, styles.textCenter]}>
        <Text style={styles.bodyTitle}>{route.title}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.textCenter, styles.bordered]}>
        <TouchableOpacity
          style={[styles.actionSheetItem, styles.textCenter]}
          onPress={() => {
            setSelectedItem(item.title);
            setItem(item.title);
            refRBSheet.current.close();
          }}>
          <Text
            style={[
              styles.actionSheetItemText,
              selectedItem == item.title ? styles.selectedItemText : '',
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getLabels = () => {
    var dates = [];
    if (selectedChartData && selectedChartData.length > 0) {
      selectedChartData
        .map((elem, i) => {
          dates.push(elem.label);
        })
        .join(',');
    }
    return dates;
  };

  const getValues = () => {
    var dates = [];
    if (selectedChartData && selectedChartData.length > 0) {
      selectedChartData
        .map((elem, i) => {
          dates.push(elem.value);
        })
        .join(',');
    }
    return dates;
  };

  const xFormatter = value => {
    let val = '';
    if (!(value % 5)) {
      if (value < 10) {
        val = '0' + value + ':00';
      } else {
        val = value + ':00';
      }
    } else {
      val = '';
    }
    return val;
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => refRBSheet.current.open()}>
            <Text style={styles.rowText}>{selectedItem}</Text>
            <Image
              source={IMAGES.down_arrow}
              style={styles.downArrow}
              defaultSource={IMAGES.down_arrow}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.body]}>
          <View style={{ marginHorizontal: 0 }}>
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              locations={[0.0, 0.99]}
              colors={['#ffff', '#ffff']}
              style={styles.chartDetailContainer}>
              <BarChart
                style={{
                  marginLeft: -28,
                }}
                data={{
                  labels: getLabels(),
                  datasets: [
                    {
                      data: getValues(),
                      strokeWidth: 3,
                      color: () => '#002AFF',
                    },
                  ],
                }}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientTo: 'white',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientFrom: 'white',
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `black`,
                  barPercentage: 0.2,
                  barRadius: 5,
                  formatYLabel: value => nFormatter(value),
                  formatXLabel:
                    selectedItem == 'Days'
                      ? value => xFormatter(value)
                      : selectedItem == 'Weeks'
                        ? value => value[0]
                        : value => (!(value % 5) ? value : ''), //xFormatter(value),
                  useShadowColorFromDataset: false, // optional
                  fillShadowGradient: '#BE95FF',
                  fillShadowGradientOpacity: 1,
                }}
                withHorizontalLabels={true}
                fromZero={true}
                withInnerLines={false}
                showBarTops={false}
                showValuesOnTopOfBars={false}
              />
            </LinearGradient>
          </View>
        </View>
        {/* <View style={{}}>
                    <View style={styles.tabContainer}>
                        <TabView
                            {...props}
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            style={styles.tabSubContainer}
                            renderTabBar={props => (
                                <TabBar
                                    {...props}
                                    indicatorStyle={styles.indicatorStyle}
                                    scrollEnabled={true}
                                    style={styles.tabStyle}
                                    renderLabel={({ route }) => (
                                        <>
                                            <View style={styles.tabContainer}>
                                                <Text
                                                    style={[
                                                        styles.label,
                                                        route.key == routes[index].key
                                                            ? styles.selectedTabText
                                                            : styles.tabText,
                                                    ]}>
                                                    {route.title}
                                                </Text>
                                            </View>
                                        </>
                                    )}
                                />
                            )}
                        />

                    </View>
                </View> */}
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderRadius: 15,
            backgroundColor: 'transparent',
            elevation: 0,
          },
          wrapper: {
            backgroundColor: 'transparent',
            margin: 7,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
        }}>
        <FlatList
          style={styles.actionSheetList}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={[styles.actionSheetCancel, styles.textCenter]}>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
            }}>
            <Text style={styles.actionSheetCancelText}>{t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

export default TrendsRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#A6DBFF', //'#E0E0E0 '
  },
  header: {
    marginHorizontal: screenWidth(5),
    marginVertical: screenHeight(2),
  },
  textCenter: {
    alignItems: 'center',
  },

  body: {
    // borderBottomWidth: 2,
    // borderBottomColor:'grey',
    // borderTopWidth: 2,
    // borderTopColor:'grey',
    // borderStyle: "dotted",
    marginVertical: screenHeight(1),
    //paddingVertical: screenHeight(1),
    marginHorizontal: screenWidth(1),
  },
  bodyTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: fontFamily.AVENIR_BLACK,
  },
  chartDetailContainer: {
    paddingHorizontal: 10,
    width: screenWidth(98),
    flexDirection: 'column',
    borderRadius: 20,
  },
  bordered: {
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    borderStyle: 'dotted',
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downArrow: {
    tintColor: 'black',
    marginTop: 8,
    margin: 6,
  },
  rowText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: fontFamily.SF_PRO_Regular,
  },
  actionSheetList: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: screenWidth(80),
    alignSelf: 'center',
    elevation: 2,
  },
  actionSheetItem: {
    padding: screenWidth(5),
    width: screenWidth(60),
  },
  actionSheetItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6AC499',
  },
  selectedItemText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#44A729',
  },
  actionSheetCancel: {
    width: screenWidth(80),
    borderRadius: 10,
    height: screenHeight(6),
    margin: screenHeight(1),
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 0,
    backgroundColor: colors.CLR_WHITE,
  },
  actionSheetCancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#DB514C',
  },
  tabContainer: {
    width: '100%',
    height: '100%',
  },
  tabSubContainer: {
    paddingVertical: screenHeight(13),
  },
  tabStyle: {
    backgroundColor: '#E5E5E5',
    color: '#E5E5E5',
    elevation: 0,
    padding: 4,
  },
  indicatorStyle: {
    backgroundColor: 'transparent',
  },
  label: {
    fontFamily: fontFamily.ROBOTO_REGULAR,
    fontWeight: '400',
  },
  selectedTabText: {
    backgroundColor: '#242424',
    color: '#fff',
    width: 'auto',
    borderRadius: 5,
    textAlignVertical: 'center',
    paddingHorizontal: screenWidth(3),
    flex: 1,
    marginVertical: -7,
    fontSize: 18,
    fontWeight: '500',
  },
  tabText: {
    backgroundColor: 'transparent',
    color: '#7F7F7F',
    width: 'auto',
    borderRadius: 5,
    textAlignVertical: 'center',
    paddingHorizontal: screenWidth(2),
    flex: 1,
    marginVertical: -5,
    fontSize: 18,
    fontWeight: '500',
  },
});
