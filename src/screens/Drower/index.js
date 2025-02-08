import React, { useState, useEffect } from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { View, Image, TouchableOpacity } from 'react-native';
import { UserAvatar, PenIcon } from '../../assets/icons';
import { hp, COLORS } from '../../constant';
import { styles } from './index.style';
import { launchImageLibrary } from 'react-native-image-picker'

function CustomDrawerContent(props) {
    const [imageUri, setImageUri] = useState("");


    const handleImagePicker = async () => {
        console.log('Opening Image Picker...');

        try {
            const result = await launchImageLibrary({ mediaType: 'photo' });
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.errorMessage) {
                console.log(result.errorMessage);
            } else {
                setImageUri(result?.assets[0]?.uri)
            }
        } catch (error) {
            console.error('Image Picker Error:', error);
        }
    };
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
