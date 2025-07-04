// src/features/notifications/components/NotificationPreferenceItem.tsx
import React from 'react';
import { View, Switch } from 'react-native';
import { Body } from '@/components/common/Typography';

interface NotificationPreferenceItemProps {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
}

export const NotificationPreferenceItem: React.FC<NotificationPreferenceItemProps> = ({
  title,
  value,
  onValueChange,
  isLast = false
}) => {
  return (
    <View 
      className={`bg-white flex-row justify-between items-center px-4 py-3.5 ${
        !isLast ? 'border-b border-[#E5E7EB]' : ''
      }`}
      style={{ borderBottomWidth: isLast ? 0 : 0.5 }}
    >
      {/* Título */}
      <Body className="text-[#62748E] text-base font-normal flex-1">
        {title}
      </Body>
      
      {/* Switch */}
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ 
          false: '#E5E7EB', 
          true: '#60A5FA' 
        }}
        thumbColor={value ? '#2196F3' : '#F3F4F6'}
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  );
};