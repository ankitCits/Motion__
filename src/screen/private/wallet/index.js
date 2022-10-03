import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import Header from '../../../components/atom/header';
import { IMAGES, screenWidth } from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/auth/authSlice';
import { useState } from 'react';
import { useEffect } from 'react';

const Wallet = props => {
  const { t } = useTranslation();
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
      title: 'First Item',
      img: IMAGES.wallet1,
    },
    // {
    //     id: "2",
    //     title: "Second Item",
    //     img: IMAGES.wallet2
    // },
    // {
    //     id: "3",
    //     title: "Third Item",
    //     img: IMAGES.wallet3
    // },
    // {
    //     id: "4",
    //     title: "Fourth Item",
    //     img: IMAGES.wallet4
    // }
  ];
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.walletItems}>
        <Image source={item.img} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="white"
      />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView>
          <LinearGradient
            colors={['#A3D9FF', '#8ACDFF', '#C5F1FF']}
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.2, 0.6]}
            style={styles.box}>
            <View style={styles.roundDesign}></View>
            <Header title={t('wallet')} props={props} userImage={details ? details.user_image : ""} />
            <View style={styles.container}>
              <View style={styles.walletContainer}>
                <Image source={IMAGES.wallet_bg} />
                <Text style={styles.walletTitleText}>50 {t('motion')}</Text>
                <Text style={styles.walletSubTitleText}>
                  {t('earned_today')}
                </Text>
              </View>
            </View>

            <View style={styles.redeemList}>
              <View style={styles.walletIconContainer}>
                <Image source={IMAGES.walletNew} style={styles.walletIcon} />
              </View>
              <View>
                <Text style={styles.walletListTitle}>1000 {t('motion')}</Text>
                <Text style={styles.walletListSubTitle}>
                  {t('available_total')}
                </Text>
              </View>
              <View style={styles.walletRedeemButtonContainer}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Redeem')}
                  style={styles.walletRedeemButton}>
                  <Text style={{ color: 'white', fontSize: 12 }}>
                    {t('redeem')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.list}>
              <ScrollView horizontal={true} style={{ width: '100%' }}>
                <FlatList
                  nestedScrollEnabled
                  numColumns={3} // set number of columns
                  columnWrapperStyle={styles.row} // space them out evenly
                  data={DATA}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                />
              </ScrollView>
            </View>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Wallet;
