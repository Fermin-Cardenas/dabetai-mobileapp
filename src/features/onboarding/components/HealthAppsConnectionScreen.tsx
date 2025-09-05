// src/features/onboarding/components/HealthAppsConnectionScreen.tsx
import { Body, H2 } from '@/components/common/Typography';
import { Button, ButtonGroup } from '@/components/core/buttons';
import React from 'react';
import { View } from 'react-native';

interface HealthAppsConnectionScreenProps {
  onConnectApps: () => void;
  onSkip: () => void;
}

export const HealthAppsConnectionScreen: React.FC<HealthAppsConnectionScreenProps> = ({
  onConnectApps,
  onSkip
}) => {
  return (
    <View className="flex-1 bg-[#f1f5f9]">
      {/* Contenedor principal como card */}
      <View className="flex-1 justify-center items-center px-0">
        {/* Contenido de la card */}
        <View className="px-6">
          <H2 className="text-[#314158] text-[26px] font-bold text-center mb-2 leading-8">
            Conecta tus aplicaciones de seguimiento de salud
          </H2>
          
          <Body className="text-[#62748E] text-base text-center mb-8 px-0 leading-6">
            Permite que tus aplicaciones de monitoreo de salud se conecten con dabetai para impulsar tu monitoreo y mejorar la precisión de tus predicciones.
          </Body>
        </View>
        
        {/* Espacio grande como en el diseño original */}
        <View className="mt-80 items-center">
          <ButtonGroup align="stack">
            <Button
              title="Conectar aplicaciones"
              onPress={onConnectApps}
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