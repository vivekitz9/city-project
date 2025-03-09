import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    View,
    Image,
    ImageBackground,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import {
    ShareIcon,
    BackgroundImage,
    CommentIcon,
    NewsTest,
} from './../../assets/icons/index';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import ApiService from '../../api/ApiService';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import LikeScreen from './Like';
import CommentScreen from './Comment';
import ReadScreen from './Read';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useToast } from 'react-native-toast-notifications';
import ShareScreen from './Share';
import Share from 'react-native-share';

const NewsDetailsScreen = ({ route }) => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [newsData, setNewsData] = useState({});
    const toast = useToast();
    const [isLoadingShare, setIsLoadingShare] = useState(false);

    const fetchNewsData = async () => {
        setIsLoading(true);
        try {
            const response = await ApiService.fetchData('v1/news/' + route?.params?.id);
            console.log('response news----->', response);
            if (response?.data?.success) {
                setIsLoading(false);
                const data = response?.data?.data.Item;
                setNewsData(data);
            }
        } catch (error) {
            setIsLoading(false);
            console.log('news fetchdata error ------------->', error);
        }
    };

    useEffect(() => {
        if (route?.params) {
            console.log('route00000----->', route);
            fetchNewsData();
        }
    }, [route]);

    const handleLike = async (value, item) => {
        try {
            const data = await EncryptedStorage.getItem('token')
            const userData = JSON.parse(data)
            const token = userData?.data?.token;
            const payload = new FormData();
            payload.append('like', value);

            await fetch("https://shivdeeplande.com:8001/api/v1/news/" + item?.id, {
                method: "put",
                body: payload,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    Accept: "*",
                    "Content-Type": "multipart/form-data"
                },
            }).then(response => {
                return response.json();
            }).then(res => {
                console.log(res, 'res')
                if (res?.success) {
                    setIsLoading(false)
                    fetchNewsData()
                    toast.show("Successfully", { type: 'success' })
                } else {
                    setIsLoading(false);
                    toast.show("Invaild user details", { type: 'waring' })
                }
            })
        } catch (error) {
            console.log('error----->', error);
        }
    }

    const handleMessage = async (item, message) => {
        try {
            const data = await EncryptedStorage.getItem('token')
            const userData = JSON.parse(data)
            const token = userData?.data?.token;
            const payload = new FormData();
            payload.append('comment', message);

            await fetch("https://shivdeeplande.com:8001/api/v1/news/" + item?.id, {
                method: "put",
                body: payload,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    Accept: "*",
                    "Content-Type": "multipart/form-data"
                },
            }).then(response => {
                return response.json();
            }).then(res => {
                console.log(res, 'res')
                if (res?.success) {
                    setIsLoading(false)
                    fetchNewsData()
                    toast.show("Successfully", { type: 'success' })
                } else {
                    setIsLoading(false);
                    toast.show("Invaild user details", { type: 'waring' })
                }
            })
        } catch (error) {
            console.log('error----->', error);
        }
    }

    const handleShare = async(item) => {
        try {
          const data = await EncryptedStorage.getItem('token')
          const userData = JSON.parse(data)
          const token = userData?.data?.token;
          const payload = new FormData();
          payload.append('share', true);
    
          await fetch("https://shivdeeplande.com:8001/api/v1/news/" + item?.id, {
            method: "put",
            body: payload,
            headers: {
              "Authorization": `Bearer ${token}`,
              Accept: "*",
              "Content-Type": "multipart/form-data"
            },
          }).then(response => {
            return response.json();
          }).then(async(res) => {
            console.log(res, 'res')
            if (res?.success) {
    
              const options = {
                message: 'Connect with shivdeep',
                url: 'https://play.google.com/store/apps/details?id=com.connectWithShivdeep',
              };
            
                await Share.open(options);
             
              setIsLoading(false)
              fetchNewsData()
              toast.show("Successfully", { type: 'success' })
            } else {
              setIsLoading(false);
              toast.show("Invaild user details", { type: 'waring' })
            }
          })
        } catch (error) {
          console.log('error----->', error);
        }
      }

    const ListItem = ({ item }) => {
        return (
            <>{
                item.toggle == "1" ?
                    <View
                        key={item.id}
                        style={{
                            backgroundColor: COLORS.white,
                            marginVertical: 5,
                            padding: 20,
                        }}>
                        {/* Heading */}
                        <Text
                            style={{
                                fontFamily: FONT.Bold,
                                fontSize: FONTS_SIZE.regular,
                                fontWeight: '600',
                                lineHeight: 20.5,
                                paddingTop: 5
                            }} >
                            {item.title}
                        </Text>

                        {/* title */}
                        <Text
                            style={{
                                fontFamily: FONT.Regular,
                                fontSize: FONTS_SIZE.xsmall2,
                                fontWeight: '400',
                                lineHeight: 20.5,
                                paddingTop: 10,
                            }} numberOfLines={2}>
                            {item?.description}
                        </Text>

                        <View style={{ paddingVertical: 10 }}>
                            <Text
                                style={{
                                    fontFamily: FONT.Regular,
                                    fontWeight: '400',
                                    fontSize: FONTS_SIZE.small,
                                }}>
                                {moment(item.newsDate)
                                    .format('MMM. Do, YYYY')
                                    .replace(
                                        /(\d+)(st|nd|rd|th)/,
                                        (_, number, suffix) => `${number}${suffix.toUpperCase()}`,
                                    )}
                            </Text>

                            {item?.image ? (
                                <Image
                                    source={{ uri: item?.image }}
                                    resizeMode="cover"
                                    style={{
                                        width: wp('90'),
                                        height: hp('25'),
                                        borderRadius: 20,
                                        marginTop: 5,
                                        borderWidth: 1,
                                        borderColor: COLORS.black,
                                    }}
                                />
                            ) : (
                                <Image
                                    source={NewsTest}
                                    resizeMode="cover"
                                    style={{
                                        width: wp('90'),
                                        height: hp('25'),
                                        borderRadius: 20,
                                        marginTop: 5,
                                        borderWidth: 1,
                                        borderColor: COLORS.black,
                                    }}
                                />
                            )}

                            <View
                                style={{
                                    marginVertical: 10,
                                    marginHorizontal: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {!isLoading ? <LikeScreen
                                        item={item}
                                        onPress={(value) => handleLike(value, item)}
                                    /> : <ActivityIndicator size={20} color={COLORS.Primary_2} />}
                                    <Text style={{ paddingLeft: 5 }}>{item?.like?.length}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CommentScreen handleMessage={(val, textValue) => handleMessage(val, textValue)} item={item} />
                                    <Text Style={{ paddingLeft: 5 }}> {item?.comment?.length}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {!isLoadingShare ? <ShareScreen
                                        item={item}
                                        onPress={() => handleShare(item)}
                                    /> : <ActivityIndicator size={20} color={COLORS.Primary_2} />}
                                    <Text style={{ paddingLeft: '5' }}> {item?.share?.length} </Text>
                                </View>
                            </View>
                            <View>
                                {item?.description &&
                                    <ReadScreen item={item} />
                                }
                            </View>
                        </View>
                    </View>
                    : null}
            </>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={BackgroundImage}
                resizeMode="cover"
                style={styles.container}>
                <HeaderComponent navigation={navigation} title={"News details"} />
                <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true} style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {Object.keys(newsData).length > 0 ? (
                            <View
                                style={{
                                    backgroundColor: COLORS.white,
                                    marginVertical: 5,
                                    padding: 20,
                                }}>
                                {/* Heading */}
                                <Text
                                    style={{
                                        fontFamily: FONT.Bold,
                                        fontSize: FONTS_SIZE.regular,
                                        fontWeight: '600',
                                        lineHeight: 20.5,
                                        paddingTop: 5
                                    }} >
                                    {newsData.title}
                                </Text>

                                {/* title */}
                                <Text
                                    style={{
                                        fontFamily: FONT.Regular,
                                        fontSize: FONTS_SIZE.xsmall2,
                                        fontWeight: '400',
                                        lineHeight: 20.5,
                                        paddingTop: 10,
                                    }} numberOfLines={2}>
                                    {newsData?.description}
                                </Text>

                                <View style={{ paddingVertical: 10 }}>
                                    <Text
                                        style={{
                                            fontFamily: FONT.Regular,
                                            fontWeight: '400',
                                            fontSize: FONTS_SIZE.small,
                                        }}>
                                        {moment(newsData.newsDate)
                                            .format('MMM. Do, YYYY')
                                            .replace(
                                                /(\d+)(st|nd|rd|th)/,
                                                (_, number, suffix) => `${number}${suffix.toUpperCase()}`,
                                            )}
                                    </Text>

                                    {newsData?.image ? (
                                        <Image
                                            source={{ uri: newsData?.image }}
                                            resizeMode="cover"
                                            style={{
                                                width: wp('90'),
                                                height: hp('25'),
                                                borderRadius: 20,
                                                marginTop: 5,
                                                borderWidth: 1,
                                                borderColor: COLORS.black,
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            source={NewsTest}
                                            resizeMode="cover"
                                            style={{
                                                width: wp('90'),
                                                height: hp('25'),
                                                borderRadius: 20,
                                                marginTop: 5,
                                                borderWidth: 1,
                                                borderColor: COLORS.black,
                                            }}
                                        />
                                    )}

                                    <View
                                        style={{
                                            marginVertical: 10,
                                            marginHorizontal: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {!isLoading ? <LikeScreen
                                                item={newsData}
                                                onPress={(value) => handleLike(value, newsData)}
                                            /> : <ActivityIndicator size={20} color={COLORS.Primary_2} />}
                                            <Text style={{ paddingLeft: 5 }}>{newsData?.like?.length}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CommentScreen handleMessage={(val, textValue) => handleMessage(val, textValue)} item={newsData} />
                                            <Text Style={{ paddingLeft: 5 }}> {newsData?.comment?.length}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {!isLoadingShare ? <ShareScreen
                                                item={newsData}
                                                onPress={() => handleShare(newsData)}
                                            /> : <ActivityIndicator size={20} color={COLORS.Primary_2} />}
                                            <Text style={{ paddingLeft: '5' }}> {newsData?.share?.length} </Text>
                                        </View>
                                    </View>
                                    <View>
                                        {newsData?.description &&
                                            <Text
                                                style={{
                                                    fontFamily: FONT.Regular,
                                                    fontSize: FONTS_SIZE.xsmall,
                                                    fontWeight: '400',
                                                    lineHeight: 20.5,
                                                    paddingTop: 10,
                                                }}>
                                                {newsData?.description}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <Text>Data Not Found</Text>
                            </View>
                        )}
                        {/* <Text style={{ color: COLORS.Primary_2, fontSize: 24, fontFamily: FONT.Bold, fontWeight: '800' }}>Coming soon</Text> */}

                        {isLoading && (
                            <View
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 200,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <ActivityIndicator
                                    animating={true}
                                    size={50}
                                    color={COLORS.Primary_2}
                                />
                            </View>
                        )}
                    </View>
                    {/* <CommentScreen
            visibleComment={visibleComment}
          /> */}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default NewsDetailsScreen;
