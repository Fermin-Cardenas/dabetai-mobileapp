// src/features/dashboard/components/RiskCircle.tsx
import { Body } from '@/components/common/Typography';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface RiskCircleProps {
  riskLevel: 'bajo' | 'medio' | 'alto';
  size?: number;
  showAnimation?: boolean;
}

export const RiskCircle: React.FC<RiskCircleProps> = ({
  riskLevel,
  size = 150,
  showAnimation = true
}) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showAnimation) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [showAnimation]);

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'bajo': return '#10B981';   // Verde
      case 'medio': return '#F59E0B';  // Amarillo
      case 'alto': return '#EF4444';   // Rojo
      default: return '#10B981';
    }
  };

  const riskColor = getRiskColor();
  const glowSize1 = size + 10;
  const glowSize2 = size + 25;

  return (
    <View className="relative justify-center items-center">
      {showAnimation && (
        <>
          <Animated.View 
            className="absolute rounded-full border"
            style={{
              width: glowSize1,
              height: glowSize1,
              borderColor: riskColor,
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.1, 0.35],
              }),
              transform: [
                {
                  scale: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.15],
                  }),
                }
              ],
            }}
          />
          
          <Animated.View 
            className="absolute rounded-full border"
            style={{
              width: glowSize2,
              height: glowSize2,
              borderColor: riskColor,
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.05, 0.2],
              }),
              transform: [
                {
                  scale: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.1, 1.25],
                  }),
                }
              ],
            }}
          />
        </>
      )}

      <View
        className="rounded-full bg-transparent justify-center items-center z-10"
        style={{ 
          width: size, 
          height: size, 
          borderColor: riskColor,
          borderWidth: 6 
        }}
      >
        <Body className="font-normal mb-1 text-gray-400 text-base">
          Nivel
        </Body>
        <Body className={`font-bold capitalize text-2xl ${riskLevel === 'bajo' ? 'text-success-500' : riskLevel === 'medio' ? 'text-warning-500' : 'text-danger-500'}`}>
          {riskLevel}
        </Body>
        <Body className="font-normal mt-1 text-gray-400 text-base">
          Estimado
        </Body>
      </View>
    </View>
  );
};
