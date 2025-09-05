// src/features/dashboard/components/RiskFactorsSection.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { H3, Body } from '@/components/common/Typography';

interface RiskFactor {
  id: string;
  label: string;
  value: string;
  level: string;
  levelColor: string;
}

interface RiskFactorsSectionProps {
  title: string;
  factors: RiskFactor[];
  showAll: boolean;
  onToggleView: () => void;
  buttonText: string;
}

export const RiskFactorsSection: React.FC<RiskFactorsSectionProps> = ({
  title,
  factors,
  showAll,
  onToggleView,
  buttonText
}) => {
  const displayedFactors = showAll ? factors : factors.slice(0, 3);

  const getLevelColorClass = (levelColor: string) => {
    switch (levelColor) {
      case '#F44336':
        return 'text-danger-500';
      case '#FF9800':
        return 'text-warning-500';
      case '#4CAF50':
        return 'text-success-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <View className="px-4 mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <H3 className="text-gray-800 font-semibold text-base">
          {title}
        </H3>
        <TouchableOpacity 
          className="px-6 py-3 bg-transparent border-2 border-cyan-600 rounded-full"
          onPress={onToggleView}
        >
          <Body className="text-cyan-600 text-sm font-semibold">
            {buttonText}
          </Body>
        </TouchableOpacity>
      </View>

      {/* Factores */}
      <View className="bg-white -mx-4">
        {displayedFactors.map((factor, index) => (
          <View 
            key={factor.id}
            className={`flex-row justify-between items-center px-4 py-4 ${
              index < displayedFactors.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <View className="flex-1">
              <Body className="text-gray-800 text-sm font-medium mb-1">
                {factor.label}
              </Body>
              <Body className="text-gray-500 text-xs">
                {factor.value}
              </Body>
            </View>
            <Body className={`text-sm font-semibold ${getLevelColorClass(factor.levelColor)}`}>
              {factor.level}
            </Body>
          </View>
        ))}
      </View>
    </View>
  );
};