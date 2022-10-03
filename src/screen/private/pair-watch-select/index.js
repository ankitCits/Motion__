import { View, Text, StatusBar, ImageBackground,SafeAreaView, Systrace } from 'react-native';
import React, { useState } from 'react';
import { IMAGES,commonStyle } from '../../../theme';
import { styles } from './styles';
import TrioButton from '../../../components/atom/trio-button';
import { DropDown } from '../../../components/atom/dropdown';
import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const PairWatchSelect = props => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(undefined);
  const data = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
    { label: 'six', value: '6' },
    { label: 'seven', value: '7' },
  ];
  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <SafeAreaView style={commonStyle.safeAreaView}>

        <ImageBackground
          style={commonStyle.backgroundView}
          source={IMAGES.background_un_bg}>
          <View style={styles.container}>
            <Text style={[commonStyle.titleText, styles.textTitle]}>{t('pair_watch')}</Text>
            <Text style={styles.textDetail}>
            {t(pair_watch_later_note)}
            </Text>
            <View style={styles.selectListContainer}>
              <DropDown label={t('select_watch')} data={data} onSelect={setSelected} />
            </View>
            <TrioButton
              btnTitle={t('next')}
              backPress={() => props.navigation.goBack()}
              nextPress={() => props.navigation.navigate('PairWatchSuccessfully')}
              cancelPress={() => console.log('log new data')}
              style={styles.selected}
            />
           
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default PairWatchSelect;
