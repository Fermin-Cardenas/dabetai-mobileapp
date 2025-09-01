// src/features/dashboard/components/RecommendationsSection.tsx
import { H2 } from '@/components/common/Typography';
import { Button } from '@/components/core/buttons';
import React from 'react';
import { View } from 'react-native';
import { RecommendationsList } from './RecommendationsList';

interface RecommendationsSectionProps {
  title: string;
  recommendations: string[];
  onViewMore?: () => void;
  showViewMoreButton?: boolean;
  buttonTitle?: string;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  title,
  recommendations,
  onViewMore,
  showViewMoreButton = true,
  buttonTitle = "Ver más"
}) => {
  return (
    <View className="mt-6 mb-6">
      {/* Header con título y botón */}
      <View className="flex-row justify-between items-start mb-4">
        <H2 className="text-[#2C3E50] font-bold text-lg flex-1">
          {title}
        </H2>
        {showViewMoreButton && onViewMore && (
          <Button
            title={buttonTitle}
            onPress={onViewMore}
            variant="outline"
            color="secondary"
          />
        )}
      </View>

      {/* Lista de recomendaciones */}
      <RecommendationsList recommendations={recommendations} />
    </View>
  );
};