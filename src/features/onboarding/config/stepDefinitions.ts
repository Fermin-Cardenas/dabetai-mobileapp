// src/features/onboarding/config/stepDefinitions.ts
import { OnboardingStep } from '../types';
import { validators } from '../validators';

/**
 * Definiciones de steps sin importar componentes
 * Esto evita ciclos de dependencias
 */
export const stepDefinitions: Omit<OnboardingStep, 'component'>[] = [
  {
    id: 'welcome',
    isOptional: false,
    showHeader: true,
    showProgress: false,
    props: {}
  },
  {
    id: 'diabetes-type',
    isOptional: false,
    showHeader: true,
    showProgress: true,
    validator: (data) => validators.diabetesType(data.diabetesType),
    props: {}
  },
  {
    id: 'diagnosis-year',
    isOptional: false,
    showHeader: true,
    showProgress: true,
    validator: (data) => validators.diagnosisYear(data.diagnosisYear),
    props: {}
  },
  {
    id: 'birth-date',
    isOptional: false,
    showHeader: true,
    showProgress: true,
    validator: (data) => validators.birthDate(data.birthDate),
    props: {}
  },
  {
    id: 'gender',
    isOptional: false,
    showHeader: true,
    showProgress: true,
    validator: (data) => validators.gender(data.gender),
    props: {}
  },
  {
    id: 'height',
    isOptional: false,
    showHeader: true,
    showProgress: true,
    validator: (data) => validators.height(data.height),
    props: {}
  },
  {
    id: 'weight',
    isOptional: false,
    showHeader: true,
    showProgress: true,
    validator: (data) => validators.weight(data.weight),
    props: {}
  },
  {
    id: 'device-connection',
    isOptional: true,
    showHeader: true,
    showProgress: true,
    props: {}
  },
  {
    id: 'health-apps',
    isOptional: true,
    showHeader: true,
    showProgress: true,
    props: {}
  },
  {
    id: 'doctor-link',
    isOptional: true,
    showHeader: true,
    showProgress: true,
    props: {}
  },
  {
    id: 'complete',
    isOptional: false,
    showHeader: false,
    showProgress: false,
    props: {}
  }
];

export const getTotalSteps = (): number => stepDefinitions.length;
export const getStepDefinitionById = (id: string): Omit<OnboardingStep, 'component'> | undefined => 
  stepDefinitions.find(step => step.id === id);
export const getStepDefinitionByIndex = (index: number): Omit<OnboardingStep, 'component'> | undefined => 
  stepDefinitions[index];
export const getStepIndex = (id: string): number => 
  stepDefinitions.findIndex(step => step.id === id);
