import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage, EventsBanner } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import TabViewScreen from './TabView';

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

const EventsScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [tabviewValue, setTabviewValue] = useState('')

    const ListItem = ({ item, index }) => {
        return (
            <>
                <View key={index} style={{ flexDirection: 'row', width: wp('90'), backgroundColor: '#fff', padding: 10, borderRadius: 10, marginTop: 20 }}>
                    <View style={{ width: '32%', justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.Primary_2, fontFamily: FONT.Regular, fontWeight: '400' }}>05 Dec 2024</Text>
                        <Text style={{ color: COLORS.Primary_2, fontFamily: FONT.Regular, fontWeight: '400', paddingTop: 2 }}>02 PM - 03 PM</Text>
                    </View>
                    <View style={{ width: '68%', justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.Primary_2, fontFamily: FONT.MediumRoboto, fontWeight: '600' }}>Where can I get some.</Text>
                        <Text style={{ color: COLORS.Primary_2, fontFamily: FONT.MediumRoboto, fontWeight: '400', fontSize: 12, paddingTop: 2 }}>It is a long established fact that a reader will be distracted.</Text>
                    </View>
                </View>
                <View key={index} style={{ width: wp('90'), borderRadius: 10, height: hp('36'), alignItems: 'center', backgroundColor: COLORS.white, marginTop: 10 }}>
                    <View style={{ padding: 5 }}>
                        <Image source={EventsBanner} />
                    </View>


                    <View style={{ flexDirection: 'row', width: wp('90'), alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: FONT.Medium, fontSize: FONTS_SIZE.regular, color: COLORS.Primary_2 }}>Joined</Text>
                            <View style={{ backgroundColor: COLORS.Primary_2, borderRadius: 5, marginLeft: 10 }}>
                                <Text style={{ color: COLORS.white, padding: 5 }}>10K</Text>
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity={0.6} style={{ backgroundColor: COLORS.Primary_2, borderRadius: 5 }}>
                            <Text style={{ color: COLORS.white, padding: 5 }}>Register Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ marginHorizontal: 20, marginVertical: 20, flex: 1, alignItems: 'center' }}>

                        <TabViewScreen onPress={(value) => setTabviewValue(value)} />



                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={ListItem}
                            removeClippedSubviews={false}
                        />


                    </View>

                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default EventsScreen;
