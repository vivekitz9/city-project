import { COLORS, FONT, FONTS_SIZE, METRICS, hp, wp } from '../../constant';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    profileContainer: {
        height: hp("20"),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileSubConter: {
        position: 'relative',
        width: 90,
        height: 90
    },
    imageContainer: {
        backgroundColor: COLORS.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 90,
        borderRadius: 45
    },
    profileIcon: {
        width: 60,
        height: 60
    },
    editIcon: {
        position: 'absolute',
        bottom: 5,
        right: 0,
        width: 25,
        height: 25
    },

});