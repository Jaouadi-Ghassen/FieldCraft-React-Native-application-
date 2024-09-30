import React from 'react';
import {TextInput, TextStyle} from 'react-native';
import {styles} from './inputStyle';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: TextStyle;
  placeholderTextColor?: string;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'ascii-capable';
  secureTextEntry?: boolean;
}

const InputTextComponent: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  placeholderTextColor,
  keyboardType = 'ascii-capable',
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default InputTextComponent;
