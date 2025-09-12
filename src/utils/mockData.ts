/**
 * @fileoverview Datos mock para desarrollo
 * @description Datos de prueba para facilitar el desarrollo sin backend
 */

import type { AuthResponse, User } from '@/types/auth';
import type { PatientData, PredictionResponse } from '@/types/prediction';

/**
 * Usuario mock para desarrollo
 */
export const MOCK_USER: User = {
  id: 'dev-user-001',
  email: 'developer@dabetai.com',
  nombre: 'Usuario',
  primerApellido: 'Desarrollador',
  segundoApellido: 'Mock',
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
  message: 'Autenticación mock exitosa',
};

/**
 * Datos del paciente mock
 */
export const MOCK_PATIENT_DATA: PatientData = {
  glucoseLevel: 120,
  Glucose_Mean: 125.5,
  bloodPressure: {
    systolic: 130,
    diastolic: 80,
  },
  weight: 70,
  height: 175,
  age: 35,
  Time_In_Range_70_180: 78.5,
};

/**
 * Respuestas de predicción mock
 */
export const MOCK_PREDICTION_RESPONSES = {
  retinopathy: {
    nivel_general: 'bajo',
    patient_data: MOCK_PATIENT_DATA,
    tendencia: [
      { time: 1, value: 85, type: 'glucose' },
      { time: 2, value: 92, type: 'glucose' },
      { time: 3, value: 88, type: 'glucose' },
      { time: 4, value: 95, type: 'glucose' },
      { time: 5, value: 90, type: 'glucose' },
    ],
    complications: [
      {
        name: 'Retinopatía diabética',
        level: 'bajo' as const,
        probability: 15,
        factors: ['Control glucémico estable', 'Presión arterial normal'],
      },
    ],
    timestamp: new Date().toISOString(),
  } as PredictionResponse,

  nephropathy: {
    nivel_general: 'medio',
    patient_data: MOCK_PATIENT_DATA,
    tendencia: [
      { time: 1, value: 20, type: 'creatinine' },
      { time: 2, value: 22, type: 'creatinine' },
      { time: 3, value: 25, type: 'creatinine' },
      { time: 4, value: 23, type: 'creatinine' },
      { time: 5, value: 24, type: 'creatinine' },
    ],
    complications: [
      {
        name: 'Nefropatía diabética',
        level: 'medio' as const,
        probability: 35,
        factors: ['Hipertensión leve', 'Duración de diabetes'],
      },
    ],
    timestamp: new Date().toISOString(),
  } as PredictionResponse,

  neuropathy: {
    nivel_general: 'alto',
    patient_data: MOCK_PATIENT_DATA,
    tendencia: [
      { time: 1, value: 65, type: 'nerve_conduction' },
      { time: 2, value: 60, type: 'nerve_conduction' },
      { time: 3, value: 58, type: 'nerve_conduction' },
      { time: 4, value: 55, type: 'nerve_conduction' },
      { time: 5, value: 52, type: 'nerve_conduction' },
    ],
    complications: [
      {
        name: 'Neuropatía diabética',
        level: 'alto' as const,
        probability: 70,
        factors: ['Control glucémico irregular', 'Síntomas neuropáticos'],
      },
    ],
    timestamp: new Date().toISOString(),
  } as PredictionResponse,

  diabeticFoot: {
    nivel_general: 'bajo',
    patient_data: MOCK_PATIENT_DATA,
    tendencia: [
      { time: 1, value: 95, type: 'circulation' },
      { time: 2, value: 92, type: 'circulation' },
      { time: 3, value: 94, type: 'circulation' },
      { time: 4, value: 90, type: 'circulation' },
      { time: 5, value: 93, type: 'circulation' },
    ],
    complications: [
      {
        name: 'Pie diabético',
        level: 'bajo' as const,
        probability: 10,
        factors: ['Buena circulación', 'Cuidado preventivo'],
      },
    ],
    timestamp: new Date().toISOString(),
  } as PredictionResponse,
};

/**
 * Respuesta de predicción general mock
 */
export const MOCK_GENERAL_PREDICTION = {
  retinopathy: MOCK_PREDICTION_RESPONSES.retinopathy,
  nephropathy: MOCK_PREDICTION_RESPONSES.nephropathy,
  neuropathy: MOCK_PREDICTION_RESPONSES.neuropathy,
  diabeticFoot: MOCK_PREDICTION_RESPONSES.diabeticFoot,
};