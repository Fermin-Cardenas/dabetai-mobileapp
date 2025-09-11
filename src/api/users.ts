/**
 * @fileoverview Servicio de usuarios
 * @description Manejo de todas las operaciones relacionadas con usuarios
 */

import { API_CONFIG, ENV } from '@/config/environment';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';
import { User } from '@/types/auth';
import { userClient } from './client';
import { MOCK_USER } from './mockData';

/**
 * Interfaz para actualizar perfil de usuario
 */
export interface UpdateUserRequest {
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  email?: string;
  telefono?: string;
  fechaNacimiento?: string;
  genero?: 'masculino' | 'femenino' | 'otro';
}

/**
 * Interfaz para respuesta de usuario con información adicional
 */
export interface UserProfile extends User {
  telefono?: string;
  fechaNacimiento?: string;
  genero?: 'masculino' | 'femenino' | 'otro';
  configuraciones?: {
    notificaciones: boolean;
    recordatorios: boolean;
    compartirDatos: boolean;
  };
  estadisticas?: {
    prediccionesRealizadas: number;
    ultimaPrediccion: string;
    riesgoPromedio: string;
  };
}

/**
 * Servicio de usuarios
 */
export class UserService {
  
  /**
   * Obtener lista de usuarios (admin)
   * @param params - Parámetros de paginación y filtros
   * @returns Promise con lista paginada de usuarios
   */
  static async getUsers(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: generar usuarios mock
      const mockUsers = Array.from({ length: 10 }, () => MOCK_USER);
      return {
        data: mockUsers,
        pagination: {
          current_page: params?.page || 1,
          per_page: params?.limit || 10,
          total: 50,
          total_pages: 5,
          has_next_page: true,
          has_prev_page: false
        }
      };
    }

    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);
    
    const url = `${API_CONFIG.USERS.ENDPOINTS.LIST}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await userClient.get<ApiResponse<PaginatedResponse<User>>>(url);
    return response.data;
  }

  /**
   * Obtener perfil completo del usuario actual
   * @returns Promise con el perfil del usuario
   */
  static async getUserProfile(): Promise<UserProfile> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: devolver perfil mock extendido
      return {
        ...MOCK_USER,
        telefono: '+34 123 456 789',
        fechaNacimiento: '1990-01-15',
        genero: 'masculino',
        configuraciones: {
          notificaciones: true,
          recordatorios: true,
          compartirDatos: false
        },
        estadisticas: {
          prediccionesRealizadas: 25,
          ultimaPrediccion: new Date().toISOString(),
          riesgoPromedio: 'Moderado'
        }
      };
    }

    const response = await userClient.get<ApiResponse<UserProfile>>(
      API_CONFIG.USERS.ENDPOINTS.PROFILE
    );
    return response.data;
  }

  /**
   * Actualizar perfil del usuario
   * @param userData - Datos a actualizar
   * @returns Promise con el usuario actualizado
   */
  static async updateUserProfile(userData: UpdateUserRequest): Promise<UserProfile> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: simular actualización y devolver datos actualizados
      return {
        ...MOCK_USER,
        ...userData,
        telefono: userData.telefono || '+34 123 456 789',
        fechaNacimiento: userData.fechaNacimiento || '1990-01-15',
        genero: userData.genero || 'masculino',
        configuraciones: {
          notificaciones: true,
          recordatorios: true,
          compartirDatos: false
        },
        estadisticas: {
          prediccionesRealizadas: 25,
          ultimaPrediccion: new Date().toISOString(),
          riesgoPromedio: 'Moderado'
        }
      };
    }

    const response = await userClient.put<ApiResponse<UserProfile>>(
      API_CONFIG.USERS.ENDPOINTS.UPDATE,
      userData
    );
    return response.data;
  }

  /**
   * Eliminar cuenta del usuario
   * @returns Promise<void>
   */
  static async deleteUserAccount(): Promise<void> {
    if (ENV.DEVELOPER_MODE) {
      // Modo desarrollador: simular eliminación exitosa
      return Promise.resolve();
    }

    await userClient.delete<ApiResponse<void>>(
      API_CONFIG.USERS.ENDPOINTS.DELETE
    );
  }

  /**
   * Cambiar contraseña del usuario
   * @param passwords - Contraseña actual y nueva
   * @returns Promise<void>
   */
  static async changePassword(passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> {
    await userClient.put<ApiResponse<void>>(
      '/users/change-password',
      passwords
    );
  }

  /**
   * Actualizar configuraciones del usuario
   * @param configuraciones - Nuevas configuraciones
   * @returns Promise con configuraciones actualizadas
   */
  static async updateUserSettings(configuraciones: {
    notificaciones?: boolean;
    recordatorios?: boolean;
    compartirDatos?: boolean;
  }): Promise<UserProfile['configuraciones']> {
    const response = await userClient.put<ApiResponse<UserProfile['configuraciones']>>(
      '/users/settings',
      configuraciones
    );
    return response.data;
  }

  /**
   * Obtener estadísticas del usuario
   * @returns Promise con estadísticas del usuario
   */
  static async getUserStats(): Promise<UserProfile['estadisticas']> {
    const response = await userClient.get<ApiResponse<UserProfile['estadisticas']>>(
      '/users/stats'
    );
    return response.data;
  }
}
