import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {COLORS, FONT, FONTS_SIZE, hp, wp} from '../../constant';
import {BackgroundImage, UserAvatar, PenIcon} from './../../assets/icons/index';
import InputTextField from '../../components/textfield';
import Button from '../../components/button';
import {useTranslation} from 'react-i18next';
import {styles} from './index.style';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';

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

  const handleInputChange = (key, value) => {
    setFromData(prevData => ({...prevData, [key]: value}));
  };
  const {userName, email, mobileNumber, dateOfBirth} = formData;
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

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 30;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.container}>
        <View style={{height: hp('7')}}>
          <Text>This Is For HaderS content</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.logoContainer}>
              <View style={styles.avatarContainer}>
                <View style={styles.userAvatar}>
                  <Image
                    source={UserAvatar}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <View style={styles.penIcon}>
                  <Image
                    source={PenIcon}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: FONT.Bold,
                  fontSize: FONTS_SIZE.regular,
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
              </View>

              <View style={styles.inputContainer}>
                <View style={{paddingTop: hp('10')}}>
                  <Button
                    // enable={!isFormValid}
                    // disabled={!isFormValid}
                    onPress={() => handleSubmit()}
                    title={t('SUBMIT')}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default MemberScreen;
