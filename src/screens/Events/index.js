import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONT, FONTS_SIZE, hp, wp } from '../../constant';
import { Logo, BackgroundImage, EventsBanner } from './../../assets/icons/index';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { styles } from './index.style';
import HeaderComponent from '../../components/header';
import TabViewScreen from './TabView';
import ApiService from '../../api/ApiService';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';

const EventsScreen = () => {
  const [t] = useTranslation('translation');
  const navigation = useNavigation();
  const [tabviewValue, setTabviewValue] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.fetchData('v1/events');

      console.log('response----->', response);
      if (response?.data?.success) {
        setIsLoading(false);
        const eventData = response?.data?.data;
        const todayDate = moment().format('YYYY-MM-DD');
        const data = eventData.filter(event => {
          if (tabviewValue) {
            return moment(event.eventDate).isSame(todayDate, 'day');
          } else {
            return moment(event.eventDate).isAfter(todayDate, 'day');
          }
        });
        setData(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error events --------->', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tabviewValue]);

  const ListItem = ({ item, index }) => {
    return (
      <>
        {item.toggle == "1" ?
          <>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90'),
                backgroundColor: '#fff',
                padding: 10,
                // borderRadius: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginTop: 20,
              }}>
              <View style={{ width: '32%', justifyContent: 'center' }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontFamily: FONT.Regular,
                    fontWeight: '400',
                  }}>
                  {item.eventDate}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontFamily: FONT.Regular,
                    fontWeight: '400',
                    paddingTop: 2,
                  }}>
                  {`${item.eventStartTime} - ${item.eventEndTime}`}
                </Text>
              </View>
              <View style={{ width: '68%', justifyContent: 'center' }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontFamily: FONT.MediumRoboto,
                    fontWeight: '800'
                  }} numberOfLines={1}>
                  {item.eventTitle}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontFamily: FONT.MediumRoboto,
                    fontWeight: '400',
                    fontSize: 12,
                    paddingTop: 2,
                  }} numberOfLines={3}>
                  {item.eventDescription}
                </Text>
              </View>
            </View>
            <View
              key={index}
              style={{
                width: wp('90'),
                // borderRadius: 10,
                // height: hp('36'),
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                height: hp('30'),
                alignItems: 'center',
                backgroundColor: COLORS.white,
                // marginTop: 10,
              }}>
              <View style={{ padding: 5 }}>
                {item?.image ? (
                  <Image resizeMode='stretch' source={{ uri: String(item?.image) }} style={{ width: wp('88'), height: hp('28'), borderRadius: 10 }} />
                ) : (
                  <Image source={EventsBanner} />
                )}
              </View>

              {/* <View
            style={{
              flexDirection: 'row',
              width: wp('90'),
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}> */}
              {/* <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: FONT.Medium,
                  fontSize: FONTS_SIZE.regular,
                  color: COLORS.Primary_2,
                }}>
                Joined
              </Text>
              <View
                style={{
                  backgroundColor: COLORS.Primary_2,
                  borderRadius: 5,
                  marginLeft: 10,
                }}>
                <Text style={{ color: COLORS.white, padding: 5 }}>
                  {`${item.totalJoined} K`}
                </Text>
              </View>
            </View> */}

              {/* <TouchableOpacity
              activeOpacity={0.6}
              style={{ backgroundColor: COLORS.Primary_2, borderRadius: 5 }}>
              <Text style={{ color: COLORS.white, padding: 5 }}>
                Register Now
              </Text>
            </TouchableOpacity> */}
              {/* </View> */}
            </View>
          </>
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
        <HeaderComponent navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              flex: 1,
            }}>
            {/* <Text style={{ color: COLORS.Primary_2, fontSize: 24, fontFamily: FONT.Bold, fontWeight: '800' }}>Coming soon</Text> */}

            <TabViewScreen
              onPress={value => setTabviewValue(value)}
              toggle={tabviewValue}
            />
            {data.length > 0 ? (
              <FlatList
                data={data}
                keyExtractor={(item, index) => item.id}
                renderItem={ListItem}
                scrollEnabled={false}
              />
            ) : null}
            {isLoading && (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: tabviewValue ? 0 : 200,
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
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default EventsScreen;
