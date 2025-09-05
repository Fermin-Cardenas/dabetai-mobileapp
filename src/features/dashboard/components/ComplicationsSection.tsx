// src/features/dashboard/components/ComplicationsSection.tsx
import { H2 } from '@/components/common/Typography';
import { Button } from '@/components/core/buttons';
import React from 'react';
import { View } from 'react-native';
import { ComplicationsList } from './ComplicationsList';

interface Complication {
  name: string;
  level: 'Alto' | 'Moderado' | 'Bajo';
  isHigh: boolean;
  value?: string;
}

interface ComplicationsSectionProps {
  title: string;
  complications: Complication[];
  showAll: boolean;
  onToggleView: () => void;
  buttonText: string;
  onComplicationPress: (complication: string) => void;
  showArrow?: boolean;
  showToggleButton?: boolean;
}

export const ComplicationsSection: React.FC<ComplicationsSectionProps> = ({
  title,
  complications,
  showAll,
  onToggleView,
  buttonText,
  onComplicationPress,
  showArrow = false,
  showToggleButton = true
}) => {
  const displayedComplications = showAll ? complications : complications.slice(0, 3);

  return (
    <View className="mt-6 mb-6">
      {/* Header con título y botón */}
      <View className="flex-row justify-between items-start mb-4">
        <H2 className="text-gray-700 font-bold text-lg flex-1">
          {title}
        </H2>
        {showToggleButton && (
          <Button
            title={buttonText}
            onPress={onToggleView}
            variant="outline"
            color="secondary"
          />
        )}
      </View>

      {/* Lista de complicaciones usando el componente existente */}
      <ComplicationsList
        complications={displayedComplications}
        onComplicationPress={onComplicationPress}
        showArrow={showArrow}
        backgroundColor="transparent"
      />
    </View>
  );
};