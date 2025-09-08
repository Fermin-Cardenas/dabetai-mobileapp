// src/features/onboarding/components/GenderScreen.tsx
import { Button } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts';
import React from 'react';
import { View } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { RadioOption } from '../ui/RadioOption';

export const GenderScreen = () => {
  const { 
    data, 
    updateData, 
    nextStep, 
    errors, 
    getCurrentStepConfig
  } = useOnboarding();

  const genderOptions = [
    { id: 'm', label: 'Masculino', value: 'M' },
    { id: 'f', label: 'Femenino', value: 'F' },
  ];

  const handleOptionSelect = (value: string) => {
    updateData('gender', value);
  };

  const handleContinue = () => {
    nextStep();
  };

  const stepConfig = getCurrentStepConfig();
  
  const buttons = (
    <Button
      title="Continuar"
      onPress={handleContinue}
      variant="fill"
      color="primary"
      className="w-full"
    />
  );

  return (
    <OnboardingLayout
      title="¿Cuál es tu género?"
      buttons={buttons}
      showHeader={stepConfig?.showHeader}
      showProgress={stepConfig?.showProgress}
      errorMessage={errors.gender}
    >
      <View className="flex-1 w-full justify-end gap-3">
        {genderOptions.map((option) => (
          <RadioOption
            key={option.id}
            label={option.label}
            value={option.value}
            isSelected={data.gender === option.value}
            onSelect={handleOptionSelect}
            showInfoIcon={true}
          />
        ))}
      </View>
    </OnboardingLayout>
  );
};