// src/features/dashboard/components/AnimatedRiskCircle.tsx
import { Body, H3 } from '@/components/common/Typography';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface AnimatedRiskCircleProps {
  title: string;
  riskLevel: 'bajo' | 'medio' | 'alto';
  description: string;
}

export const AnimatedRiskCircle: React.FC<AnimatedRiskCircleProps> = ({
  title,
  riskLevel,
  description
}) => {
  const rippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'bajo': return '#00C950'; // success-500
      case 'medio': return '#F0B100'; // warning-500
      case 'alto': return '#FB2C36'; // danger-500
      default: return '#F0B100'; // warning-500
    }
  };

  const riskColor = getRiskColor();
  const riskColorClass = riskLevel === 'bajo' ? 'text-success-500' : 
                        riskLevel === 'medio' ? 'text-warning-500' : 
                        'text-danger-500';

  return (
    <View>
      <H3 className="text-gray-700 font-semibold text-base mb-5">
        {title}
      </H3>
      
      <View className="flex-row items-center">
        {/* Círculo animado */}
        <View className="mr-5 relative">
          {/* Onda expandiéndose */}
          <Animated.View 
            className="absolute w-40 h-40 rounded-full border-4 border-transparent"
            style={{
              borderColor: riskColor,
              opacity: rippleAnim.interpolate({
                inputRange: [0, 0.3, 0.7, 1],
                outputRange: [0, 0.8, 0.4, 0],
              }),
              transform: [{
                scale: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1.2],
                })
              }]
            }}
          />

          {/* Círculo principal */}
          <View 
            className="w-40 h-40 rounded-full border-4 justify-center items-center z-10 bg-gray-100 shadow-lg"
            style={{ 
              borderColor: riskColor,
            }}
          >
            <Body className="text-gray-500 text-xs mb-1">Nivel</Body>
            <Body className={`text-2xl font-bold capitalize ${riskColorClass}`}>
              {riskLevel}
            </Body>
            <Body className="text-gray-500 text-xs mt-0.5">Estimado</Body>
          </View>
        </View>
        
        {/* Descripción */}
        <View className="flex-1">
          <Body className={`text-sm leading-5 font-medium ${riskColorClass}`}>
            {description}
          </Body>
        </View>
      </View>
    </View>
  );
};

