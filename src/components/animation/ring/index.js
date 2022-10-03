import React, { useEffect } from 'react';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from "react-native-reanimated";

import { colors } from '../../../theme';
import { Dimensions, StyleSheet } from 'react-native';
const Ring = ({ delay }) => {
    const ring = useSharedValue(0);

    const ringStyle = useAnimatedStyle(() => {
        return {
            opacity: 0.7 - ring.value,
            transform: [
                {
                    scale: interpolate(ring.value, [0, 1], [1, 2]),
                },
            ],
        };
    });
    useEffect(() => {
        ring.value = withDelay(
            delay,
            withRepeat(
                withTiming(1, {
                    duration: 4000,
                }),
                -1,
                false
            )
        );
    }, []);
    return <Animated.View style={[styles.ring, ringStyle]} />;
};

export default Ring;


const styles = StyleSheet.create({
    ring: {
        position: "absolute",
        width: 200,
        height: 200,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        borderColor: colors.CLR_WHITE,
        borderWidth: 20,
    },
});
