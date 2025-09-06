// src/features/onboarding/types/index.ts
export interface OnboardingData {
  diabetesType: string;
  diagnosisYear: string;
  birthDate: string;
  gender: string;
  height: string;
  weight: string;
  deviceConnected: boolean;
  healthAppsConnected: boolean;
  doctorLinked: boolean;
}

export interface OnboardingStep {
  id: string;
  component: React.ComponentType<any>;
  isOptional: boolean;
  showHeader: boolean;
  showProgress: boolean;
  validator?: (data: OnboardingData) => string | null;
  props?: Record<string, any>;
}

export interface OnboardingError {
  field: keyof OnboardingData;
  message: string;
}

export interface OnboardingProgress {
  data: OnboardingData;
  currentStep: number;
  completedSteps: number[];
  timestamp: number;
}

export type OnboardingField = keyof OnboardingData;
