import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors, fontFamily, IMAGES } from '../../../theme';
import { IMAGE_URL } from '../../../utils';
const Header = ({
  title,
  props,
  backgroundColor = 'transparent',
  showBack = false,
  showProfileIcon = true,
  showNotificationIcon = false,
  userImage,
  ...rest
}) => {
  return (
    <View style={[styles.headerContainer, { backgroundColor: backgroundColor }]}>
      <View style={styles.startIcons}>
        <View>
          {showBack && (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image source={IMAGES.back_arrow} style={{ height: 18 }} />
            </TouchableOpacity>
          )}
          {showNotificationIcon && (
            <TouchableOpacity
              style={[styles.userProfileIcon, { marginRight: 10 }]}
              onPress={() => props.navigation.navigate('Notifications')}>
              <Image source={IMAGES.header_notification} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.titleContainer}>
        {title && (
          <Text
            bold
            style={[
              styles.headerTitle,
              {
                color:
                  backgroundColor == 'transparent'
                    ? colors.BLUE
                    : colors.CLR_WHITE,
              },
            ]}>
            {title}
          </Text>
        )}
      </View>
      <View style={styles.endIcons}>
        {showProfileIcon && (
          <TouchableOpacity
            style={styles.userProfileIcon}
            onPress={() => props.navigation.navigate('Profile')}>
            {userImage != '' ? (
              <Image
                source={{
                  uri: `${IMAGE_URL}${userImage}`,
                }}
                defaultSource={IMAGES.user}
                style={{ height: 32, width: 32, borderRadius: 32 / 2, borderColor: 'white', borderWidth: 1 }}
              />
            ) : (
              <Image source={IMAGES.user} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: fontFamily.AVENIR_BOOK,
  },
  startIcons: {
    // flexDirection: 'row',
  },
  titleContainer: {
    // flexDirection: 'row',
  },
  endIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  userProfileIcon: {
    width: 34,
  },
});
