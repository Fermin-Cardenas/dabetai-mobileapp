// src/features/onboarding/components/DiagnosisYearScreen.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { YearSelector } from './YearSelector';

interface DiagnosisYearScreenProps {
  onContinue: (diagnosisYear: string) => void;
  initialValue?: string;
}

export const DiagnosisYearScreen: React.FC<DiagnosisYearScreenProps> = ({
  onContinue,
  initialValue = '2002'
}) => {
  const [selectedYear, setSelectedYear] = useState(parseInt(initialValue) || 2002);

  const handleContinue = () => {
    onContinue(selectedYear.toString());
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <View className="flex-1 bg-[#f1f5f9] px-5">
      {/* Título */}
      <View className="pt-6 pb-0">
        <H2 className="text-[#333] text-2xl font-bold text-center leading-8">
          ¿En qué año te diagnosticaron diabetes?
        </H2>
      </View>

      {/* Selector de años */}
      <YearSelector
        selectedYear={selectedYear}
        onYearSelect={handleYearSelect}
        startYear={1950}
        endYear={new Date().getFullYear()}
        initialScrollYear={2002}
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