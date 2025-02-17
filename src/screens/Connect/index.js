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
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/Feather';


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
                <View style={styles.container}>
                    <GiftedChat
                        messages={messages}
                        onSend={(messages) => onSend(messages)}
                        user={{ _id: 1 }}
                        renderBubble={(props) => (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: "#0078FF", // Change sender bubble color
                                        padding: 5,
                                    },
                                    left: {
                                        backgroundColor: "#F0F0F0", // Change receiver bubble color
                                    },
                                }}
                                textStyle={{
                                    right: { color: "#fff" },
                                    left: { color: "#000" },
                                }}
                            />
                        )}
                        renderInputToolbar={(props) => (
                            <InputToolbar
                                {...props}
                                containerStyle={{
                                    backgroundColor: COLORS.white, // Dark background
                                    borderTopWidth: 0,
                                    borderColor: "#444",
                                    borderRadius: 20,
                                    marginHorizontal: 15,
                                    marginBottom: 20,
                                    paddingVertical: 10,
                                    elevation: 5,
                                }}
                            />
                        )}

                        renderSend={(props) => (
                            <Send {...props} containerStyle={{ padding: 10, borderColor: COLORS.Primary_2 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 30, borderRadius: 15 }}>
                                    <Icon name="send" size={24} color={COLORS.Primary_2} />
                                </View>
                            </Send>
                        )}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default ConnectScreen;
