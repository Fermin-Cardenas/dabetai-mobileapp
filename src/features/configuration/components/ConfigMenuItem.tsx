import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Body } from '@/components/common/Typography';

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
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: isLast ? 0 : 0.5,
        borderBottomColor: '#E5E7EB',
      }}
    >
      <Body
        style={{
          color: '#62748E',
          fontSize: 16,
          fontWeight: '400',
        }}
      >
        {title}
      </Body>

      <Feather name="chevron-right" size={20} color="#314158" />
    </TouchableOpacity>
  );
};
