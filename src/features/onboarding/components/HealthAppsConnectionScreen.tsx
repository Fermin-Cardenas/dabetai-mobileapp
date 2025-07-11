// src/features/onboarding/components/HealthAppsConnectionScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { H2, Body } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { SecondaryButton } from '@/components/core/buttons/SecondaryButton';

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
        <View style={{ marginTop: 430 }} className="items-center">
          <PrimaryButton
            title="Conectar aplicaciones"
            onPress={onConnectApps}
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