import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp, genderItem } from '../../constant';
import {
  Logo,
  BackgroundImage,
  FacebookIcon,
  GoogleIcon,
  AppleIcon,
} from './../../assets/icons/index';
import InputTextField from '../../components/textfield';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../../components/backButton';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/EvilIcons';
import RadioButton from '../../components/radioButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import ApiService from '../../api/ApiService';
import { ActivityIndicator } from 'react-native-paper';

// GoogleSignin.configure({
//   webClientId: "855427964750-fh3k8drvc8urfgov7ganig08jblhh5kg.apps.googleusercontent.com",
//   androidClientId: '855427964750-fh3k8drvc8urfgov7ganig08jblhh5kg.apps.googleusercontent.com',
//   // iosClientId: GOOGLE_IOS_CLIENT_ID,
//   scopes: ['profile', 'email'],
// });

// const GoogleLogin = async () => {
//   await GoogleSignin.hasPlayServices();
//   const userInfo = await GoogleSignin.signIn();
//   return userInfo;
// };

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation('translation');
  const [formData, setFromData] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
    dist: '',
  });
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [districtsData, setDistrictsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchDistrictsApi();
  }, []);

  console.log('formData---->', date);

  const fetchDistrictsApi = async () => {
    try {
      const response = await ApiService.fetchData('v1/districts');

      if (response?.data?.code === 200) {
        const data = response?.data?.data.map(item => {
          return { label: item.district, value: item.id };
        });
        setDistrictsData(data);
      }
    } catch (error) {
      console.log('error--->', error);
    }
  };

  const HandleGoogleLogin = async () => {
    try {
      const response = await GoogleLoginConfig();
      const { idToken, user } = response;
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
    setFromData(prevData => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      setIsLoading(true)
      try {
        console.log("formData", formData);
        const { userName, email, mobileNumber, dateOfBirth, gender, dist } = formData;
        const newDate = moment(date).format('YYYY-MM-DD')
        const payload = {
          fullName: userName,
          mobile: mobileNumber,
          email: email,
          dob: newDate,
          gender: gender,
          district: dist,
          state: "Bihar"
        }

        const response = await ApiService.fetchData('v1/checkUserExist/' + mobileNumber);
        if (response?.data?.success) {
          setIsLoading(false)
          toast.show(response?.data?.message, { type: "waring" })
        } else {
          handleSendOtpApi(payload)
        }

        // const response = await ApiService.postData('v1/users', payload);
        // console.log('response reg---->', response);
        // if (response?.data?.success) {
        //   setIsLoading(false)
        //   navigation.navigate("VerifyOtp", { userDetails: response?.data?.data, pageType: 'register' })
        // } else {
        //   toast.show(response?.data?.message, { type: "waring" })
        //   setIsLoading(false)
        // }
      } catch (error) {
        setIsLoading(false)
        console.log('error----->', error);
      }

    }
  };

  const handleSendOtpApi = async (value) => {
    try {
      const payload = {
        "mobile": value?.mobile
      }
      const response = await ApiService.postData('v1/sendOtpUnAuth', payload);
      console.log('response sendOtpUnAuth====>', response);
      if (response?.data?.success) {
        setIsLoading(false)
        toast.show(response?.data?.message, { type: "waring" })
        navigation.navigate("VerifyOtp", { userDetails: response?.data?.data, pageType: 'register', payload: value })
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log("error====>", error);
    }
  }

  const { userName, email, mobileNumber, dateOfBirth, gender, dist } = formData;
  // form validation
  useEffect(() => {
    if (
      mobileNumber.length === 0 ||
      userName.length === 0 ||
      dateOfBirth.length === 0 ||
      gender.length === 0 ||
      dist.length === 0
    ) {
      setIsFormValid(false);
    } else if (!mobileNumber.match('[0-9]{10}')) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [mobileNumber, email, dateOfBirth, gender, userName]);

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
        apiError?.response?.data?.error?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.droplabel, isFocus && { color: COLORS.Primary }]}>
          Select Districts
        </Text>
      );
    }
    return null;
  };


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.container}>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <BackHeader onPress={() => navigation.goBack()} />

            <View style={styles.logoContainer}>
              <Image source={Logo} style={{ width: 78, height: 78 }} />
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

                <View style={{ width: wp('85'), paddingTop: 10 }}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setOpen(true)}
                    style={styles.dateContainer}>
                    <Text
                      style={{
                        fontSize: FONTS_SIZE.xsmall2,
                        fontFamily: FONT.RegularRoboto,
                        color: COLORS.gray,
                      }}>
                      {date
                        ? moment(date).format('DD/MM/YYYY')
                        : t('DATEOFBIRTH')}
                    </Text>

                    <Icon
                      name="calendar"
                      size={25}
                      color={COLORS.Primary_2}
                    />
                  </TouchableOpacity>
                </View>

                <DatePicker
                  modal={true}
                  open={open}
                  date={date}
                  mode="date"
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
                <View style={styles.dropcontainer}>
                  {renderLabel()}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: COLORS.Primary },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={districtsData}
                    search
                    maxHeight={300}
                    dropdownPosition="top"
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Districts' : ''}
                    searchPlaceholder="Search Districts"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValue(item.value);
                      console.log('item---->', item);
                      setIsFocus(false);
                      handleInputChange('dist', item.label);
                    }}
                  />
                </View>

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
                <View style={{ paddingTop: hp('2.4') }}>
                  <Button
                    enable={!isFormValid}
                    disabled={!isFormValid}
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
                    onPress={() => Alert.alert("Work in progress")}>
                    <Image
                      source={GoogleIcon}
                      style={{ width: 50, height: 50 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6}
                    onPress={() => Alert.alert("Work in progress")}>
                    <Image
                      source={AppleIcon}
                      style={{ width: 50, height: 50 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6}
                    onPress={() => Alert.alert("Work in progress")}>
                    <Image
                      source={FacebookIcon}
                      style={{ width: 50, height: 50 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <View> */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                {t('DOYOUHAVEANACCOUNT')}
                {' '}
                <Text
                  onPress={() => handleLoginToRedirect()}
                  style={{ color: COLORS.Primary_2 }}>
                  {t('LOGIN')}
                </Text>
              </Text>
            </View>
            {/* </View> */}
          </View>

          {isLoading && <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ActivityIndicator animating={true} size={50} color={COLORS.Primary_2} />
          </View>}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default RegisterScreen;
