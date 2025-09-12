// SimpleCard - StatItem implementation
// https://www.figma.com/design/H0g3Wpjofuv56m5NMlWpjP/Design-System---dabetai?node-id=64-168&t=V2OCANMdbQepGXPO-4

import { Body, BodyBold } from '@/components/common/Typography';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface SimpleCardProps {
  /** Icono a mostrar (componente React) */
  icon?: React.ReactNode;
  /** Título de la card */
  title: string;
  /** Texto descriptivo/valor */
  description?: string;
  /** Dirección del layout: horizontal o vertical */
  direction?: 'horizontal' | 'vertical';
  /** Callback cuando se presiona la card */
  onPress?: () => void;
  /** Clase CSS adicional */
  className?: string;
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  icon,
  title,
  description,
  direction = 'horizontal',
  onPress,
  className = ''
}) => {
  const isHorizontal = direction === 'horizontal';
  
  const containerStyles = isHorizontal
    ? 'flex-row items-center gap-3'  // 12px gap como en Figma
    : 'flex-col gap-3';

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className={`
        ${containerStyles}
        ${className}
      `}
    >
      {/* Icon */}
      {icon && (
        <View className="justify-center items-center bg-gray-50 border border-gray-300 rounded-2xl p-4">
          {icon}
        </View>
      )}

      {/* Content */}
      <View className={`
        ${isHorizontal ? 'flex-1' : 'flex-none'}
        gap-1
      `}>
        <BodyBold className="leading-5">
          {title}
        </BodyBold>
        
        {description && (
          <Body className="leading-5">
            {description}
          </Body>
        )}
      </View>
    </CardContainer>
  );
};

export default SimpleCard;