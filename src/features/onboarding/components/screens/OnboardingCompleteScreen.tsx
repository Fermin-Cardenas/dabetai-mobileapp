// src/features/onboarding/components/OnboardingCompleteScreen.tsx
import { Button } from '@/components/core/buttons';
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';

export const OnboardingCompleteScreen = () => {
  const { submitOnboarding, isSubmitting, getCurrentStepConfig } = useOnboarding();
  const router = useRouter();

  const handleGoToHome = async () => {
    try {
      await submitOnboarding();
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      // Aquí podrías mostrar un error al usuario
    }
  };

  const stepConfig = getCurrentStepConfig();

  const renderButtons = () => (
    <Button
      title={isSubmitting ? "Configurando..." : "Ir al inicio"}
      onPress={handleGoToHome}
      variant="fill"
      color="primary"
      className="w-full"
      disabled={isSubmitting}
    />
  );

  return (
    <OnboardingLayout
      title="¡Todo listo!"
      description="Hemos configurado tu perfil inicial. Ahora puedes empezar a registrar tus datos, explorar tus tendencias y ver tus predicciones personalizadas."
      showHeader={stepConfig?.showHeader}
      showProgress={stepConfig?.showProgress}
      buttons={renderButtons()}
    >
      <View className="flex-1" />
    </OnboardingLayout>
  );
};