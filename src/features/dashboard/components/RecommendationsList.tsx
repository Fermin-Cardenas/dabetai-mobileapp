// src/features/dashboard/components/RecommendationsList.tsx
import { Body } from '@/components/common/Typography';
import React from 'react';
import { View } from 'react-native';

interface RecommendationsListProps {
  recommendations: string[];
  backgroundColor?: string;
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({
  recommendations,
  backgroundColor = '#f1f5f9'
}) => {
  return (
    <View
      className="-mx-4 px-4 py-2 bg-slate-100"
    >
      {recommendations.map((recommendation, index) => (
        <View
          key={index}
          className={`bg-white py-4 px-4 -mx-4 ${index < recommendations.length - 1 ? 'border-b border-gray-200' : ''}`}
        >
          <Body className="text-gray-800 text-sm leading-5 font-normal">
            {recommendation}
          </Body>
        </View>
      ))}
    </View>
  );
};