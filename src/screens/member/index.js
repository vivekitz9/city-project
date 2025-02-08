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

const MemberScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation('translation');
  const [formData, setFromData] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
  });
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [imageUri, setImageUri] = useState("");


  const handleInputChange = (key, value) => {
    setFromData(prevData => ({ ...prevData, [key]: value }));
  };
  const { userName, email, mobileNumber, dateOfBirth } = formData;
  // form validation
  useEffect(() => {
    if (
      mobileNumber.length === 0 ||
      userName.length === 0 ||
      email.length === 0 ||
      dateOfBirth.length === 0
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
  }, [mobileNumber, email, dateOfBirth, userName]);
  const handleSubmit = () => {
    console.log(formData);

    if (isFormValid) {
      navigation.navigate('MemberShipCard');
    }
  };

  const handleImagePicker = async () => {
    console.log('Opening Image Picker...');

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

  const go_to_membership_card = () => {
    navigation.navigate('MemberShipCard');
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 30;

  console.log('imageUri----->', imageUri);

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
            <View>
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
                    <TouchableOpacity activeOpacity={0.6} onPress={handleImagePicker}  style={styles.penIcon}>
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
                    onChangeText={value =>
                      handleInputChange('mobileNumber', value)
                    }
                  />
                  {/* <InputTextField
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
                /> */}
                  <View style={{ paddingTop: 10 }}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => setOpen(true)}
                      style={[styles.dateContainer, open && styles.activeBorder]}>
                      <Text style={styles.textdate}>
                        {date
                          ? moment(date).format('DD/MM/YYYY')
                          : t('DATEOFBIRTH')}
                      </Text>
                      <Icon name="calendar" size={25} color={COLORS.Primary_2} />
                    </TouchableOpacity>
                  </View>

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
                </View>

                <View style={styles.inputContainer}>
                  <View style={{ paddingTop: hp('10') }}>
                    <Button
                      // enable={!isFormValid}
                      // disabled={!isFormValid}
                      onPress={() => handleSubmit()}
                      title={t('SUBMIT')}
                    />
                  </View>
                </View>
                {/* <View style={styles.inputContainer}>
                <View style={{paddingTop: hp('10')}}>
                  <Button
                    // enable={!isFormValid}
                    // disabled={!isFormValid}
                    onPress={go_to_membership_card}
                    title={t('go to membership card')}
                  />
                </View>
              </View> */}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default MemberScreen;
