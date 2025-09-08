// app/onboarding.tsx
import React from 'react';

// Context y componentes del onboarding
import { onboardingSteps } from '@/features/onboarding/config/stepsWithComponents';
import { OnboardingProvider, useOnboarding } from '@/features/onboarding/context/OnboardingContext';

const OnboardingContent = () => {
  const { currentStep } = useOnboarding();

  // Obtener el componente actual
  const currentStepConfig = onboardingSteps[currentStep];
  const CurrentComponent = currentStepConfig?.component;

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