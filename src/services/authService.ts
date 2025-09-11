// src/services/authService.ts
import { API_CONFIG } from '@/config';
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    User
} from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './api';

export class AuthService {
  /**
   * Iniciar sesión
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.authPost<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // Guardar token y usuario automáticamente
    if (response.jwt) {
      await this.storeAuthData(response.jwt, response.user);
    }
    
    return response;
  }

  /**
   * Registrarse
   */
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.authPost<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      userData
    );
    
    // Guardar token y usuario automáticamente
    if (response.jwt) {
      await this.storeAuthData(response.jwt, response.user);
    }
    
    return response;
  }

  /**
   * Cerrar sesión
   */
  static async logout(): Promise<void> {
    try {
      // Llamar al endpoint de logout si existe
      await apiClient.authPost(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continuar aunque falle el logout del servidor
      console.warn('Error al hacer logout en el servidor:', error);
    } finally {
      // Limpiar datos locales siempre
      await this.clearAuthData();
    }
  }

  /**
   * Obtener token actual
   */
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Error al obtener token:', error);
      return null;
    }
  }

  /**
   * Obtener usuario actual
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }

  /**
   * Verificar si el usuario está autenticado
   */
  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  /**
   * Refrescar token (si el backend lo soporta)
   */
  static async refreshToken(): Promise<AuthResponse> {
    return await apiClient.authPost<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REFRESH
    );
  }

  /**
   * Guardar datos de autenticación
   */
  private static async storeAuthData(token: string, user: User): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.setItem('token', token),
        AsyncStorage.setItem('user', JSON.stringify(user)),
      ]);
      console.log('Datos de autenticación guardados correctamente');
    } catch (error) {
      console.error('Error al guardar datos de autenticación:', error);
      throw new Error('No se pudieron guardar los datos de sesión');
    }
  }

  /**
   * Limpiar datos de autenticación
   */
  private static async clearAuthData(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('user'),
      ]);
      console.log('Datos de autenticación eliminados');
    } catch (error) {
      console.error('Error al limpiar datos de autenticación:', error);
    }
  }
}
