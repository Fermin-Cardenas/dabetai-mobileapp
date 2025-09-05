// src/features/onboarding/components/WelcomeScreen.tsx
import { Body, H2 } from '@/components/common/Typography';
import { Button } from '@/components/core/buttons';
import React from 'react';
import { View } from 'react-native';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onContinue
}) => {
  return (
    <View className="flex-1 bg-[#f1f5f9]">
      {/* Contenedor principal como card */}
      <View className="flex-1 justify-center items-center px-0">
        {/* Contenido de la card */}
        <View className="px-0">
          <H2 className="text-[#314158] text-[29px] font-bold text-center mb-2">
            ¡Hola, Christian!
          </H2>
          
          <Body className="text-[#62748E] text-base text-center mb-8 px-0 mx-4">
            Para darte la mejor experiencia, necesitamos conocerte un poco mejor.
          </Body>
        </View>
        
        {/* Espacio grande como en el diseño original */}
        <View className="mt-96">
          <Button
            title="Continuar"
            onPress={onContinue}
            variant="fill"
            color="primary"
          />
        </View>
      </View>
    </View>
  );
};