// src/features/dashboard/components/RiskDescription.tsx
import React from 'react';
import { View, Text } from 'react-native';

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
      <Text 
        className="text-sm font-medium leading-5"
        style={{ color: textColor }}
      >
        {description}
      </Text>
    </View>
  );
};

export default RiskDescription;