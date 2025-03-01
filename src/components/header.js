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
    disabled,
    title
}) => {
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(true)

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ height: 55, alignItems: 'center', paddingLeft: 15, flexDirection: 'row' }}>
                    <Icon
                        size={20}
                        name='menu'
                        color={COLORS.black}
                    />

                    {title && <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontFamily: FONT.Medium, fontSize: FONTS_SIZE.regular, color: COLORS.black, fontWeight: '600' }}>{title}</Text>
                    </View>}
                </TouchableOpacity>



                <View style={{ height: 55, flexDirection: 'row', alignItems: 'center' }} >
                    <View>
                        {/* <TouchableOpacity activeOpacity={0.6}>
                            <Image source={LanguageIcon} style={{ marginRight: 10 }} resizeMode='contain' />
                        </TouchableOpacity> */}
                        {/* <View style={{ flexDirection: 'row',  zIndex: 1, backgroundColor: COLORS.white }}>
                            <Text>Hindi</Text>
                        </View> */}
                        {/*                         
                            <View style={{ position: 'absolute', backgroundColor: 'red', top: 50, bottom: 0, left: 0, right: 0, zIndex: 2 }}>

                                <TouchableOpacity style={{ padding: 40 }} activeOpacity={0.6}>
                                    <Text>Hindi</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={{ padding: 40 }} activeOpacity={0.6}>
                                    <Text>Hindi</Text>
                                </TouchableOpacity>

                        </View> */}
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert("WIP")}>
                    <Image source={Notification} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
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
    subContainer: {
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