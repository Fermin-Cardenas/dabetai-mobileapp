// src/features/dashboard/components/SimpleChart.tsx
import React from 'react';
import { View } from 'react-native';
import { Caption } from '@/components/common/Typography';

interface SimpleChartProps {
  data?: number[];
  className?: string;
}

export const SimpleChart = ({ data, className }: SimpleChartProps) => {
  return (
    <View className={`${className || ''}`}>
      <View className="h-24 bg-[#FAFBFC] rounded-lg mb-3 relative overflow-hidden">
        {/* Línea del gráfico simulada */}
        <View className="absolute bottom-6 left-5 w-4/5 h-0.5 bg-[#2196F3] transform rotate-3" />
        <View className="absolute bottom-8 left-1/4 w-4 h-4 bg-[#2196F3] rounded-full" />
        <View className="absolute bottom-4 right-1/4 w-4 h-4 bg-[#2196F3] rounded-full" />
        
        {/* Etiquetas del eje X */}
        <View className="absolute bottom-1 left-0 right-0 flex-row justify-between px-2">
          <Caption className="text-gray-400 text-xs">0</Caption>
          <Caption className="text-gray-400 text-xs">100</Caption>
          <Caption className="text-gray-400 text-xs">200</Caption>
          <Caption className="text-gray-400 text-xs">300</Caption>
        </View>
      </View>
      
      <Caption className="text-gray-500 text-center mb-4">t (min)</Caption>
    </View>
  );
};