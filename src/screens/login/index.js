import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, BackHandler, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage, FacebookIcon, GoogleIcon, AppleIcon } from './../../assets/icons/index';
import InputTextField from '../../components/textfield';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import { useToast } from "react-native-toast-notifications";
import {
  useNavigation,
} from '@react-navigation/native';
import BackHeader from '../../components/backButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ApiService from '../../api/ApiService';
import { useSelector, useDispatch } from 'react-redux';
import { loginFailure, loginSuccess, loginRequest } from '../../Redux/Actions/loginActions';
import { ActivityIndicator } from 'react-native-paper';

// GoogleSignin.configure({
//   // webClientId: "855427964750-fh3k8drvc8urfgov7ganig08jblhh5kg.apps.googleusercontent.com",
//   androidClientId: '855427964750-fh3k8drvc8urfgov7ganig08jblhh5kg.apps.googleusercontent.com',
//   // iosClientId: GOOGLE_IOS_CLIENT_ID,
//   scopes: ['profile', 'email'],
// });

// const GoogleLogin = async () => {
//   await GoogleSignin.hasPlayServices();
//   const userInfo = await GoogleSignin.signIn();
//   return userInfo;
// };

const Login = () => {
  const navigation = useNavigation();
  const [t] = useTranslation('translation');
  const [mobileNumber, setMobileNumber] = useState('')
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   if (auth?.user?.data?.success) {
  //     setIsLoading(false)
  //     navigation.navigate("VerifyOtpScreen")
  //   }
  // }, [auth])

  const handleGoogleLogin = async () => {
    Alert.alert("Work in progress")
    // setLoading(true);
    // try {
    //   const response = await GoogleLogin();
    //   const { idToken, user } = response;

    //   if (idToken) {
    //     const resp = await authAPI.validateToken({
    //       token: idToken,
    //       email: user.email,
    //     });
    //     await handlePostLoginData(resp.data);
    //   }
    // } catch (apiError) {
    //   setError(
    //     apiError?.response?.data?.error?.message || 'Something went wrong'
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const handleRegister = () => {
    navigation.navigate("Register")
  }

  // form validation
  useEffect(() => {
    if (mobileNumber.length === 0) {
      setIsFormValid(false)
    } else if (!(mobileNumber.match('[0-9]{10}'))) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [mobileNumber])


  const handleSubmit = async () => {
    if (isFormValid) {
      setIsLoading(true)
      try {
        if (mobileNumber === "9876543210") {
          navigation.navigate("VerifyOtp", { userDetails: { 'sessionId': "d8039ce8-3088-41f1-8e08-10bd3b99ce1e", mobile: '9876543210' }, pageType: 'login', userType: 'test' })
        } else {
          const payload = { "mobile": mobileNumber }
          const response = await ApiService.postData('v1/login', payload)
          console.log('response---->', response);
          if (response?.data?.success) {
            setIsLoading(false)
            navigation.navigate("VerifyOtp", { userDetails: response?.data?.data, pageType: 'login' })
          } else {
            toast.show("User is not verified", { type: "waring" })
            // setIsLoading(false)
          }
        }
      } catch (error) {
        setIsLoading(false)
        console.log('error----->', error);
      }
    }
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 30

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView>
            {/* <BackHeader onPress={() => navigation.navigate("")} /> */}

            <View style={styles.logoContainer}>
              <Image source={Logo} style={{ width: 100, height: 100 }} />
              <Text style={{ fontFamily: FONT.Bold, fontSize: FONTS_SIZE.regular, paddingTop: 10, color: COLORS.Secondary }}>{t('WelcomeToLogin')}</Text>
            </View>

            <View style={styles.inputContainer}>
              <InputTextField
                label={t('MOBILENUMBER')}
                maxLength={10}
                style={styles.inputText}
                keyboardType="number-pad"
                value={mobileNumber}
                onChangeText={(value) => setMobileNumber(value)}
              />

              <View style={{ paddingTop: hp('8') }}>
                <Button enable={!isFormValid} disabled={!isFormValid} onPress={() => handleSubmit()} title={t('LOGIN')} />
              </View>
              <View style={{ flexDirection: 'row', height: hp('08'), width: wp('85'), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.regular, color: COLORS }}>OR</Text>
              </View>

              {/* <View style={{ flexDirection: 'row', width: wp('60'), justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.6} onPress={handleGoogleLogin}>
                  <Image source={GoogleIcon} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={handleGoogleLogin}>
                  <Image source={AppleIcon} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={handleGoogleLogin}>
                  <Image source={FacebookIcon} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
              </View> */}
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>{t("Donthaveaccount")} <Text onPress={() => handleRegister()} style={{ color: COLORS.Primary_2 }}>{t('RegisterNow')}</Text></Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {isLoading &&
          <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ActivityIndicator animating={true} size={50} color={COLORS.Primary_2} />
          </View>
        }
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Login;