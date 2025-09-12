/**
 * @fileoverview Servicio de autenticación
 * @description Manejo de todas las operaciones relacionadas con autenticación
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_CONFIG, ENV } from '@/config/environment';
import { AuthResponse, RegisterRequest, User } from '@/types/auth';
import { authClient } from './client';
import { MOCK_AUTH_RESPONSE, MOCK_USER } from './mockData';

/**
 * Servicio de autenticación
 */
export class AuthService {
  
  /**
   * Realizar login
   */
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      if (ENV.DEVELOPER_MODE) {
        // Modo desarrollador: simular login instantáneo
        await AsyncStorage.setItem('authToken', MOCK_AUTH_RESPONSE.jwt);
        await AsyncStorage.setItem('user', JSON.stringify(MOCK_AUTH_RESPONSE.user));
        return MOCK_AUTH_RESPONSE;
      }

      const response = await authClient.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      // Guardar token y usuario
      await AsyncStorage.setItem('authToken', response.jwt);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Registrar nuevo usuario
   * @param userData - Datos del usuario a registrar
   * @returns Promise con la respuesta de autenticación
   */
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      if (ENV.DEVELOPER_MODE) {
        // Modo desarrollador: simular registro instantáneo
        await AsyncStorage.setItem('authToken', MOCK_AUTH_RESPONSE.jwt);
        await AsyncStorage.setItem('user', JSON.stringify(MOCK_AUTH_RESPONSE.user));
        return MOCK_AUTH_RESPONSE;
      }

      const response = await authClient.post<AuthResponse>(
        API_CONFIG.AUTH.ENDPOINTS.REGISTER,
        userData
      );
      
      // Guardar token y usuario en AsyncStorage
      if (response.jwt) {
        await AsyncStorage.setItem('authToken', response.jwt);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        
        if (response.refreshToken) {
          await AsyncStorage.setItem('refreshToken', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cerrar sesión
   * @returns Promise<void>
   */
  static async logout(): Promise<void> {
    try {
      if (!ENV.DEVELOPER_MODE) {
        // Solo intentar notificar al servidor en modo producción
        await authClient.post(API_CONFIG.AUTH.ENDPOINTS.LOGOUT);
      }
    } catch (error) {
      // Ignorar errores del servidor al hacer logout
      console.warn('Error en logout del servidor:', error);
    } finally {
      // Siempre limpiar datos locales
      await AsyncStorage.multiRemove(['authToken', 'user', 'refreshToken']);
    }
  }

  /**
   * Refrescar token
   * @returns Promise con nuevo token
   */
  static async refreshToken(): Promise<AuthResponse> {
    try {
      if (ENV.DEVELOPER_MODE) {
        // Modo desarrollador: devolver token mock
        return MOCK_AUTH_RESPONSE;
      }

      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authClient.post<AuthResponse>(
        API_CONFIG.AUTH.ENDPOINTS.REFRESH,
        { refreshToken }
      );
      
      // Actualizar tokens
      if (response.jwt) {
        await AsyncStorage.setItem('authToken', response.jwt);
        
        if (response.refreshToken) {
          await AsyncStorage.setItem('refreshToken', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtener perfil del usuario actual
   * @returns Promise con los datos del usuario
   */
  static async getProfile(): Promise<User> {
    try {
      if (ENV.DEVELOPER_MODE) {
        // Modo desarrollador: devolver usuario mock
        return MOCK_USER;
      }

      const response = await authClient.get<User>(
        API_CONFIG.AUTH.ENDPOINTS.PROFILE
      );
      
      // Actualizar usuario en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(response));
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verificar si el usuario está autenticado
   * @returns Promise<boolean> - true si está autenticado
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      if (ENV.DEVELOPER_MODE && ENV.BYPASS_AUTH) {
        // En modo desarrollador con bypass, siempre devolver true
        return true;
      }
      
      const token = await AsyncStorage.getItem('authToken');
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Obtener usuario actual desde AsyncStorage
   * @returns Promise con los datos del usuario o null
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Obtener token actual desde AsyncStorage
   * @returns Promise con el token o null
   */
  static async getCurrentToken(): Promise<string | null> {
    try {
      if (ENV.DEVELOPER_MODE) {
        // En modo desarrollador, devolver token mock
        return MOCK_AUTH_RESPONSE.jwt;
      }
      
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting current token:', error);
      return null;
    }
  }
}
