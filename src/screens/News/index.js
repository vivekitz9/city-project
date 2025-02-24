import React, {useEffect, useState} from 'react';
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
import {COLORS, FONT, FONTS_SIZE, hp, wp} from '../../constant';
import {
  ShareIcon,
  BackgroundImage,
  CommentIcon,
  NewsTest,
} from './../../assets/icons/index';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {styles} from './index.style';
import HeaderComponent from '../../components/header';
import Icon from 'react-native-vector-icons/AntDesign';
import ApiService from '../../api/ApiService';
import moment from 'moment';
import {ActivityIndicator} from 'react-native-paper';

const NewsScreen = () => {
  const [t] = useTranslation('translation');
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [textShown, setTextShown] = useState(false);

  const fetchNewsData = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.fetchData('v1/news');
      if (response?.data?.success) {
        setIsLoading(false);
        const data = response?.data?.data;
        setNewsData(data);
      }
      console.log(
        'news fetchdata response------------->',
        JSON.stringify(response),
      );
    } catch (error) {
      setIsLoading(false);
      console.log('news fetchdata error ------------->', error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const ListItem = ({item}) => {
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: COLORS.white,
          marginVertical: 15,
          padding: 20,
        }}>
        {/* Heading */}
        <Text
          style={{
            fontFamily: FONT.Bold,
            fontSize: FONTS_SIZE.regular,
            fontWeight: '600',
            lineHeight: 20.5,
          }}>
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
          }}>
          Layout image displayed during a television news program broadcast
        </Text>

        <View style={{paddingVertical: 10}}>
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

          {item.image ? (
            <Image
              source={{uri: item.image}}
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.Primary_2,
                }}>
                <Icon name="heart" color={COLORS.white} size={25} />
              </TouchableOpacity>

              <Text style={{paddingLeft: 5}}>{item?.like?.length}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={CommentIcon} style={{width: 40, height: 40}} />

              <Text Style={{paddingLeft: 5}}> {item?.comment?.length}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={ShareIcon} style={{width: 40, height: 40}} />

              <Text style={{paddingLeft: '5'}}> {item?.share?.length} </Text>
            </View>
          </View>
          <View>
            {/* Description */}
            {textShown ? (
              <Text
                style={{
                  fontFamily: FONT.Regular,
                  fontSize: FONTS_SIZE.xsmall,
                  fontWeight: '400',
                  lineHeight: 20.5,
                  paddingTop: 10,
                }}>
                {item.description}
              </Text>
            ) : (
              <Text
                numberOfLines={5}
                style={{
                  fontFamily: FONT.Regular,
                  fontSize: FONTS_SIZE.xsmall,
                  fontWeight: '400',
                  lineHeight: 20.5,
                  paddingTop: 10,
                }}>
                {item.description}
              </Text>
            )}
            {
              <Text
                onPress={() => setTextShown(!textShown)}
                style={{
                  color: COLORS.Primary_2,
                  textAlign: 'right',
                  fontFamily: FONT.Regular,
                  fontSize: FONTS_SIZE.xsmall2,
                }}>
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            }
          </View>
        </View>
      </View>
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
              flex: 1,
            }}>
            {newsData.length > 0 ? (
              <FlatList
                data={newsData}
                keyExtractor={item => item.id}
                renderItem={ListItem}
                removeClippedSubviews={false}
                scrollEnabled={false}
              />
            ) : (
              <View>
                <Text>Data Not Found</Text>
              </View>
            )}
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
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default NewsScreen;
