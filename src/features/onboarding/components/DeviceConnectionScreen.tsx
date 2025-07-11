// src/features/onboarding/components/DeviceConnectionScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { H2, Body } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { SecondaryButton } from '@/components/core/buttons/SecondaryButton';

interface DeviceConnectionScreenProps {
  onConnectDevice: () => void;
  onSkip: () => void;
}

export const DeviceConnectionScreen: React.FC<DeviceConnectionScreenProps> = ({
  onConnectDevice,
  onSkip
}) => {
  return (
    <View className="flex-1 bg-[#f1f5f9]">
      {/* Contenedor principal como card */}
      <View className="flex-1 justify-center items-center px-0">
        {/* Contenido de la card */}
        <View className="px-3">
          <H2 className="text-[#314158] text-[29px] font-bold text-center mb-2">
            Automatiza tu monitoreo
          </H2>
          
          <Body className="text-[#62748E] text-base text-center mb-8 px-0 leading-6">
            Conecta tu glucómetro o sensor para sincronizar mediciones automáticamente y mejorar la precisión de las predicciones.
          </Body>
        </View>
        
        {/* Espacio grande como en el diseño original */}
        <View style={{ marginTop: 430 }} className="items-center">
          <PrimaryButton
            title="Conectar un dispositivo"
            onPress={onConnectDevice}
            size="large"
          />
          
          <View className="mt-3">
            <SecondaryButton
              title="Saltar por ahora"
              onPress={onSkip}
              size="large"
            />
          </View>
        </View>
      </View>
    </View>
  );
};