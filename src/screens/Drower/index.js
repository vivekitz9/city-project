import * as React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { View, Image } from 'react-native';
import { Profile } from '../../assets/icons';
import { hp, COLORS } from '../../constant';
import Icon from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>

            <View style={{ height: hp("20"), width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ position: 'relative', width: 100, height: 100 }}>
                    <Image source={Profile} style={{ width: 100, height: 100 }} />
                    {/* <EvilIcons
                        name='user'
                        size={110}
                        color={COLORS.Primary_2}
                    /> */}
                    <View style={{ backgroundColor: COLORS.Primary_2, position: 'absolute', right: 0, top: 65, padding: 6, borderRadius: 50 }}>
                        <Icon
                            name='edit'
                            size={15}
                            color={COLORS.white}
                        />
                    </View>
                </View>

            </View>

            <DrawerItemList {...props} />


            <DrawerItem
                label="Close drawer"
                onPress={() => props.navigation.closeDrawer()}
            />
            <DrawerItem
                label="Toggle drawer"
                onPress={() => props.navigation.toggleDrawer()}
            />
        </DrawerContentScrollView>
    );
}
export default CustomDrawerContent;
