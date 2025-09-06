// src/features/onboarding/config/stepsWithComponents.ts
import { OnboardingStep } from '../types';
import { stepDefinitions } from './stepDefinitions';

// Import de componentes - Screens
import { BirthDateScreen } from '../components/screens/BirthDateScreen';
import { DeviceConnectionScreen } from '../components/screens/DeviceConnectionScreen';
import { DiabetesTypeScreen } from '../components/screens/DiabetesTypeScreen';
import { DiagnosisYearScreen } from '../components/screens/DiagnosisYearScreen';
import { DoctorLinkScreen } from '../components/screens/DoctorLinkScreen';
import { GenderScreen } from '../components/screens/GenderScreen';
import { HealthAppsConnectionScreen } from '../components/screens/HealthAppsConnectionScreen';
import { HeightScreen } from '../components/screens/HeightScreen';
import { OnboardingCompleteScreen } from '../components/screens/OnboardingCompleteScreen';
import { WeightScreen } from '../components/screens/WeightScreen';
import { WelcomeScreen } from '../components/screens/WelcomeScreen';

// Mapeo de componentes por ID
const componentMap: Record<string, React.ComponentType<any>> = {
  'welcome': WelcomeScreen,
  'diabetes-type': DiabetesTypeScreen,
  'diagnosis-year': DiagnosisYearScreen,
  'birth-date': BirthDateScreen,
  'gender': GenderScreen,
  'height': HeightScreen,
  'weight': WeightScreen,
  'device-connection': DeviceConnectionScreen,
  'health-apps': HealthAppsConnectionScreen,
  'doctor-link': DoctorLinkScreen,
  'complete': OnboardingCompleteScreen
};

// Combinar definiciones con componentes
export const onboardingSteps: OnboardingStep[] = stepDefinitions.map(definition => ({
  ...definition,
  component: componentMap[definition.id]
}));

// Re-exportar funciones útiles
export const getStepById = (id: string): OnboardingStep | undefined => 
  onboardingSteps.find(step => step.id === id);
export const getStepByIndex = (index: number): OnboardingStep | undefined => 
  onboardingSteps[index];
export const getStepIndex = (id: string): number => 
  onboardingSteps.findIndex(step => step.id === id);
