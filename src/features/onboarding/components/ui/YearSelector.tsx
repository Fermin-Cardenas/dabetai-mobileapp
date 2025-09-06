import { Body } from '@/components/common/Typography';
import React, { useEffect, useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

interface YearSelectorProps {
  selectedYear: number;
  onYearSelect: (year: number) => void;
  startYear?: number;
  endYear?: number;
  initialScrollYear?: number;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  onYearSelect,
  startYear = 1950,
  endYear = new Date().getFullYear(),
  initialScrollYear = 2002
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  useEffect(() => {
    if (scrollViewRef.current) {
      const yearIndex = years.findIndex(year => year === initialScrollYear);
      if (yearIndex !== -1) {
        const itemHeight = 70;
        const scrollPosition = yearIndex * itemHeight;

        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: scrollPosition,
            animated: true
          });
        }, 100);
      }
    }
  }, []);

  return (
    <View className="flex-1 justify-center items-center w-full">
      <View className="h-56 w-full">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 py-10"
          showsVerticalScrollIndicator={false}
        >
          {years.map((year) => (
            <View
              key={year}
              className="relative items-center w-full"
            >
              {/* Línea superior */}
              {selectedYear === year && (
                <View
                  className="absolute top-2 h-0.5 bg-[#2196F3] left-0 right-0"
                />
              )}

              {/* Año */}
              <TouchableOpacity
                className="py-6 items-center justify-center w-full"
                onPress={() => onYearSelect(year)}
                activeOpacity={0.7}
              >
                <Body
                  className={`text-center ${
                    selectedYear === year
                      ? 'text-2xl text-[#2196F3] font-semibold'
                      : 'text-lg text-[#999]'
                  }`}
                >
                  {year}
                </Body>
              </TouchableOpacity>

              {/* Línea inferior */}
              {selectedYear === year && (
                <View
                  className="absolute bottom-2 h-0.5 bg-[#2196F3] left-0 right-0"
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
