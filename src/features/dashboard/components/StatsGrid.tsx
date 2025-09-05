// src/features/record/components/StatsGrid.tsx
import { Body, BodySmall, H2 } from '@/components/common/Typography';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface StatData {
  icon: string;
  value: string;
  label: string;
}

interface StatsGridProps {
  title: string;
  stats: StatData[];
  className?: string;
}

const StatItem = ({ icon, value, label }: StatData) => (
  <View className="flex-1 mx-2 mb-6">
    <View className="flex-row items-center">
      <View className="w-16 h-16 bg-white rounded-3xl justify-center items-center mr-4 border border-gray-200">
        <MaterialIcons name={icon as any} size={28} color="#6B7280" />
      </View>
      <View className="flex-1">
        <Body className="text-gray-700 font-bold text-lg mb-1">{value}</Body>
        <BodySmall className="text-gray-500 font-medium">{label}</BodySmall>
      </View>
    </View>
  </View>
);

export const StatsGrid = ({ title, stats, className }: StatsGridProps) => {
  // Agrupar stats en filas de 2
  const rows = [];
  for (let i = 0; i < stats.length; i += 2) {
    rows.push(stats.slice(i, i + 2));
  }

  return (
    <View className={`mb-6 ${className || ''}`}>
      <H2 className="text-[#2C3E50] font-semibold text-base mb-6 px-1">
        {title}
      </H2>
      
      <View className="bg-transparent">
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between">
            {row.map((stat, statIndex) => (
              <StatItem 
                key={`${rowIndex}-${statIndex}`}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
            {/* Si la fila tiene solo un elemento, agregar spacer */}
            {row.length === 1 && <View className="flex-1 mx-2" />}
          </View>
        ))}
      </View>
    </View>
  );
};