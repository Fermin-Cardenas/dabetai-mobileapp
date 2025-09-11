// src/services/api.ts
import { API_CONFIG } from '@/config';
import { ApiError } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiClient {
  private authClient: AxiosInstance;
  private predictionClient: AxiosInstance;

  constructor() {
    // Cliente para autenticación
    this.authClient = axios.create({
      baseURL: API_CONFIG.AUTH_API_URL,
      timeout: API_CONFIG.TIMEOUT,
    });

    // Cliente para predicciones
    this.predictionClient = axios.create({
      baseURL: API_CONFIG.PREDICTION_API_URL,
      timeout: API_CONFIG.TIMEOUT,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Interceptor para agregar token automáticamente
    const addAuthToken = async (config: any) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    // Interceptor para manejo de errores
    const handleError = (error: any) => {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Error desconocido',
        code: error.response?.status,
        details: error.response?.data,
      };
      return Promise.reject(apiError);
    };

    // Aplicar interceptors a ambos clientes
    this.authClient.interceptors.request.use(addAuthToken);
    this.authClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      handleError
    );

    this.predictionClient.interceptors.request.use(addAuthToken);
    this.predictionClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      handleError
    );
  }

  // Métodos para el cliente de autenticación
  async authPost<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.authClient.post(endpoint, data);
    return response.data;
  }

  async authGet<T>(endpoint: string): Promise<T> {
    const response = await this.authClient.get(endpoint);
    return response.data;
  }

  async authPut<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.authClient.put(endpoint, data);
    return response.data;
  }

  async authDelete<T>(endpoint: string): Promise<T> {
    const response = await this.authClient.delete(endpoint);
    return response.data;
  }

  // Métodos para el cliente de predicciones
  async predictionPost<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.predictionClient.post(endpoint, data);
    return response.data;
  }

  async predictionGet<T>(endpoint: string): Promise<T> {
    const response = await this.predictionClient.get(endpoint);
    return response.data;
  }

  async predictionPut<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.predictionClient.put(endpoint, data);
    return response.data;
  }

  async predictionDelete<T>(endpoint: string): Promise<T> {
    const response = await this.predictionClient.delete(endpoint);
    return response.data;
  }
}

export const apiClient = new ApiClient();
