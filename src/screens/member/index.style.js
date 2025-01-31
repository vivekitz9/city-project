import {COLORS, FONT, FONTS_SIZE, METRICS, hp, wp} from '../../constant';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('23'),
  },
  avatarContainer: {
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
    width: 60,
    height: 56,
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
    bottom: 0,
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
});
