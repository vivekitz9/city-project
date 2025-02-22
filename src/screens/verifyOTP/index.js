import React, { useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { loginFailure, loginSuccess, loginRequest } from '../../Redux/Actions/loginActions';
import ApiService from '../../api/ApiService';
import { ActivityIndicator } from 'react-native-paper';
import { useToast } from "react-native-toast-notifications";
import EncryptedStorage from 'react-native-encrypted-storage';

const VerifyOtpScreen = ({ route }) => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [sessionId, setSessionId] = useState('')
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast();
    const [mobile, setMobile] = useState('')

    useEffect(() => {
        if (route?.params?.pageType === "register") {
            setSessionId(route?.params?.userDetails?.Details)
            setMobile(route?.params?.payload?.mobile)
        } else if (route?.params?.pageType === "login") {
            setSessionId(route?.params?.userDetails?.sessionId)
            setMobile(route?.params?.userDetails?.mobile)
        }
    }, [route])


    const handleChange = async (value) => {
        if (value.length === 4) {
            try {
                setIsLoading(true)
                dispatch(loginRequest())
                const payload = {
                    "sessionId": sessionId,
                    "otp": value
                }
                const response = await ApiService.postData('v1/verifyOtp', payload)
                console.log("response verfy----->", response);
                if (response?.data?.success) {
                    if (route?.params?.pageType === "register") {
                        handleCreateUser()
                    } else if (route?.params?.pageType === "login") {
                        setIsLoading(false)
                        toast.show("User login success", { type: 'Success' })
                        await EncryptedStorage.setItem('token', JSON.stringify(response?.data))
                        dispatch(loginSuccess(response?.data))
                        navigation.push('Dashboard')
                    }
                } else {
                    setIsLoading(false)
                    toast.show("Your OTP is invalid please try again", { type: 'waring' })
                    dispatch(loginFailure(response?.data))
                }
            } catch (error) {
                setIsLoading(false)
                console.log('error---->', error);
            }
        }
    }

    const handleCreateUser = async () => {
        const payload = {
            ...route?.params?.payload,
            "sessionId": sessionId
        }
        console.log('payload---->', payload);
        try {
            const response = await ApiService.postData('v1/users', payload)
            console.log('response---->', response);
            if (response?.data?.success) {
                setIsLoading(false)
                toast.show("User registered successfuly.", { type: 'Success', duration: 5000 })
                navigation.navigate('Login');
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.log('error---->', error);
            setIsLoading(false)
        }
    }

    const mobileNumber = string => {
        const replaced = string?.slice(3, 0) + string?.slice(6).replace(/.(?=...)/g, '*')
        return replaced;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <BackHeader onPress={() => navigation.goBack()} />
                <View style={styles.subContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={Logo} style={{ width: 100, height: 100 }} />
                        <Text style={styles.title}>{t('Verification')}</Text>
                        <Text style={styles.subTitle}>{t('VerificationSubTitle') + " " + mobileNumber(mobile)}</Text>
                    </View>
                    <View style={{ position: 'relative' }}>
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
                    {isLoading && <View style={{ position: 'absolute', right: 0, left: 0, bottom: '15%' }}>
                        <ActivityIndicator animating={true} size={30} color={COLORS.Primary_2} />
                    </View>}


                    <View>
                        <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black }}>Re-send code in 0:30</Text>
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
};
export default VerifyOtpScreen;
