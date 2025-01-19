import { COLORS, FONT, FONTS_SIZE, METRICS, hp, wp } from '../../constant';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    subContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoContainer: {
      justifyContent: 'center', 
      alignItems: 'center', 
      // height: hp('45%')
    },
    OTPcontainer:{
      width: wp('85'),
      height: hp('30'),
      alignItems: 'center'
    },
    activePinCodeContainer:{
      color: COLORS.Primary_2,
      borderWidth: 2,
    },
    pinCodeContainer:{
      width: 60,
      height: 70,
      borderColor: COLORS.Primary_2,
      borderWidth: 2,
    },
    pinCodeText:{
      color: COLORS.black,
      fontFamily: FONT.Bold,
      fontWeight: '400'
    },
    focusStick:{
      color: COLORS.Primary_2
    }
  });