// src/features/dashboard/components/RiskLevelCard.tsx
import React, { useState, useRef } from 'react';
import { View, Animated } from 'react-native';
import { H3, Body } from '@/components/common/Typography';
import { RiskCircle } from './RiskCircle';
import { SecondaryButton } from '@/components/core/buttons/SecondaryButton';

interface RiskLevelCardProps {
  riskLevel: 'bajo' | 'medio' | 'alto';
  title: string;
  description: string;
  lastUpdate?: string;
  onUpdatePress?: () => void;
  backgroundColor?: string;
  showUpdateButton?: boolean;
  showLastUpdate?: boolean;
}

const riskColors: Record<'bajo' | 'medio' | 'alto', string> = {
  bajo: '#4CAF50',     // verde
  medio: '#894B00',    // naranja personalizado
  alto: '#F44336'      // rojo
};

export const RiskLevelCard: React.FC<RiskLevelCardProps> = ({
  riskLevel,
  title,
  description,
  lastUpdate,
  onUpdatePress,
  backgroundColor = '#f1f5f9',
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

  const textColor = riskColors[riskLevel];

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
        <View className="mb-3 rounded-full overflow-hidden w-[343px] h-11 relative">
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

          <SecondaryButton
            title={isLoading ? 'Actualizando...' : 'Actualizar predicción'}
            onPress={handleUpdatePress}
            disabled={isLoading}
            size="customGreenLarge"
          />
        </View>
      )}

      {showLastUpdate && lastUpdate && (
        <Body className="text-[#9CA3AF] text-sm text-center">
          Última actualización: {lastUpdate}
        </Body>
      )}
    </View>
  );
};
