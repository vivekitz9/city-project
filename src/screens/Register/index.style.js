import {COLORS, FONT, FONTS_SIZE, METRICS, hp, wp} from '../../constant';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('21%'),
  },
  formContainer: {
    // marginLeft: 28,
  },
  inputContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    gap: 12,
    // marginHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: wp('85'),
    height: 55,
    fontSize: FONTS_SIZE.xsmall2,
    fontFamily: FONT.Regular,
  },
  registerContainer: {
    height: hp('8'),
    justifyContent: 'center',
    alignItems: 'center',

  },
  registerText: {
    fontFamily: FONT.Medium,
    fontSize: FONTS_SIZE.xsmall,
    color: COLORS.black,
  },
  /*************Radio Button Container*/
  genderContainer: {
    marginVertical: 5,
    width: wp('85'),
    height: 'auto',
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 20,
  },
  label: {
    paddingBottom: 6,
    fontFamily: FONT.Bold,
    fontSize: FONTS_SIZE.xsmall2,
    color: COLORS.black,
  },
  dateContainer:{ 
    width: wp("85"), 
    backgroundColor: COLORS.white, 
    flexDirection: 'row', 
    height: 55, 
    paddingLeft: 15, 
    paddingRight: 15, 
    borderRadius: 5,
     borderWidth: 1, 
     borderColor: COLORS.gray, 
     alignItems: 'center', 
     justifyContent: 'space-between' 
    },
    dropcontainer: {
      backgroundColor: 'white',
      // padding: 16,
      width: wp('85'),
      marginTop: 15
    },
    dropdown: {
      height: 55,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    droplabel: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 15,
      top: -10,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      left: 10
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});
