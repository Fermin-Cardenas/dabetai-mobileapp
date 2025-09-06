// app/onboarding.tsx
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

// Context y componentes del onboarding
import { onboardingSteps } from '@/features/onboarding/config/stepsWithComponents';
import { OnboardingProvider, useOnboarding } from '@/features/onboarding/context/OnboardingContext';

const OnboardingContent = () => {
  const router = useRouter();
  const { currentStep, totalSteps, isSubmitting } = useOnboarding();

  // Obtener el componente actual
  const currentStepConfig = onboardingSteps[currentStep];
  const CurrentComponent = currentStepConfig?.component;

  // Navegar a home cuando se complete el onboarding
  useEffect(() => {
    if (currentStep >= totalSteps - 1 && !isSubmitting) {
      // Dar tiempo para que se muestre la pantalla de completado
      const timer = setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, totalSteps, isSubmitting, router]);

  if (!CurrentComponent) {
    return null;
  }

  return <CurrentComponent />;
};

const Onboarding = () => {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};

export default Onboarding;