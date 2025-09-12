// src/types/auth.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  token: string; // Alias para compatibilidad
  refreshToken?: string;
  user: User;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthError {
  message: string;
  code?: string;
}
