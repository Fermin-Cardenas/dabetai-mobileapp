// src/components/core/buttons/SecondaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface SecondaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function SecondaryButton({ 
  title, 
  onPress, 
  size = 'large',
  ...props 
}: SecondaryButtonProps) {
  const getButtonClasses = () => {
    let baseClasses = "justify-center items-center rounded-full bg-gray-100 border border-blue-500";
    
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
      <Text className="text-blue-500 text-base font-medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
}