// src/features/onboarding/components/DiabetesTypeScreen.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { H1, H2} from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { RadioOption } from './RadioOption';

interface DiabetesTypeScreenProps {
  onContinue: (diabetesType: string) => void;
  initialValue?: string;
}

export const DiabetesTypeScreen: React.FC<DiabetesTypeScreenProps> = ({
  onContinue,
  initialValue = 'Tipo 1'
}) => {
  const [selectedType, setSelectedType] = useState(initialValue);

  const diabetesTypes = [
    { id: 'tipo1', label: 'Tipo 1', value: 'Tipo 1' },
    { id: 'tipo2', label: 'Tipo 2', value: 'Tipo 2' },
    { id: 'gestacional', label: 'Diabetes gestacional', value: 'Diabetes gestacional' }
  ];

  const handleContinue = () => {
    onContinue(selectedType);
  };

  const handleOptionSelect = (value: string) => {
    setSelectedType(value);
  };

  return (
    <View className="flex-1 bg-[#f1f5f9] px-5">
      {/* Título */}
      <View className="pt-6 pb-10">
        <H1 className="text-[#333] text-2xl font-bold text-center leading-8">
          ¿Qué tipo de diabetes tienes?
        </H1>
      </View>

      {/* Opciones de radio */}
      <View className="flex-1 justify-end pb-5">
        {diabetesTypes.map((type) => (
          <RadioOption
            key={type.id}
            label={type.label}
            value={type.value}
            isSelected={selectedType === type.value}
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