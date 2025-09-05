import { Body } from '@/components/common/Typography';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface ConfigMenuItemProps {
  title: string;
  onPress: () => void;
  isLast?: boolean;
}

export const ConfigMenuItem: React.FC<ConfigMenuItemProps> = ({
  title,
  onPress,
  isLast = false
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-white px-4 py-3.5 flex-row justify-between items-center ${!isLast ? 'border-b border-gray-200' : ''}`}
    >
      <Body className="text-slate-600 text-base font-normal">
        {title}
      </Body>

      <Feather name="chevron-right" size={20} color="#314158" />
    </TouchableOpacity>
  );
};
