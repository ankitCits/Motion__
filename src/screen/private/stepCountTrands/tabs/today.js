import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, } from "react-native";
import { colors, IMAGES, screenHeight, screenWidth } from '../../../../theme';
import CircularProgressBar from '../../../../components/atom/circular-progressbar';
import { LineChart } from "react-native-chart-kit";
import {Rect,Text as TextSVG, Svg } from "react-native-svg";
import { getUserSteps } from "../../../../api/syncstepsourcs";
import { getPairedDecision } from '../../../../storage';
import { nFormatter } from '../../../../utils/helper';

import '../../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
const TodayRoute = props => {
  const { t } = useTranslation();

  const [todayData, setTodayData] = useState(null);

  const getLabels = () => {
    var dates = [];
    if (todayData && todayData.length) {
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
    if (todayData && todayData.length) {
      todayData
        .map(elem => {
          dates.push(elem.value);
        })
        .join(',');
    }
    return dates;
  };

  useEffect(() => {
    onGetMoreAnalytics();
  }, []);

  const onGetMoreAnalytics = async () => {
    let decision = await getPairedDecision()
    console.log("DECISION>>",decision)
    const postTodayData = {
      response_type: `${decision}`,
      type: 'today',
    };
    console.log("TODAY_REQUEST>>",postTodayData)
    const dayResponse = await getUserSteps(postTodayData);
    console.log("TODAY_RESPONSE>>",dayResponse)
    if (dayResponse) {
      const tempAllHours = allHours();
      Object.keys(dayResponse.analytics.total).map((key, value) => {
        const idx = tempAllHours.findIndex(o => o.label == dayResponse.analytics.total[value].time);
        if (idx != -1) {
          tempAllHours[idx].value = dayResponse.analytics.total[value].total_steps;
        }
      });
      setTodayData(tempAllHours)
    }
  }

  const allHours = () => {
    const hours = [];
    for (let index = 0; index < 24; index++) {
      hours.push({ label: index, value: 0 });
    }
    return hours;
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
  let [tooltipPos,setTooltipPos] = useState(
    { x:0, y:0, visible:false, value:0 })

  return (
    <>
      <ScrollView>
        {/* <View style={styles.container}> */}
        {/* <View style={styles.header}>
          <View style={styles.runner}>
            <View style={styles.row}
            >
              <Text style={styles.topContainerText}>0</Text>
              <Text style={styles.subText}>{t("min")}</Text>
            </View>
            <View style={styles.subTopContainer}>
              <Text style={styles.flexStart}>{t('walking')}</Text>
              <Image source={IMAGES.running} />
            </View>
          </View>

          <View style={styles.chartContainer}>
            <CircularProgressBar
              //percent={`${stepPercentage}`}
              startDegrees={90}
              ringBgColor={'#F0F0F0'}
              ringColor={'#fff'}
              bgRingWidth={8}
              progressRingWidth={8}
              radius={60}
              //image={IMAGES.runner}
              textFontColor={colors.CLR_WHITE}
              titleText={'0'}
              titleTextFontSize={40}
              titleTextFontWeight={'900'}
              subTitleText={'min/60'}
              subTitleTextFontSize={20}
              subTitleTextFontWeight={'300'}
            />
          </View>

          <View style={styles.runner}>
            <View style={styles.row}
            >
              <Text style={styles.topContainerText}>0</Text>
              <Text style={styles.subText}>{t("min")}</Text>
            </View>
            <View style={styles.subTopContainer}>
              <View >
                <Image source={IMAGES.running} />
              </View>
              <View>
                <Text>{t('walking')}</Text>
              </View>
            </View>
          </View>
        </View> */}

        {todayData && todayData.length > 0 &&
          <View style={styles.middleContainer}>
            <View style={styles.middleContainerSubtext}>
              <Text style={styles.chartTitle}>{t('daily_activity')}</Text>
              <Text style={styles.chartText}>{t('calories')}</Text>
            </View>

            <LineChart
              data={{
                labels: getLabels(),
                datasets: [
                  {
                    data: getValues(),
                  },
                ],
              }}
              width={Dimensions.get('window').width}
              height={250}
              formatXLabel={value => xFormatter(value)}
              formatYLabel={value => nFormatter(value)}
              chartConfig={{
                labelColor: () => `#000`,
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
                style: {
                  width: '100%',
                  backgroundColor: '#F9F9F9'
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
                marginTop: 5,
              }}

              decorator={() => {
                return tooltipPos.visible ? <View>
                    <Svg>
                        <Rect x={tooltipPos.x - 20} 
                              y={tooltipPos.y + 10} 
                              width="85" 
                              height="30"
                              fill="white" />
                            <TextSVG
                                x={tooltipPos.x + 5} 
                                y={tooltipPos.y + 30}
                                fill="black"
                                fontSize="16"
                                fontWeight="bold"
                                textAnchor="middle">
                                Steps {tooltipPos.value}
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
        }

        <View style={styles.bottomMiniContainer}>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomDetails}>
              <Image source={IMAGES.fire} />
              <Text style={styles.chartValue}>
                0  {t('cal')}
              </Text>
              <Text>{t('calories')}</Text>
            </View>
            <View style={styles.bottomDetails}>
              <Image source={IMAGES.fire} />
              <Text style={styles.chartValue}>
                0 {('km')}
              </Text>
              <Text>{t('distance')}</Text>
            </View>
            <View style={styles.bottomDetails}>
              <Image source={IMAGES.fire} />
              <Text style={styles.chartValue}>
                0 {t('hrs')}
              </Text>
              <Text style={{ width: screenWidth(30), }}>{t('longest_active_time')}</Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </>
  )

}
const styles = StyleSheet.create({
  // container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    height: 160,
    //marginHorizontal: 12,
    //width: screenWidth(95),
  },
  runner: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-end",
    width: screenWidth(32),
    marginBottom: screenHeight(3)
  },
  row: { flexDirection: "row" },
  flexStart: {
    alignSelf: "flex-start"
  },
  bottomMiniContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: 16,
    backgroundColor: '#333333'
  },
  bottomContainer: {
    flexDirection: 'row',
    //marginVertical:5,
    backgroundColor: '#FFFFFF'
  },
  bottomDetails: {
    alignItems: "center",
    marginVertical: screenHeight(5),
    width: screenWidth(35),
  },
  chartContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: screenWidth(32),
  },
  chartValue: {
    fontFamily: "black",
    fontWeight: '700',
    fontSize: 15,
    color: colors.CLR_BLACK,
    textAlign: 'center',
    paddingLeft: 5,
    marginTop: 12,
  },
  chartTitle: {
    marginTop: 5,
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 18
  },
  chartText: {
    marginTop: 5,
    marginLeft: 10,
  },
  topContainerText: {
    fontSize: 30,
    color: colors.CLR_GRAY_TEXT,
    fontWeight: "500",
  },
  middleContainer: {
    flexDirection: "column",
    backgroundColor: "#F9F9F9",
    alignItems: "flex-start",
    height: 300,
  },
  middleContainerSubtext: {
    paddingLeft: 10,
    marginVertical: 2
  },
  subText: {
    paddingTop: 20,
    color: "green",
    fontSize: 16,
  },
  subTopContainer: {
    flexDirection: "row",
    ///alignItems: "center",
  },

})
export default TodayRoute;