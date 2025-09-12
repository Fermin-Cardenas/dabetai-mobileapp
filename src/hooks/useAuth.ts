/**
 * @fileoverview Hook de autenticación con React Query
 * @description Hook personalizado para manejar autenticación con cache y estados
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { AuthService } from '@/api/auth';
import { QUERY_KEYS } from '@/config/environment';
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import { showErrorNotification, showSuccessNotification } from '@/utils/notifications';

/**
 * Hook para manejar autenticación
 */
export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Query para verificar estado de autenticación
  const {
    data: isAuthenticated = false,
    isLoading: isCheckingAuth,
    refetch: checkAuth,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.STATUS,
    queryFn: AuthService.isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false,
  });

  // Query para obtener usuario actual
  const {
    data: currentUser,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.USER,
    queryFn: AuthService.getCurrentUser,
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });

  // Query para obtener perfil completo
  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.PROFILE,
    queryFn: AuthService.getProfile,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });

  // Mutation para login
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      // Invalidar queries relacionadas con auth
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      
      showSuccessNotification('Bienvenido de vuelta');
      router.push('/(tabs)/home');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al iniciar sesión. Verifica tus credenciales.'
      );
    },
  });

  // Mutation para registro
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => AuthService.register(userData),
    onSuccess: (data: AuthResponse) => {
      // Invalidar queries relacionadas con auth
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      
      showSuccessNotification('Registro exitoso. ¡Bienvenido a dabetai!');
      router.push('/onboarding');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al registrarse. Intenta con un email diferente.'
      );
    },
  });

  // Mutation para logout
  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Limpiar todas las queries del cache
      queryClient.clear();
      
      showSuccessNotification('Sesión cerrada correctamente');
      router.replace('/(public)/welcome');
    },
    onError: (error: any) => {
      // Aún así limpiar cache local en caso de error
      queryClient.clear();
      showErrorNotification('Error al cerrar sesión, pero se limpió la sesión local');
      router.replace('/(public)/welcome');
    },
  });

  // Mutation para refrescar token
  const refreshTokenMutation = useMutation({
    mutationFn: () => AuthService.refreshToken(),
    onSuccess: () => {
      // Invalidar queries de auth para obtener nuevos datos
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: () => {
      // Si falla el refresh, hacer logout
      logoutMutation.mutate();
    },
  });

  // Funciones de conveniencia
  const login = (credentials: LoginRequest) => {
    loginMutation.mutate(credentials);
  };

  const register = (userData: RegisterRequest) => {
    registerMutation.mutate(userData);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const refreshToken = () => {
    refreshTokenMutation.mutate();
  };

  return {
    // Estados
    isAuthenticated,
    currentUser,
    userProfile,
    
    // Estados de carga
    isCheckingAuth,
    isLoadingUser,
    isLoadingProfile,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    
    // Estados de error
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    
    // Acciones
    login,
    register,
    logout,
    refreshToken,
    checkAuth,
    refetchUser,
    refetchProfile,
    
    // Estados de mutaciones para uso avanzado
    loginMutation,
    registerMutation,
    logoutMutation,
    refreshTokenMutation,
  };
};
