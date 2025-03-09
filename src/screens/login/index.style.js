import { COLORS, FONT, FONTS_SIZE, METRICS, hp, wp } from '../../constant';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    logoContainer: {
      justifyContent: 'center', 
      alignItems: 'center', 
      height: hp('40%')
    },
    inputContainer: {
      marginHorizontal: 24,
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    inputText: {
      width: wp('85'),
      height: 55,
      fontSize: FONTS_SIZE.xsmall2,
      fontFamily: FONT.Regular
    },
    registerContainer:{ 
        height: hp('20'),
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    registerText:{ 
        fontFamily: FONT.Semibold, 
        fontSize: FONTS_SIZE.xsmall, 
        color: COLORS.black 
    },
  });