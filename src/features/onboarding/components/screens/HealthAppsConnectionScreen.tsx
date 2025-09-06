// src/features/onboarding/components/HealthAppsConnectionScreen.tsx
import { Button, ButtonGroup } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout';
import React from 'react';
import { View } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';

export const HealthAppsConnectionScreen = () => {
  const { 
    updateData, 
    nextStep,
    getCurrentStepConfig,
  } = useOnboarding();

  const handleConnectApps = () => {
    updateData('healthAppsConnected', true);
    // Aquí se podría navegar a la pantalla de conexión específica
    // o manejar la lógica de conexión con health apps
    nextStep();
  };

  const handleSkip = () => {
    updateData('healthAppsConnected', false);
    nextStep();
  };

  const stepConfig = getCurrentStepConfig();

  const renderButtons = () => (
    <ButtonGroup align='stack'>
      <Button
        title="Conectar aplicaciones"
        onPress={handleConnectApps}
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
      title="Conecta tus aplicaciones de seguimiento de salud"
      description="Permite que tus aplicaciones de monitoreo de salud se conecten con dabetai para impulsar tu monitoreo y mejorar la precisión de tus predicciones."
      showProgress={stepConfig?.showProgress}
      buttons={renderButtons()}
    >
      <View className="flex-1" />
    </OnboardingLayout>
  );
};
