// src/features/dashboard/components/ComplicationsList.tsx
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Complication {
  name: string;
  level: 'Alto' | 'Medio' | 'Bajo';
  isHigh: boolean;
  value?: string; // ← Nueva propiedad para la descripción/valor
}

interface ComplicationsListProps {
  complications: Complication[];
  onComplicationPress: (complication: string) => void;
  backgroundColor?: string;
  showArrow?: boolean;
}

const getLevelColor = (level: 'Alto' | 'Medio' | 'Bajo') => {
  switch (level) {
    case 'Alto':
      return '#EF4444'; // rojo
    case 'Medio':
      return '#F59E0B'; // naranja oscuro
    case 'Bajo':
      return '#10B981'; // verde
    default:
      return '#6B7280'; // gris por defecto
  }
};

export const ComplicationsList: React.FC<ComplicationsListProps> = ({
  complications,
  onComplicationPress,
  backgroundColor = '#f1f5f9',
  showArrow = true
}) => {
  return (
    <View
      style={{
        marginHorizontal: -16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor
      }}
    >
      {complications.map((complication, index) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 16,
            marginHorizontal: -16,
            marginBottom: 0.5,
            borderBottomWidth: index < complications.length - 1 ? 1 : 0,
            borderBottomColor: '#D1D5DB'
          }}
          onPress={() => onComplicationPress(complication.name)}
          activeOpacity={0.7}
        >
          {/* Lado izquierdo: Nombre y valor/descripción */}
          <View style={{ flex: 1 }}>
            <Text style={{ 
              color: '#374151', 
              fontSize: 16, 
              fontWeight: '500',
              marginBottom: complication.value ? 4 : 0 
            }}>
              {complication.name}
            </Text>
            {complication.value && (
              <Text style={{ 
                color: '#6B7280', 
                fontSize: 14,
                fontWeight: '400'
              }}>
                {complication.value}
              </Text>
            )}
          </View>
          
          {/* Lado derecho: Nivel y flecha */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: getLevelColor(complication.level)
              }}
            >
              {complication.level}
            </Text>
            {showArrow && (
              <Feather
                name="chevron-right"
                size={20}
                color="#314158"
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};