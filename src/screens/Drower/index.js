import React, { useState } from 'react';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
    UserAvatar,
    PenIcon,
    MenuHomeIcon,
    MenuMissionIcon,
    MenuMemberIcon,
    MenuEventsIcon,
    MenuNewsIcon,
    MenuBlogsIcon,
    MenuGalleryIcon,
    MenuConnectIcon,
    MenuHelpIcon,
    LogoutIcon,
    PrivacyPolicy,
    TermCondition
} from '../../assets/icons';
import { hp, COLORS, FONT, FONTS_SIZE } from '../../constant';
import { styles } from './index.style';
import { launchImageLibrary } from 'react-native-image-picker'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import ListScreen from './list';

const menuData = [
    {
        image: MenuHomeIcon,
        name: "Dashboard",
        navigation: "Dashboard"
    },
    {
        image: MenuMissionIcon,
        name: "Mission & Vision",
        navigation: "MissionVision"
    },
    {
        image: MenuMemberIcon,
        name: "Member",
        navigation: "Member"
    },
    {
        image: MenuEventsIcon,
        name: "Events",
        navigation: "Events"
    },
    {
        image: MenuGalleryIcon,
        name: "Gallery",
        navigation: "Gallery"
    },
    {
        image: MenuBlogsIcon,
        name: "Blogs",
        navigation: "Blogs"
    },
    {
        image: MenuNewsIcon,
        name: "News",
        navigation: "News"
    },
    {
        image: MenuConnectIcon,
        name: "Connect with Me",
        navigation: "Connect"
    },
    {
        image: MenuHelpIcon,
        name: "Help & Support",
        navigation: "HelpCenter"
    },
    {
        image: PrivacyPolicy,
        name: "Privacy Policy",
        navigation: "PrivacyPolicy"
    },
    {
        image: TermCondition,
        name: "Term & Condition",
        navigation: "TermCondition"
    },
]

function CustomDrawerContent(props) {
    const [imageUri, setImageUri] = useState("");

    const handleImagePicker = async () => {
        console.log('Opening Image Picker...');
        props.navigation.navigate('Profile');
    };

    const handleLogout = async () => {
        try {
            await EncryptedStorage.removeItem('token')
            setTimeout(() => {
                props.navigation.navigate('Login')
            }, 100)
        } catch (error) {
            console.log('err--->', error);
        }
    }

    return (
        <DrawerContentScrollView {...props}>

            <View style={styles.profileContainer}>
                {imageUri == "" ? <TouchableOpacity activeOpacity={0.6} onPress={handleImagePicker} style={styles.profileSubConter}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={UserAvatar}
                            style={styles.profileIcon}
                        />
                    </View>
                    <View style={styles.editIcon}>
                        <Image
                            source={PenIcon}
                            resizeMode='contain'
                            style={{ width: '100%', height: "100%" }}
                        />
                    </View>
                </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={0.6} onPress={handleImagePicker} style={styles.profileSubConter}>
                        <Image
                            source={{ uri: imageUri }}
                            style={{ borderRadius: 45, width: 90, height: 90, }}
                        />
                        <View style={styles.editIcon}>
                            <Image
                                source={PenIcon}
                                resizeMode='contain'
                                style={{ width: '100%', height: "100%" }}
                            />
                        </View>
                    </TouchableOpacity>
                }

            </View>

            <ListScreen
                data={menuData}
                navigation={props?.navigation}
            />

            <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 10 }}>
                <Image resizeMode='contain' source={LogoutIcon} style={{ width: 30, height: 30 }} />
                <Text style={{ paddingLeft: 10, fontFamily: FONT.Bold, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black, fontWeight: '600' }}>Logout</Text>
            </TouchableOpacity>



        </DrawerContentScrollView>
    );
}
export default CustomDrawerContent;
