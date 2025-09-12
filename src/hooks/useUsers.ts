/**
 * @fileoverview Hook de usuarios con React Query
 * @description Hook personalizado para manejar operaciones de usuario
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UserService, type UpdateUserRequest, type UserProfile } from '@/api/users';
import { QUERY_KEYS } from '@/config/environment';
import type { PaginationParams } from '@/types/api';
import { showErrorNotification, showSuccessNotification } from '@/utils/notifications';

/**
 * Hook para manejar operaciones de usuarios
 */
export const useUsers = () => {
  const queryClient = useQueryClient();

  /**
   * Hook para obtener lista de usuarios (admin)
   */
  const useUsersList = (params?: PaginationParams) => {
    return useQuery({
      queryKey: [...QUERY_KEYS.USERS.LIST, params],
      queryFn: () => UserService.getUsers(params),
      staleTime: 2 * 60 * 1000, // 2 minutos
      enabled: !!params, // Solo ejecutar si hay parámetros
    });
  };

  /**
   * Hook para obtener perfil del usuario actual
   */
  const useUserProfile = () => {
    return useQuery({
      queryKey: QUERY_KEYS.AUTH.PROFILE,
      queryFn: UserService.getUserProfile,
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 2,
    });
  };

  /**
   * Hook para obtener estadísticas del usuario
   */
  const useUserStats = () => {
    return useQuery({
      queryKey: ['users', 'stats'],
      queryFn: UserService.getUserStats,
      staleTime: 10 * 60 * 1000, // 10 minutos
    });
  };

  // Mutation para actualizar perfil
  const updateProfileMutation = useMutation({
    mutationFn: (userData: UpdateUserRequest) => UserService.updateUserProfile(userData),
    onSuccess: (updatedUser: UserProfile) => {
      // Invalidar queries relacionadas con usuario
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      showSuccessNotification('Perfil actualizado correctamente');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al actualizar el perfil'
      );
    },
  });

  // Mutation para cambiar contraseña
  const changePasswordMutation = useMutation({
    mutationFn: (passwords: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => UserService.changePassword(passwords),
    onSuccess: () => {
      showSuccessNotification('Contraseña cambiada correctamente');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al cambiar la contraseña'
      );
    },
  });

  // Mutation para actualizar configuraciones
  const updateSettingsMutation = useMutation({
    mutationFn: (configuraciones: {
      notificaciones?: boolean;
      recordatorios?: boolean;
      compartirDatos?: boolean;
    }) => UserService.updateUserSettings(configuraciones),
    onSuccess: () => {
      // Invalidar perfil para obtener configuraciones actualizadas
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.PROFILE });
      
      showSuccessNotification('Configuraciones actualizadas');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al actualizar configuraciones'
      );
    },
  });

  // Mutation para eliminar cuenta
  const deleteAccountMutation = useMutation({
    mutationFn: () => UserService.deleteUserAccount(),
    onSuccess: () => {
      // Limpiar cache y redirigir
      queryClient.clear();
      showSuccessNotification('Cuenta eliminada correctamente');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al eliminar la cuenta'
      );
    },
  });

  // Funciones de conveniencia
  const updateProfile = (userData: UpdateUserRequest) => {
    updateProfileMutation.mutate(userData);
  };

  const changePassword = (passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    changePasswordMutation.mutate(passwords);
  };

  const updateSettings = (configuraciones: {
    notificaciones?: boolean;
    recordatorios?: boolean;
    compartirDatos?: boolean;
  }) => {
    updateSettingsMutation.mutate(configuraciones);
  };

  const deleteAccount = () => {
    deleteAccountMutation.mutate();
  };

  return {
    // Hooks de queries
    useUsersList,
    useUserProfile,
    useUserStats,
    
    // Estados de mutaciones
    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isUpdatingSettings: updateSettingsMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,
    
    // Errores
    updateProfileError: updateProfileMutation.error,
    changePasswordError: changePasswordMutation.error,
    updateSettingsError: updateSettingsMutation.error,
    deleteAccountError: deleteAccountMutation.error,
    
    // Acciones
    updateProfile,
    changePassword,
    updateSettings,
    deleteAccount,
    
    // Mutaciones para uso avanzado
    updateProfileMutation,
    changePasswordMutation,
    updateSettingsMutation,
    deleteAccountMutation,
  };
};
