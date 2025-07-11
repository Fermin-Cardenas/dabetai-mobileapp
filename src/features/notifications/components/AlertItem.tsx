// src/features/notifications/components/AlertItem.tsx
import React from 'react';
import { View, Switch } from 'react-native';
import { Body } from '@/components/common/Typography';

interface AlertItemProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
}

export const AlertItem: React.FC<AlertItemProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
  isLast = false
}) => {
  return (
    <View 
      className={`bg-white flex-row justify-between items-center px-4 py-3.5 min-h-[60px] ${
        !isLast ? 'border-b border-[#E5E7EB]' : ''
      }`}
      style={{ borderBottomWidth: isLast ? 0 : 0.5 }}
    >
      {/* Contenido de texto */}
      <View 
        className={`flex-1 mr-4 pr-2 ${
          !subtitle ? 'justify-center' : ''
        }`}
      >
        <Body className="text-[#62748E] text-base font-normal leading-5 mb-0.5 flex-wrap">
          {title}
        </Body>
        {subtitle && (
          <Body className="text-[#9CA3AF] text-sm font-normal leading-[18px] mt-1 flex-wrap">
            {subtitle}
          </Body>
        )}
      </View>
      
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