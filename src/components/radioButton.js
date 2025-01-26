import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, FONT, FONTS_SIZE} from '../constant';
import {useTranslation} from 'react-i18next';

const RadioButton = ({id, genderValue, gender, onPress}) => {
  const [t] = useTranslation('translation');
  return (
    <TouchableOpacity
      key={id}
      style={styles.radioContainer}
      onPress={() => onPress(genderValue)}>
      <View
        style={[
          styles.radioButton,
          gender === genderValue && styles.radioSelected,
        ]}
      />
      <Text style={styles.radioLabel}>{t(genderValue)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioButton: {
    height: 19,
    width: 19,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Primary,
  },
  radioSelected: {
    backgroundColor: COLORS.Primary_2,
  },
  radioLabel: {
    fontFamily: FONT.Medium,
    fontSize: FONTS_SIZE.xsmall,
    color: COLORS.Primary_2,
  },
});

export default RadioButton;
