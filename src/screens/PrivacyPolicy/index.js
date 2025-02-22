import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { BackgroundImage, Banner } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';


const PrivacyPolicyScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} title={'Privacy Policy'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.subContainer}>

                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black, lineHeight: 25.5 }}>
                                1. Introduction
                                This Privacy Policy explains how Connect with Shivdeep collects, uses, and protects
                                user information when using our services.
                                2. Information We Collect
                                 Personal Information: Name, mobile number, email (if provided), membership
                                details.
                                 Login Information: OTP verification details or social media authentication data.
                                 Usage Data: App interactions, event registrations, messages sent, and support
                                requests.
                                 Device Information: IP address, device type, and app version.
                                3. How We Use Your Information
                                 To provide a seamless user experience and access to all app features.
                                 To generate and manage digital membership cards.
                                 To facilitate one-to-one chat and, in the future, group communication.
                                 To send event notifications, news updates, and blog content.
                                 To ensure user security and prevent unauthorized access.
                                4. Data Sharing & Protection
                                 We do not sell or share your personal data with third parties for marketing
                                purposes.
                                 Data is encrypted and stored securely to prevent unauthorized access.
                                 User information may be shared with legal authorities if required by law.
                                5. User Rights & Controls
                                 Users can update or delete their personal information from their profile settings.
                                 Users can opt out of non-essential notifications.
                                 Requests for account deletion can be made via shivdeeplande20@gmail.com.
                                6. Third-Party Services
                                 Social media login (Google, Apple, Facebook) follows their respective privacy
                                policies.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default PrivacyPolicyScreen;
