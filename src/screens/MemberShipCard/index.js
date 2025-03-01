import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
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
import moment from 'moment';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { PDFDocument, rgb } from 'pdf-lib';
import { Buffer } from 'buffer';
import { request, PERMISSIONS } from 'react-native-permissions';


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
  const viewRef = useRef(null);


  const downloadCard = async () => {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
      const imageUri = await viewRef.current.capture();
      if (!imageUri) return;
      const pdfDoc = await PDFDocument.create();
      const imageBytes = await RNFS.readFile(imageUri, 'base64');
      const image = imageUri.endsWith('.png')
        ? await pdfDoc.embedPng(imageBytes)
        : await pdfDoc.embedJpg(imageBytes);
      const { width, height } = image;
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
      const pdfBytes = await pdfDoc.save();
      const base64PDF = Buffer.from(pdfBytes).toString('base64');

      const pdfFilePath = `${RNFS.DownloadDirectoryPath}/MembershipCard.pdf`;
      await RNFS.writeFile(pdfFilePath, base64PDF, 'base64');

      Alert.alert('Success', `PDF saved to: ${pdfFilePath}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to Download.');
      console.log('error download---->', error);
    }
  };

  console.log('memberdata?.dateOfJoining====>', memberdata?.dateOfJoining);

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
                <Text style={{ color: COLORS.black }}>{memberdata && memberdata?.memberId && memberdata?.memberId}</Text>
              </Text>
              {memberdata && memberdata?.dateOfJoining &&
                <Text style={styles.subHeading}>
                  <Text style={{ color: COLORS.Primary_2 }}>Date of Joining :</Text>
                  <Text style={{ color: COLORS.black }}>{memberdata && memberdata?.dateOfJoining ? moment(memberdata?.dateOfJoining).format('DD/MM/YYYY') : ""}</Text>
                </Text>
              }
            </View>
            {/* <View style={styles.editButtonContainer}>
              <TouchableOpacity style={styles.editButton}>
                <View style={styles.edit}>
                  <Image source={PenIcon} style={{ width: 25, height: 25 }} />
                  <Text style={styles.editText}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View> */}

            <ViewShot
              ref={viewRef}
              options={{ format: 'jpg', quality: 1.0 }}
              style={{ backgroundColor: 'transparent' }}
              collapsable={false}>
              <View style={[styles.cardContainer, { position: 'relative' }]}>
                <View style={styles.cardHeadingContainer}>
                  <View style={styles.logoMainContainer}>
                    <View style={styles.logoContainer}>
                      <Image source={Logo} style={{ width: hp(8), height: hp(8) }} resizeMode='contain' />
                    </View>
                  </View>
                  <View style={styles.headingTextContainer}>
                    <Text style={styles.headingText}>Connect with</Text>
                    <Text style={styles.headingText}>Shivdeep</Text>
                    <View style={styles.divider} />
                    <View>
                      <Text style={[styles.addressText, { paddingBottom: 5 }]}>
                        D/3, PC Colony, Sector-89, Delhi
                      </Text>
                    </View>
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
                    <Text style={[styles.memberValue, {textTransform: 'capitalize'}]} >
                      {memberdata && memberdata?.fullName}
                    </Text>
                    <Text style={styles.memberValue}>{memberdata && memberdata?.district ? memberdata?.district : ''}</Text>
                    <Text style={styles.memberValue}>Bihar</Text>
                    <Text style={styles.memberValue}>{memberdata && memberdata?.memberId && memberdata?.memberId}</Text>
                  </View>
                  <View style={styles.avQRContainer}>
                    <View style={[styles.avatarContainer, { backgroundColor: memberdata && memberdata?.image ? '' : COLORS.Primary_2 }]}>
                      {memberdata && memberdata?.image ?
                        <Image
                          source={{ uri: String(memberdata?.image) }}
                          style={{ width: 66, height: 66, borderRadius: 10 }}
                          resizeMode="cover"
                        />
                        :
                        <Image
                          source={UserAvatar}
                          style={{ width: 66, height: 66 }}
                          resizeMode="cover"
                        />
                      }
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
              </View>
            </ViewShot>

            <View style={styles.buttonContianer}>
              <TouchableOpacity style={styles.commonButton} onPress={() => Alert.alert("WIP")}>
                <Icon name="share" size={25} color={COLORS.Primary_2} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => downloadCard()}
                // onPress={() => captureView()}
                // onPress={() => captureAndSave()}
                // onPress={() => Alert.alert("WIP")}
                style={{
                  ...styles.commonButton,
                  backgroundColor: COLORS.Primary_2,
                }}>
                <Icon name="file-download" size={25} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttomContainer}>
              <Text style={styles.referralText}>
                <Text style={{ color: COLORS.Primary_2 }}>
                  Your Referral Code :
                </Text>
                <Text style={{ color: COLORS.black, textTransform: 'uppercase' }}>{" " + memberdata ? memberdata?.referralCode : ''}</Text>
              </Text>
              <TouchableOpacity style={styles.Button} activeOpacity={0.6} onPress={() => Alert.alert("WIP")}>
                <View style={styles.iconContainer}>
                  <Icon name="share" size={25} color={COLORS.white} />
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
