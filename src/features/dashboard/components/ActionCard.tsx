// src/features/dashboard/components/ActionCard.tsx
import { Body, H2 } from '@/components/common/Typography';
import { Button } from '@/components/core/buttons';
import React from 'react';
import { View } from 'react-native';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
  iconBg?: string;
  className?: string;
}

export const ActionCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onPress, 
  iconBg = '#F3F4F6',
  className 
}: ActionCardProps) => {
  return (
    <View className={`bg-white rounded-2xl p-5 mb-4 shadow-sm border ${className || ''}`} style={{ borderColor: '#CAD5E2' }}>
      <View className="flex-row items-center mb-2">
        <View 
          className="w-8 h-8 rounded-2xl justify-center items-center mr-3"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </View>
        <H2 className="text-[#2C3E50] font-bold text-lg ">{title}</H2>
      </View>
      <Body className="text-gray-500 font-normal text-base mb-4 leading-none">{description}</Body>
      <Button
        title={buttonText}
        onPress={onPress}
        variant="fill"
        color="primary"
      />
    </View>
  );
};