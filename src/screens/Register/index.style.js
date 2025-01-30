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
    height: hp('5'),
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
    color: COLORS.Primary_2,
  },
});
