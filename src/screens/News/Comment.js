import React, { useEffect, useState, useRef } from "react";
import { Modal, View, Text, Platform, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import {
    CommentIcon
} from './../../assets/icons/index';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import ApiService from '../../api/ApiService';
import { jwtDecode } from "jwt-decode";

const { height } = Dimensions.get("window"); // Get device height

const CommentScreen = ({ handleMessage, item }) => {
    const [visible, setVisible] = useState(false);
    const [messageText, setMessageText] = useState('')
    const [imageUri, setImageUri] = useState('')
    const [userId, setUserId] = useState('')
    const scrollViewRef = useRef()

    useEffect(() => {
        if (item?.comment?.length > 0) {
            fetchUser()
        }
    }, [item])

    async function fetchUser(userId) {
        try {
            const data = await EncryptedStorage.getItem('token')
            const userData = JSON.parse(data)
            const token = userData?.data?.token;
            const decoded = jwtDecode(token)
            const response = await ApiService.fetchData('v1/users/' + decoded?.id);
            console.log('response user----->', response);
            if (response?.data?.success) {
                setImageUri(response?.data?.data?.Item?.image)
                setUserId(response?.data?.data?.Item?.id)
            }
        } catch (error) {
            console.log('error user get====>', error);
        }
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity activeOpacity={0.6} onPress={() => setVisible(true)}>
                <Image source={CommentIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.modalContainer} activeOpacity={10}>
                    <View style={styles.modalContent}>

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingRight: 10 }}> 
                            <Text style={{ fontFamily: FONT.BoldRoboto, fontSize: 18 }}>Comments</Text>
                            <TouchableOpacity style={{  }} activeOpacity={0.6} onPress={() => setVisible(false)}>
                                <Icon name="close" color={COLORS.black} size={24} />
                            </TouchableOpacity>

                        </View>

                        <ScrollView
                            style={{ gap: 30 }}
                            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
                            ref={scrollViewRef}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ flex: 1 }}>



                                {item?.comment?.length > 0 &&
                                    item?.comment?.map((cell, index) => {
                                        return (
                                            <>
                                                {cell?.id !== userId ?
                                                    <View key={index} style={{ minHeight: 5, flexDirection: 'row', margin: 5 }}>
                                                        {cell?.image && <View style={{ margin: 5, justifyContent: 'center' }}>
                                                            <Image source={{ uri: cell?.image }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                                                        </View>}
                                                        <View style={{ minHeight: 5, backgroundColor: COLORS.Primary, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, maxWidth: '80%' }}>

                                                            <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, fontWeight: '800', textTransform: 'capitalize' }} numberOfLines={1}>{cell?.name}</Text>
                                                            <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall, lineHeight: 20 }} multiline={true}>{cell?.comment}</Text>
                                                        </View>
                                                    </View>
                                                    :
                                                    <View key={index} style={{ alignItems: 'flex-end' }}>
                                                        <View style={{ minHeight: 5, flexDirection: 'row', margin: 5 }}>
                                                            <View style={{ minHeight: 5, backgroundColor: COLORS.Primary, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, maxWidth: '70%' }}>
                                                                <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, fontWeight: '800', textTransform: 'capitalize' }} numberOfLines={1}>{cell?.name}</Text>
                                                                <Text style={{ color: COLORS.black, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall, lineHeight: 20 }} multiline={true}>{cell?.comment}</Text>
                                                            </View>
                                                            {imageUri && <View style={{ margin: 5, justifyContent: 'center' }}>
                                                                <Image source={{ uri: imageUri }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                                                            </View>}
                                                        </View>
                                                    </View>}
                                            </>
                                        )
                                    })
                                }

                            </View>
                        </ScrollView>

                        <KeyboardAvoidingView
                            behavior='position'
                            enabled
                            keyboardVerticalOffset={Platform.select({ ios: 50, android: -195 })}
                        >
                            <View style={styles.messageType}>
                                <TextInput
                                    placeholder={'Type your comment...'}
                                    style={styles.inputText}
                                    multiline
                                    value={messageText}
                                    onChangeText={val => setMessageText(val)}
                                />

                                {messageText && <TouchableOpacity style={{ padding: 10 }} activeOpacity={0.6} onPress={() => { handleMessage(item, messageText); setMessageText('') }}>
                                    <Ionicons name="send" size={25} color={COLORS.Primary_2} />
                                </TouchableOpacity>}

                            </View>
                        </KeyboardAvoidingView>

                        {/* <Text style={styles.modalText}>This is a 90% height modal</Text>
                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.button}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    button: {
        backgroundColor: "blue",
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    },
    modalContent: {
        height: height * 0.8, // 90% of screen height
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        // alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    inputText: {
        width: wp('74'),
        // height: hp('7'),
        fontSize: FONTS_SIZE.xsmall2,
        fontFamily: FONT.Regular,
        paddingLeft: 15
    },
    messageType: {
        display: 'flex',
        minHeight: 56,
        width: wp('85'),
        borderWidth: 1,
        borderColor: COLORS.Primary_2,
        borderRadius: 12,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 10
    },
});

export default CommentScreen;