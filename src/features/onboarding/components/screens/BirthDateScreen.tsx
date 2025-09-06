// src/features/onboarding/components/BirthDateScreen.tsx
import { Button } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts';
import React, { useEffect, useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { DateSelector } from '../ui/DateSelector';

export const BirthDateScreen = () => {
  const { 
    data, 
    updateData, 
    nextStep, 
    errors, 
    getCurrentStepConfig
  } = useOnboarding();

  // Parsear valor inicial o usar valores por defecto razonables
  const parseInitialDate = (dateString: string) => {
    // Valores por defecto: adulto joven promedio
    const defaultDate = { day: 15, month: 6, year: 1990 };
    
    if (!dateString) return defaultDate;
    
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return {
        day: parseInt(parts[2]) || defaultDate.day,
        month: parseInt(parts[1]) || defaultDate.month,
        year: parseInt(parts[0]) || defaultDate.year
      };
    }
    return defaultDate;
  };

  const initialDate = parseInitialDate(data.birthDate);
  const [selectedDay, setSelectedDay] = useState(initialDate.day);
  const [selectedMonth, setSelectedMonth] = useState(initialDate.month);
  const [selectedYear, setSelectedYear] = useState(initialDate.year);

  // Actualizar datos cuando cambien las selecciones
  useEffect(() => {
    const formattedDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`;
    updateData('birthDate', formattedDate);
  }, [selectedDay, selectedMonth, selectedYear, updateData]);

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
      title="¿Cuál es tu fecha de nacimiento?"
      buttons={buttons}
      showHeader={stepConfig?.showHeader}
      showProgress={stepConfig?.showProgress}
      errorMessage={errors.birthDate}
    >
      <DateSelector
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onDaySelect={setSelectedDay}
        onMonthSelect={setSelectedMonth}
        onYearSelect={setSelectedYear}
        initialDay={initialDate.day}
        initialMonth={initialDate.month}
        initialYear={initialDate.year}
      />
    </OnboardingLayout>
  );
};