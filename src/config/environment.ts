/**
 * @fileoverview Configuración de entorno para la aplicación dabetai
 * @description Centraliza todas las variables de entorno y configuraciones de la aplicación
 */

// Note: For React Native with Expo, we'll use a simple config object
// In production, consider using react-native-dotenv or expo-constants

interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  AUTH_API_URL: string;
  PREDICTION_API_URL: string;
  API_TIMEOUT: number;
  DEVELOPER_MODE: boolean;
  BYPASS_AUTH: boolean;
}

/**
 * Configuración de entorno de la aplicación
 */
export const ENV: EnvironmentConfig = {
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development',
  AUTH_API_URL: process.env.AUTH_API_URL || 'http://localhost:8080',
  PREDICTION_API_URL: process.env.PREDICTION_API_URL || 'http://192.168.100.20:8000',
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '10000', 10),
  DEVELOPER_MODE: process.env.NODE_ENV === 'development',
  BYPASS_AUTH: process.env.BYPASS_AUTH === 'true' || process.env.NODE_ENV === 'development',
};

/**
 * Configuración específica de APIs
 */
export const API_CONFIG = {
  AUTH: {
    BASE_URL: ENV.AUTH_API_URL,
    ENDPOINTS: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
  },
  PREDICTION: {
    BASE_URL: ENV.PREDICTION_API_URL,
    ENDPOINTS: {
      RETINOPATHY: '/retinopathy/predict',
      NEPHROPATHY: '/nephropathy/predict',
      NEUROPATHY: '/neuropathy/predict',
      DIABETIC_FOOT: '/diabetic-foot/predict',
      GENERAL: '/general/predict',
    },
  },
  USERS: {
    BASE_URL: ENV.AUTH_API_URL,
    ENDPOINTS: {
      LIST: '/users',
      PROFILE: '/users/profile',
      UPDATE: '/users/profile',
      DELETE: '/users/profile',
    },
  },
  TIMEOUT: ENV.API_TIMEOUT,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Modo developer
  DEVELOPER_MODE: ENV.NODE_ENV === 'development',
} as const;

/**
 * Configuración de React Query
 */
export const QUERY_CONFIG = {
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (antes era cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
} as const;

/**
 * Claves de consulta para React Query
 */
export const QUERY_KEYS = {
  AUTH: {
    STATUS: ['auth', 'status'] as const,
    USER: ['auth', 'user'] as const,
    PROFILE: ['auth', 'profile'] as const,
  },
  USERS: {
    LIST: ['users', 'list'] as const,
    DETAIL: (id: string) => ['users', 'detail', id] as const,
  },
  PREDICTIONS: {
    RETINOPATHY: (userId: string) => ['predictions', 'retinopathy', userId] as const,
    NEPHROPATHY: (userId: string) => ['predictions', 'nephropathy', userId] as const,
    NEUROPATHY: (userId: string) => ['predictions', 'neuropathy', userId] as const,
    DIABETIC_FOOT: (userId: string) => ['predictions', 'diabetic-foot', userId] as const,
    GENERAL: (userId: string) => ['predictions', 'general', userId] as const,
  },
} as const;
