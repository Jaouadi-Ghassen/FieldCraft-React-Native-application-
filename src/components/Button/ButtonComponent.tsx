import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import style from './ButtonStyle';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
}

const ButtonComponent: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant,
}) => {
  const buttonStyle =
    variant === 'primary' ? style.primaryButton : style.secondaryButton;
  const textStyle =
    variant === 'primary' ? style.primaryButtonText : style.secondaryButtonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
