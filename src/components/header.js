import * as React from 'react';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../constant';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const HeaderComponent = ({
    onPress,
    disabled
}) => {
    return (
        <View style={styles.container}>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
       backgroundColor: "#E4C3B4",
       height: 55,
       width: '100%'
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: FONT.Medium,
        fontSize: FONTS_SIZE.xsmall2,
        color: COLORS.Primary_2,
        textTransform: "uppercase",
    }
});

export default HeaderComponent;