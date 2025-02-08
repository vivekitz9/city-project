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
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#000',
      fontSize: 16,
      fontWeight: '600',
      paddingVertical: 10,
      paddingHorizontal: 15
    }
  });