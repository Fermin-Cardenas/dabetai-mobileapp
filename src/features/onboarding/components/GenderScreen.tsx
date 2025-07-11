// src/features/onboarding/components/GenderScreen.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { RadioOption } from './RadioOption';

interface GenderScreenProps {
  onContinue: (gender: string) => void;
  initialValue?: string;
}

export const GenderScreen: React.FC<GenderScreenProps> = ({
  onContinue,
  initialValue = 'M'
}) => {
  const [selectedGender, setSelectedGender] = useState(initialValue);

  const genderOptions = [
    { id: 'm', label: 'Masculino', value: 'M' },
    { id: 'f', label: 'Femenino', value: 'F' },
  ];

  const handleContinue = () => {
    onContinue(selectedGender);
  };

  const handleOptionSelect = (value: string) => {
    setSelectedGender(value);
  };

  return (
    <View className="flex-1 bg-[#f1f5f9] px-5">
      {/* Título */}
      <View className="pt-6 pb-10">
        <H2 className="text-[#333] text-2xl font-bold text-center leading-8">
          ¿Cuál es tu género?
        </H2>
      </View>

      {/* Opciones de género */}
      <View className="flex-1 justify-end pb-5">
        {genderOptions.map((option) => (
          <RadioOption
            key={option.id}
            label={option.label}
            value={option.value}
            isSelected={selectedGender === option.value}
            onSelect={handleOptionSelect}
            showInfoIcon={true}
          />
        ))}
      </View>

      {/* Botón continuar */}
      <View className="pb-8 items-center">
        <PrimaryButton
          title="Continuar"
          onPress={handleContinue}
          size="large"
        />
      </View>
    </View>
  );
};