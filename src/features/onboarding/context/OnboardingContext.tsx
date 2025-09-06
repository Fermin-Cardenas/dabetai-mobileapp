// src/features/onboarding/context/OnboardingContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { getTotalSteps, stepDefinitions } from '../config/stepDefinitions';
import { useOnboardingPersistence } from '../hooks/useOnboardingPersistence';
import { OnboardingData, OnboardingField } from '../types';

interface OnboardingContextType {
  // Estado
  data: OnboardingData;
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  errors: Partial<Record<OnboardingField, string>>;
  isLoading: boolean;
  isSubmitting: boolean;
  
  // Acciones
  updateData: (field: OnboardingField, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  validateCurrentStep: () => boolean;
  submitOnboarding: () => Promise<void>;
  resetOnboarding: () => void;
  
  // Utilidades
  getCurrentStepConfig: () => typeof stepDefinitions[0] | undefined;
  canGoBack: () => boolean;
  canGoNext: () => boolean;
  getProgress: () => number;
}

type OnboardingAction = 
  | { type: 'SET_DATA'; payload: OnboardingData }
  | { type: 'UPDATE_FIELD'; payload: { field: OnboardingField; value: any } }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'ADD_COMPLETED_STEP'; payload: number }
  | { type: 'SET_ERROR'; payload: { field: OnboardingField; error: string | null } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET' }
  | { type: 'LOAD_PROGRESS'; payload: { data: OnboardingData; currentStep: number; completedSteps: number[] } };

const initialData: OnboardingData = {
  diabetesType: '',
  diagnosisYear: '',
  birthDate: '',
  gender: '',
  height: '',
  weight: '',
  deviceConnected: false,
  healthAppsConnected: false,
  doctorLinked: false
};

const initialState = {
  data: initialData,
  currentStep: 0,
  totalSteps: getTotalSteps(),
  completedSteps: [] as number[],
  errors: {} as Partial<Record<OnboardingField, string>>,
  isLoading: true,
  isSubmitting: false
};

function onboardingReducer(state: typeof initialState, action: OnboardingAction): typeof initialState {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    
    case 'UPDATE_FIELD':
      const newData = { ...state.data, [action.payload.field]: action.payload.value };
      // Limpiar error del campo si existe
      const newErrors = { ...state.errors };
      delete newErrors[action.payload.field];
      return { 
        ...state, 
        data: newData, 
        errors: newErrors
      };
    
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'ADD_COMPLETED_STEP':
      const completedSteps = [...state.completedSteps];
      if (!completedSteps.includes(action.payload)) {
        completedSteps.push(action.payload);
      }
      return { ...state, completedSteps };
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: action.payload.error 
          ? { ...state.errors, [action.payload.field]: action.payload.error }
          : { ...state.errors, [action.payload.field]: undefined }
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    
    case 'LOAD_PROGRESS':
      return {
        ...state,
        data: action.payload.data,
        currentStep: action.payload.currentStep,
        completedSteps: action.payload.completedSteps,
        isLoading: false
      };
    
    case 'RESET':
      return { ...initialState, isLoading: false };
    
    default:
      return state;
  }
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const persistence = useOnboardingPersistence();

  // Cargar progreso guardado al inicializar
  useEffect(() => {
    const loadSavedProgress = async () => {
      try {
        const savedProgress = await persistence.loadProgress();
        if (savedProgress) {
          dispatch({
            type: 'LOAD_PROGRESS',
            payload: {
              data: savedProgress.data,
              currentStep: savedProgress.currentStep,
              completedSteps: savedProgress.completedSteps
            }
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error loading onboarding progress:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadSavedProgress();
  }, []);

  // Auto-guardado cuando cambian los datos o el step
  useEffect(() => {
    if (!state.isLoading) {
      persistence.saveProgress(state.data, state.currentStep, state.completedSteps);
    }
  }, [state.data, state.currentStep, state.completedSteps, state.isLoading]);

  const updateData = (field: OnboardingField, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } });
  };

  const validateCurrentStep = (): boolean => {
    const currentStepConfig = stepDefinitions[state.currentStep];
    if (!currentStepConfig?.validator) return true;

    const error = currentStepConfig.validator(state.data);
    if (error) {
      // Determinar qué campo está siendo validado basado en el step
      const fieldMap: Record<string, OnboardingField> = {
        'diabetes-type': 'diabetesType',
        'diagnosis-year': 'diagnosisYear',
        'birth-date': 'birthDate',
        'gender': 'gender',
        'height': 'height',
        'weight': 'weight'
      };
      
      const field = fieldMap[currentStepConfig.id];
      if (field) {
        dispatch({ type: 'SET_ERROR', payload: { field, error } });
      }
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (state.currentStep < state.totalSteps - 1) {
      if (validateCurrentStep()) {
        dispatch({ type: 'ADD_COMPLETED_STEP', payload: state.currentStep });
        dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 });
      }
    }
  };

  const prevStep = () => {
    if (state.currentStep > 0) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep - 1 });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < state.totalSteps) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: step });
    }
  };

  const submitOnboarding = async (): Promise<void> => {
    dispatch({ type: 'SET_SUBMITTING', payload: true });
    
    try {
      // Aquí iría la lógica para enviar los datos al servidor
      await persistence.saveData(state.data);
      await persistence.markOnboardingComplete();
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Onboarding completado:', state.data);
    } catch (error) {
      console.error('Error submitting onboarding:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  const resetOnboarding = () => {
    persistence.clearProgress();
    dispatch({ type: 'RESET' });
  };

  const getCurrentStepConfig = () => {
    return stepDefinitions[state.currentStep];
  };

  const canGoBack = (): boolean => {
    return state.currentStep > 0;
  };

  const canGoNext = (): boolean => {
    const currentStepConfig = getCurrentStepConfig();
    if (!currentStepConfig) return false;
    
    // Si el step es opcional, siempre se puede continuar
    if (currentStepConfig.isOptional) return true;
    
    // Si no es opcional, validar
    return validateCurrentStep();
  };

  const getProgress = (): number => {
    return (state.currentStep / (state.totalSteps - 1)) * 100;
  };

  const contextValue: OnboardingContextType = {
    // Estado
    data: state.data,
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    completedSteps: state.completedSteps,
    errors: state.errors,
    isLoading: state.isLoading,
    isSubmitting: state.isSubmitting,
    
    // Acciones
    updateData,
    nextStep,
    prevStep,
    goToStep,
    validateCurrentStep,
    submitOnboarding,
    resetOnboarding,
    
    // Utilidades
    getCurrentStepConfig,
    canGoBack,
    canGoNext,
    getProgress
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
