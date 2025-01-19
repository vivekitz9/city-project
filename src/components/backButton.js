import * as React from 'react';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../constant';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const BackHeader = ({
    onPress,
    disabled
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.6}
            disabled={disabled}
            style={[styles.container]}
        >
             <Icon 
              name='left'
              size={20}
              color={COLORS.black}
            />
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        marginLeft: 20, 
        marginVertical: 20, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: FONT.Medium,
        fontSize: FONTS_SIZE.xsmall2,
        color: COLORS.Primary_2,
        textTransform: "uppercase",
    }
});

export default BackHeader;