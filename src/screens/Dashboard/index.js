import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage, BannerOne, EventsBanner, DemoIcon, DemoIcon1, DemoIcon2, DemoIcon3, DemoIcon4, DemoIcon5 } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import Swiper from 'react-native-swiper'
import ApiService from '../../api/ApiService';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';

const DashboardScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true)
    const [bannerData, setBannerData] = useState([])
    const [eventsData, setEventsData] = useState([])
    const [newsData, setNewsData] = useState([])
    const [totalMember, setTotalMember] = useState(0)

    useEffect(() => {
        async function fetchDasgboardApi() {
            try {
                const response = await ApiService.fetchData('v1/dashboard');
                if (response?.data?.success) {
                    setIsLoading(false)
                    const banner = response?.data?.data?.banner?.filter((item) => item?.isActive == "1" && item)
                    setBannerData(banner);
                    setEventsData(response?.data?.data?.events)
                    setNewsData(response?.data?.data?.news)
                    setTotalMember(response?.data?.data?.user?.length)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log('error dashboard------>', error);
            }
        }
        fetchDasgboardApi()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} />
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, position: 'relative' }}>

                        {/* Swiper */}
                        <View style={{ width: '100%', backgroundColor: '#fff', marginVertical: 10 }}>
                            <View style={{ padding: 20, height: hp('40'), elevation: 10, backgroundColor: '#fff' }} >
                                <Swiper
                                    autoplay={true}
                                    showsButtons={true}
                                    // paginationStyle={{ bottom: -10 }}
                                    nextButton={<Text style={{ fontSize: 40, color: COLORS.Primary_2 }}>›</Text>}
                                    prevButton={<Text style={{ fontSize: 40, color: COLORS.Primary_2 }}>‹</Text>}
                                    activeDot={<View style={{ backgroundColor: COLORS.Primary_2, width: 8, height: 8, borderRadius: 4, margin: 3, }} />}
                                >
                                    {bannerData?.length !== 0 && bannerData?.map((item, index) => {

                                        return (
                                            <>
                                                {item?.isActive == "1" &&
                                                    <View key={index} >
                                                        {item?.image ?
                                                            <Image source={{ uri: item?.image }} resizeMode='stretch' style={{ height: hp('29'), width: wp('90'), borderRadius: 5 }} />
                                                            :
                                                            <Image source={BannerOne} style={{ height: hp('28'), width: wp('90') }} />
                                                        }
                                                        {/* <Text style={styles.text}>{item?.title}</Text> */}
                                                    </View>
                                                }
                                            </>
                                        )
                                    })}
                                </Swiper>
                            </View>
                        </View>
                        {/* Swiper End */}

                        <View style={{ paddingTop: 20 }}>
                            <Image source={DemoIcon} resizeMode='stretch' style={{ height: hp('29'), width: wp('90'), borderRadius: 5 }} />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Image source={DemoIcon1} resizeMode='stretch' style={{ height: hp('29'), width: wp('90'), borderRadius: 5 }} />
                        </View>

                        {/* <View style={{ paddingTop: 10 }}>
                            <Image source={DemoIcon2} resizeMode='stretch' style={{ height: hp('29'), width: wp('90'), borderRadius: 5 }} />
                        </View> */}

                        {/* <View style={{ paddingTop: 10, paddingBottom: 30 }}>
                            <Image source={DemoIcon3} resizeMode='stretch' style={{ height: hp('29'), width: wp('90'), borderRadius: 5 }} />
                        </View> */}

                        {/* <View style={{ paddingTop: 10 }}>
                            <Image source={DemoIcon4} resizeMode='stretch' style={{ height: hp('29'), width: wp('90'), borderRadius: 5 }} />
                        </View>

                        <View style={{ paddingTop: 10, paddingBottom: 30 }}>
                            <Image source={DemoIcon5} resizeMode='stretch' style={{ height: hp('29'), width: wp('90'), borderRadius: 5 }} />
                        </View> */}


                        {/* <View style={{ width: '100%', padding: 20, elevation: 5, backgroundColor: '#fff' }}>
                            <Text style={{ fontFamily: FONT.BoldRoboto, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black }}>OUR MEMBERS</Text>
                            <Text style={{ fontFamily: FONT.BoldRoboto, paddingTop: 20, fontSize: FONTS_SIZE.xsmall2, color: COLORS.Primary_2 }}>Total members:- <Text style={{ fontSize: 18, color: COLORS.black }}>{totalMember}</Text></Text>

                        </View> */}

                        {/* {eventsData?.length !== 0 &&
                            <View style={{ marginTop: 10, width: '100%', elevation: 5, paddingTop: 20, backgroundColor: '#fff' }}>
                                <Text style={{ fontFamily: FONT.BoldRoboto, fontSize: FONTS_SIZE.xsmall2, paddingLeft: 20 }}>UPCOMING EVENTS</Text>

                                {
                                    eventsData?.map((item, index) => {
                                        return (
                                            <View style={{ borderBottomWidth: 0.5, paddingHorizontal: 20, paddingTop: 15, borderColor: COLORS.Primary_2, paddingBottom: 20 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ width: '32%', justifyContent: 'center' }}>
                                                        <Text
                                                            style={{
                                                                color: COLORS.Primary_2,
                                                                fontFamily: FONT.Regular,
                                                                fontWeight: '400',
                                                            }}>
                                                            {moment(item.eventDate).format('DD-MM-YYYY')}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: COLORS.Primary_2,
                                                                fontFamily: FONT.Regular,
                                                                fontWeight: '400',
                                                                paddingTop: 2,
                                                            }}>
                                                            {`${item?.eventStartTime} - ${item.eventEndTime}`}
                                                        </Text>
                                                    </View>
                                                    <View style={{ height: hp('7'), width: 1, backgroundColor: COLORS.Primary_2, marginRight: 10 }} />
                                                    <View style={{ width: '65%', justifyContent: 'center' }}>
                                                        <Text
                                                            style={{
                                                                color: COLORS.Primary_2,
                                                                fontFamily: FONT.MediumRoboto,
                                                                fontWeight: '600',
                                                            }}>
                                                            {item.eventTitle}
                                                        </Text>
                                                        <Text
                                                            numberOfLines={3}
                                                            style={{
                                                                color: COLORS.Primary_2,
                                                                fontFamily: FONT.MediumRoboto,
                                                                fontWeight: '400',
                                                                fontSize: 12,
                                                                paddingTop: 2,
                                                            }}>
                                                            {item?.eventDescription}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ paddingTop: 10 }}>
                                                    {
                                                        item?.image ?
                                                            <Image source={{ uri: item?.image }} />
                                                            :
                                                            <Image source={EventsBanner} style={{ width: wp('90'), height: hp('30'), borderRadius: 10 }} />
                                                    }
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        } */}


                        {/* <View style={{ width: wp('100'), marginTop: 10, borderColor: COLORS.gray, borderRadius: 5, elevation: 10, backgroundColor: '#fff' }}>
                            <Text style={{ fontFamily: FONT.BoldRoboto, paddingLeft: 20, paddingTop: 15, fontSize: FONTS_SIZE.xsmall2 }}>LATEST NEWS</Text>

                            {newsData?.length > 0 &&
                                newsData?.map((item) => {
                                    return (
                                        <View style={{ borderBottomWidth: 0.5, paddingHorizontal: 20, borderColor: COLORS.Primary_2, paddingBottom: 20 }}>
                                            <Text style={{ paddingTop: 15, paddingBottom: 5, fontFamily: FONT.BoldRoboto, fontSize: FONTS_SIZE.xsmall2 }}>{item?.title}</Text>
                                            <Text style={{ paddingBottom: 10, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall }}>{item?.description}</Text>

                                            <Text style={{ paddingBottom: 5, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall }}>{item?.newsDate}</Text>
                                            {item?.image ?
                                                <Image source={{ uri: item?.image }} style={{ width: wp('90'), height: hp('30'), borderRadius: 10 }} />
                                                :
                                                <Image source={BannerOne} style={{ width: wp('90'), height: hp('30'), borderRadius: 10 }} />
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View> */}

                    </View>
                    {isLoading && <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator animating={true} size={50} color={COLORS.Primary_2} />
                    </View>}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default DashboardScreen;
