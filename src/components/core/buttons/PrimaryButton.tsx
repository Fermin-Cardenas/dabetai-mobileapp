// src/components/core/buttons/PrimaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function PrimaryButton({ 
  title, 
  onPress, 
  size = 'large',
  ...props 
}: PrimaryButtonProps) {
  const getButtonClasses = () => {
    let baseClasses = "justify-center items-center rounded-full bg-blue-500";
    
    // Size classes
    switch (size) {
      case 'small':
        baseClasses += " h-8 px-4";
        break;
      case 'medium':
        baseClasses += " h-10 px-6";
        break;
      case 'large':
        baseClasses += " h-11 w-[343px]";
        break;
    }
    
    return baseClasses;
  };

  return (
    <TouchableOpacity 
      className={getButtonClasses()}
      onPress={onPress}
      {...props}
    >
      <Text className="text-white text-base font-medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
}