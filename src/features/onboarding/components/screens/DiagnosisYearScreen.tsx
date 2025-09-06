// src/features/onboarding/components/DiagnosisYearScreen.tsx
import { Button } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts';
import React, { useEffect, useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { YearSelector } from '../ui/YearSelector';

export const DiagnosisYearScreen = () => {
  const { 
    data, 
    updateData, 
    nextStep, 
    errors, 
    getCurrentStepConfig,
  } = useOnboarding();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(
    parseInt(data.diagnosisYear) || 2010  // Año inicial razonable
  );

  // Actualizar datos cuando cambie la selección
  useEffect(() => {
    updateData('diagnosisYear', selectedYear.toString());
  }, [selectedYear, updateData]);

  const handleContinue = () => {
    nextStep();
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
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
      title="¿En qué año fuiste diagnosticado con diabetes?"
      buttons={buttons}
      showHeader={stepConfig?.showHeader}
      showProgress={stepConfig?.showProgress}
      errorMessage={errors.diagnosisYear}
    >
      <YearSelector
        selectedYear={selectedYear}
        onYearSelect={handleYearSelect}
        startYear={1950}  // Rango histórico razonable
        endYear={currentYear}
        initialScrollYear={2010}
      />
    </OnboardingLayout>
  );
};