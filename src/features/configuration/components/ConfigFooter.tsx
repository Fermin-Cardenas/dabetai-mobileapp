// src/features/configuration/components/ConfigFooter.tsx
import React from 'react';
import { View } from 'react-native';
import { Body } from '@/components/common/Typography';

export const ConfigFooter: React.FC = () => {
  return (
    <View className="px-4 pb-7 pt-4 items-center">
      <Body className="text-[#62748E] text-base font-normal text-center">
        © 2025 dabetai. Todos los derechos reservados.
      </Body>
    </View>
  );
};