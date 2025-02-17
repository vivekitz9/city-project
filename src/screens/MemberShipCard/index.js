import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import {
  BackgroundImage,
  UserAvatar,
  PenIcon,
  Logo,
  QRCodeImg,
} from './../../assets/icons/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../components/header';
import EncryptedStorage from 'react-native-encrypted-storage';
import ApiService from '../../api/ApiService';
import { jwtDecode } from "jwt-decode";
import { ActivityIndicator } from 'react-native-paper';


const MemberShipCardScreen = () => {
  const navigation = useNavigation();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 30;
  const [isLoading, setIsLoading] = useState(false)
  const [memberdata, setMemberData] = useState(null)


  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true)
        const data = await EncryptedStorage.getItem('token')
        const userData = JSON.parse(data)
        const token = userData?.data?.token;
        const decoded = jwtDecode(token)
        const response = await ApiService.fetchData('v1/users/' + decoded?.id);
        console.log('response?.data?.data?.item===?', JSON.stringify(response));
        if (response?.data?.success) {
          setIsLoading(false)
          setMemberData(response?.data?.data?.Item)
          // setFromData({
          //   userName: response?.data?.data?.Item?.userName,
          //   email: response?.data?.data?.Item?.email,
          //   mobileNumber: response?.data?.data?.Item?.mobile,
          //   dateOfBirth: response?.data?.data?.Item?.dob,
          //   district: response?.data?.data?.Item?.district,
          // })
        }
        setIsLoading(false)
        console.log('response----->', JSON.stringify(response));
      } catch (error) {
        setIsLoading(false)
        console.log('error user get====>', error);
      }
    }
    fetchUser()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <HeaderComponent backButton={true} />

          <View style={styles.mainContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.mainHeading}>Membership Card</Text>
              <Text style={styles.subHeading}>
                <Text style={{ color: COLORS.Primary_2 }}>
                  Membership Number :
                </Text>
                <Text style={{ color: COLORS.black }}> 7015XX27XX</Text>
              </Text>
              <Text style={styles.subHeading}>
                <Text style={{ color: COLORS.Primary_2 }}>Date of Joining :</Text>
                <Text style={{ color: COLORS.black }}> 09 Dec, 2024</Text>
              </Text>
            </View>
            <View style={styles.editButtonContainer}>
              <TouchableOpacity style={styles.editButton}>
                <View style={styles.edit}>
                  <Image source={PenIcon} style={{ width: 25, height: 25 }} />
                  <Text style={styles.editText}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.cardHeadingContainer}>
                <View style={styles.logoMainContainer}>
                  <View style={styles.logoContainer}>
                    <Image source={Logo} style={{ width: 70, height: 70 }} />
                  </View>
                  <View style={styles.penIcon}>
                    <Image
                      source={PenIcon}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                </View>
                <View style={styles.headingTextContainer}>
                  <Text style={styles.headingText}>Connect with</Text>
                  <Text style={styles.headingText}>Shivdeep</Text>
                  <View style={styles.divider} />
                  <Text style={styles.addressText}>
                    D/3, PC Colony, Sector-89, Delhi
                  </Text>
                </View>
              </View>
              <View style={styles.memberDetailsContainer}>
                <View style={styles.memberLeftContainer}>
                  <Text style={styles.memberText}>MEMBER NAME</Text>
                  <Text style={styles.memberText}>DISTRICT</Text>
                  <Text style={styles.memberText}>STATE</Text>
                  <Text style={styles.memberText}>MEMBERSHIP ID</Text>
                </View>
                <View style={styles.memberDetailsMidContainer}>
                  <Text style={styles.colonText}>:</Text>
                  <Text style={styles.colonText}>:</Text>
                  <Text style={styles.colonText}>:</Text>
                  <Text style={styles.colonText}>:</Text>
                </View>
                <View style={styles.memberDetailsRightContainer}>
                  <Text style={styles.memberValue} numberOfLines={1}>
                    Abhishek Kumar
                  </Text>
                  <Text style={styles.memberValue}>Darbhanga</Text>
                  <Text style={styles.memberValue}>Bihar</Text>
                  <Text style={styles.memberValue}>XXX54XXX32</Text>
                </View>
                <View style={styles.removeSpace}></View>
              </View>
              <View style={styles.avQRContainer}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={UserAvatar}
                    style={{ width: 66, height: 66 }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.QRContainer}>
                  <Image
                    source={QRCodeImg}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
            <View style={styles.buttonContianer}>
              <TouchableOpacity style={styles.commonButton}>
                <Icon name="share" size={35} color={COLORS.Primary_2} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.commonButton,
                  backgroundColor: COLORS.Primary_2,
                }}>
                <Icon name="file-download" size={35} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttomContainer}>
              <Text style={styles.referralText}>
                <Text style={{ color: COLORS.Primary_2 }}>
                  Your Referral Code :
                </Text>
                <Text style={{ color: COLORS.black }}> 76XCDZD</Text>
              </Text>
              <TouchableOpacity style={styles.Button}>
                <View style={styles.iconContainer}>
                  <Icon name="share" size={35} color={COLORS.white} />
                  <Text style={styles.shareText}>Share</Text>
                </View>
              </TouchableOpacity>
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
      </ImageBackground>
    </SafeAreaView>
  );
};
export default MemberShipCardScreen;
