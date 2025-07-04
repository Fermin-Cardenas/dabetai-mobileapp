// src/features/dashboard/components/ComplicationsSection.tsx
import React from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { SecondaryButton } from '@/components/core/buttons/SecondaryButton';
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
        <H2 className="text-[#2C3E50] font-bold text-lg flex-1">
          {title}
        </H2>
        {showToggleButton && (
          <SecondaryButton
            title={buttonText}
            onPress={onToggleView}
            size="medium"
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