// src/features/dashboard/components/StatItem.tsx
import React from 'react';
import { View } from 'react-native';
import { Body, Caption } from '@/components/common/Typography';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}

export const StatItem = ({ icon, value, label, className }: StatItemProps) => {
  return (
    <View className={`flex-row items-center flex-1 mr-2 ${className || ''}`}>
      <View className="w-14 h-14 bg-[#F8F9FA] rounded-2xl justify-center items-center mr-2 border" style={{ borderColor: '#CAD5E2' }}>
        {icon}
      </View>
      <View>
        <Body className="text-[#2C3E50] font-bold text-base">{value}</Body>
        <Caption className="text-gray-500">{label}</Caption>
      </View>
    </View>
  );
};