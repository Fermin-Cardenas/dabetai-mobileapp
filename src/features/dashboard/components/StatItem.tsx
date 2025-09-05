// src/features/dashboard/components/StatItem.tsx
import { Body, Caption } from '@/components/common/Typography';
import React from 'react';
import { View } from 'react-native';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}

export const StatItem = ({ icon, value, label, className }: StatItemProps) => {
  return (
    <View className={`flex-row items-center flex-1 mr-2 ${className || ''}`}>
      <View className="w-14 h-14 bg-gray-100 rounded-2xl justify-center items-center mr-2 border border-gray-300">
        {icon}
      </View>
      <View>
        <Body className="text-gray-700 font-bold text-base">{value}</Body>
        <Caption className="text-gray-500">{label}</Caption>
      </View>
    </View>
  );
};