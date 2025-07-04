// src/features/onboarding/components/WeightScreen.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { WeightSelector } from './WeightSelector';

interface WeightScreenProps {
  onContinue: (weight: string) => void;
  initialValue?: string;
}

export const WeightScreen: React.FC<WeightScreenProps> = ({
  onContinue,
  initialValue = ''
}) => {
  // Parsear valor inicial o usar valores por defecto
  const parseInitialWeight = (weightString: string) => {
    if (!weightString) return { kg: 96, grams: 100 };
    
    const totalWeight = parseFloat(weightString);
    if (isNaN(totalWeight)) return { kg: 96, grams: 100 };
    
    const kg = Math.floor(totalWeight);
    const grams = Math.round((totalWeight - kg) * 1000);
    
    return { kg, grams };
  };

  const initialWeight = parseInitialWeight(initialValue);
  const [selectedKg, setSelectedKg] = useState(initialWeight.kg);
  const [selectedGrams, setSelectedGrams] = useState(initialWeight.grams);

  const handleContinue = () => {
    // Formatear peso como número decimal (ej: 96.1 para 96kg 100g)
    const totalWeight = selectedKg + (selectedGrams / 1000);
    onContinue(totalWeight.toString());
  };

  return (
    <View className="flex-1 bg-[#f1f5f9] px-5">
      {/* Título */}
      <View className="pt-6 pb-10">
        <H2 className="text-[#333] text-2xl font-bold text-center leading-8">
          ¿Cuál es tu peso actual?
        </H2>
      </View>

      {/* Selector de peso */}
      <WeightSelector
        selectedKg={selectedKg}
        selectedGrams={selectedGrams}
        onKgSelect={setSelectedKg}
        onGramsSelect={setSelectedGrams}
        initialKg={initialWeight.kg}
        initialGrams={initialWeight.grams}
        minKg={30}
        maxKg={200}
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