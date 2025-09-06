// src/features/onboarding/components/DiabetesTypeScreen.tsx
import { Button } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts';
import React from 'react';
import { View } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { RadioOption } from '../ui/RadioOption';

export const DiabetesTypeScreen = () => {
  const { 
    data, 
    updateData, 
    nextStep, 
    errors, 
    getCurrentStepConfig
  } = useOnboarding();

  const handleSelect = (value: string) => {
    updateData('diabetesType', value);
  };

  const handleNext = () => {
    nextStep();
  };

  const stepConfig = getCurrentStepConfig();
  
  const buttons = (
    <Button
      title="Continuar"
      variant="fill"
      onPress={handleNext}
      disabled={!data.diabetesType}
      className="w-full"
    />
  );

  return (
    <OnboardingLayout
      title="¿Qué tipo de diabetes tienes?"
      description="Esta información nos ayudará a personalizar tu experiencia"
      buttons={buttons}
      showHeader={stepConfig?.showHeader}
      showProgress={stepConfig?.showProgress}
      errorMessage={errors.diabetesType}
    >
      <View className="flex-1 w-full gap-3">
        <RadioOption
          label="Diabetes Tipo 1"
          value="type1"
          isSelected={data.diabetesType === 'type1'}
          onSelect={handleSelect}
        />
        <RadioOption
          label="Diabetes Tipo 2"
          value="type2"
          isSelected={data.diabetesType === 'type2'}
          onSelect={handleSelect}
        />
        <RadioOption
          label="Diabetes Gestacional"
          value="gestational"
          isSelected={data.diabetesType === 'gestational'}
          onSelect={handleSelect}
        />
        <RadioOption
          label="No lo sé"
          value="unknown"
          isSelected={data.diabetesType === 'unknown'}
          onSelect={handleSelect}
        />
      </View>
    </OnboardingLayout>
  );
};