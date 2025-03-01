import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { BackgroundImage, Banner } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';


const MissionVisionScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} title={'Mission & Vision'} />
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    <View style={styles.subContainer}>

                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ color: COLORS.Primary_2, fontSize: 24, fontFamily: FONT.Bold, fontWeight: '800' }}>Coming soon</Text>

                            {/* <Text style={{ fontFamily: FONT.Regular, fontSize: FONTS_SIZE.xsmall2, color: COLORS.black, lineHeight: 25.5 }}>
                                The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's De finibus bonorum et malorum.[6][7] The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand (even) pages, breaks off on page 34 with "Neque porro quisquam est qui do-" and continues on page 36 with "lorem ipsum ...", suggesting that the galley type of that page was mixed up to make the dummy text seen today.
                                Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore ...
                            </Text> */}
                        </View>
                    </View>
                {/* </ScrollView> */}
            </ImageBackground>
        </SafeAreaView>
    );
};
export default MissionVisionScreen;
