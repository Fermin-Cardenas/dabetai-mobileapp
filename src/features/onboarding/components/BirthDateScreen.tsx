// src/features/onboarding/components/BirthDateScreen.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { DateSelector } from './DateSelector';

interface BirthDateScreenProps {
  onContinue: (birthDate: string) => void;
  initialValue?: string;
}

export const BirthDateScreen: React.FC<BirthDateScreenProps> = ({
  onContinue,
  initialValue = ''
}) => {
  // Parsear valor inicial o usar valores por defecto
  const parseInitialDate = (dateString: string) => {
    if (!dateString) return { day: 15, month: 6, year: 1986 };
    
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return {
        day: parseInt(parts[2]) || 15,
        month: parseInt(parts[1]) || 6,
        year: parseInt(parts[0]) || 1986
      };
    }
    return { day: 15, month: 6, year: 1986 };
  };

  const initialDate = parseInitialDate(initialValue);
  const [selectedDay, setSelectedDay] = useState(initialDate.day);
  const [selectedMonth, setSelectedMonth] = useState(initialDate.month);
  const [selectedYear, setSelectedYear] = useState(initialDate.year);

  const handleContinue = () => {
    // Formatear fecha como YYYY-MM-DD
    const formattedDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`;
    onContinue(formattedDate);
  };

  return (
    <View className="flex-1 bg-[#f1f5f9] px-5">
      {/* Título */}
      <View className="pt-6 pb-10">
        <H2 className="text-[#333] text-2xl font-bold text-center leading-8">
          ¿Cuál es tu fecha de nacimiento?
        </H2>
      </View>

      {/* Selector de fecha */}
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