// ComplexCard - ActionCard implementation
// https://www.figma.com/design/H0g3Wpjofuv56m5NMlWpjP/Design-System---dabetai?node-id=40-597&t=V2OCANMdbQepGXPO-4

import { Body, Subtitle } from '@/components/common/Typography';
import { Button, ButtonVariant } from '@/components/core/buttons';
import { Image } from 'expo-image';
import React from 'react';
import { ImageSourcePropType, TouchableOpacity, View } from 'react-native';

interface ComplexCardProps {
  /** Título de la card */
  title: string;
  /** Descripción/contenido de la card */
  description: string;
  /** Imagen a mostrar (opcional) */
  image?: ImageSourcePropType;
  /** Icono a mostrar como React component (opcional) */
  icon?: React.ReactNode;
  /** Dirección del layout: horizontal o vertical */
  direction?: 'horizontal' | 'vertical';
  /** Variante visual: default o stroke */
  variant?: 'default' | 'stroke';
  /** Tipo de asset: image o icon (opcional - puede no tener asset) */
  assetType?: 'image' | 'icon';
  /** Mostrar botones en la parte inferior */
  showButtons?: boolean;
  /** Botones a mostrar (opcional) */
  buttons?: Array<{
    title: string;
    variant?: ButtonVariant;
    onPress: () => void;
  }>;
  /** Callback cuando se presiona la card */
  onPress?: () => void;
  /** Clase CSS adicional */
  className?: string;
}

export const ComplexCard: React.FC<ComplexCardProps> = ({
  title,
  description,
  image,
  icon,
  direction = 'horizontal',
  variant = 'default',
  assetType,
  showButtons = false,
  buttons = [],
  onPress,
  className = ''
}) => {
  const isHorizontal = direction === 'horizontal';
  const isStroke = variant === 'stroke';
  
  const containerStyles = isHorizontal
    ? 'flex-row items-center'
    : 'flex-col justify-center';
    
  const cardStyles = isStroke
    ? 'bg-gray-50 border border-gray-300'
    : 'bg-gray-50';
    
  const imageContainerStyles = isHorizontal
    ? 'w-16 h-16'  // 64px como en Figma
    : 'w-full h-32'; // 128px para vertical
    
  const contentGap = isHorizontal ? 'gap-3' : 'gap-3'; // 12px gap
  const contentPadding = 'p-4'; // 16px padding como en Figma

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className={`
        ${cardStyles}
        ${containerStyles}
        ${contentGap}
        ${contentPadding}
        rounded-2xl
        ${className}
      `}
    >
      {/* Asset (Image or Icon) - solo se muestra si hay asset disponible */}
      {((assetType === 'image' && image) || (assetType === 'icon' && icon)) && (
        <View className={`
          ${imageContainerStyles}
          bg-gray-100 rounded-xl
          justify-center items-center
          ${!isHorizontal ? 'mb-2' : ''}
        `}>
          {assetType === 'image' && image ? (
            <Image 
              source={image}
              className="w-full h-full rounded-xl"
              contentFit="cover"
            />
          ) : assetType === 'icon' && icon ? (
            <View className="w-6 h-6">
              {icon}
            </View>
          ) : null}
        </View>
      )}

      {/* Content */}
      <View className={`
        ${isHorizontal ? 'flex-1' : 'flex-none'}
        gap-3
      `}>
        <Subtitle className="!text-gray-700 leading-7">
          {title}
        </Subtitle>
        
        <Body className="!text-gray-700 leading-5">
          {description}
        </Body>

        {/* Buttons Section */}
        {showButtons && buttons.length > 0 && (
          <View className="flex-row gap-3 mt-2">
            {buttons.map((button, index) => (
              <Button
                key={index}
                title={button.title}
                variant={button.variant || 'fill'}
                onPress={button.onPress}
                className="flex-1"
              />
            ))}
          </View>
        )}
      </View>
    </CardContainer>
  );
};

export default ComplexCard;