import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONT, FONTS_SIZE, hp, wp} from '../../constant';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const TabViewScreen = ({onPress, toggle}) => {
  const [t] = useTranslation('translation');
  const navigation = useNavigation();

  const handlePress = values => {
    onPress(cur => !cur);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: wp('90'),
        backgroundColor: '#D6D9E2',
        height: 35,
        borderRadius: 10,
      }}>
      <TouchableOpacity
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: toggle ? COLORS.Primary_2 : '#D6D9E2',
          borderRadius: 10,
        }}
        activeOpacity={0.6}
        onPress={() => handlePress()}>
        <Text
          style={{
            fontFamily: FONT.Regular,
            textAlign: 'center',
            fontSize: FONTS_SIZE.xsmall,
            fontWeight: '600',
            color: toggle ? COLORS.white : COLORS.Primary_2,
          }}>
          Today
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: !toggle ? COLORS.Primary_2 : '#D6D9E2',
          borderRadius: 10,
        }}
        activeOpacity={0.6}
        onPress={() => handlePress()}>
        <Text
          style={{
            fontFamily: FONT.Regular,
            fontSize: FONTS_SIZE.xsmall,
            fontWeight: '600',
            color: !toggle ? COLORS.white : COLORS.Primary_2,
          }}>
          Upcoming
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default TabViewScreen;
