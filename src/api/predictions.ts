/**
 * @fileoverview Servicio de predicciones
 * @description Manejo de todas las operaciones relacionadas con predicciones de diabetes
 */

import { API_CONFIG, ENV } from '@/config/environment';
import { ApiResponse } from '@/types/api';
import { PatientData, PredictionResponse, PredictionType } from '@/types/prediction';
import { predictionClient } from './client';
import { MOCK_PATIENT_DATA, MOCK_PREDICTION_RESPONSE } from './mockData';

/**
 * Interfaz para histórico de predicciones
 */
export interface PredictionHistory {
  id: string;
  type: PredictionType;
  riskLevel: 'bajo' | 'medio' | 'alto';
  confidence: number;
  createdAt: string;
  patientData: PatientData;
}

/**
 * Interfaz para estadísticas de predicciones
 */
export interface PredictionStats {
  totalPredictions: number;
  averageRisk: number;
  riskDistribution: {
    bajo: number;
    medio: number;
    alto: number;
  };
  lastPrediction?: string;
  trends: {
    retinopathy: Array<{ date: string; risk: number }>;
    nephropathy: Array<{ date: string; risk: number }>;
    neuropathy: Array<{ date: string; risk: number }>;
    diabeticFoot: Array<{ date: string; risk: number }>;
  };
}

/**
 * Servicio de predicciones
 */
export class PredictionService {
  
  /**
   * Realizar predicción de retinopatía diabética
   * @param userId - ID del usuario
   * @param patientData - Datos del paciente
   * @returns Promise con la respuesta de predicción
   */
  static async predictRetinopathy(userId: string, patientData?: PatientData): Promise<PredictionResponse> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: devolver predicción mock
      const riskLevels = ['bajo', 'medio', 'alto'];
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      
      return {
        ...MOCK_PREDICTION_RESPONSE,
        nivel_general: randomRisk,
        patient_data: patientData || MOCK_PATIENT_DATA
      };
    }

    const response = await predictionClient.post<ApiResponse<PredictionResponse>>(
      `${API_CONFIG.PREDICTION.ENDPOINTS.RETINOPATHY}/${userId}`,
      patientData
    );
    return response.data;
  }

  /**
   * Realizar predicción de nefropatía diabética
   * @param userId - ID del usuario
   * @param patientData - Datos del paciente
   * @returns Promise con la respuesta de predicción
   */
  static async predictNephropathy(userId: string, patientData?: PatientData): Promise<PredictionResponse> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: devolver predicción mock
      const riskLevels = ['bajo', 'medio', 'alto'];
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      
      return {
        ...MOCK_PREDICTION_RESPONSE,
        nivel_general: randomRisk,
        patient_data: patientData || MOCK_PATIENT_DATA
      };
    }

    const response = await predictionClient.post<ApiResponse<PredictionResponse>>(
      `${API_CONFIG.PREDICTION.ENDPOINTS.NEPHROPATHY}/${userId}`,
      patientData
    );
    return response.data;
  }

  /**
   * Realizar predicción de neuropatía diabética
   * @param userId - ID del usuario
   * @param patientData - Datos del paciente
   * @returns Promise con la respuesta de predicción
   */
  static async predictNeuropathy(userId: string, patientData?: PatientData): Promise<PredictionResponse> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: devolver predicción mock
      const riskLevels = ['bajo', 'medio', 'alto'];
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      
      return {
        ...MOCK_PREDICTION_RESPONSE,
        nivel_general: randomRisk,
        patient_data: patientData || MOCK_PATIENT_DATA
      };
    }

    const response = await predictionClient.post<ApiResponse<PredictionResponse>>(
      `${API_CONFIG.PREDICTION.ENDPOINTS.NEUROPATHY}/${userId}`,
      patientData
    );
    return response.data;
  }

  /**
   * Realizar predicción de pie diabético
   * @param userId - ID del usuario
   * @param patientData - Datos del paciente
   * @returns Promise con la respuesta de predicción
   */
  static async predictDiabeticFoot(userId: string, patientData?: PatientData): Promise<PredictionResponse> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: devolver predicción mock
      const riskLevels = ['bajo', 'medio', 'alto'];
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      
      return {
        ...MOCK_PREDICTION_RESPONSE,
        nivel_general: randomRisk,
        patient_data: patientData || MOCK_PATIENT_DATA
      };
    }

    const response = await predictionClient.post<ApiResponse<PredictionResponse>>(
      `${API_CONFIG.PREDICTION.ENDPOINTS.DIABETIC_FOOT}/${userId}`,
      patientData
    );
    return response.data;
  }

  /**
   * Realizar predicción general (todas las complicaciones)
   * @param userId - ID del usuario
   * @param patientData - Datos del paciente
   * @returns Promise con todas las predicciones
   */
  static async predictGeneral(userId: string, patientData?: PatientData): Promise<{
    retinopathy: PredictionResponse;
    nephropathy: PredictionResponse;
    neuropathy: PredictionResponse;
    diabeticFoot: PredictionResponse;
  }> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: devolver predicciones mock para todas las complicaciones
      const riskLevels = ['bajo', 'medio', 'alto'];
      
      return {
        retinopathy: {
          ...MOCK_PREDICTION_RESPONSE,
          nivel_general: riskLevels[Math.floor(Math.random() * riskLevels.length)],
          patient_data: patientData || MOCK_PATIENT_DATA
        },
        nephropathy: {
          ...MOCK_PREDICTION_RESPONSE,
          nivel_general: riskLevels[Math.floor(Math.random() * riskLevels.length)],
          patient_data: patientData || MOCK_PATIENT_DATA
        },
        neuropathy: {
          ...MOCK_PREDICTION_RESPONSE,
          nivel_general: riskLevels[Math.floor(Math.random() * riskLevels.length)],
          patient_data: patientData || MOCK_PATIENT_DATA
        },
        diabeticFoot: {
          ...MOCK_PREDICTION_RESPONSE,
          nivel_general: riskLevels[Math.floor(Math.random() * riskLevels.length)],
          patient_data: patientData || MOCK_PATIENT_DATA
        }
      };
    }

    const response = await predictionClient.post<ApiResponse<{
      retinopathy: PredictionResponse;
      nephropathy: PredictionResponse;
      neuropathy: PredictionResponse;
      diabeticFoot: PredictionResponse;
    }>>(
      `${API_CONFIG.PREDICTION.ENDPOINTS.GENERAL}/${userId}`,
      patientData
    );
    return response.data;
  }

  /**
   * Obtener histórico de predicciones del usuario
   * @param userId - ID del usuario
   * @param type - Tipo específico de predicción (opcional)
   * @param limit - Límite de resultados
   * @returns Promise con el histórico de predicciones
   */
  static async getPredictionHistory(
    userId: string, 
    type?: PredictionType, 
    limit: number = 10
  ): Promise<PredictionHistory[]> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: generar histórico mock
      const types: PredictionType[] = ['retinopathy', 'nephropathy', 'neuropathy', 'diabetic-foot'];
      const riskLevels: Array<'bajo' | 'medio' | 'alto'> = ['bajo', 'medio', 'alto'];
      
      return Array.from({ length: limit }, (_, index) => ({
        id: `mock-prediction-${index + 1}`,
        type: type || types[Math.floor(Math.random() * types.length)],
        riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        confidence: Math.random() * 100,
        createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString(),
        patientData: MOCK_PATIENT_DATA
      }));
    }

    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (type) params.append('type', type);

    const response = await predictionClient.get<ApiResponse<PredictionHistory[]>>(
      `/predictions/history/${userId}?${params.toString()}`
    );
    return response.data;
  }

  /**
   * Obtener estadísticas de predicciones del usuario
   * @param userId - ID del usuario
   * @param dateRange - Rango de fechas (opcional)
   * @returns Promise con estadísticas de predicciones
   */
  static async getPredictionStats(
    userId: string,
    dateRange?: { from: string; to: string }
  ): Promise<PredictionStats> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: generar estadísticas mock
      return {
        totalPredictions: 47,
        averageRisk: 65.5,
        riskDistribution: {
          bajo: 15,
          medio: 20,
          alto: 12
        },
        lastPrediction: new Date().toISOString(),
        trends: {
          retinopathy: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            risk: Math.random() * 100
          })),
          nephropathy: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            risk: Math.random() * 100
          })),
          neuropathy: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            risk: Math.random() * 100
          })),
          diabeticFoot: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
            risk: Math.random() * 100
          }))
        }
      };
    }

    const params = new URLSearchParams();
    if (dateRange) {
      params.append('from', dateRange.from);
      params.append('to', dateRange.to);
    }

    const response = await predictionClient.get<ApiResponse<PredictionStats>>(
      `/predictions/stats/${userId}?${params.toString()}`
    );
    return response.data;
  }

  /**
   * Obtener última predicción por tipo
   * @param userId - ID del usuario
   * @param type - Tipo de predicción
   * @returns Promise con la última predicción
   */
  static async getLatestPrediction(userId: string, type: PredictionType): Promise<PredictionResponse | null> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: devolver última predicción mock
      const riskLevels = ['bajo', 'medio', 'alto'];
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      
      return {
        ...MOCK_PREDICTION_RESPONSE,
        nivel_general: randomRisk,
        patient_data: MOCK_PATIENT_DATA
      };
    }

    try {
      const response = await predictionClient.get<ApiResponse<PredictionResponse>>(
        `/predictions/latest/${userId}/${type}`
      );
      return response.data;
    } catch (error: any) {
      if (error.code === 404) {
        return null; // No hay predicciones previas
      }
      throw error;
    }
  }

  /**
   * Eliminar predicción específica
   * @param predictionId - ID de la predicción
   * @returns Promise<void>
   */
  static async deletePrediction(predictionId: string): Promise<void> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: simular eliminación exitosa
      return Promise.resolve();
    }

    await predictionClient.delete<ApiResponse<void>>(
      `/predictions/${predictionId}`
    );
  }

  /**
   * Actualizar datos de paciente para predicciones futuras
   * @param userId - ID del usuario
   * @param patientData - Nuevos datos del paciente
   * @returns Promise con datos actualizados
   */
  static async updatePatientData(userId: string, patientData: Partial<PatientData>): Promise<PatientData> {
    const response = await predictionClient.put<ApiResponse<PatientData>>(
      `/predictions/patient-data/${userId}`,
      patientData
    );
    return response.data;
  }
}
