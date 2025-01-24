import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage } from './../../assets/icons/index';
import {
    useNavigation,
  } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import { OtpInput } from "react-native-otp-entry";
import BackHeader from '../../components/backButton';

const VerifyOtpScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();

    const handleChange = (value) =>{
        if(value.length === 4){
            navigation.navigate("VerifyOtp")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <BackHeader onPress={() => navigation.navigate("Login")} />
                <View style={styles.subContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={Logo} style={{ width: 100, height: 100 }}/>
                        <Text style={{ fontFamily: FONT.Bold, fontSize: FONTS_SIZE.regular, paddingTop: 10, color: COLORS.Primary_2 }}>{t('WelcomeToLogin')}</Text>
                    </View>

                    <OtpInput
                        numberOfDigits={4}
                        focusColor={COLORS.Primary_2}
                        autoFocus={true}
                        hideStick={false}
                        blurOnFilled={true}
                        disabled={false}
                        type="numeric"
                        secureTextEntry={false}
                        focusStickBlinkingDuration={500}
                        onFocus={() => console.log("Focused")}
                        onBlur={() => console.log("Blurred")}
                        onTextChange={(text) => handleChange(text)}
                        onFilled={(text) => console.log(`OTP is ${text}`)}
                        textInputProps={{
                            accessibilityLabel: "One-Time Password",
                        }}
                        theme={{
                            containerStyle: styles.OTPcontainer,
                            pinCodeContainerStyle: styles.pinCodeContainer,
                            pinCodeTextStyle: styles.pinCodeText,
                            focusStickStyle: styles.focusStick,
                            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                        }}
                    />
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
};
export default VerifyOtpScreen;
