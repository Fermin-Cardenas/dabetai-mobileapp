// src/features/dashboard/components/RiskIndicator.tsx
import { Body, Caption } from '@/components/common/Typography';
import React from 'react';
import { View } from 'react-native';

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
          color: '#FB2C36', // danger-500
          text: 'Alto',
          bgColor: '#FFC9C9', // danger-200
          borderClass: 'border-danger-500',
          textClass: 'text-danger-500',
          bgClass: 'bg-danger-200'
        };
      case 'medio':
        return {
          color: '#F0B100', // warning-500
          text: 'Medio',
          bgColor: '#FFF085', // warning-200
          borderClass: 'border-warning-500',
          textClass: 'text-warning-500',
          bgClass: 'bg-warning-200'
        };
      default:
        return {
          color: '#00C950', // success-500
          text: 'Bajo',
          bgColor: '#B9F8CF', // success-200
          borderClass: 'border-success-500',
          textClass: 'text-success-500',
          bgClass: 'bg-success-200'
        };
    }
  };

  const config = getRiskConfig();

  return (
    <View className={`flex-row items-center mb-5 ${className || ''}`}>
      <View 
        className={`w-20 h-20 border-4 bg-white rounded-full justify-center items-center mr-4 ${config.borderClass}`}
      >
        <Body className={`font-bold text-sm ${config.textClass}`}>
          {config.text}
        </Body>
        <Caption className="text-gray-400 text-xs mt-1">Riesgo</Caption>
      </View>
      <View className="flex-1">
        <Body className="text-gray-700 font-semibold text-base leading-6 mb-2">
          {title}
        </Body>
        <Caption className="text-gray-400">{lastUpdate}</Caption>
      </View>
    </View>
  );
};