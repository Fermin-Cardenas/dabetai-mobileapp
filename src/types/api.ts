/**
 * @fileoverview Tipos base y utilidades para la API
 * @description Define tipos comunes utilizados en toda la aplicación
 */

/**
 * Respuesta base de la API
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

/**
 * Error de la API
 */
export interface ApiError {
  message: string;
  code?: number;
  field?: string;
  details?: Record<string, any>;
  stack?: string;
}

/**
 * Parámetros de paginación
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Respuesta paginada
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next_page: boolean;
    has_prev_page: boolean;
  };
}

/**
 * Estados de carga para mutations
 */
export interface MutationState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: ApiError | null;
}

/**
 * Estados de carga para queries
 */
export interface QueryState<T> extends MutationState {
  data: T | undefined;
  isInitialLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
}

/**
 * Configuración de interceptores
 */
export interface InterceptorConfig {
  onRequest?: (config: any) => any | Promise<any>;
  onRequestError?: (error: any) => any | Promise<any>;
  onResponse?: (response: any) => any | Promise<any>;
  onResponseError?: (error: any) => any | Promise<any>;
}
