// src/features/onboarding/components/WeightSelector.tsx
import React, { useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Body } from '@/components/common/Typography';

interface WeightSelectorProps {
  selectedKg: number;
  selectedGrams: number;
  onKgSelect: (kg: number) => void;
  onGramsSelect: (grams: number) => void;
  initialKg?: number;
  initialGrams?: number;
  minKg?: number;
  maxKg?: number;
}

export const WeightSelector: React.FC<WeightSelectorProps> = ({
  selectedKg,
  selectedGrams,
  onKgSelect,
  onGramsSelect,
  initialKg = 96,
  initialGrams = 100,
  minKg = 30,
  maxKg = 200
}) => {
  const kgScrollRef = useRef<ScrollView>(null);
  const gramsScrollRef = useRef<ScrollView>(null);

  // Generar kilogramos
  const kilograms: number[] = [];
  for (let kg = minKg; kg <= maxKg; kg++) {
    kilograms.push(kg);
  }

  // Generar gramos: 000, 100, 200, 300, 400, 500, 600, 700, 800, 900
  const grams: number[] = [];
  for (let g = 0; g <= 900; g += 100) {
    grams.push(g);
  }

  // Auto-scroll a posiciones iniciales
  useEffect(() => {
    const scrollToInitialPositions = () => {
      // Scroll para kilogramos
      const kgIndex = kilograms.findIndex(kg => kg === initialKg);
      if (kgIndex !== -1 && kgScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = kgIndex * itemHeight;
        kgScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
      
      // Scroll para gramos
      const gramsIndex = grams.findIndex(g => g === initialGrams);
      if (gramsIndex !== -1 && gramsScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = gramsIndex * itemHeight;
        gramsScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
    };

    setTimeout(scrollToInitialPositions, 100);
  }, []);

  const renderScrollColumn = (
    items: number[],
    selectedValue: number,
    onSelect: (value: number) => void,
    scrollRef: React.RefObject<ScrollView>,
    unit: string
  ) => (
    <View className="flex-1 h-full">
      <ScrollView 
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 70 }}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => {
          const isSelected = selectedValue === item;
          
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
                onPress={() => onSelect(item)}
                activeOpacity={0.7}
              >
                <Body className={`font-normal ${
                  isSelected 
                    ? 'text-base text-[#2196F3] font-semibold' 
                    : 'text-base text-[#999]'
                }`}>
                  {unit === 'g' && item === 0 ? '000' : item} {unit}
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
          {/* Columna Kilogramos */}
          {renderScrollColumn(
            kilograms,
            selectedKg,
            onKgSelect,
            kgScrollRef,
            'kg'
          )}
          
          {/* Columna Gramos */}
          {renderScrollColumn(
            grams,
            selectedGrams,
            onGramsSelect,
            gramsScrollRef,
            'g'
          )}
        </View>
      </View>
    </View>
  );
};