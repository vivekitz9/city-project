import {COLORS, FONT, FONTS_SIZE, METRICS, hp, wp} from '../../constant';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('20'),
    width: '100%',
  },
  avatarContainer: {
    position: 'relative',
    // alignContent: 'center',
    // justifyContent: 'center',
    // width: 60,
    // height: 56,
  },
  userAvatar: {
    backgroundColor: COLORS.Primary_2,
    width: 54,
    height: 54,
    padding: 5,
    borderRadius: 27,
  },
  penIcon: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    width: 25,
    height: 25,
  },
  formContainer: {
    // marginLeft: 28,
  },
  inputContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: wp('85'),
    height: hp('7'),
    fontSize: FONTS_SIZE.xsmall2,
    fontFamily: FONT.Regular,
  },
  dateContainer: {
    width: wp('85'),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    height: 55,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderWidth: 1.2,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textdate: {
    fontSize: FONTS_SIZE.xsmall2,
    fontFamily: FONT.RegularRoboto,
    color: COLORS.gray,
  },
  activeBorder: {
    borderColor: COLORS.Primary_2,
    borderWidth: 2,
  },
});
