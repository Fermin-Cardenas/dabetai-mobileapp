// src/features/onboarding/components/DeviceConnectionScreen.tsx
import { Body, H2 } from '@/components/common/Typography';
import { Button, ButtonGroup } from '@/components/core/buttons';
import React from 'react';
import { View } from 'react-native';

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
        <View className="mt-80 items-center">
          <ButtonGroup align="stack">
            <Button
              title="Conectar un dispositivo"
              onPress={onConnectDevice}
              variant="fill"
              color="primary"
            />
            <Button
              title="Saltar por ahora"
              onPress={onSkip}
              variant="outline"
              color="secondary"
            />
          </ButtonGroup>
        </View>
      </View>
    </View>
  );
};