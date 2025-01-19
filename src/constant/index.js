import {Dimensions} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const METRICS = {
  SmallGap: 5,
  Gap: 10,
  DoubleGap: 20,
  TriGap: 35,
  Radius: 10,
  RadiusDouble: 20,
  ScreenWidth: Dimensions.get('window').width,
  ScreenHeight: Dimensions.get('window').height,
};

export const COLORS = {
  Primary: '#D0D5DD',
  Primary_2: '#F83758',
  Secondary: '#010000',
  white: '#ffffff',
  black: '#000000',
  gray: '#757981',
  skyLighter: '#E6E6E6',
  lightgray: '#757981',
  error: 'red',
  accent: '#efa981',
  BLACK_SHADE_1: '#1F1F1F',
  WHITE_SHADE_BG: '#F3F5F8',
  pink: '#EF476F',
  ErrColor: '#FF0D10',
  GRAY_SHADE: '#D0D5DD',
  GRAY_SHADE2: '#A49FA0',
  DARK: '#282828',
  GREY_BG: '#F1EDFF',
  SEEN_GREY: '#B9B6C1',
  BGGREY: '#EEEEEE',
  msgPrimary: 'rgba(135, 102, 255, 0.2)',
  BORDER_GREY: '#504343',
  DESC_TEXT: '#515152',
  RED: '#FF0000',
  GREEN: '#3DEC55'
};

// Colors definations
export const FONTS_SIZE = {
  smaller: 10,
  small: 12,
  xsmall: 14,
  xsmall2: 16,
  regular: 18,
  large: 20,
  xlarge: 22,
  xxlarge: 24,
  xxxlarge: 34,
  largeUlta: 40,
};

export const FONT = {
  Regular: 'Roboto-Regular',
  Bold: 'Roboto-Bold',
  Semibold: 'Roboto-Regular',
  Medium: 'Roboto-Medium',
  Light: 'Roboto-Light',
  BoldRoboto: 'Roboto-Bold',
  MediumRoboto: 'Roboto-Medium',
  RegularRoboto: 'Roboto-Regular',
};

export const wp = val => widthPercentageToDP(val);

export const hp = val => heightPercentageToDP(val);
