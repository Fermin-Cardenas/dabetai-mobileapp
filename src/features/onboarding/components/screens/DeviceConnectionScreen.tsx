// src/features/onboarding/components/DeviceConnectionScreen.tsx
import { Button, ButtonGroup } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout';
import React from 'react';
import { View } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';

export const DeviceConnectionScreen = () => {
  const { 
    updateData, 
    nextStep,
    getCurrentStepConfig,
  } = useOnboarding();

  const handleConnectDevice = () => {
    updateData('deviceConnected', true);
    // Aquí se podría navegar a la pantalla de conexión específica
    // o manejar la lógica de conexión
    nextStep();
  };

  const handleSkip = () => {
    updateData('deviceConnected', false);
    nextStep();
  };

  const stepConfig = getCurrentStepConfig();

  const renderButtons = () => (
    <ButtonGroup align='stack'>
      <Button
        title="Conectar dispositivo"
        onPress={handleConnectDevice}
        variant="fill"
        color="primary"
      />
      <Button
        title="Omitir por ahora"
        onPress={handleSkip}
        variant="outline"
        color="primary"
      />
    </ButtonGroup>
  );

  return (
    <OnboardingLayout
      title="Automatiza tu monitoreo"
      description="Conecta tu glucómetro o sensor para sincronizar mediciones automáticamente y mejorar la precisión de las predicciones."
      showProgress={stepConfig?.showProgress}
      buttons={renderButtons()}
    >
      <View className="flex-1" />
    </OnboardingLayout>
  );
};
