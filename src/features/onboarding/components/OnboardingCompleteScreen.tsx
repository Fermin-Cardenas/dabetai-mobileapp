// src/features/onboarding/components/OnboardingCompleteScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { H2, Body } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';

interface OnboardingCompleteScreenProps {
  onGoToHome: () => void;
}

export const OnboardingCompleteScreen: React.FC<OnboardingCompleteScreenProps> = ({
  onGoToHome
}) => {
  return (
    <View className="flex-1 bg-[#f1f5f9]">
      {/* Contenedor principal como card */}
      <View className="flex-1 justify-center items-center px-0">
        {/* Contenido de la card */}
        <View className="px-6">
          <H2 className="text-[#314158] text-[29px] font-bold text-center mb-2">
            ¡Todo listo!
          </H2>
          
          <Body className="text-[#62748E] text-base text-center mb-8 px-0 leading-6">
            Hemos configurado tu perfil inicial. Ahora puedes empezar a registrar tus datos, explorar tus tendencias y ver tus predicciones personalizadas.
          </Body>
        </View>
        
        {/* Espacio grande como en el diseño original */}
        <View style={{ marginTop: 500 }}>
          <PrimaryButton
            title="Ir al inicio"
            onPress={onGoToHome}
            size="large"
          />
        </View>
      </View>
    </View>
  );
};