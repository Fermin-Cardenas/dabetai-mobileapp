// src/features/onboarding/components/WelcomeScreen.tsx
import { Button } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout';
import { useAuthState } from '@/hooks/useAuthState';
import React from 'react';
import { View } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';

export const WelcomeScreen = () => {
  const { nextStep, getCurrentStepConfig } = useOnboarding();
  const { user } = useAuthState();

  const handleContinue = () => {
    nextStep();
  };

  const stepConfig = getCurrentStepConfig();

  const renderButtons = () => (
    <Button
      title="Continuar"
      onPress={handleContinue}
      variant="fill"
      color="primary"
      className="w-full"
    />
  );

  // Obtener el primer nombre del usuario o usar un saludo genérico
  const getUserGreeting = () => {
    if (user?.name || user?.firstName) {
      const firstName = (user.name || user.firstName).split(' ')[0];
      return `¡Hola, ${firstName}!`;
    }
    return "¡Hola!";
  };

  return (
    <OnboardingLayout
      title={getUserGreeting()}
      description="Para darte la mejor experiencia, necesitamos conocerte un poco mejor."
      showHeader={stepConfig?.showHeader}
      showProgress={stepConfig?.showProgress}
      buttons={renderButtons()}
    >
      <View className="flex-1" />
    </OnboardingLayout>
  );
};