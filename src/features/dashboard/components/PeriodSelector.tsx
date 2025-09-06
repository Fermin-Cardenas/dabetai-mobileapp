// src/features/record/components/PeriodSelector.tsx
import { Body } from '@/components/common/Typography';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface PeriodSelectorProps {
  periods: string[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  className?: string;
}

export const PeriodSelector = ({ 
  periods, 
  selectedPeriod, 
  onPeriodChange,
  className 
}: PeriodSelectorProps) => {
  return (
    <View className={`mt-4 mb-6 ${className || ''}`}>
      <View className="bg-white rounded-full p-1 flex-row">
        {periods.map((period, index) => (
          <TouchableOpacity 
            key={period}
            className={`px-4 py-3 rounded-full flex-1 ${
              selectedPeriod === period 
                ? 'bg-primary-500' 
                : 'bg-transparent'
            }`}
            onPress={() => onPeriodChange(period)}
          >
            <Body 
              className={`text-sm font-bold text-center ${
                selectedPeriod === period 
                  ? 'text-white font-bold' 
                  : 'text-gray-600'
              }`}
            >
              {period}
            </Body>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};