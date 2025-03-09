import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import Icon from 'react-native-vector-icons/AntDesign';
import EncryptedStorage from 'react-native-encrypted-storage';
import { jwtDecode } from "jwt-decode";

const LikeScreen = ({ onPress, item }) => {
    const [like, setLike] = useState(true)

    useEffect(() => {
        if (item?.like?.length) {
            setLike(false)
        } else {
            setLike(true)
        }
    }, [item])

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: like ? COLORS.Primary_2 : 'red',
            }}
            onPress={() => { setLike(!like); onPress(like) }}
        >
            <Icon name="heart" color={COLORS.white} size={18} />
        </TouchableOpacity>
    );
};
export default LikeScreen;
