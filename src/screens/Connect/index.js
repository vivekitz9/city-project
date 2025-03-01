import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage, BannerOne } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApiService from '../../api/ApiService';
import { ActivityIndicator } from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import { jwtDecode } from "jwt-decode";
import moment from 'moment';
import Tooltip from 'react-native-walkthrough-tooltip';

const ConnectScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [messages, setMessages] = useState([])
    const [sendMessage, setSendMessage] = useState(false)
    const scrollViewRef = useRef()
    const [messageText, setMessageText] = useState('')
    const [imageUri, setImageUri] = useState("");
    const [isSendLoading, setIsSendLoading] = useState(false)
    const [media, setMedia] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        fetchUser()
    }, [])

    useEffect(() => {
        async function fetchMessage() {
            try {
                const data = await EncryptedStorage.getItem('token')
                const userData = JSON.parse(data)
                const token = userData?.data?.token;
                const decoded = jwtDecode(token)
                const response = await ApiService.fetchData('v1/chat/user/' + String(decoded?.id) + "/2768fdf8-afae-4ae6-a401-5789ee92b53b");
                console.log('response reload------>', response);
                if (response?.data?.success) {
                    setMessages(response?.data?.data);
                }
            } catch (error) {
                console.log('error------->', error);
            }
        }
        fetchMessage()
        fetchUser()
    }, [sendMessage])

    async function fetchMessage() {
        try {
            const data = await EncryptedStorage.getItem('token')
            const userData = JSON.parse(data)
            const token = userData?.data?.token;
            const decoded = jwtDecode(token)
            const response = await ApiService.fetchData('v1/chat/user/' + String(decoded?.id) + "/2768fdf8-afae-4ae6-a401-5789ee92b53b");
            console.log('response reload------>', response);
            if (response?.data?.success) {
                setMessages(response?.data?.data);
            }
        } catch (error) {
            console.log('error------->', error);
        }
    }

    async function fetchUser() {
        try {
            const data = await EncryptedStorage.getItem('token')
            const userData = JSON.parse(data)
            const token = userData?.data?.token;
            const decoded = jwtDecode(token)
            const response = await ApiService.fetchData('v1/users/' + decoded?.id);

            console.log('response----->', response);
            if (response?.data?.success) {
                setImageUri(response?.data?.data?.Item?.image)
            }
        } catch (error) {
            console.log('error user get====>', error);
        }
    }

    const handleMessage = async () => {
        try {
            const data = await EncryptedStorage.getItem('token')
            const userData = JSON.parse(data)
            const token = userData?.data?.token;
            const decoded = jwtDecode(token)
            setIsSendLoading(true)
            const payload = new FormData();
            payload.append('senderId', String(decoded?.id));
            payload.append('receiverId', "2768fdf8-afae-4ae6-a401-5789ee92b53b");
            payload.append('message', messageText);
            // payload.append('image', decoded?.id);
            // payload.append('video', decoded?.id);

            await fetch("https://shivdeeplande.com:8001/api/v1/chat/send", {
                method: "post",
                body: payload,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }).then(response => {
                return response?.json();
            }).then(res => {
                console.log(res, 'res')
                setMessageText('')
                fetchMessage()
                setIsSendLoading(false)
                setSendMessage(true)

            })

        } catch (error) {
            console.log('error send ---->', error);
        }
    }

    const handleAttachment = async () => {

    }


    const pickImageOrVideo = () => {
        let options = {
            mediaType: 'mixed', // 'photo' | 'video' | 'mixed'
            quality: 1,
            selectionLimit: 1, // Set to 0 for unlimited selection
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled picker');
            } else if (response.errorMessage) {
                console.log('Error:', response.errorMessage);
            } else {
                setMedia(response.assets[0]);
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} />
                <View style={styles.container}>
                    <ScrollView
                        style={{ gap: 30 }}
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
                        ref={scrollViewRef}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ marginTop: 10, marginBottom: 20 }}>
                            {
                                messages?.length > 0 ?
                                    messages?.map((item, index) => {
                                        return (
                                            <View key={index}>
                                                {item?.senderId === "2768fdf8-afae-4ae6-a401-5789ee92b53b" ?
                                                    <View style={{ minHeight: 5, flexDirection: 'row', margin: 5 }}>
                                                        <View style={{ margin: 5, justifyContent: 'center' }}>
                                                            <Image source={Logo} style={{ width: 40, height: 40 }} />
                                                        </View>
                                                        <View style={{ minHeight: 5, backgroundColor: COLORS.Primary_2, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, maxWidth: '70%' }}>
                                                            <Text style={{ color: COLORS.white, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2 }}>{item?.text}</Text>
                                                            <Text style={{ color: COLORS.white, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.small, textAlign: 'right', paddingTop: 2 }}>{moment(item?.createDate).format('hh:mm')}</Text>
                                                        </View>
                                                    </View>
                                                    :
                                                    <View style={{ alignItems: "flex-end" }}>
                                                        <View style={{ minHeight: 5, flexDirection: 'row', margin: 5 }}>
                                                            <View style={{ minHeight: 5, backgroundColor: COLORS.Primary, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, maxWidth: '70%' }}>
                                                                <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2 }}>{item?.text}</Text>
                                                                <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.small, textAlign: 'right', paddingTop: 2 }}>{moment(item?.createDate).format('hh:mm')}</Text>
                                                            </View>
                                                            {imageUri && <View style={{ margin: 5, justifyContent: 'center' }}>
                                                                <Image source={{ uri: imageUri }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                                                            </View>}
                                                        </View>
                                                    </View>
                                                }
                                            </View>
                                        )
                                    })
                                    :
                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(100) }}>
                                        <Text style={{ fontSize: 20, color: COLORS.Primary_2 }}>No Data</Text>
                                    </View>
                            }
                        </View>
                    </ScrollView>
                </View>
                <KeyboardAvoidingView
                    behavior='position'
                    enabled
                    keyboardVerticalOffset={Platform.select({ ios: 50, android: -195 })}
                >
                    <View
                        style={styles.messageType}
                    >

                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                                <TouchableOpacity style={{ padding: 10 }} activeOpacity={0.6} onPress={() => setVisible(true)}>
                                    {/* <Icon name="attachment" size={20} color={COLORS.Primary_2} /> */}
                                </TouchableOpacity>
                            <TextInput
                                placeholder={'Type your message...'}
                                style={styles.inputText}
                                multiline
                                value={messageText}
                                onChangeText={val => setMessageText(val)}
                            />
                        </View>


                        {!isSendLoading ? messageText.length > 0 && <TouchableOpacity style={{ padding: 10 }} activeOpacity={0.6} onPress={handleMessage}>
                            <Ionicons name="send" size={25} color={COLORS.Primary_2} />
                        </TouchableOpacity>
                            :
                            <View style={{ padding: 10 }}>
                                <ActivityIndicator animating={true} size={20} color={COLORS.Primary_2} />
                            </View>
                        }
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default ConnectScreen;
