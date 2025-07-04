// src/features/dashboard/components/DropdownSelector.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Body } from '@/components/common/Typography';

interface DropdownSelectorProps {
  selectedValue: string;
  onPress: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  selectedValue,
  onPress,
  placeholder = 'Seleccionar...',
  disabled = false
}) => {
  return (
    <TouchableOpacity 
      className={`bg-white border border-[#E5E7EB] rounded-xl p-4 mb-2 flex-row justify-between items-center ${
        disabled ? 'opacity-50' : ''
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      <Body className="text-[#374151] font-medium text-base">
  {selectedValue !== '' ? selectedValue : placeholder}
</Body>
      <MaterialIcons 
        name="expand-more" 
        size={20} 
        color={disabled ? '#9CA3AF' : '#6B7280'} 
      />
    </TouchableOpacity>
  );
};