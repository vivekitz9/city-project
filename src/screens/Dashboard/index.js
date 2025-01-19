import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage } from './../../assets/icons/index';
import {
    useNavigation,
  } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';

const DashboardScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();

    const handleChange = (value) =>{
        console.log('value----->', value.length);

        if(value.length === 4){
            navigation.navigate("VerifyOtp")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent />
            </ImageBackground>
        </SafeAreaView>
    );
};
export default DashboardScreen;
