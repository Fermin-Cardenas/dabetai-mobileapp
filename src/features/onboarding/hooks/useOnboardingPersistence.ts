// src/features/onboarding/hooks/useOnboardingPersistence.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingData, OnboardingProgress } from '../types';

const ONBOARDING_STORAGE_KEY = 'dabetai_onboarding_progress';
const ONBOARDING_DATA_KEY = 'dabetai_onboarding_data';

export const useOnboardingPersistence = () => {
  const saveProgress = async (data: OnboardingData, currentStep: number, completedSteps: number[]): Promise<void> => {
    try {
      const progress: OnboardingProgress = {
        data,
        currentStep,
        completedSteps,
        timestamp: Date.now()
      };
      
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving onboarding progress:', error);
    }
  };

  const loadProgress = async (): Promise<OnboardingProgress | null> => {
    try {
      const progressString = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (!progressString) return null;

      const progress: OnboardingProgress = JSON.parse(progressString);
      
      // Verificar que el progreso no sea demasiado antiguo (más de 30 días)
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      if (progress.timestamp < thirtyDaysAgo) {
        await clearProgress();
        return null;
      }

      return progress;
    } catch (error) {
      console.error('Error loading onboarding progress:', error);
      return null;
    }
  };

  const clearProgress = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY);
      await AsyncStorage.removeItem(ONBOARDING_DATA_KEY);
    } catch (error) {
      console.error('Error clearing onboarding progress:', error);
    }
  };

  const saveData = async (data: OnboardingData): Promise<void> => {
    try {
      await AsyncStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  const loadData = async (): Promise<OnboardingData | null> => {
    try {
      const dataString = await AsyncStorage.getItem(ONBOARDING_DATA_KEY);
      if (!dataString) return null;

      return JSON.parse(dataString);
    } catch (error) {
      console.error('Error loading onboarding data:', error);
      return null;
    }
  };

  const markOnboardingComplete = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('dabetai_onboarding_completed', 'true');
      await clearProgress(); // Limpiar progreso temporal
    } catch (error) {
      console.error('Error marking onboarding complete:', error);
    }
  };

  const isOnboardingComplete = async (): Promise<boolean> => {
    try {
      const completed = await AsyncStorage.getItem('dabetai_onboarding_completed');
      return completed === 'true';
    } catch (error) {
      console.error('Error checking onboarding completion:', error);
      return false;
    }
  };

  return {
    saveProgress,
    loadProgress,
    clearProgress,
    saveData,
    loadData,
    markOnboardingComplete,
    isOnboardingComplete
  };
};
