// src/services/predictionService.ts
import { API_CONFIG } from '@/config';
import {
    PredictionResponse
} from '@/types';
import { apiClient } from './api';

export class PredictionService {
  /**
   * Obtener predicción general para un usuario
   */
  static async getGeneralPrediction(userId: string): Promise<PredictionResponse> {
    const endpoint = `${API_CONFIG.ENDPOINTS.PREDICTIONS.RETINOPATHY}/${userId}`;
    return await apiClient.predictionGet<PredictionResponse>(endpoint);
  }

  /**
   * Obtener predicción específica de retinopatía
   */
  static async getRetinopathyPrediction(userId: string, factors?: Record<string, any>): Promise<PredictionResponse> {
    const endpoint = `${API_CONFIG.ENDPOINTS.PREDICTIONS.RETINOPATHY}/${userId}`;
    
    if (factors) {
      return await apiClient.predictionPost<PredictionResponse>(endpoint, { factors });
    }
    
    return await apiClient.predictionGet<PredictionResponse>(endpoint);
  }

  /**
   * Obtener predicción de nefropatía
   */
  static async getNephropathyPrediction(userId: string, factors?: Record<string, any>): Promise<PredictionResponse> {
    const endpoint = `${API_CONFIG.ENDPOINTS.PREDICTIONS.NEPHROPATHY}/${userId}`;
    
    if (factors) {
      return await apiClient.predictionPost<PredictionResponse>(endpoint, { factors });
    }
    
    return await apiClient.predictionGet<PredictionResponse>(endpoint);
  }

  /**
   * Obtener predicción de neuropatía
   */
  static async getNeuropathyPrediction(userId: string, factors?: Record<string, any>): Promise<PredictionResponse> {
    const endpoint = `${API_CONFIG.ENDPOINTS.PREDICTIONS.NEUROPATHY}/${userId}`;
    
    if (factors) {
      return await apiClient.predictionPost<PredictionResponse>(endpoint, { factors });
    }
    
    return await apiClient.predictionGet<PredictionResponse>(endpoint);
  }

  /**
   * Obtener predicción de pie diabético
   */
  static async getDiabeticFootPrediction(userId: string, factors?: Record<string, any>): Promise<PredictionResponse> {
    const endpoint = `${API_CONFIG.ENDPOINTS.PREDICTIONS.DIABETIC_FOOT}/${userId}`;
    
    if (factors) {
      return await apiClient.predictionPost<PredictionResponse>(endpoint, { factors });
    }
    
    return await apiClient.predictionGet<PredictionResponse>(endpoint);
  }

  /**
   * Obtener todas las predicciones de un usuario
   */
  static async getAllPredictions(userId: string): Promise<{
    retinopathy: PredictionResponse;
    nephropathy: PredictionResponse;
    neuropathy: PredictionResponse;
    diabeticFoot: PredictionResponse;
  }> {
    const [retinopathy, nephropathy, neuropathy, diabeticFoot] = await Promise.all([
      this.getRetinopathyPrediction(userId),
      this.getNephropathyPrediction(userId),
      this.getNeuropathyPrediction(userId),
      this.getDiabeticFootPrediction(userId),
    ]);

    return {
      retinopathy,
      nephropathy,
      neuropathy,
      diabeticFoot,
    };
  }

  /**
   * Mapear nombre de complicación a función de predicción
   */
  static async getPredictionByComplication(
    complication: string, 
    userId: string, 
    factors?: Record<string, any>
  ): Promise<PredictionResponse> {
    const complicationMap: Record<string, () => Promise<PredictionResponse>> = {
      'retinopatia': () => this.getRetinopathyPrediction(userId, factors),
      'nefropatia': () => this.getNephropathyPrediction(userId, factors),
      'neuropatia': () => this.getNeuropathyPrediction(userId, factors),
      'pie-diabetico': () => this.getDiabeticFootPrediction(userId, factors),
    };

    const predictionFunction = complicationMap[complication.toLowerCase()];
    
    if (!predictionFunction) {
      throw new Error(`Complicación no soportada: ${complication}`);
    }

    return await predictionFunction();
  }
}
