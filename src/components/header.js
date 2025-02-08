import * as React from 'react';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../constant';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Notification, LanguageIcon } from '../assets/icons';
import {
    useNavigation,
} from '@react-navigation/native';

const HeaderComponent = ({
   
    onPress,
    disabled
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>

                <TouchableOpacity onPress={()=>navigation.toggleDrawer()} style={{ height: 55, justifyContent: 'center', paddingLeft: 15 }}>
                    <Icon
                        size={20}
                        name='menu'
                        color={COLORS.black}
                    />
                </TouchableOpacity>

                <View style={{ height: 55, flexDirection: 'row', alignItems: 'center' }} >
                    <Image source={LanguageIcon} style={{ marginRight: 10 }} resizeMode='contain' />
                    <Image source={Notification} style={{ width: 35, height: 35 }} />
                </View>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EEEEEE",
        height: 55,
        width: '100%'
    },
    subContainer:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: wp('95') 
    },
    leftIcon: { height: 55, justifyContent: 'center', paddingLeft: 15 },
    buttonText: {
        textAlign: 'center',
        fontFamily: FONT.Medium,
        fontSize: FONTS_SIZE.xsmall2,
        color: COLORS.Primary_2,
        textTransform: "uppercase",
    }
});

export default HeaderComponent;