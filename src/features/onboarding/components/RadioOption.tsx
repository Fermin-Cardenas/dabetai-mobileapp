// src/features/onboarding/components/RadioOption.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Body } from '@/components/common/Typography';

interface RadioOptionProps {
  label: string;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
  showInfoIcon?: boolean;
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  value,
  isSelected,
  onSelect,
  showInfoIcon = true
}) => {
  return (
    <TouchableOpacity
      className={`bg-white rounded-xl mb-3 ${
        isSelected ? 'border border-[#2196F3] bg-blue-50' : ''
      }`}
      onPress={() => onSelect(value)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center px-4 py-4">
        {/* Ícono de información */}
        {showInfoIcon && (
          <View className="mr-3">
            <View className="w-6 h-6 rounded-full border-2 border-[#666] justify-center items-center">
              <Body className="text-[#666] text-sm font-bold">i</Body>
            </View>
          </View>
        )}
        
        {/* Texto de la opción */}
        <View className="flex-1">
          <Body className="text-[#333] text-base font-medium">
            {label}
          </Body>
        </View>
        
        {/* Radio button */}
        <View className="ml-3">
          <View className={`w-6 h-6 rounded-full border-2 justify-center items-center ${
            isSelected ? 'border-[#2196F3]' : 'border-[#ddd]'
          }`}>
            {isSelected && (
              <View className="w-3 h-3 rounded-full bg-[#2196F3]" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};