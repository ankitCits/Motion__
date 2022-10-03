import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { colors, fontFamily, IMAGES, screenWidth } from '../../../theme';

const SolidInput = ({
    value,
    placeholder,
    backgroundColor = colors.CLR_WHITE,
    placeholderTextColor = colors.CLR_BLACK,
    textColor = colors.CLR_BLACK,
    showIcon = true,
    isLight = true,
    icon,
    ...rest
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickIcon = () => {
        console.log('popover')
    }
    return (
        <View style={[styles.containerView, { backgroundColor: backgroundColor }]}>
            <TextInput
                value={value}
                style={[styles.textInput, { color: textColor }]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                {...rest}
            />
            {showIcon && (
                <TouchableOpacity style={styles.iconContainer} onPress={onClickIcon}>
                    <Image
                        style={styles.icon}
                        source={isLight ? IMAGES.info_persian : IMAGES.info_grey}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SolidInput;


const styles = StyleSheet.create({
    containerView: {
        height: 62,
        borderRadius: 30,
        color: colors.CLR_BLACK,
        marginBottom: 10,
    },
    textInput: {
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: fontFamily.SF_PRO_Regular
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        top: 20,
        width: 40,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});
