import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
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
import Icon from 'react-native-vector-icons/AntDesign';
import BackHeader from '../../components/backButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  // webClientId: "855427964750-fh3k8drvc8urfgov7ganig08jblhh5kg.apps.googleusercontent.com",
  androidClientId: '855427964750-fh3k8drvc8urfgov7ganig08jblhh5kg.apps.googleusercontent.com',
  // iosClientId: GOOGLE_IOS_CLIENT_ID,
  scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

const Login = () => {
  const navigation = useNavigation();
  const [t] = useTranslation('translation');
  const [mobileNumber, setMobileNumber] = useState('')
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState(false)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;

      if (idToken) {
        const resp = await authAPI.validateToken({
          token: idToken,
          email: user.email,
        });
        await handlePostLoginData(resp.data);
      }
    } catch (apiError) {
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

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


  const handleSubmit = () => {
    if (isFormValid) {
      navigation.navigate("VerifyOtp")
    }
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 30

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>

          <BackHeader onPress={() => navigation.goBack()} />

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

            <View style={{ flexDirection: 'row', width: wp('60'), justifyContent: 'space-evenly', alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.6} onPress={handleGoogleLogin}>
                <Image source={GoogleIcon} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6}>
                <Image source={AppleIcon} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6}>
                <Image source={FacebookIcon} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>{t("Donthaveaccount")} <Text onPress={() => handleRegister()} style={{ color: COLORS.Primary_2 }}>{t('RegisterNow')}</Text></Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Login;