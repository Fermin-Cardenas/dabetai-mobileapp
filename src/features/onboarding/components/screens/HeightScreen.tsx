// src/features/onboarding/components/HeightScreen.tsx
import { Button } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts';
import React, { useEffect, useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { HeightSelector } from '../ui/HeightSelector';

export const HeightScreen = () => {
  const { 
    data, 
    updateData, 
    nextStep, 
    errors, 
    getCurrentStepConfig,
  } = useOnboarding();

  const [selectedHeight, setSelectedHeight] = useState(
    parseInt(data.height) || 170  // Altura promedio mundial en cm
  );

  // Actualizar datos cuando cambie la selección
  useEffect(() => {
    updateData('height', selectedHeight.toString());
  }, [selectedHeight, updateData]);

  const handleContinue = () => {
    nextStep();
  };

  const handleHeightSelect = (height: number) => {
    setSelectedHeight(height);
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
      title="¿Cuál es tu altura?"
      buttons={buttons}
      showHeader={stepConfig?.showHeader}
      showProgress={stepConfig?.showProgress}
      errorMessage={errors.height}
    >
      <HeightSelector
        selectedHeight={selectedHeight}
        onHeightSelect={handleHeightSelect}
        minHeight={120}  // Rango médico razonable para adultos
        maxHeight={220}
      />
    </OnboardingLayout>
  );
};