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


const BlogsScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} title={'Blogs'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.subContainer}>
                        <View style={{ width: wp('90'), height: hp('26'), borderRadius: 20, backgroundColor: COLORS.white }}>
                            <Image source={Banner} resizeMode='contain' />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black, lineHeight: 25.5 }}>
                                This project is a comprehensive digital platform designed to enhance user engagement
                                and streamline interactions. It provides a seamless user experience with features such
                                as secure login, event management, membership registration, real-time communication,
                                and news/blog updates. The platform ensures accessibility with language selection,
                                while the intuitive dashboard, side menu, and bottom navigation bar allow users to
                                access various sections efficiently.
                                The membership system enables users to register and receive a digital membership
                                card, which can be downloaded and shared. The events module keeps users updated
                                with ongoing and upcoming events, allowing date-wise filtering. The news and blog
                                sections provide insights and updates. The "Connect with Me" feature facilitates direct
                                one-on-one communication, with options for messaging, voice, and image sharing. In
                                the future, a group chat feature will be added to enhance community engagement. A
                                dedicated Help & Support section ensures that users can easily submit queries and
                                receive prompt assistance.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default BlogsScreen;
