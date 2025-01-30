import React, { useEffect } from 'react';
import { StyleSheet, BackHandler, Text, SafeAreaView, View, Image, ImageBackground, ScrollView, Alert } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp } from '../../constant';
import { Logo, BackgroundImage } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import Button from '../../components/button';
import i18next from './../../../i18n';
import EncryptedStorage from 'react-native-encrypted-storage';


const LanguageScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const backAction = () => {
          Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.subContainer}>
                        <Image source={Logo} style={{ width: 110, height: 110 }} />
                        <Text style={styles.welcomeText}>Welcome to connect with shivdeep</Text>

                        <View style={{ paddingTop: hp('10') }}>
                            <Button onPress={async() => {
                                i18next.changeLanguage("en");
                                await EncryptedStorage.setItem('language', "en")
                                setTimeout(() => {
                                    navigation.navigate("Login")
                                }, 100);
                            }} title={"ENGLISH"} style={{ fontSize: FONTS_SIZE.xsmall2, fontFamily: FONT.Semibold, fontWeight: '600' }} />
                            <View style={{ paddingTop: 30 }}>
                                <Button onPress={async() => {
                                    i18next.changeLanguage("hi"); 
                                    await EncryptedStorage.setItem('language', "hi")
                                    setTimeout(() => {
                                        navigation.navigate("Login")
                                    }, 100);
                                }} title={"हिंदी"} style={{ fontSize: FONTS_SIZE.xsmall2, fontFamily: FONT.Semibold, fontWeight: '600' }} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        height: hp(100), 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    welcomeText: {
        fontFamily: FONT.Bold,
        fontSize: FONTS_SIZE.regular,
        paddingTop: 15,
        color: COLORS.Secondary

    }
});
export default LanguageScreen;
