import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { BackgroundImage, Banner, HelpCenterIcon } from './../../assets/icons/index';
import {
    useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import HelpCenterTabViewScreen from '../../components/HelpCenter/HelpTabView';
import FaqViewScreen from '../../components/HelpCenter/FaqView';
import InputTextField from '../../components/textfield';
import Button from '../../components/button';
import ApiService from '../../api/ApiService';
import { useToast } from "react-native-toast-notifications";
import { ActivityIndicator } from 'react-native-paper';

const data = [
    {
        title: 'How do I manage my notifications?',
        subtitle: 'To manage notifications, go to "Settings," select "Notification Settings," and customize your preferences.'
    },
    {
        title: 'How do I start a guided meditation session?',
        subtitle: 'To manage notifications, go to "Settings," select "Notification Settings," and customize your preferences.'
    },
    {
        title: 'How do I join a support group?',
        subtitle: 'To manage notifications, go to "Settings," select "Notification Settings," and customize your preferences.'
    },
    {
        title: 'How do I manage my notifications?',
        subtitle: 'To manage notifications, go to "Settings," select "Notification Settings," and customize your preferences.'
    },
    {
        title: 'Is my data safe and private?',
        subtitle: 'To manage notifications, go to "Settings," select "Notification Settings," and customize your preferences.'
    }
]

const HelpCenterScreen = () => {
    const [t] = useTranslation('translation');
    const navigation = useNavigation();
    const [tabView, setTabView] = useState("faq")
    const [formData, setFromData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        description: ''
    });
    const { name, email, mobileNumber, description } = formData;
    const [isFormValid, setIsFormValid] = useState(false);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (key, value) => {
        setFromData(prevData => ({ ...prevData, [key]: value }));
    };

    useEffect(() => {
        if (
            name.length === 0 ||
            email.length === 0 ||
            description.length === 0 ||
            mobileNumber.length === 0
        ) {
            setIsFormValid(false);
        } else if (
            !mobileNumber.match('[0-9]{10}')
        ) {
            setIsFormValid(false);
        } else {
            setIsFormValid(true);
        }
    }, [name, email, mobileNumber, description])

    const handleSubmit = async () => {
        if (isFormValid) {
            setIsLoading(true)
            try {
                const payload = {
                    "name": name,
                    "email": email,
                    "mobile": mobileNumber,
                    "description": description
                }
                const response = await ApiService.postData('v1/contactus', payload);
                if (response?.data?.success) {

                    toast.show(response?.data?.message, { type: "success" })
                } else {
                    toast.show(response?.data?.message, { type: "waring" })
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log('Contact us error--->', error);
            }

        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.container}>
                <HeaderComponent navigation={navigation} title={'Help Center'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.subContainer}>

                        <HelpCenterTabViewScreen
                            onPress={(values) => setTabView(values)}
                        />

                        {
                            tabView === "faq" ?
                                <View style={{ marginVertical: 20 }}>
                                    {
                                        data.map((item, index) => {
                                            return <FaqViewScreen data={item} key={index} />
                                        })
                                    }

                                </View>
                                :
                                <View style={{ alignItems: 'center' }}>

                                    <View style={{ height: hp('15'), justifyContent: 'center' }}>
                                        <Image source={HelpCenterIcon} resizeMode='contain' />
                                    </View>

                                    <View style={{ paddingTop: 10 }}>

                                        <InputTextField
                                            label={t('NAME')}
                                            style={styles.inputText}
                                            keyboardType="default"
                                            value={name}
                                            onChangeText={value => handleInputChange('name', value)}
                                        />

                                        <View style={{ paddingTop: 10 }}>
                                            <InputTextField
                                                label={t('EMAIL')}
                                                style={styles.inputText}
                                                keyboardType="default"
                                                value={email}
                                                onChangeText={value => handleInputChange('email', value)}
                                            />
                                        </View>

                                        <View style={{ paddingTop: 10 }}>
                                            <InputTextField
                                                label={t('MOBILENUMBER')}
                                                style={styles.inputText}
                                                maxLength={10}
                                                keyboardType="default"
                                                value={mobileNumber}
                                                onChangeText={value => handleInputChange('mobileNumber', value)}
                                            />
                                        </View>

                                        <View style={{ paddingTop: 10 }}>

                                            <InputTextField
                                                label={t('DESCRIPTION')}
                                                style={{ width: wp('85'), height: hp('15') }}
                                                keyboardType="default"
                                                value={description}
                                                numberOfLines={4}
                                                multiline={true}
                                                onChangeText={value => handleInputChange('description', value)}
                                            />

                                        </View>

                                        <View style={{ paddingTop: hp('5') }}>
                                            <Button
                                                enable={!isFormValid}
                                                disabled={!isFormValid}
                                                onPress={() => handleSubmit()}
                                                title={t('SUBMIT')}
                                            />
                                        </View>
                                    </View>
                                </View>
                        }

                    </View>
                    {isLoading &&
                        <View style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator animating={true} size={50} color={COLORS.Primary_2} />
                        </View>
                    }
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default HelpCenterScreen;
