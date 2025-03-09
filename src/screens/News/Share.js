import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import Icon from 'react-native-vector-icons/Entypo';

const ShareScreen = ({ onPress, item }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.Primary_2 ,
            }}
            onPress={() => { onPress() }}
        >
            <Icon name="share" color={COLORS.white} size={18} />
        </TouchableOpacity>
    );
};
export default ShareScreen;
