import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS, FONT, FONTS_SIZE, hp, wp, genderItem} from '../../constant';
import {
  Logo,
  BackgroundImage,
  FacebookIcon,
  GoogleIcon,
  AppleIcon,
} from './../../assets/icons/index';
import InputTextField from '../../components/textfield';
import Button from '../../components/button';
import {useTranslation} from 'react-i18next';
import {styles} from './index.style';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../components/backButton';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';

import RadioButton from '../../components/radioButton';
import GoogleLoginConfig from './GoogleLoginConfig';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation('translation');
  const [formData, setFromData] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
  });
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const HandleGoogleLogin = async () => {
    try {
      const response = await GoogleLoginConfig();
      const {idToken, user} = response;
      if (idToken) {
        const resp = await authAPI.validateToken({
          token: idToken,
          email: user.email,
        });
        await handlePostLoginData(resp.data);
      }
    } catch (error) {
    } finally {
    }
  };

  const handleLoginToRedirect = () => {
    navigation.navigate('Login');
  };

  const handleInputChange = (key, value) => {
    setFromData(prevData => ({...prevData, [key]: value}));
  };

  const handleSubmit = () => {
    console.log(formData);

    if (isFormValid) {
      navigation.navigate('VerifyOtp');
    }
  };

  const {userName, email, mobileNumber, dateOfBirth, gender} = formData;
  // form validation
  useEffect(() => {
    if (
      mobileNumber.length === 0 ||
      userName.length === 0 ||
      email.length === 0 ||
      dateOfBirth.length === 0 ||
      gender.length === 0
    ) {
      setIsFormValid(false);
    } else if (
      !mobileNumber.match('[0-9]{10}') ||
      !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
      !userName.match(/^[a-zA-Z]+$/)
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [mobileNumber, email, dateOfBirth, gender, userName]);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 30;

  //this is for testing
  const redirectToMember = () => {
    navigation.navigate('Member');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <BackHeader onPress={() => navigation.goBack()} />

            <View style={styles.logoContainer}>
              <Image source={Logo} style={{width: 78, height: 78}} />
              <Text
                style={{
                  fontFamily: FONT.Bold,
                  fontSize: FONTS_SIZE.regular,
                  paddingTop: 10,
                  color: COLORS.Secondary,
                }}>
                {t('CREATEANACCOUNT')}
              </Text>
              <Text
                style={{
                  color: COLORS.Secondary,
                }}>
                {t('CREATEANACCOUNTSUBHEADING')}
              </Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <InputTextField
                  label={t('FULLNAME')}
                  style={styles.inputText}
                  keyboardType="default"
                  value={userName}
                  onChangeText={value => handleInputChange('userName', value)}
                />
                <InputTextField
                  label={t('EMAILADDRESS')}
                  style={styles.inputText}
                  keyboardType="default"
                  value={email}
                  onChangeText={value => handleInputChange('email', value)}
                />
                <InputTextField
                  label={t('MOBILENUMBER')}
                  maxLength={10}
                  style={styles.inputText}
                  keyboardType="number-pad"
                  value={mobileNumber}
                  onChangeText={value =>
                    handleInputChange('mobileNumber', value)
                  }
                />
                <InputTextField
                  label={t('DATEOFBIRTH')}
                  style={styles.inputText}
                  value={dateOfBirth}
                  onFocus={() => setOpen(true)}
                  editable={false}
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      onPress={() => setOpen(true)}
                      color={COLORS.Primary_2}
                    />
                  }
                />

                <DatePicker
                  modal={true}
                  open={open}
                  date={date}
                  mode="date"
                  buttonColor={COLORS.Primary_2}
                  dividerColor={COLORS.Primary_2}
                  confirmText={'Set'}
                  onConfirm={toDate => {
                    setOpen(false);
                    setDate(toDate);
                    handleInputChange(
                      'dateOfBirth',
                      toDate.toLocaleDateString(),
                    );
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

                <View style={styles.genderContainer}>
                  <Text style={styles.label}>{t('GENDER')}</Text>
                  <View style={styles.radioContainer}>
                    {genderItem.map(item => (
                      <RadioButton
                        key={item.id}
                        {...item}
                        gender={gender}
                        onPress={value => handleInputChange('gender', value)}
                      />
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={{paddingTop: hp('2.4')}}>
                  <Button
                    // enable={!isFormValid}
                    // disabled={!isFormValid}
                    onPress={() => handleSubmit()}
                    title={t('Register')}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp('4'),
                    width: wp('85'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FONT.Regular,
                      fontSize: FONTS_SIZE.regular,
                      color: COLORS.black,
                    }}>
                    OR
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('60'),
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={HandleGoogleLogin}>
                    <Image
                      source={GoogleIcon}
                      style={{width: 50, height: 50}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6}>
                    <Image source={AppleIcon} style={{width: 50, height: 50}} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6}>
                    <Image
                      source={FacebookIcon}
                      style={{width: 50, height: 50}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                {t('DOYOUHAVEANACCOUNT')}
                {'  '}
                <Text
                  onPress={() => handleLoginToRedirect()}
                  style={{color: COLORS.Primary_2}}>
                  {t('LOGIN')}
                </Text>
              </Text>
            </View>
            <Button title={'redirect to member'} onPress={redirectToMember} />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default RegisterScreen;
