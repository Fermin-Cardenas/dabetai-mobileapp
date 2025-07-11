// src/components/core/buttons/ButtonGroup.tsx
import React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

interface ButtonGroupProps {
  align?: 'stack' | 'row' | 'start' | 'end' | 'center' | 'justify';
  buttonLabel: string;
  buttonLabel1: string;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
  className?: string;
}

export const ButtonGroup = ({
  align = 'stack',
  buttonLabel,
  buttonLabel1,
  onPrimaryPress,
  onSecondaryPress,
  className
}: ButtonGroupProps) => {
  const getContainerClasses = () => {
    let baseClasses = "flex relative";
    
    switch (align) {
      case 'stack':
        return `${baseClasses} flex-col items-start justify-center gap-3`;
      case 'row':
        return `${baseClasses} flex-row gap-3 justify-center`;
      case 'start':
        return `${baseClasses} flex-row items-center w-[214px] gap-3`;
      case 'end':
        return `${baseClasses} flex-row items-center justify-end w-[214px] gap-3`;
      case 'center':
        return `${baseClasses} flex-row items-center justify-center w-[214px] gap-3`;
      case 'justify':
        return `${baseClasses} flex-row items-center w-[214px] gap-3`;
      default:
        return `${baseClasses} flex-col items-start justify-center gap-3`;
    }
  };

  return (
    <View className={`${getContainerClasses()} ${className || ''}`}>
      <PrimaryButton
        title={buttonLabel}
        onPress={onPrimaryPress}
      />
      <SecondaryButton
        title={buttonLabel1}
        onPress={onSecondaryPress}
      />
    </View>
  );
};