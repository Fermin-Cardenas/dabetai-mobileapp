// src/features/dashboard/components/RecommendationsList.tsx
import React from 'react';
import { View, Text } from 'react-native';

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
      style={{
        marginHorizontal: -16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor
      }}
    >
      {recommendations.map((recommendation, index) => (
        <View
          key={index}
          style={{
            backgroundColor: 'white',
            paddingVertical: 16,
            paddingHorizontal: 16,
            marginHorizontal: -16,
            marginBottom: 0.5,
            borderBottomWidth: index < recommendations.length - 1 ? 1 : 0,
            borderBottomColor: '#E5E7EB'
          }}
        >
          <Text style={{ 
            color: '#1F2937', 
            fontSize: 14,
            lineHeight: 20,
            fontWeight: '400'
          }}>
            {recommendation}
          </Text>
        </View>
      ))}
    </View>
  );
};