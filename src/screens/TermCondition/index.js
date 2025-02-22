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


const TermConditionScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} title={'Term & Condition'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.subContainer}>


                        <View style={{ padding: 10 }}>
                            <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black, lineHeight: 25.5 }}>
                                1. Introduction
                                Welcome to Connect with Shivdeep. By using our application, you agree to these Terms
                                & Conditions. Please read them carefully before proceeding.
                                2. User Eligibility
                                 Anyone can use this app, regardless of age.
                                 By registering, you confirm that the information you provide is accurate and up to
                                date.
                                3. Account Registration & Security
                                 Users must register with a valid mobile number and verify their identity via OTP.
                                 Social media login options (Google, Apple, Facebook) are available for
                                convenience.
                                 You are responsible for maintaining the confidentiality of your login credentials.
                                4. Features & Services
                                 Users can access sections like Mission & Vision, Members, Events, Blogs, News,
                                and Connect with Me.
                                 Membership registration provides a digital membership card, which can be
                                downloaded and shared.
                                 Events section allows users to view and filter upcoming events.
                                 News and Blog sections provide relevant updates and information.
                                 The "Connect with Me" feature enables one-to-one messaging with text, voice,
                                and image sharing.
                                 A future update will include group chat functionality.
                                5. User Conduct
                                 Users must not engage in illegal, abusive, or inappropriate behavior within the
                                app.
                                 Any misuse of chat features, including spamming or offensive content, will result
                                in suspension or termination of the account.
                                 Users are solely responsible for the content they share.
                                6. Data & Privacy
                                 We collect and store user data as outlined in our Privacy Policy.
                                 Users have the right to update or delete their personal information as per
                                applicable laws.
                                7. Limitations & Liabilities
                                 We do not guarantee uninterrupted service due to maintenance or unforeseen
                                technical issues.
                                 We are not responsible for any data loss or unauthorized access due to user
                                negligence.
                                8. Modifications
                                 We reserve the right to update these Terms & Conditions at any time. Users will
                                be notified of any major changes.
                                9. Contact Information
                                For any questions or concerns regarding these Terms & Conditions, please contact us
                                at shivdeeplande20@gmail.com.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default TermConditionScreen;
