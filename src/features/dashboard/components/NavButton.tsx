// src/features/dashboard/components/NavButton.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather'; // Cambiar el import
import { Caption } from '@/components/common/Typography';

interface NavButtonProps {
  title: string;
  iconName: string;
  isActive?: boolean;
  onPress: () => void;
  className?: string;
}

export const NavButton = ({ 
  title, 
  iconName, 
  isActive = false, 
  onPress,
  className 
}: NavButtonProps) => {
  return (
    <TouchableOpacity 
      className={`flex-1 items-center justify-center ${className || ''}`}
      onPress={onPress}
    >
      <View className="justify-center items-center mb-1">
        <Feather 
          name={iconName as any} 
          size={24} 
          color={isActive ? '#2196F3' : '#6B7280'} 
        />
      </View>
      <Caption className={`font-medium ${isActive ? 'text-[#2196F3] font-semibold' : 'text-gray-500'}`}>
        {title}
      </Caption>
    </TouchableOpacity>
  );
};
