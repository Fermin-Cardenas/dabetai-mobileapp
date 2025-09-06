// src/features/onboarding/components/WeightScreen.tsx
import { Button } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts';
import React, { useEffect, useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { WeightSelector } from '../ui/WeightSelector';

export const WeightScreen = () => {
  const { 
    data, 
    updateData, 
    nextStep, 
    errors, 
    getCurrentStepConfig,
  } = useOnboarding();

  // Parsear valor inicial o usar valores por defecto razonables
  const parseInitialWeight = (weightString: string) => {
    // Peso promedio para adultos (70kg)
    const defaultWeight = { kg: 70, grams: 0 };
    
    if (!weightString) return defaultWeight;
    
    const totalWeight = parseFloat(weightString);
    if (isNaN(totalWeight)) return defaultWeight;
    
    const kg = Math.floor(totalWeight);
    const grams = Math.round((totalWeight - kg) * 1000);
    
    return { kg, grams };
  };

  const initialWeight = parseInitialWeight(data.weight);
  const [selectedKg, setSelectedKg] = useState(initialWeight.kg);
  const [selectedGrams, setSelectedGrams] = useState(initialWeight.grams);

  // Actualizar datos cuando cambien las selecciones
  useEffect(() => {
    const totalWeight = selectedKg + selectedGrams / 1000;
    updateData('weight', totalWeight.toFixed(1));
  }, [selectedKg, selectedGrams, updateData]);

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
      title="¿Cuál es tu peso actual?"
      buttons={buttons}
      showHeader={stepConfig?.showHeader}
      showProgress={stepConfig?.showProgress}
      errorMessage={errors.weight}
    >
      <WeightSelector
        selectedKg={selectedKg}
        selectedGrams={selectedGrams}
        onKgSelect={setSelectedKg}
        onGramsSelect={setSelectedGrams}
        minKg={30}  // Rango médico razonable para adultos
        maxKg={200}
      />
    </OnboardingLayout>
  );
};
