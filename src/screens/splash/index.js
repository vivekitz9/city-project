import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, ImageBackground } from 'react-native';
import { COLORS, FONT, FONTS_SIZE } from '../../constant';
import { Logo, BackgroundImage } from './../../assets/icons/index';
import {
    useNavigation,
  } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(()=>{
        setTimeout(() => {
            navigation.push("Language")
        }, 3000);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} style={styles.container}>

                <View style={styles.logoContainer}>
                    <Image source={Logo} style={{ width: 110, height: 110 }}/>
                    <Text style={styles.welcomeText}>Welcome to Shivdeep Family</Text>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    welcomeText: {
        fontFamily: FONT.Bold,
        fontSize: FONTS_SIZE.regular,
        paddingTop: 15,
        color: COLORS.Secondary

    }
});
export default SplashScreen;
