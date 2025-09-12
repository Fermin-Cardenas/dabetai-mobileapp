/**
 * @fileoverview Índice de servicios API
 * @description Exportaciones centralizadas de todos los servicios API
 */

// Clientes HTTP
export { authClient, predictionClient, userClient } from './client';

// Servicios
export { AuthService } from './auth';
export { PredictionService } from './predictions';
export { UserService } from './users';

// Re-exportar tipos comunes para conveniencia
export type {
    ApiError, ApiResponse, MutationState, PaginatedResponse,
    PaginationParams, QueryState
} from '@/types/api';

export type {
    AuthResponse, LoginRequest,
    RegisterRequest, User
} from '@/types/auth';

export type {
    ComplicationData,
    ComplicationDetail, PatientData, PredictionRequest,
    PredictionResponse, PredictionType, RiskFactor, RiskLevel, TrendData
} from '@/types/prediction';

