import React, { useState, useEffect } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';


const ListScreen = ({ data, navigation }) => {
    const [selected, setSelected] = useState(false)

    const onPress = (value) => {
        navigation.navigate(value)
    }

    return (
        <>
            {data?.map((item, index) => {
                return (
                    <TouchableOpacity key={index} activeOpacity={0.6} onPress={()=>onPress(item?.navigation)} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 8, borderRadius: 10, backgroundColor: item?.name == "Connect with Me" && COLORS.Primary_2 }}>
                        <Image resizeMode='contain' source={item?.image} style={{ width: 30, height: 30 }} />
                        <Text style={{ paddingLeft: 10, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black, fontWeight: '600', paddingVertical: item?.name == "Connect with Me" && 10 }}>{item?.name}</Text>
                    </TouchableOpacity>
                )
            })
            }
        </>

    );
};
export default ListScreen;
