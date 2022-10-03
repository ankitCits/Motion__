import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { fontFamily } from '../../../theme';

const TextAvatar = ({
    text,
    size = 60,
    textColor = '#fff',
    type,
    style,
    ...rest
}) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getInitials = (string) => {
        let names = string.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    const abbr = getInitials(capitalizeFirstLetter(text));

    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    return (
        <View style={[styles.containerStyle, { width: size, height: size, backgroundColor: generateColor(), borderRadius: size / 2 }]}>
            <Text style={[styles.textStyle, { color: textColor, fontSize: size / 2.14, }]}
                adjustsFontSizeToFit={true}>{abbr}</Text>
        </View>
    );
};

export { TextAvatar };

const styles = StyleSheet.create({
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        letterSpacing: 1,
        fontFamily: fontFamily.ROBOTO_Medium
    }
});
