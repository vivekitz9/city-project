import React, { useState, useEffect, useCallback } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage, BannerOne } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import { GiftedChat } from 'react-native-gifted-chat'


const ConnectScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} />
                {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}> */}

                <View>
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                    />
                </View>
                {/* </ScrollView> */}
            </ImageBackground>
        </SafeAreaView>
    );
};
export default ConnectScreen;
