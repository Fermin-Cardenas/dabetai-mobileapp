// src/features/onboarding/components/DateSelector.tsx
import React, { useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Body } from '@/components/common/Typography';

interface DateSelectorProps {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  onDaySelect: (day: number) => void;
  onMonthSelect: (month: number) => void;
  onYearSelect: (year: number) => void;
  initialDay?: number;
  initialMonth?: number;
  initialYear?: number;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  onDaySelect,
  onMonthSelect,
  onYearSelect,
  initialDay = 15,
  initialMonth = 6,
  initialYear = 1986
}) => {
  const dayScrollRef = useRef<ScrollView>(null);
  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  // Generar días (1-31)
  const days: number[] = [];
  for (let day = 1; day <= 31; day++) {
    days.push(day);
  }

  // Meses en español
  const months = [
    { number: 1, name: 'Enero' },
    { number: 2, name: 'Febrero' },
    { number: 3, name: 'Marzo' },
    { number: 4, name: 'Abril' },
    { number: 5, name: 'Mayo' },
    { number: 6, name: 'Junio' },
    { number: 7, name: 'Julio' },
    { number: 8, name: 'Agosto' },
    { number: 9, name: 'Septiembre' },
    { number: 10, name: 'Octubre' },
    { number: 11, name: 'Noviembre' },
    { number: 12, name: 'Diciembre' }
  ];

  // Generar años (desde 1950 hasta año actual)
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = 1950; year <= currentYear; year++) {
    years.push(year);
  }

  // Auto-scroll a posiciones iniciales
  useEffect(() => {
    const scrollToInitialPositions = () => {
      // Scroll para día
      const dayIndex = days.findIndex(day => day === initialDay);
      if (dayIndex !== -1 && dayScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = dayIndex * itemHeight;
        dayScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
      
      // Scroll para mes
      const monthIndex = months.findIndex(month => month.number === initialMonth);
      if (monthIndex !== -1 && monthScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = monthIndex * itemHeight;
        monthScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
      
      // Scroll para año
      const yearIndex = years.findIndex(year => year === initialYear);
      if (yearIndex !== -1 && yearScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = yearIndex * itemHeight;
        yearScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
    };

    setTimeout(scrollToInitialPositions, 100);
  }, []);

  const renderScrollColumn = (
    items: any[],
    selectedValue: any,
    onSelect: (value: any) => void,
    scrollRef: React.RefObject<ScrollView>,
    renderItem: (item: any) => string | number
  ) => (
    <View className="flex-1 h-full">
      <ScrollView 
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 70 }}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => {
          const itemValue = typeof item === 'object' ? item.number : item;
          const isSelected = selectedValue === itemValue;
          
          return (
            <View key={index} className="w-full relative">
              {/* Línea superior */}
              {isSelected && (
                <View 
                  className="absolute top-2 left-[10%] right-[10%] h-0.5 bg-[#2196F3]"
                />
              )}
              
              {/* Item seleccionable */}
              <TouchableOpacity
                className="py-6 items-center relative justify-center"
                style={{ height: 70 }}
                onPress={() => onSelect(itemValue)}
                activeOpacity={0.7}
              >
                <Body className={`font-normal ${
                  isSelected 
                    ? 'text-lg text-[#2196F3] font-semibold' 
                    : 'text-lg text-[#999]'
                }`}>
                  {renderItem(item)}
                </Body>
              </TouchableOpacity>
              
              {/* Línea inferior */}
              {isSelected && (
                <View 
                  className="absolute bottom-2 left-[10%] right-[10%] h-0.5 bg-[#2196F3]"
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center w-full">
      <View className="h-56 w-full">
        <View className="flex-row flex-1">
          {/* Columna Día */}
          {renderScrollColumn(
            days,
            selectedDay,
            onDaySelect,
            dayScrollRef,
            (day) => day
          )}
          
          {/* Columna Mes */}
          {renderScrollColumn(
            months,
            selectedMonth,
            onMonthSelect,
            monthScrollRef,
            (month) => month.name
          )}
          
          {/* Columna Año */}
          {renderScrollColumn(
            years,
            selectedYear,
            onYearSelect,
            yearScrollRef,
            (year) => year
          )}
        </View>
      </View>
    </View>
  );
};