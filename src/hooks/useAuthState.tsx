// src/hooks/useAuthState.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any | null;
  hasCompletedOnboarding: boolean;
}

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
    hasCompletedOnboarding: false,
  });

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const [token, userString, onboardingComplete] = await Promise.all([
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('user'),
          AsyncStorage.getItem('onboardingComplete'),
        ]);

        const user = userString ? JSON.parse(userString) : null;
        
        setAuthState({
          isLoggedIn: !!token && !!user,
          isLoading: false,
          user,
          hasCompletedOnboarding: onboardingComplete === 'true',
        });
      } catch (error) {
        console.error('Error checking auth state:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuthState();
  }, []);

  return authState;
};
