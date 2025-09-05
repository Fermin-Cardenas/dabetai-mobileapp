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
  iconBg = 'bg-gray-100',
  className 
}: ActionCardProps) => {
  return (
    <View className={`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-300 ${className || ''}`}>
      <View className="flex-row items-center mb-2">
        <View className={`w-8 h-8 rounded-2xl justify-center items-center mr-3 ${iconBg}`}>
          {icon}
        </View>
        <H2 className="text-gray-700 font-bold text-lg ">{title}</H2>
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