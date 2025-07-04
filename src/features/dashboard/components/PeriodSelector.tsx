// src/features/record/components/PeriodSelector.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Body } from '@/components/common/Typography';

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
      <View className="bg-[#fff] rounded-full p-1 flex-row">
        {periods.map((period, index) => (
          <TouchableOpacity 
            key={period}
            className={`px-4 py-3 rounded-full flex-1 ${
              selectedPeriod === period 
                ? 'bg-[#2196F3] shadow-md' 
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