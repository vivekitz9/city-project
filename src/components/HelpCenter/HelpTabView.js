import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { useTranslation } from 'react-i18next';

const HelpCenterTabViewScreen = ({ onPress }) => {
    const [t] = useTranslation('translation');
    const [toggle, setToggle] = useState(true)

    const handlePress = (values) => {
        setToggle(!toggle)
        onPress(values)
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity style={[styles.button, { borderColor: toggle ? COLORS.Primary_2 : '#D9D9D9' }]} onPress={() => handlePress('faq')} activeOpacity={0.6}>
                <Text style={[styles.buttonText, { color: toggle ? "#000" : "#B3B3B3" }]}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderColor: !toggle ? COLORS.Primary_2 : '#D9D9D9' }]}  activeOpacity={0.6} onPress={() => handlePress('contact')}>
                <Text style={[styles.buttonText, { color: !toggle ? "#000" : "#B3B3B3" }]}>CONTACT US</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '50%',
        borderBottomWidth: 2
    },
    buttonText: {
        fontFamily: FONT.BoldRoboto, 
        textAlign: 'center', 
        paddingVertical: 5, 
        fontSize: FONTS_SIZE.xsmall2, 
        fontWeight: '600',
    }
});

export default HelpCenterTabViewScreen;
