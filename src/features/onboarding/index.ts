// src/features/onboarding/index.ts

// Context
export { OnboardingProvider, useOnboarding } from './context/OnboardingContext';

// Components
export { ProgressIndicator } from './components/common/ProgressIndicator';

// Components - Screens
export { BirthDateScreen } from './components/screens/BirthDateScreen';
export { DeviceConnectionScreen } from './components/screens/DeviceConnectionScreen';
export { DiabetesTypeScreen } from './components/screens/DiabetesTypeScreen';
export { DiagnosisYearScreen } from './components/screens/DiagnosisYearScreen';
export { DoctorLinkScreen } from './components/screens/DoctorLinkScreen';
export { GenderScreen } from './components/screens/GenderScreen';
export { HealthAppsConnectionScreen } from './components/screens/HealthAppsConnectionScreen';
export { HeightScreen } from './components/screens/HeightScreen';
export { OnboardingCompleteScreen } from './components/screens/OnboardingCompleteScreen';
export { WeightScreen } from './components/screens/WeightScreen';
export { WelcomeScreen } from './components/screens/WelcomeScreen';

// Components - UI
export { DateSelector } from './components/ui/DateSelector';
export { HeightSelector } from './components/ui/HeightSelector';
export { RadioOption } from './components/ui/RadioOption';
export { WeightSelector } from './components/ui/WeightSelector';
export { YearSelector } from './components/ui/YearSelector';

// Types
export type {
    OnboardingData, OnboardingError, OnboardingField, OnboardingProgress, OnboardingStep
} from './types';

// Config
export { getTotalSteps } from './config/stepDefinitions';
export { getStepById, getStepByIndex, getStepIndex, onboardingSteps } from './config/stepsWithComponents';

// Validators
export { validateAllData, validateField, validators } from './validators';

// Hooks
export { useOnboardingPersistence } from './hooks/useOnboardingPersistence';
