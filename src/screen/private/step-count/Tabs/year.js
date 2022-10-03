import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList
} from 'react-native';
import React from 'react';
import {colors, fontFamily, IMAGES} from '../../../../theme';
import {styles} from '../styles';
import {BarChart} from 'react-native-chart-kit';
import {formattedDate, nFormatter} from '../../../../utils/helper';

import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import {useState} from 'react';
const YearRoute = ({data, average, refreshing, onRefresh, openCalendar}) => {
  const refRBSheet = useRef();
  const [currentDay, setCurrentDay] = useState(null);

  const DATA = [
    {
      id: '1',
      title: 'Sep 2022',
    },
    {
      id: '2',
      title: 'Prev Year',
    },

  ];

  const renderItem = ({item}) => (
    <View
      style={{
        // backgroundColor:'red',
        alignSelf: 'center',
        padding: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          setCurrentDay(item.title);
          refRBSheet.current.close();
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: currentDay
              ? currentDay == item.title
                ? '#000'
                : 'grey'
              : formattedDate(new Date(), 'dddd') == item.title
              ? '#000'
              : 'grey',
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
  const getLabels = () => {
    var dates = [];
    if (data) {
      data
        .map(elem => {
          dates.push(elem.label);
        })
        .join(',');
    }
    return dates;
  };

  const getValues = () => {
    var dates = [];
    if (data) {
      data
        .map(elem => {
          dates.push(elem.value);
        })
        .join(',');
    }
    return dates;
  };
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounce={false}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {currentDay ? currentDay : formattedDate(new Date(), 'MMM yyyy')}{' '}
            </Text>
            <Image source={IMAGES.down_arrow} />
          </View>
        </TouchableOpacity>

        <View style={styles.stepContainer}>
          <LinearGradient
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            locations={[0.0, 0.99]}
            colors={['#325B65', '#344650']}
            style={styles.stepIconContainer}>
            <Image source={IMAGES.footsteps} />
          </LinearGradient>
          <LinearGradient
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            locations={[0.0, 0.99]}
            colors={['#325B65', '#344650']}
            style={styles.stepDetailsContainer}>
            <View>
              <Text
                style={{
                  color: colors.CLR_WHITE,
                  fontSize: 15,
                  fontFamily: fontFamily.AVENIR_BOOK,
                  paddingLeft: 10,
                  paddingTop: 10,
                }}>
                STEP COUNT
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#97DAD3',
                borderBottomWidth: 1,
                paddingBottom: 12,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 25,
                  fontWeight: '500',
                  paddingLeft: 10,
                }}>
                {average.total_steps}
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  color: '#a6b9bf',
                  paddingTop: 12,
                  fontSize: 14,
                }}>
                Average steps
              </Text>
            </View>

            <View style={{flexDirection: 'row', paddingBottom: 8}}>
              <Image
                source={IMAGES.fire}
                style={{height: 22, width: 20, marginLeft: 10}}
              />
              <Text style={{color: '#a6b9bf', fontSize: 13, paddingLeft: 12}}>
                {average.total_burn_calorie} Kcal
              </Text>
              <Image
                source={IMAGES.running}
                style={{height: 22, width: 20, marginLeft: 25}}
              />
              <Text style={{color: '#a6b9bf', fontSize: 13, paddingLeft: 12}}>
                {average.total_distance} Km
              </Text>
            </View>
          </LinearGradient>
        </View>

        {data && (
          <View style={styles.chartcontainer}>
            <LinearGradient
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              locations={[0.0, 0.99]}
              colors={['#325B65', '#344650']}
              style={styles.chartDetailContainer}>
              <BarChart
                style={{
                  marginLeft: -16,
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
                  color: (opacity = 1) => `#FFF`,
                  barPercentage: 0.2,
                  barRadius: 5,
                  formatYLabel: value => nFormatter(value),
                  formatXLabel: value => value.substring(0, 1),
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
        )}
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </RBSheet>
    </>
  );
};

export default YearRoute;
