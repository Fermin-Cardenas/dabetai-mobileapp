// src/features/dashboard/components/GlucoseCard.tsx
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import { BodySmall, Caption, H1 } from '@/components/common/Typography';

interface GlucoseCardProps {
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  time?: string;
  context?: string;
  onPress?: () => void;
}

export const GlucoseCard = ({ 
  value = 98, 
  unit = 'mg/dL',
  trend = 'stable',
  time = 'Justo ahora',
  context = 'Antes de comer',
  onPress 
}: GlucoseCardProps) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const createPulseAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(pulseAnim, {
              toValue: 1.4,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.3,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    };

    const animation = createPulseAnimation();
    animation.start();

    return () => animation.stop();
  }, []);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <Feather name="arrow-up" size={18} color="#00C950" />; // success-500
      case 'down':
        return <Feather name="arrow-down" size={18} color="#FB2C36" />; // danger-500
      default:
        return <Feather name="arrow-right" size={18} color="#00C950" />; // success-500
    }
  };

  return (
    <View className="bg-white rounded-3xl p-5 border border-gray-300">
      <View className="flex-row justify-between items-center">
        {/* Valor de glucosa */}
        <View className="items-start">
          <View className="flex-row items-center mb-1">
            <H1 className="text-secondary-500 font-bold text-3xl mr-2">{value}</H1>
            {getTrendIcon()}
          </View>
          <BodySmall className="text-gray-500 font-medium">{unit}</BodySmall>
        </View>
        
        {/* Información central */}
        <View className="flex-1 items-center justify-center pr-5">
          <Caption className="text-gray-500 mb-1 text-center">{time}</Caption>
          <Caption className="text-gray-500 text-center">{context}</Caption>
        </View>
        
        {/* Indicador animado */}
        <View className="relative">
          <Animated.View 
            className="absolute w-12 h-12 bg-success-500 rounded-full"
            style={{
              transform: [{ scale: pulseAnim }],
              opacity: opacityAnim,
              zIndex: 1
            }}
          />
          <View className="w-12 h-12 bg-secondary-500 rounded-full justify-center items-center z-10">
            <AntDesign name="pluscircleo" size={16} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};
