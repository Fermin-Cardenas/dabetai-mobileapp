/**
 * @fileoverview Índice de hooks personalizados
 * @description Exportaciones centralizadas de todos los hooks
 */

// Hooks de autenticación y estado
export { useAuth } from './useAuth';
export { useAuthState } from './useAuthState';

// Hooks de usuarios
export { useUsers } from './useUsers';

// Hooks de predicciones
export { usePredictions } from './usePredictions';

// Hooks de navegación
export { useTabNavigation } from './useTabNavigation';

// Re-exportar tipos para conveniencia
export type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    User
} from '@/types/auth';

export type {
    PatientData,
    PredictionResponse, PredictionType,
    RiskLevel
} from '@/types/prediction';

