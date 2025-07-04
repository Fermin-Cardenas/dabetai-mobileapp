// src/features/dashboard/components/AnimatedRiskCircle.tsx
import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { H3, Body } from '@/components/common/Typography';

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
      case 'bajo': return '#10B981';
      case 'medio': return '#F59E0B';
      case 'alto': return '#EF4444';
      default: return '#F59E0B';
    }
  };

  const riskColor = getRiskColor();

  return (
    <View>
      <H3 className="text-[#1F2937] font-semibold text-base mb-5">
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
            className="w-40 h-40 rounded-full border-4 justify-center items-center z-10"
            style={{ 
              borderColor: riskColor,
              backgroundColor: '#f1f5f9',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              shadowOpacity: 0.1,
              elevation: 4,
            }}
          >
            <Body className="text-[#6B7280] text-xs mb-1">Nivel</Body>
            <Body 
              className="text-2xl font-bold capitalize"
              style={{ color: riskColor }}
            >
              {riskLevel}
            </Body>
            <Body className="text-[#6B7280] text-xs mt-0.5">Estimado</Body>
          </View>
        </View>
        
        {/* Descripción */}
        <View className="flex-1">
          <Body 
            className="text-sm leading-5 font-medium"
            style={{ color: riskColor }}
          >
            {description}
          </Body>
        </View>
      </View>
    </View>
  );
};

