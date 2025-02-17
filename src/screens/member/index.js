import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { BackgroundImage, UserAvatar, PenIcon } from './../../assets/icons/index';
import InputTextField from '../../components/textfield';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import BackHeader from '../../components/backButton';
import moment from 'moment';
import Icon from 'react-native-vector-icons/EvilIcons';
import HeaderComponent from '../../components/header';
import ApiService from '../../api/ApiService';
import EncryptedStorage from 'react-native-encrypted-storage';
import { jwtDecode } from "jwt-decode";
import { ActivityIndicator } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';


const MemberScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation('translation');
  const [formData, setFromData] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    district: ''
  });
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isFocus, setIsFocus] = useState(false);
  const [districtsData, setDistrictsData] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true)
      try {
        const data = await EncryptedStorage.getItem('token')
        const userData = JSON.parse(data)
        const token = userData?.data?.token;
        const decoded = jwtDecode(token)
        const response = await ApiService.fetchData('v1/users/' + decoded?.id);
       
        console.log('response?.data?.data?.item===?', response);
        if (response?.data?.success) {
          setIsLoading(false)
          if (response?.data?.data?.Item?.memberId) {
              navigation.navigate('MemberCard')
          } else {
            setFromData({
              userName: response?.data?.data?.Item?.userName,
              email: response?.data?.data?.Item?.email,
              mobileNumber: response?.data?.data?.Item?.mobile,
              dateOfBirth: response?.data?.data?.Item?.dob,
              district: response?.data?.data?.Item?.district,
            })
          }
        }
        setIsLoading(false)
        console.log('response----->', JSON.stringify(response));
      } catch (error) {
        setIsLoading(false)
        console.log('error user get====>', error);
      }
    }
    fetchUser()
    fetchDistrictsApi();
  }, [])

  //This useEffect for districts
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

  const handleInputChange = (key, value) => {
    setFromData(prevData => ({ ...prevData, [key]: value }));
  };
  const { userName, email, mobileNumber, dateOfBirth, district } = formData;

  // form validation
  useEffect(() => {
    if (
      mobileNumber.length === 0 ||
      userName.length === 0 ||
      dateOfBirth.length === 0
    ) {
      setIsFormValid(false);
    } else if (
      !mobileNumber.match('[0-9]{10}')
      // !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
      // !userName.match(/^[a-zA-Z]+$/)
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [mobileNumber, email, dateOfBirth, userName])


  //Submit.........
  const handleSubmit = async () => {

    console.log('isFormValid---->', isFormValid);
    if (isFormValid) {
      try {
        console.log("Submit");
        const data = await EncryptedStorage.getItem('token')
        const userData = JSON.parse(data)
        const token = userData?.data?.token;
        const decoded = jwtDecode(token)

        const newDate = moment(date).format('YYYY-MM-DD')
        const payload = {
          fullName: userName,
          mobile: mobileNumber,
          email: email,
          dob: newDate,
          district: district,
          state: "Bihar",
          file: imageUri,
          dateOfJoining: new Date(),
          isMember: true
        }
        const response = await ApiService.updateData('v1/users/' + decoded?.id, payload);
        console.log('response user update----->', response);
        if (response?.data?.success) {
          navigation.navigate("MemberCard")
        }
      } catch (error) {
        console.log('error----->', error);
      }

    }
  };

  const handleImagePicker = async () => {

    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorMessage) {
        console.log(result.errorMessage);
      } else {
        setImageUri(result?.assets[0]?.uri)
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
    }
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 30;

  const renderLabel = () => {
    if (formData?.district || isFocus) {
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
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={{ marginBottom: hp('5') }}>
              <HeaderComponent />

              {imageUri == "" ?
                <View style={styles.logoContainer}>
                  <View style={styles.avatarContainer}>
                    <View style={{ backgroundColor: COLORS.Primary, alignItems: 'center', justifyContent: 'center', width: 90, height: 90, borderRadius: 45 }}>
                      <Image
                        source={UserAvatar}
                        style={{ width: 60, height: 60 }}
                      />
                    </View>
                    <TouchableOpacity activeOpacity={0.6} onPress={handleImagePicker} style={styles.penIcon}>
                      <Image
                        source={PenIcon}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                :
                <View style={styles.logoContainer}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{ uri: String(imageUri) }}
                      style={{ width: 90, height: 90, borderRadius: 50 }}
                    />

                    <TouchableOpacity activeOpacity={0.6} onPress={handleImagePicker} style={styles.penIcon}>
                      <Image
                        source={PenIcon}
                        style={{ width: '100%', height: "100%" }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              }

              <View style={{ alignItems: 'center', marginBottom: 10, top: -15 }}>
                <Text
                  style={{
                    fontFamily: FONT.Bold,
                    fontSize: FONTS_SIZE.xsmall2,
                    color: COLORS.Secondary,
                  }}>
                  {t('MEMBER')}
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
                    disabled={true}
                    onChangeText={value =>
                      handleInputChange('mobileNumber', value)
                    }
                  />

                  <View style={{ paddingTop: 10 }}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => setOpen(true)}
                      style={[styles.dateContainer, open && styles.activeBorder]}>
                      <Text style={styles.textdate}>
                        {date
                          ? moment(formData?.dateOfBirth).format('DD/MM/YYYY')
                          : t('DATEOFBIRTH')}
                      </Text>
                      <Icon name="calendar" size={25} color={COLORS.Primary_2} />
                    </TouchableOpacity>
                  </View>

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
                      valueField="label"
                      placeholder={!isFocus ? 'Select Districts' : ''}
                      searchPlaceholder="Search Districts"
                      value={formData?.district}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setIsFocus(false);
                        handleInputChange('district', item.label);
                      }}
                    />
                  </View>

                  <DatePicker
                    modal={true}
                    open={open}
                    date={date}
                    mode="date"
                    buttonColor={COLORS.Primary_2}
                    dividerColor={COLORS.Primary_2}
                    confirmText={'Set'}
                    value={new Date(formData?.dateOfBirth)}
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
                </View>

                <View style={styles.inputContainer}>
                  <View style={{ paddingTop: hp('5') }}>
                    <Button
                      // enable={!isFormValid}
                      // disabled={!isFormValid}
                      onPress={() => handleSubmit()}
                      title={t('SUBMIT')}
                    />
                  </View>
                </View>
              </View>
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
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default MemberScreen;
