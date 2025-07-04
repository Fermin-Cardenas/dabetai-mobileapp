// src/features/onboarding/components/HeightScreen.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { HeightSelector } from './HeightSelector';

interface HeightScreenProps {
  onContinue: (height: string) => void;
  initialValue?: string;
}

export const HeightScreen: React.FC<HeightScreenProps> = ({
  onContinue,
  initialValue = '178'
}) => {
  const [selectedHeight, setSelectedHeight] = useState(parseInt(initialValue) || 178);

  const handleContinue = () => {
    onContinue(selectedHeight.toString());
  };

  const handleHeightSelect = (height: number) => {
    setSelectedHeight(height);
  };

  return (
    <View className="flex-1 bg-[#f1f5f9] px-5">
      {/* Título */}
      <View className="pt-6 pb-0">
        <H2 className="text-[#333] text-2xl font-bold text-center leading-8">
          ¿Cuál es tu estatura?
        </H2>
      </View>

      {/* Selector de estatura */}
      <HeightSelector
        selectedHeight={selectedHeight}
        onHeightSelect={handleHeightSelect}
        minHeight={100}
        maxHeight={250}
        initialScrollHeight={178}
      />

      {/* Botón continuar */}
      <View className="pb-8 px-0">
        <PrimaryButton
          title="Continuar"
          onPress={handleContinue}
          size="large"
        />
      </View>
    </View>
  );
};