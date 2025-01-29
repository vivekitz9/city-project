import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {COLORS} from '../constant';

const InputTextField = ({
  placeholder,
  value,
  label,
  onChangeText,
  outlineColor,
  maxLength,
  style,
  keyboardType,
  onFocus,
  right,
}) => {
  return (
    <TextInput
      mode={'outlined'}
      label={label}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      outlineColor={COLORS.gray}
      activeOutlineColor={COLORS.Primary_2}
      numberOfLines={1}
      textColor="#000"
      maxLength={maxLength}
      style={style}
      keyboardType={keyboardType}
      onFocus={onFocus}
      right={right}
    />
  );
};

export default InputTextField;
