// Todas las interfaces del onboarding
// https://www.figma.com/design/H0g3Wpjofuv56m5NMlWpjP/Design-System---dabetai?node-id=66-13&t=V2OCANMdbQepGXPO-4

// src/components/core/inputs/OptionCard.tsx
import { BodyBold } from '@/components/common/Typography';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface OptionCardProps {
  /** Icono a mostrar (componente React) */
  icon?: React.ReactNode;
  /** Título de la opción */
  title: string;
  /** Si está seleccionada */
  isSelected?: boolean;
  /** Callback cuando se presiona */
  onPress: () => void;
  /** Clase CSS adicional */
  className?: string;
}

export const OptionCard = ({
  icon,
  title,
  isSelected = false,
  onPress,
  className = ''
}: OptionCardProps) => {
  // Colores exactos del Figma
  const cardStyles = isSelected
    ? 'bg-blue-50 border-blue-400'    // #E3F2FD y #64B5F6
    : 'bg-gray-50 border-gray-300';   // #F8FAFC y #CAD5E2
    
  const checkStyles = isSelected
    ? 'border-primary-500'            // #2196F3
    : 'bg-gray-50 border-gray-300';   // #F8FAFC y #CAD5E2

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        flex-row justify-between items-center 
        px-4 py-4 gap-3
        w-full max-w-[440px] h-14
        ${cardStyles}
        border rounded-2xl
        ${className}
      `}
    >
      {/* Contenido Izquierdo */}
      <View className="flex-row items-center px-0 gap-3">
        {icon && (
          <View className="w-6 h-6">
            {icon}
          </View>
        )}
        
        <BodyBold className="!text-slate-700 leading-[19px]">
          {title}
        </BodyBold>
      </View>

      {/* Check Button */}
      <View className={`
        flex-col justify-center items-center
        w-5 h-5
        ${checkStyles}
        border rounded-full
      `}>
        {isSelected && (
          <View className="w-3 h-3 bg-primary-500 rounded-full" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OptionCard;
