import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { ShareIcon, BackgroundImage, CommentIcon, NewsTest } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import Icon from 'react-native-vector-icons/AntDesign';

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

const NewsScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation()
    const [textShown, setTextShown] = useState(false)


    const ListItem = ({ item, index }) => {
        return (
            <View key={index} style={{ backgroundColor: COLORS.white, marginVertical: 15, padding: 20 }}>
                {/* Heading */}
                <Text style={{ fontFamily: FONT.Bold, fontSize: FONTS_SIZE.regular, fontWeight: '600', lineHeight: 20.5 }}>Television news screen layout </Text>

                {/* title */}
                <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, fontWeight: '400', lineHeight: 20.5, paddingTop: 10 }}>Layout image displayed during a television news program broadcast</Text>

                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontFamily: FONT.Regular, fontWeight: '400', fontSize: FONTS_SIZE.small }}>Dec. 25TH, 2024</Text>

                    <Image source={NewsTest} resizeMode="cover" style={{ width: wp('90'), height: hp('25'), borderRadius: 20, marginTop: 5, borderWidth: 1, borderColor: COLORS.black }} />

                    <View style={{ marginVertical: 10, marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity activeOpacity={0.6} style={{ width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.Primary_2 }}>
                                <Icon name="heart" color={COLORS.white} size={25} />
                            </TouchableOpacity>

                            <Text style={{ paddingLeft: 5 }}>890</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={CommentIcon} style={{ width: 40, height: 40 }} />

                            <Text Style={{ paddingLeft: 5 }}> 1450</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={ShareIcon} style={{ width: 40, height: 40 }} />

                            <Text style={{ paddingLeft: '5' }}> 956 </Text>
                        </View>
                    </View>
                    <View>
                        {/* Description */}
                        {textShown ?
                            <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall, fontWeight: '400', lineHeight: 20.5, paddingTop: 10 }}>A television news screen layout or television news screen interface refers to the layout image displayed during a television news program broadcast. The layouts used differ between television stations and countries, and information displayed may include things such as main news topics and headlines within the lower third, channel logos, a news ticker, a time clock, and in some cases weather and </Text>
                            :
                            <Text numberOfLines={5} style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall, fontWeight: '400', lineHeight: 20.5, paddingTop: 10 }}>A television news screen layout or television news screen interface refers to the layout image displayed during a television news program broadcast. The layouts used differ between television stations and countries, and information displayed may include things such as main news topics and headlines within the lower third, channel logos, a news ticker, a time clock, and in some cases weather and </Text>
                        }
                        {
                            <Text
                                onPress={() => setTextShown(!textShown)}
                                style={{ color: COLORS.Primary_2, textAlign: 'right', fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2 }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                        }
                    </View>
                </View>
            </View>

        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} />
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={ListItem}
                        removeClippedSubviews={false}
                    />


                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default NewsScreen;
