import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, ImageBackground } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp } from '../../constant';
import { Logo, BackgroundImage } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import i18next from './../../../i18n';

const LanguageScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();


    console.log(t);


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} style={styles.container}>

                <View style={styles.logoContainer}>
                    <Image source={Logo} />
                    <Text style={styles.welcomeText}>Welcome to Shivdeep Family</Text>

                    <View style={{ paddingTop: hp('10') }}>
                        <Button onPress={() => {
                            i18next.changeLanguage("en");
                            setTimeout(() => {
                                navigation.navigate("Login")
                            }, 100);
                        }} title={"ENGLISH"} style={{ fontSize: FONTS_SIZE.xlarge, fontFamily: FONT.Semibold, fontWeight: '600' }} />
                        <View style={{ paddingTop: 30 }}>
                            <Button onPress={() => {
                                i18next.changeLanguage("hi"); setTimeout(() => {
                                    navigation.navigate("Login")
                                }, 100);
                            }} title={"हिंदी"} style={{ fontSize: FONTS_SIZE.xlarge, fontFamily: FONT.Semibold, fontWeight: '600' }} />
                        </View>
                    </View>
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
        color: COLORS.Primary_2

    }
});
export default LanguageScreen;
