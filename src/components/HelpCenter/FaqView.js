import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FaqViewScreen = ({ data }) => {
    const [t] = useTranslation('translation');
    const [toggle, setToggle] = useState(false)

    const handlePress = (values) => {
        setToggle(!toggle)
    }

    return (
        <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, marginTop: 10 }}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.6} style={{ flexDirection: 'row', width: '98%', alignItems: 'center' }}>
                <Text style={{ fontFamily: FONT.Semibold, fontSize: FONTS_SIZE.regular, fontWeight: '600', color: COLORS.black, width: '95%' }}>{data.title}</Text>
                {toggle ? <Icon name="arrow-drop-up" size={30} color={COLORS.black} />
                    :
                    <Icon name="arrow-drop-down" size={30} color={COLORS.black} />
                }
            </TouchableOpacity>
            {toggle && <View style={{ borderTopWidth: 0.5, marginTop: 10, borderColor: COLORS.gray }}>
                <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall, fontWeight: '400', color: COLORS.black, paddingTop: 10, lineHeight: 20.3 }}>{data.subtitle}</Text>
            </View>}
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

export default FaqViewScreen;
