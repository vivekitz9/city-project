import { COLORS, FONT, FONTS_SIZE, METRICS, hp, wp } from '../../constant';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    logoContainer: {
      justifyContent: 'center', 
      alignItems: 'center', 
      height: hp('45%')
    },
    inputContainer: {
      marginHorizontal: 24
    },
    inputText: {
      width: wp('88'),
      height: hp('8'),
      fontSize: FONTS_SIZE.xsmall2,
      fontFamily: FONT.Regular
    },
    registerContainer:{ 
        height: hp('21'), 
        justifyContent: 'flex-end', 
        alignItems: 'center' 
    },
    registerText:{ 
        fontFamily: FONT.Semibold, 
        fontSize: FONTS_SIZE.xsmall, 
        color: COLORS.black 
    },
  });