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
