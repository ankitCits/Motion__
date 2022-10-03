import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import Header from '../../../components/atom/header';
import { styles } from './styles';
import RewardRoute from './tabs/rewards';
import TodayRoute from './tabs/today';
import TrendsRoute from './tabs/trends';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/auth/authSlice';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const StepCountTrands = props => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'today', title: 'Today' },
    { key: 'trends', title: 'Trends' },
    { key: 'rewards', title: 'Rewards' },
  ]);
  const isFocused = useIsFocused();
  const userDetails = useSelector(getUser);
  const [details, setUserDetails] = useState(userDetails);
  useEffect(() => {
    if (isFocused) {
      setUserDetails(userDetails);
    }
  }, [isFocused]);

  const renderScene = ({ route, jumpTo }) => {
    if (route.title == 'Today') {
      return <TodayRoute />;
    } else if (route.title == 'Trends') {
      return <TrendsRoute />;
    } else if (route.title == 'Rewards') {
      return <RewardRoute />;
    }
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'#3A7EE8'}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          title={t('be_more_active')}
          props={props}
          backgroundColor={'#3A7EE8'}
          showBack={true}
          userImage={details ? details.user_image : ""}
        />
        {/* Tabview */}

        <View style={styles.container}>
          <TabView
            {...props}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={styles.tabSubContainer}
            renderTabBar={props => (
              <>
                <TabBar
                  {...props}
                  indicatorStyle={styles.indicatorStyle}
                  style={styles.tabStyle}
                  renderLabel={({ route }) => (
                    <>
                      <View style={styles.tabContainer}>
                        <Text
                          style={[
                            styles.label,
                            route.key ===
                              props.navigationState.routes[index].key
                              ? styles.selectedTabText
                              : styles.tabText,
                          ]}>
                          {route.title}
                        </Text>
                      </View>
                    </>
                  )}
                  labelStyle={styles.noLabel}
                />
                <View
                  style={{
                    borderWidth: 3,
                    borderColor: '#e8e8e8',
                    margin: 1,
                    borderTopColor: 'd8d8d8',
                  }}></View>
              </>
            )}
          />
        </View>
        {/* End Tabview */}
      </SafeAreaView>
    </>
  );
};

export default StepCountTrands;
