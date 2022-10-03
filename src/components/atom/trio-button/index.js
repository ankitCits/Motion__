import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Button from '../button';
import {
  colors,
  fontFamily,
  IMAGES,
  screenHeight,
  screenWidth,
} from '../../../theme';

import '../../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const TrioButton = ({ backPress, nextPress, cancelPress, btnTitle, isLoading }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.containerView}>

      <TouchableOpacity onPress={backPress} style={styles.backContainer}>
        <Image source={IMAGES.back_arrow_sign} style={styles.backArrow} />
        <Text style={styles.btnTitle}>{t('back')}</Text>
      </TouchableOpacity>

      <Button
        title={btnTitle}
        titleColor={colors.CLR_WHITE}
        buttonBackColor={colors.CLR_PERSIAN_GREEN}
        onPress={nextPress}
        isLoading={isLoading}
      />

      <TouchableOpacity onPress={cancelPress}>
        <Text style={styles.btnTitle}>{t('cancel')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrioButton;

const styles = StyleSheet.create({
  containerView: {
    marginTop: screenHeight(4),
    flexDirection: 'row',
    width: screenWidth(80),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight(7),
  },
  backContainer: {
    flexDirection: 'row',
  },
  backArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 3
  },
  btnTitle: {
    color: colors.CLR_WHITE,
    fontFamily: fontFamily.ROBOTO_Medium,
    fontSize: screenWidth(4.2),
  }
});
