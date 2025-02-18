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


const HelpCenterScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} title={'Help Center'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.subContainer}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '50%', borderBottomWidth: 2, borderColor: COLORS.Primary_2 }}>
                                <Text style={{ fontFamily: FONT.BoldRoboto, textAlign: 'center', paddingVertical: 5, fontSize: FONTS_SIZE.xsmall2, fontWeight: '600' }}>FAQ</Text>
                            </View>
                            <View style={{ width: '50%',}}>
                                <Text style={{ fontFamily: FONT.BoldRoboto, textAlign: 'center', paddingVertical: 5, fontSize: FONTS_SIZE.xsmall2, fontWeight: '600' }}>CONTACT US</Text>
                            </View>
                        </View>


                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default HelpCenterScreen;
