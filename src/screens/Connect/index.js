import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage, BannerOne } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import Swiper from 'react-native-swiper'

const data = [
    {
        title: "Aenean leo",
        body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
        imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
        title: "In turpis",
        body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
        imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
        title: "Lorem Ipsum",
        body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
        imgUrl: "https://picsum.photos/id/12/200/300",
    },
];
const ConnectScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const isCarousel = React.useRef(null)

    const handleChange = (value) => {
        console.log('value----->', value.length);

        if (value.length === 4) {
            navigation.navigate("VerifyOtp")
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} />
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ margin: 20, justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                        {/* Swiper */}
                        <View style={{ height: hp('40'), width: wp('90'), borderColor: COLORS.gray, borderRadius: 20, elevation: 10, backgroundColor: '#fff' }} >
                            <Swiper
                                autoplay={true}
                                showsButtons={true}
                                nextButton={<Text style={{ fontSize: 40, color: COLORS.Primary_2 }}>›</Text>}
                                prevButton={<Text style={{ fontSize: 40, color: COLORS.Primary_2 }}>‹</Text>}
                                activeDot={<View style={{ backgroundColor: COLORS.Primary_2, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                            >
                                {data?.map((item) => {
                                    return (
                                        <>
                                            <Image source={BannerOne} style={{ height: 250, width: wp('90'), borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                                            <Text style={styles.text}>Beautiful</Text>
                                        </>
                                    )
                                })}
                            </Swiper>
                        </View>
                        {/* Swiper End */}

                        <View style={{ width: wp('90'), marginTop: 16, borderColor: COLORS.gray, borderRadius: 20, elevation: 10, backgroundColor: '#fff' }}>

                            <View>
                                <Text style={{ paddingHorizontal: 20, paddingVertical: 15, fontFamily: FONT.BoldRoboto, fontSize: FONTS_SIZE.xsmall2 }}>UPCOMING EVENTS</Text>
                                <Image source={BannerOne} style={{ width: wp('90'), height: hp('30'), borderRadius: 20 }} />
                            </View>

                        </View>

                        <View style={{ width: wp('90'), marginTop: 16, borderColor: COLORS.gray, borderRadius: 20, elevation: 10, backgroundColor: '#fff' }}>

                            <View>
                                <Text style={{ paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10, fontFamily: FONT.BoldRoboto, fontSize: FONTS_SIZE.xsmall2 }}>Television news screen layout</Text>
                                <Text style={{ paddingHorizontal: 20, paddingBottom: 15, fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall }}>Television news screen layout</Text>


                                <Image source={BannerOne} style={{ width: wp('90'), height: hp('30'), borderRadius: 20 }} />

                            </View>

                        </View>

                    </View>
                    <Text>Dashboard</Text>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default ConnectScreen;
