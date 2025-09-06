// src/features/onboarding/components/common/ProgressIndicator.tsx
import { Body } from '@/components/common/Typography';
import React from 'react';
import { View } from 'react-native';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  showStepNumbers?: boolean;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  showStepNumbers = true,
  className = ''
}) => {
  const progress = Math.min((current / (total - 1)) * 100, 100);

  return (
    <View className={`flex-col gap-2 ${className}`}>
      {/* Números de paso */}
      {showStepNumbers && (
        <View className="flex-row justify-between items-center px-1">
          <Body className="text-slate-500 text-xs">
            Paso {Math.min(current + 1, total)} de {total}
          </Body>
          <Body className="text-slate-500 text-xs">
            {Math.round(progress)}%
          </Body>
        </View>
      )}
      
      {/* Barra de progreso */}
      <View className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <View 
          className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
