// src/components/core/buttons/SecondaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface SecondaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large' | 'customGreenLarge' | 'customRedLarge';
}

export function SecondaryButton({ 
  title, 
  onPress, 
  size = 'large',
  ...props 
}: SecondaryButtonProps) {
  const getButtonClasses = () => {
    const base = "justify-center items-center rounded-full bg-transparent border-2";

    switch (size) {
      case 'small':
        return `${base} h-8 px-4 border-[#2196F3]`;
      case 'medium':
        return `${base} h-[44px] px-6 border-[#009688]`;
      case 'large':
        return `${base} h-[44px] w-[343px] border-[#2196F3]`;
      case 'customGreenLarge':
        return `${base} h-[44px] w-[343px] border-[#009688]`;
      case 'customRedLarge':
        return `${base} h-[44px] w-[343px] border-[#EF4444]`;
      default:
        return `${base} h-[44px] w-[343px] border-[#2196F3]`;
    }
  };

  const getTextColor = () => {
    switch (size) {
      case 'medium':
        return 'text-[#009688]';
      case 'customGreenLarge':
        return 'text-[#009688]';
      case 'customRedLarge':
        return 'text-[#EF4444]';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <TouchableOpacity 
      className={getButtonClasses()}
      onPress={onPress}
      {...props}
    >
      <Text
        className={`text-[16px] font-medium ${getTextColor()}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}