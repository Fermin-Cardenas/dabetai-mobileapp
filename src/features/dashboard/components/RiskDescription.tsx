// src/features/dashboard/components/RiskDescription.tsx
import { Body } from '@/components/common/Typography';
import React from 'react';
import { View } from 'react-native';

interface RiskDescriptionProps {
  description: string;
  textColor?: string;
}

export const RiskDescription: React.FC<RiskDescriptionProps> = ({
  description,
  textColor = "#D97706"
}) => {
  return (
    <View className="flex-1 ml-5">
      <Body 
        className="text-sm font-medium leading-5"
      >
        {description}
      </Body>
    </View>
  );
};

export default RiskDescription;