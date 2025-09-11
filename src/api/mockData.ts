/**
 * @fileoverview Datos mock para modo developer
 * @description Datos simulados para desarrollo sin necesidad de backend
 */

import type { AuthResponse, User } from '@/types/auth';
import type { PatientData, PredictionResponse } from '@/types/prediction';

/**
 * Usuario mock para desarrollo
 */
export const MOCK_USER: User = {
  id: 'dev-user-001',
  email: 'developer@dabetai.com',
  nombre: 'Developer',
  primerApellido: 'Mode',
  segundoApellido: 'User',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Respuesta de autenticación mock
 */
export const MOCK_AUTH_RESPONSE: AuthResponse = {
  jwt: 'mock-jwt-token-for-development',
  token: 'mock-jwt-token-for-development',
  refreshToken: 'mock-refresh-token',
  user: MOCK_USER,
  message: 'Login exitoso (modo developer)',
};

/**
 * Datos de paciente mock
 */
export const MOCK_PATIENT_DATA: PatientData = {
  glucoseLevel: 120,
  Glucose_Mean: 125.5,
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
  },
  weight: 70,
  height: 175,
  age: 35,
  Time_In_Range_70_180: 85.2,
};

/**
 * Respuesta de predicción mock
 */
export const MOCK_PREDICTION_RESPONSE: PredictionResponse = {
  nivel_general: 'medio',
  patient_data: MOCK_PATIENT_DATA,
  tendencia: [
    { time: 1, value: 110, type: 'glucose' },
    { time: 2, value: 115, type: 'glucose' },
    { time: 3, value: 120, type: 'glucose' },
    { time: 4, value: 125, type: 'glucose' },
    { time: 5, value: 118, type: 'glucose' },
    { time: 6, value: 122, type: 'glucose' },
  ],
  complications: [
    {
      name: 'Retinopatía diabética',
      level: 'bajo',
      probability: 0.15,
      factors: ['Control glucémico estable', 'Sin factores de riesgo adicionales'],
    },
    {
      name: 'Nefropatía diabética',
      level: 'medio',
      probability: 0.35,
      factors: ['Presión arterial elevada ocasional', 'Tiempo con diabetes'],
    },
    {
      name: 'Neuropatía diabética',
      level: 'bajo',
      probability: 0.20,
      factors: ['Buen control metabólico', 'Actividad física regular'],
    },
    {
      name: 'Pie diabético',
      level: 'bajo',
      probability: 0.10,
      factors: ['Cuidado preventivo adecuado', 'Sin lesiones previas'],
    },
  ],
  timestamp: new Date().toISOString(),
};

/**
 * Predicciones específicas mock
 */
export const MOCK_PREDICTIONS = {
  retinopathy: MOCK_PREDICTION_RESPONSE,
  nephropathy: {
    ...MOCK_PREDICTION_RESPONSE,
    nivel_general: 'alto',
    complications: [MOCK_PREDICTION_RESPONSE.complications![1]],
  },
  neuropathy: {
    ...MOCK_PREDICTION_RESPONSE,
    nivel_general: 'bajo',
    complications: [MOCK_PREDICTION_RESPONSE.complications![2]],
  },
  diabeticFoot: {
    ...MOCK_PREDICTION_RESPONSE,
    nivel_general: 'bajo',
    complications: [MOCK_PREDICTION_RESPONSE.complications![3]],
  },
  general: {
    retinopathy: MOCK_PREDICTION_RESPONSE,
    nephropathy: { ...MOCK_PREDICTION_RESPONSE, nivel_general: 'alto' },
    neuropathy: { ...MOCK_PREDICTION_RESPONSE, nivel_general: 'bajo' },
    diabeticFoot: { ...MOCK_PREDICTION_RESPONSE, nivel_general: 'bajo' },
  },
};

/**
 * Función para generar datos mock aleatorios
 */
export const generateRandomMockData = (): PatientData => ({
  ...MOCK_PATIENT_DATA,
  glucoseLevel: Math.floor(Math.random() * 50) + 100, // 100-150
  Glucose_Mean: Math.floor(Math.random() * 40) + 110, // 110-150
  Time_In_Range_70_180: Math.floor(Math.random() * 30) + 70, // 70-100
});
