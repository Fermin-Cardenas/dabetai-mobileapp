// src/features/dashboard/components/ComplicationsList.tsx
import { Body, BodySmall } from '@/components/common/Typography';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Complication {
  name: string;
  level: 'Alto' | 'Medio' | 'Bajo' | 'Moderado';
  isHigh: boolean;
  value?: string; // ← Nueva propiedad para la descripción/valor
}

interface ComplicationsListProps {
  complications: Complication[];
  onComplicationPress: (complication: string) => void;
  backgroundColor?: string;
  showArrow?: boolean;
}

const getLevelColor = (level: 'Alto' | 'Medio' | 'Bajo' | 'Moderado') => {
  switch (level) {
    case 'Alto':
      return '#F44336'; // Rojo
    case 'Medio':
    case 'Moderado':
      return '#FF9800'; // Naranja
    case 'Bajo':
      return '#4CAF50'; // Verde
    default:
      return '#9E9E9E'; // Gris por defecto
  }
};

export const ComplicationsList: React.FC<ComplicationsListProps> = ({
  complications,
  onComplicationPress,
  backgroundColor = '#f1f5f9',
  showArrow = true
}) => {
  const getColorClass = (level: 'Alto' | 'Medio' | 'Bajo' | 'Moderado') => {
    switch (level) {
      case 'Alto':
        return 'text-danger-500';
      case 'Medio':
      case 'Moderado':
        return 'text-warning-500';
      case 'Bajo':
        return 'text-success-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <View className="-mx-4 px-4 py-2 bg-slate-100">
      {complications.map((complication, index) => (
        <TouchableOpacity
          key={index}
          className={`bg-white flex-row justify-between items-center py-5 px-4 -mx-4 ${index < complications.length - 1 ? 'border-b border-gray-300' : ''}`}
          onPress={() => onComplicationPress(complication.name)}
          activeOpacity={0.7}
        >
          {/* Lado izquierdo: Nombre y valor/descripción */}
          <View className="flex-1">
            <Body className={`text-gray-700 text-base font-medium ${complication.value ? 'mb-1' : ''}`}>
              {complication.name}
            </Body>
            {complication.value && (
              <BodySmall className="text-gray-500 text-sm font-normal">
                {complication.value}
              </BodySmall>
            )}
          </View>
          
          {/* Lado derecho: Nivel y flecha */}
          <View className="flex-row items-center">
            <Body className={`text-base font-semibold ${getColorClass(complication.level)}`}>
              {complication.level}
            </Body>
            {showArrow && (
              <Feather
                name="chevron-right"
                size={20}
                color="#314158"
                className="ml-2"
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};