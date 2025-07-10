// src/components/core/buttons/PrimaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large' | 'custom';
}

export function PrimaryButton({ 
  title, 
  onPress, 
  size = 'large',
  ...props 
}: PrimaryButtonProps) {
  const getButtonClasses = () => {
    // Color base según tamaño
    let baseClasses = "justify-center items-center rounded-full ";
    
    if (size === 'custom') {
      baseClasses += "bg-[#009688] "; // Verde para custom
    } else {
      baseClasses += "bg-[#2196F3] "; // Azul para los demás
    }

    // Tamaño
    switch (size) {
      case 'small':
        baseClasses += "h-[44px] px-4";
        break;
      case 'medium':
        baseClasses += "h-[44px] px-6";
        break;
      case 'large':
        baseClasses += "h-[44px] w-[343px]"; // ← Mismo ancho que SecondaryButton
        break;
      case 'custom':
        baseClasses += "h-[44px] px-6";
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
      <Text className="text-[16px] font-bold text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
}