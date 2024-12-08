import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, ImageBackground } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage } from './../../assets/icons/index';
import InputTextField from '../../components/textfield';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';

const Login = () => {
  const [t] = useTranslation('translation');
  
  const handleRegister = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.container}>

        <View style={styles.logoContainer}>
          <Image source={Logo} />
          <Text style={{ fontFamily: FONT.Bold, fontSize: FONTS_SIZE.regular, paddingTop: 10, }}>{t('WelcomeToLogin')}</Text>
        </View>

        <View style={styles.inputContainer}>
          <InputTextField
            label={t('MOBILENUMBER')}
            maxLength={10}
            style={styles.inputText}
            keyboardType="number-pad"
          />

          <View style={{ paddingTop: hp('8') }}>
            <Button onPress={() => console.log('Submit')} title={t('LOGIN')} />
          </View>

        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>{t("Donthaveaccount")} <Text onPress={() => handleRegister()} style={{ color: COLORS.Primary_2 }}>{t('RegisterNow')}</Text></Text>
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
    justifyContent: 'center', alignItems: 'center', height: hp('45%')
  },
  inputContainer: {
    marginHorizontal: 24
  },
  inputText: {
    width: wp('88'),
    height: hp('8'),
    fontSize: FONTS_SIZE.xsmall2,
    fontFamily: FONT.Regular
  },
  registerContainer:{ height: hp('21'), justifyContent: 'flex-end', alignItems: 'center' },
  registerText:{ fontFamily: FONT.Semibold, fontSize: FONTS_SIZE.xsmall, color: COLORS.black },
});
export default Login;
