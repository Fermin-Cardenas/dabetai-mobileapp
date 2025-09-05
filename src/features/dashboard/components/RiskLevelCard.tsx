// src/features/dashboard/components/RiskLevelCard.tsx
import { Body, H3 } from '@/components/common/Typography';
import { Button } from '@/components/core/buttons';
import React, { useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { RiskCircle } from './RiskCircle';

interface RiskLevelCardProps {
  riskLevel: 'bajo' | 'medio' | 'alto';
  title?: string;
  description?: string;
  lastUpdate?: string;
  onUpdatePress?: () => void;
  backgroundColor?: string;
  showUpdateButton?: boolean;
  showLastUpdate?: boolean;
}

const riskColors: Record<'bajo' | 'medio' | 'alto', string> = {
  bajo: '#4CAF50',
  medio: '#894B00',
  alto: '#F44336'
};

const riskTitles: Record<'bajo' | 'medio' | 'alto', string> = {
  bajo: '¡Buen trabajo!',
  medio: 'Atención requerida',
  alto: 'Alto',
};

const riskDescriptions: Record<'bajo' | 'medio' | 'alto', string> = {
  bajo: 'Mantener tu control actual ayuda a reducir tu riesgo de complicaciones.',
  medio: 'Tu riesgo es moderado. Mantente atento y sigue las recomendaciones médicas.',
  alto: 'Tu riesgo de complicaciones es elevado. Consulta a tu médico.',
};


export const RiskLevelCard: React.FC<RiskLevelCardProps> = ({
  riskLevel,
  title: titleProp,
  description: descriptionProp,
  lastUpdate,
  onUpdatePress,
  backgroundColor = 'bg-slate-100',
  showUpdateButton = true,
  showLastUpdate = true
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const handleUpdatePress = () => {
    if (isLoading || !onUpdatePress) return;

    setIsLoading(true);
    progressAnim.setValue(0);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      progressAnim.setValue(0);
      setTimeout(() => {
        setIsLoading(false);
        onUpdatePress();
      }, 100);
    });
  };

  const title = titleProp || riskTitles[riskLevel];
  const textColor = riskColors[riskLevel];
  const description = descriptionProp || riskDescriptions[riskLevel];


  return (
    <View className="py-4 mb-4 -mx-4 px-4" style={{ backgroundColor }}>
      <View className="flex-row items-center mb-5 px-2">
        <View className="mr-5">
          <RiskCircle riskLevel={riskLevel} size={150} showAnimation={true} />
        </View>

        <View className="flex-1">
          <H3 style={{ color: textColor }} className="font-bold text-lg mb-1">
            {title}
          </H3>
          <Body style={{ color: textColor }} className="font-normal text-base leading-normal">
            {description}
          </Body>
        </View>
      </View>

      {showUpdateButton && onUpdatePress && (
        <View className="mb-3 rounded-full overflow-hidden w-[343px] h-[44px] relative">
          {isLoading && (
            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                borderRadius: 9999,
                backgroundColor: 'rgba(0, 150, 136, 0.3)',
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }}
            />
          )}

          <Button
            title={isLoading ? 'Actualizando...' : 'Actualizar predicción'}
            onPress={handleUpdatePress}
            disabled={isLoading}
            variant="outline"
            color="secondary"
          />
        </View>
      )}

      {showLastUpdate && lastUpdate && (
        <Body className="text-gray-400 text-sm text-center">
          Última actualización: {lastUpdate}
        </Body>
      )}
    </View>
  );
};