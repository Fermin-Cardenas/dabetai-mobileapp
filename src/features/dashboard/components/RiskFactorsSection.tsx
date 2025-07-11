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

  return (
    <View className="px-4 mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <H3 className="text-[#1F2937] font-semibold text-base">
          {title}
        </H3>
        <TouchableOpacity 
          className="px-6 py-3 bg-transparent border-2 border-[#0891B2] rounded-full"
          onPress={onToggleView}
        >
          <Body className="text-[#0891B2] text-sm font-semibold">
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
              index < displayedFactors.length - 1 ? 'border-b border-[#E5E7EB]' : ''
            }`}
          >
            <View className="flex-1">
              <Body className="text-[#1F2937] text-sm font-medium mb-1">
                {factor.label}
              </Body>
              <Body className="text-[#6B7280] text-xs">
                {factor.value}
              </Body>
            </View>
            <Body 
              className="text-sm font-semibold"
              style={{ color: factor.levelColor }}
            >
              {factor.level}
            </Body>
          </View>
        ))}
      </View>
    </View>
  );
};