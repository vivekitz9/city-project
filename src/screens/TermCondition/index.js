import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { BackgroundImage, Banner } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import ApiService from '../../api/ApiService';
import { ActivityIndicator } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';

const TermConditionScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true)
            try {
                const response = await ApiService.fetchData('v1/termCondition');

                console.log('response=====>', response?.data?.data[0]?.content);
                if (response?.data?.success) {
                    setIsLoading(false)
                    setData(response?.data?.data[0]?.content)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log('error user get====>', error);
            }
        }
        fetchUser()
    }, [])

    const source = {
        html: data
    };


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} title={'Term & Condition'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.subContainer}>


                        <View style={{ padding: 10 }}>
                            {data ? <RenderHtml
                                contentWidth={wp('95')}
                                source={source}
                            />:
                            <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black, lineHeight: 25.5 }}>
                               
                            </Text>}
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default TermConditionScreen;
