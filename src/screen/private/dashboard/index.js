import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
  RefreshControl,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgressBar from '../../../components/atom/circular-progressbar';
import { colors, IMAGES, screenWidth } from '../../../theme';
import { LineChart } from 'react-native-chart-kit';
import { getUser, getUserToken } from '../../../redux/auth/authSlice';
import { useSelector } from 'react-redux';
import { getFCMToken, getFitbitToken, setPairedDecision } from '../../../storage';
import {
  getUserActiveTotalSteps,
  getUserSteps,
  syncStepDestination,
  syncStepSource,
} from '../../../api/syncstepsourcs';
// import { useIsFocused } from '@react-navigation/native';
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
// import { startCounter, stopCounter } from 'react-/native-accurate-step-counter';
// import Pedometer from 'rn-pedometer';
import {
  check,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import moment from 'moment';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';

const Dashboard = props => {
  const { t } = useTranslation();

  const [fitbitData, setFitbitData] = useState({
    steps: { value: '0' },
    calories: { value: '0' },
    distance: { value: '0' },
    hours: { value: '0' },
  });
  const [stepTarget, setStepTarget] = useState(10000);
  const [stepPercentage, setStepPercentage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [todayData, setTodayData] = useState(null);
  const [isGoogleFitConnected, setIsGoogleFitConnected] = useState(false);
  const [isFitBitToken, setIsFitBitToken] = useState();
  const [request_type, setRequest_type] = useState(null);
  const [steps, setSteps] = useState(0);
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  const isFocused = useIsFocused();
  const checkAuth = async () => {
    // console.log('checkAuth', isFitBitToken)
    if (!isFitBitToken) {
      GoogleFit.checkIsAuthorized().then(res => {
        // console.log('CHECK_AUTH>>', GoogleFit.isAuthorized);
        if (GoogleFit.isAuthorized) {
          askPermission();
          setIsGoogleFitConnected(true);
        } else {
          makeAuth();
        }
      });
    } else {
      fetchStep();
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      // console.log('focus')
      const fToken = await getFitbitToken();
      setIsFitBitToken(fToken);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    checkAuth();

    const updateInterval = setInterval(() => {
      fetchStep();
    }, 600000);
    return () => {
      clearInterval();
    };
  }, []);

  useEffect(() => {
    fetchStep();
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isGoogleFitConnected, isFitBitToken, isFocused]);

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
    // console.log('askPermission');
    check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(async result => {
      // console.log('askPermission', result);
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
          setIsGoogleFitConnected(true);
          break;
      }
    });
  };

  const fetchStep = async () => {
    // console.log('fetchStep', isGoogleFitConnected, isFitBitToken);
    try {
      if (isFitBitToken) {
        await setPairedDecision('watch')
        const fetFitbitData = await syncStepSource(isFitBitToken);
        // console.log('fetFitbitData', fetFitbitData);
        if (Object.keys(fetFitbitData).length > 0) {
          const postData = {
            steps: fetFitbitData.steps.value,
            burn_calorie: fetFitbitData.calories.value,
            response_type: 'watch',
          };
          const response = await syncStepDestination(postData);
          // console.log('response', response)
          setFitbitData({
            steps: { value: `${response.analytics.steps}` },
            calories: { value: `${response.analytics.burn_calorie}` },
            distance: { value: `${response.analytics.distance}` },
            hours: { value: '0' },
          });
          setRequest_type('watch');
        } else {
          const postData = {
            steps: 0,
            burn_calorie: 0,
            response_type: 'watch',
          };
          const response = await syncStepDestination(postData);
          setFitbitData({
            steps: { value: `${response.analytics.steps}` },
            calories: { value: `${response.analytics.burn_calorie}` },
            distance: { value: `${response.analytics.distance}` },
            hours: { value: '0' },
          })
        }
        onAnalytics('watch');
      } else if (isGoogleFitConnected) {
        await setPairedDecision('mobile')
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        const opt = {
          startDate: moment()
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString(), // required ISO8601Timestamp
          endDate: localISOTime
          // endDate: moment().toISOString(), // required ISO8601Timestamp
          // bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
          // bucketInterval: 1, // optional - default 1.
        };
        // console.log(opt)
        let activeSteps = await GoogleFit.getDailyStepCountSamples(opt);
        let activeCalorie = await GoogleFit.getDailyCalorieSamples(opt);

        // console.log(activeSteps);
        const steps = activeSteps
          .filter(as => as.source === 'com.google.android.gms:estimated_steps')
          .map(as => as.steps[0]);

        console.log("GOOGLE_FIT_RESPONSE:", steps[0])
        // console.log(">>>>>>>>>>>>>>>>>>>>>", activeCalorie[0].calorie)

        if (steps.length > 0 || activeCalorie.length > 0) {
          setFitbitData({
            steps: { value: steps[0].value },
            calories: { value: activeCalorie[0].calorie },
            distance: { value: parseInt(steps[0].value) / 1000 },
            hours: { value: '0' },
          });
          setRequest_type('mobile');

          let postData = {
            steps: steps[0].value.toFixed(2),
            burn_calorie: activeCalorie[0].calorie.toFixed(2),
            response_type: 'mobile',
          };
          console.log("RESPONSE>>>>POST",postData)
          let data = await syncStepDestination(postData);
          console.log("RESPONSE>>>>",data)
          onAnalytics('mobile');
        }
      }
      // setTimeout(() => {
      //   if (fitbitData.steps.value > 0) {
      //     setStepPercentage((fitbitData.steps.value / stepTarget) * 100);
      //   }
      // }, 500);
    } catch (e) {
      console.log('fetchStep > Error', e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    fetchStep();
    setRefreshing(false);
  };

  const allHours = () => {
    const hours = [];
    for (let index = 0; index < 24; index++) {
      hours.push({ label: index, value: 0 });
    }
    return hours;
  };

  const onAnalytics = async (paired) => {
    try {
      const postData = {
        response_type: paired,
        type: 'today',
      };
      const dayResponse = await getUserSteps(postData);
      console.log('ANALYTICS_DASHBOARD_RESPONSE:', dayResponse);
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
        setTodayData(tempAllHours);
      }
    } catch (error) {
      console.log('onAnalytics > Error', error);
    }
  };

  const getLabels = () => {
    var dates = [];
    if (todayData) {
      todayData
        .map(elem => {
          dates.push(elem.label);
        })
        .join(',');
    }
    return dates;
  };

  const getValues = () => {
    var dates = [];
    if (todayData) {
      todayData
        .map(elem => {
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

  let [tooltipPos, setTooltipPos] = useState(
    { x: 0, y: 0, visible: false, value: 0 })
  return (
    <>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="#A6DBFF"
      />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.container}
          showsVerticalScrollIndicator={false}
          bounce={false}>

          <Header props={props} showNotificationIcon={true} userImage={details && details.user_image ? details.user_image : ""} />

          {!isGoogleFitConnected && !isFitBitToken &&
            <TouchableOpacity style={styles.topContainer}
              onPress={() => props.navigation.navigate('ConnectStep')}>
              <Text style={{ color: colors.CLR_WHITE, fontSize: 16 }}>{t('connect_watch_motion')} </Text>
            </TouchableOpacity>
          }

          <Text style={styles.titleText}>{t('today')}</Text>

          <View style={styles.mainChartContainer}>
            <CircularProgressBar
              percent={`${fitbitData.steps.value / 100}`}
              startDegrees={90}
              ringBgColor={'#fff'}
              ringColor={'#002AFF'}
              bgRingWidth={8}
              progressRingWidth={8}
              radius={100}
              image={IMAGES.runner}
              textFontColor={colors.CLR_WHITE}
              titleText={fitbitData.steps.value}
              titleTextFontSize={40}
              titleTextFontWeight={'900'}
              subTitleText={`${t('goal')} ${stepTarget}`}
              subTitleTextFontSize={20}
              subTitleTextFontWeight={'300'}
            />
          </View>

          <View style={styles.miniContainer}>
            <View style={styles.miniChartContainer}>
              <CircularProgressBar
                percent={50}
                startDegrees={90}
                ringBgColor={'#fff'}
                ringColor={'#002AFF'}
                bgRingWidth={5}
                progressRingWidth={5}
                radius={40}
                image={IMAGES.ckal}
              />
              <Text style={styles.chartValue}>
                {parseFloat(fitbitData.calories.value).toFixed(0)} {t('cal')}
              </Text>
            </View>
            <View style={styles.miniChartContainer}>
              <CircularProgressBar
                percent={15}
                startDegrees={90}
                ringBgColor={'#fff'}
                ringColor={'#002AFF'}
                bgRingWidth={5}
                progressRingWidth={5}
                radius={40}
                image={IMAGES.km}
              />
              <Text style={styles.chartValue}>
                {parseFloat(fitbitData.distance.value).toFixed(2)} {t('km')}
              </Text>
            </View>
            <View style={styles.miniChartContainer}>
              <CircularProgressBar
                percent={0}
                startDegrees={90}
                ringBgColor={'#fff'}
                ringColor={'#002AFF'}
                bgRingWidth={5}
                progressRingWidth={5}
                radius={40}
                image={IMAGES.hrs}
              />
              <Text style={styles.chartValue}>
                {parseFloat(fitbitData.hours.value).toFixed(2)} {t('hrs')}
              </Text>
            </View>
          </View>

          {todayData && (
            <View style={styles.lineChartContainer}>
              <LineChart
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
                // withHorizontalLabels={false}
                // withInnerLines={false}
                // withOuterLines={false}
                // withVerticalLabels={true}
                // fromZero
                formatXLabel={value => xFormatter(value)}
                chartConfig={{
                  labelColor: () => `#000`,
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
                  style: {
                    width: '100%',
                  },
                  propsForBackgroundLines: {
                    stroke: 'transparent',
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '1',
                    stroke: '#002AFF',
                  },
                }}
                style={{
                  marginTop: 20,
                  paddingRight: 10,
                }}
                decorator={() => {
                  return tooltipPos.visible ? <View>
                    <Svg>
                      <Rect x={tooltipPos.x - 15}
                        y={tooltipPos.y + 10}
                        width="40"
                        height="30"
                        fill="white" />
                      <TextSVG
                        x={tooltipPos.x + 5}
                        y={tooltipPos.y + 30}
                        fill="black"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle">
                        {tooltipPos.value}
                      </TextSVG>
                    </Svg>
                  </View> : null
                }}
                onDataPointClick={(data) => {

                  let isSamePoint = (tooltipPos.x === data.x
                    && tooltipPos.y === data.y)

                  isSamePoint ? setTooltipPos((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible
                    }
                  })
                    :
                    setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });

                }}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
