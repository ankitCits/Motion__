import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from "react";
import { colors, fontFamily, IMAGES } from '../../../theme';

const StarRating = ({ isEdit, size = 0 }) => {
  const [rating, setRating] = useState(size);
  return (
    <View style={styles.containerStyle}>
      {[...Array(5)].map((star, index) => {
        return (
          isEdit ?
            <TouchableOpacity
              key={index}
              style={index <= rating ? styles.on : styles.off}
              onPress={() => setRating(++index)}
            >
              <Image
                style={styles.star}
                source={index < rating ? IMAGES.star : IMAGES.start_outline}
              />
            </TouchableOpacity>
            :
            <Image
              key={index}
              style={styles.star}
              source={index < rating ? IMAGES.star : IMAGES.start_outline}
            />
        );
      })}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    letterSpacing: 1,
    fontFamily: fontFamily.ROBOTO_Medium
  },
  star: {
    marginVertical: 10,
    marginHorizontal: 1
  },
  on: {
    color: colors.BLUE,
  },
  off: {
    color: '#ccc'
  }
});