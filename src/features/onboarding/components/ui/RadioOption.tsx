// src/features/onboarding/components/RadioOption.tsx
import { Body, BodySmallBold } from '@/components/common/Typography';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

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
      className={`bg-white rounded-xl ${
        isSelected ? 'border border-[#2196F3] bg-blue-50' : ''
      }`}
      onPress={() => onSelect(value)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center px-4 py-4">
        {/* Ícono de información */}
        {showInfoIcon && (
          <View className="mr-3">
            <View className="w-6 h-6 rounded-full border-2 border-gray-500 justify-center items-center">
              <BodySmallBold className="!text-gray-500">i</BodySmallBold>
            </View>
          </View>
        )}
        
        {/* Texto de la opción */}
        <View className="flex-1">
          <Body>
            {label}
          </Body>
        </View>
        
        {/* Radio button */}
        <View className="ml-3">
          <View className={`w-6 h-6 rounded-full border-2 justify-center items-center ${
            isSelected ? 'border-[#2196F3]' : 'border-[#ddd]'
          }`}>
            {isSelected && (
              <View className="w-3 h-3 rounded-full bg-primary-500" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};