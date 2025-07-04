// src/features/dashboard/components/RiskIndicator.tsx
import React from 'react';
import { View } from 'react-native';
import { Body, Caption } from '@/components/common/Typography';

interface RiskIndicatorProps {
  riskLevel: 'bajo' | 'medio' | 'alto';
  title: string;
  lastUpdate: string;
  className?: string;
}

export const RiskIndicator = ({ 
  riskLevel = 'bajo', 
  title, 
  lastUpdate,
  className 
}: RiskIndicatorProps) => {
  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'alto':
        return {
          color: '#EF4444',
          text: 'Alto',
          bgColor: '#FEF2F2'
        };
      case 'medio':
        return {
          color: '#F59E0B',
          text: 'Medio',
          bgColor: '#FFFBEB'
        };
      default:
        return {
          color: '#00C950',
          text: 'Bajo',
          bgColor: '#F0FDF4'
        };
    }
  };

  const config = getRiskConfig();

  return (
    <View className={`flex-row items-center mb-5 ${className || ''}`}>
      <View 
        className="w-20 h-20 border-4 bg-white rounded-full justify-center items-center mr-4"
        style={{ borderColor: config.color }}
      >
        <Body className="font-bold text-sm" style={{ color: config.color }}>
          {config.text}
        </Body>
        <Caption className="text-gray-400 text-xs mt-1">Riesgo</Caption>
      </View>
      <View className="flex-1">
        <Body className="text-[#2C3E50] font-semibold text-base leading-6 mb-2">
          {title}
        </Body>
        <Caption className="text-gray-400">{lastUpdate}</Caption>
      </View>
    </View>
  );
};