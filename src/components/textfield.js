import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../constant';

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
  disabled,
  numberOfLines = 1,
  multiline
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
      numberOfLines={numberOfLines}
      textColor="#000"
      disabled={disabled}
      maxLength={maxLength}
      style={style}
      keyboardType={keyboardType}
      onFocus={onFocus}
      right={right}
      multiline={multiline}
    />
  );
};

export default InputTextField;
