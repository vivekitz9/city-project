import * as React from 'react';
import {COLORS, FONT, FONTS_SIZE, hp, wp} from '../constant';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';

const Button = ({title, onPress, style, enable = false, disabled = false}) => {
  console.log('title--->', title);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      disabled={disabled}
      style={[
        styles.container,
        {backgroundColor: enable ? COLORS.gray : COLORS.Primary_2},
      ]}>
      <Text style={[styles.buttonText, style]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('85'),
    height: 55,
    backgroundColor: COLORS.Primary_2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: FONT.Regular,
    fontSize: FONTS_SIZE.xsmall2,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});

export default Button;
