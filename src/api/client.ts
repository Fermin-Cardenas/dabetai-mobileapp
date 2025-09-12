/**
 * @fileoverview Cliente HTTP base con interceptores
 * @description Configuración centralizada de Axios con manejo automático de autenticación y errores
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { API_CONFIG } from '@/config/environment';
import { ApiError, InterceptorConfig } from '@/types/api';
import { showErrorNotification } from '@/utils/notifications';

/**
 * Clase base para cliente HTTP
 */
class BaseHttpClient {
  protected instance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
      ...config,
    });

    this.setupInterceptors();
  }

  /**
   * Configurar interceptores globales
   */
  private setupInterceptors(): void {
    // Request interceptor - Agregar token de autenticación
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.warn('Error obteniendo token de AsyncStorage:', error);
        }
        
        // Log request en desarrollo
        if (__DEV__) {
          console.log(`🚀 [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`, {
            headers: config.headers,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(this.transformError(error));
      }
    );

    // Response interceptor - Manejo de errores globales
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response en desarrollo
        if (__DEV__) {
          console.log(`✅ [${response.status}] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            data: response.data,
          });
        }
        return response;
      },
      async (error) => {
        const transformedError = this.transformError(error);
        
        // Log error en desarrollo
        if (__DEV__) {
          console.error(`❌ [${error.response?.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
            error: transformedError,
            response: error.response?.data,
          });
        }

        // Manejo específico de errores
        await this.handleGlobalErrors(transformedError);
        
        return Promise.reject(transformedError);
      }
    );
  }

  /**
   * Transformar errores de axios a formato ApiError
   */
  private transformError(error: any): ApiError {
    if (error.response) {
      // Error de respuesta del servidor
      return {
        message: error.response.data?.message || `Error ${error.response.status}`,
        code: error.response.status,
        details: error.response.data,
        field: error.response.data?.field,
      };
    } else if (error.request) {
      // Error de red
      return {
        message: 'Error de conexión. Verifica tu conexión a internet.',
        code: 0,
        details: { type: 'network_error' },
      };
    } else {
      // Error de configuración
      return {
        message: error.message || 'Error desconocido',
        code: -1,
        details: { type: 'config_error' },
      };
    }
  }

  /**
   * Manejar errores globales
   */
  private async handleGlobalErrors(error: ApiError): Promise<void> {
    switch (error.code) {
      case 401:
        // Token expirado o no válido
        await this.handleUnauthorized();
        break;
      case 403:
        showErrorNotification('No tienes permisos para realizar esta acción');
        break;
      case 404:
        showErrorNotification('Recurso no encontrado');
        break;
      case 500:
        showErrorNotification('Error interno del servidor. Intenta más tarde.');
        break;
      case 0:
        showErrorNotification('Sin conexión a internet');
        break;
      default:
        // No mostrar notificación automática para otros errores
        // El componente puede manejarlos específicamente
        break;
    }
  }

  /**
   * Manejar error 401 - No autorizado
   */
  private async handleUnauthorized(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(['token', 'user', 'refreshToken']);
      showErrorNotification('Sesión expirada. Por favor, inicia sesión nuevamente.');
      
      // Redirigir a login (esto puede manejarse mejor con navigation context)
      // router.replace('/(public)/welcome');
    } catch (error) {
      console.error('Error clearing storage on unauthorized:', error);
    }
  }

  /**
   * Configurar interceptores personalizados
   */
  public setupCustomInterceptors(config: InterceptorConfig): void {
    if (config.onRequest) {
      this.instance.interceptors.request.use(config.onRequest, config.onRequestError);
    }
    if (config.onResponse) {
      this.instance.interceptors.response.use(config.onResponse, config.onResponseError);
    }
  }

  // Métodos HTTP genéricos - públicos para uso en servicios
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

/**
 * Cliente para APIs de autenticación
 */
export class AuthHttpClient extends BaseHttpClient {
  constructor() {
    super(API_CONFIG.AUTH.BASE_URL);
  }
}

/**
 * Cliente para APIs de predicciones
 */
export class PredictionHttpClient extends BaseHttpClient {
  constructor() {
    super(API_CONFIG.PREDICTION.BASE_URL);
  }
}

/**
 * Cliente para APIs de usuarios
 */
export class UserHttpClient extends BaseHttpClient {
  constructor() {
    super(API_CONFIG.USERS.BASE_URL);
  }
}

// Instancias singleton
export const authClient = new AuthHttpClient();
export const predictionClient = new PredictionHttpClient();
export const userClient = new UserHttpClient();
