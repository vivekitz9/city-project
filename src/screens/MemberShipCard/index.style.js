import {COLORS, FONT, FONTS_SIZE, METRICS, hp, wp} from '../../constant';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: 10,
    marginTop: 60,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  headingContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainHeading: {
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: FONTS_SIZE.xlarge,
    fontFamily: FONT.Bold,
    color: COLORS.Primary_2,
  },
  subHeading: {
    textAlign: 'center',
    paddingBottom: 15,
    fontSize: FONTS_SIZE.xsmall,
    fontFamily: FONT.BoldRoboto,
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: COLORS.white,
    width: wp(21),
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.Primary_2,
    borderRadius: 7,
    marginRight: 15,
    elevation: 2,
    shadowColor: COLORS.GRAY_SHADE2,
    shadowOpacity: 1,
  },
  edit: {
    flexDirection: 'row',
    gap: 8,
  },
  editText: {
    fontSize: FONTS_SIZE.regular,
    fontFamily: FONT.Semibold,
    color: COLORS.Primary_2,
  },

  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
  },
  cardHeadingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.Primary_2,
    padding: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
    gap: 10,
    height: 90,
  },
  logoMainContainer: {
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  penIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 12,
    elevation: 2,
    borderColor: COLORS.white,
  },
  headingTextContainer: {
    flex: 1,
  },
  headingText: {
    fontFamily: FONT.Bold,
    fontSize: FONTS_SIZE.large,
    color: COLORS.white,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.white,
    marginVertical: 3,
    width: wp(36),
  },
  addressText: {
    fontFamily: FONT.Semibold,
    color: COLORS.white,
    fontSize: FONTS_SIZE.smaller,
  },
  memberDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 20,
    paddingLeft: 32,
    backgroundColor: COLORS.white,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    elevation: 5,
  },
  memberLeftContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  memberDetailsMidContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  memberDetailsRightContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  removeSpace: {
    flex: 1,
    width: wp(10),
    backgroundColor: 'red',
  },
  memberText: {
    marginBottom: 8,
    fontSize: FONTS_SIZE.smaller,
    fontFamily: FONT.Bold,
    color: COLORS.black,
  },
  colonText: {
    marginBottom: 8,
    fontSize: FONTS_SIZE.smaller,
    fontFamily: FONT.Bold,
    color: COLORS.black,
  },
  memberValue: {
    marginBottom: 8,
    fontSize: FONTS_SIZE.smaller,
    fontFamily: FONT.Bold,
    color: COLORS.black,
    flexWrap: 'wrap',
  },

  avQRContainer: {
    position: 'absolute',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    top: 36,
    right: 15,
  },
  avatarContainer: {
    width: wp(21),
    height: hp(11),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Primary_2,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.white,
    overflow: 'hidden',
  },
  QRContainer: {
    width: wp(15),
    height: hp(7),
  },

  buttonContianer: {
    // flex: 0.3,
    marginTop: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  commonButton: {
    width: wp(21),
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.Primary_2,
    borderRadius: wp(4),
    elevation: 5,
    shadowColor: COLORS.GRAY_SHADE2,
    shadowOpacity: 1,
  },
  buttomContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  referralText: {
    textAlign: 'center',
    paddingBottom: 15,
    fontSize: FONTS_SIZE.xsmall,
    fontFamily: FONT.BoldRoboto,
  },
  Button: {
    backgroundColor: COLORS.Primary_2,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(85),
    height: hp(7),
    borderRadius: 10,
    elevation: 5,
    opacity: 0.9,
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  shareText: {
    fontSize: FONTS_SIZE.xsmall,
    fontFamily: FONT.BoldRoboto,
    color: COLORS.white,
  },
});
