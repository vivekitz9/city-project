import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, ImageBackground, ScrollView, FlatList, Text } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { BackgroundImage, GalleryIcon } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import ApiService from '../../api/ApiService';
import { ActivityIndicator } from 'react-native-paper';

const GalleryScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [gallery, setGallery] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await ApiService.fetchData('v1/gallery');
                if (response?.data?.success) {
                    const evenNumbers = response?.data?.data.filter(num => num?.toggle === "1");
                    setGallery(evenNumbers)
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
                console.log('error dashboard------>', error);
            }
        }
        fetchData()
    }, [])

    const ListItem = ({ item, index }) => {
        return (
            <>
                {/* {item?.toggle == "1" && */}
                    <View style={{ margin: 5, width: wp('42'), height: hp('15'), borderRadius: 10 }} key={index}>
                        <Image source={{ uri: item?.image }} resizeMode='cover' style={{ width: wp('42'), height: hp('15'), borderRadius: 10, borderColor: COLORS.black, borderWidth: 1 }} />
                    </View>
                {/* } */}
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} title={'Gallery'} />

                <View style={{ margin: 20, flex: 1, width: wp("90") }}>
                    <FlatList
                        data={gallery}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={ListItem}
                        numColumns={2}
                        removeClippedSubviews={false}
                    />
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
            </ImageBackground>
        </SafeAreaView>
    );
};
export default GalleryScreen;
