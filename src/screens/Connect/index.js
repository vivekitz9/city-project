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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from "react-native-webview";
import DocumentPicker from "react-native-document-picker";

const ConnectScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [messages, setMessages] = useState([])
    const [sendMessage, setSendMessage] = useState(false)
    const scrollViewRef = useRef()
    const [messageText, setMessageText] = useState('')
    const [imageUri, setImageUri] = useState("");
    const [isSendLoading, setIsSendLoading] = useState(false)
    const [media, setMedia] = useState([]);
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);


    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles], // Allow all file types
            });
            console.log('res------>', res);
            setFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User canceled");
            } else {
                console.error("Error picking document", err);
            }
        }
    };


    useEffect(() => {
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
            // let photo = {}
            if (media?.length > 0) {
                if (media[0]?.type == "image/jpeg") {
                    const photo = {
                        uri: media[0]?.uri,
                        type: 'image/jpeg',
                        name: media[0]?.fileName,
                    };
                    payload.append('image', photo);
                } else if (media[0]?.type == "video/mp4") {
                    const photo = {
                        uri: media[0]?.uri,
                        type: 'video/mp4',
                        name: media[0]?.fileName,
                    };
                    payload.append('video', photo);
                }
            }

            if (file) {
                const document = {
                    uri: file.uri,
                    type: 'application/pdf',
                    name: file.name
                }
                payload.append('document', document);
            }

            console.log('payload--->', payload);

            await fetch("https://shivdeeplande.com:8001/api/v1/chat/send", {
                method: "post",
                body: payload,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    Accept: "*",
                    "Content-Type": "multipart/form-data"
                },
            }).then(response => {
                return response?.json();
            }).then(res => {
                console.log(res, 'res')
                setMessageText('')
                fetchMessage()
                setIsSendLoading(false)
                setSendMessage(true)
                setMedia([])
                setFile('')
            })

        } catch (error) {
            console.log('error send ---->', error);
        }
    }

    const handleAttachment = async () => {
        console.log('response---------->');
        let options = {
            mediaType: 'mixed', // 'photo' | 'video' | 'mixed'
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled picker');
            } else if (response.errorMessage) {
                console.log('Error:', response.errorMessage);
            } else {
                setMedia(response.assets);
            }
        });
    }

    const handleRemove = (item, index) => {
        const newNumbers = [...media.slice(0, index), ...media.slice(index + 1)];
        setMedia(newNumbers)
    }

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
                                                        {item?.image &&
                                                            <View style={{ minHeight: 5, flexDirection: 'row', margin: 5 }}>
                                                                <View style={{ minHeight: 5, backgroundColor: COLORS.Primary, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, maxWidth: '70%' }}>
                                                                    <Image source={{ uri: item?.image }} style={{ width: 100, height: 90, borderRadius: 5 }} />
                                                                    <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.small, textAlign: 'right', paddingTop: 2 }}>{moment(item?.createDate).format('hh:mm')}</Text>
                                                                </View>
                                                                {imageUri && <View style={{ margin: 5, justifyContent: 'center' }}>
                                                                    <Image source={{ uri: imageUri }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                                                                </View>}
                                                            </View>
                                                        }
                                                        {item?.video &&
                                                            <View style={{ minHeight: 5, flexDirection: 'row', margin: 5 }}>
                                                                <View style={{ minHeight: 5, backgroundColor: COLORS.Primary, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, maxWidth: '70%' }}>

                                                                    <WebView
                                                                        source={{ uri: item?.video }}
                                                                        allowsFullscreenVideo={true}
                                                                        mediaPlaybackRequiresUserAction={false}
                                                                        javaScriptEnabled={true} // Enable JavaScript
                                                                        allowsInlineMediaPlayback={true} // Required for iOS autoplay
                                                                        style={{ width: 300, height: 200, alignItems: 'center', justifyContent: 'center' }}
                                                                    />
                                                                    <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.small, textAlign: 'right', paddingTop: 2 }}>{moment(item?.createDate).format('hh:mm')}</Text>
                                                                </View>
                                                                {imageUri && <View style={{ margin: 5, justifyContent: 'center' }}>
                                                                    <Image source={{ uri: imageUri }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                                                                </View>}
                                                            </View>
                                                        }

                                                        {item?.document &&
                                                            <View style={{ minHeight: 5, flexDirection: 'row', margin: 5 }}>
                                                                <View style={{ minHeight: 5, flexDirection: 'row', backgroundColor: COLORS.Primary, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, maxWidth: '70%' }}>
                                                                    <AntDesign name="copy1" size={25} color={COLORS.Primary_2} />

                                                                    <WebView
                                                                        source={{ uri: item?.document }}

                                                                        style={{ width: 60, height: 40, alignItems: 'center', justifyContent: 'center' }}
                                                                    />
                                                                    <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.small, textAlign: 'right', paddingTop: 2 }}>{moment(item?.createDate).format('hh:mm')}</Text>
                                                                </View>
                                                                {imageUri && <View style={{ margin: 5, justifyContent: 'center' }}>
                                                                    <Image source={{ uri: imageUri }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                                                                </View>}
                                                            </View>
                                                        }

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

                {visible && <View style={{ width: '20%', left: 20 }}>
                    <View style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', backgroundColor: COLORS.white, width: 50, height: 140, borderWidth: 0.5, borderColor: COLORS.Primary_2, borderTopLeftRadius: 5, borderTopEndRadius: 5 }} >
                        <TouchableOpacity activeOpacity={0.6} onPress={() => { setVisible(false); pickDocument() }}>
                            <Ionicons name="document-attach" size={25} color={COLORS.Primary_2} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => { setVisible(false); handleAttachment() }}>
                            <EvilIcons name="image" size={25} color={COLORS.Primary_2} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => { setVisible(false); handleAttachment() }}>
                            <Feather name="video" size={25} color={COLORS.Primary_2} />
                        </TouchableOpacity>
                    </View>
                </View>}

                {media.length > 0 &&
                    media.map((item, index) => {
                        return (
                            <View style={{ width: '100%', alignItems: "center" }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '92%', margin: 3, padding: 15, borderWidth: 0.5, borderColor: COLORS.Primary_2, borderRadius: 5 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <EvilIcons name="image" size={25} color={COLORS.Primary_2} />
                                        <Text style={{ fontSize: 16, color: COLORS.Primary_2 }}>{item.fileName}</Text>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => handleRemove(item, index)}>
                                        <AntDesign name="close" size={25} color={COLORS.Primary_2} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }

                {
                    file &&
                    <View style={{ width: '100%', alignItems: "center" }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '92%', margin: 3, padding: 15, borderWidth: 0.5, borderColor: COLORS.Primary_2, borderRadius: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="copy1" size={25} color={COLORS.Primary_2} />
                                <Text style={{ fontSize: 16, color: COLORS.Primary_2 }}>{file.name}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => setFile("")}>
                                <AntDesign name="close" size={25} color={COLORS.Primary_2} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                <KeyboardAvoidingView
                    behavior='position'
                    enabled
                    keyboardVerticalOffset={Platform.select({ ios: 50, android: -195 })}
                >
                    <View
                        style={styles.messageType}
                    >
                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                            <TouchableOpacity style={{ padding: 10 }} activeOpacity={0.6} onPress={() => setVisible(!visible)}>
                                <Icon name="attachment" size={20} color={COLORS.Primary_2} />
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
