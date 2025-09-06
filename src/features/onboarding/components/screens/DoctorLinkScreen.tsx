// src/features/onboarding/components/DoctorLinkScreen.tsx
import { Button, ButtonGroup } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout';
import React from 'react';
import { View } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';

export const DoctorLinkScreen = () => {
  const { 
    updateData, 
    nextStep,
    getCurrentStepConfig,
  } = useOnboarding();

  const handleLinkDoctor = () => {
    updateData('doctorLinked', true);
    // Aquí se podría navegar a la pantalla de vinculación específica
    // o manejar la lógica de vinculación con el médico
    nextStep();
  };

  const handleSkip = () => {
    updateData('doctorLinked', false);
    nextStep();
  };

  const stepConfig = getCurrentStepConfig();

  const renderButtons = () => (
    <ButtonGroup align='stack'>
      <Button
        title="Vincular médico"
        onPress={handleLinkDoctor}
        variant="fill"
        color="primary"
        className="w-full"
      />
      <Button
        title="Omitir por ahora"
        onPress={handleSkip}
        variant="outline"
        color="primary"
        className="w-full"
      />
    </ButtonGroup>
  );

  return (
    <OnboardingLayout
      title="Vincula a tu médico"
      description="Permite que tu médico vea tus datos de dabetai para un seguimiento más completo. Tu médico recibirá un código para acceder a tus reportes y predicciones."
      showProgress={stepConfig?.showProgress}
      buttons={renderButtons()}
    >
      <View className="flex-1" />
    </OnboardingLayout>
  );
};
