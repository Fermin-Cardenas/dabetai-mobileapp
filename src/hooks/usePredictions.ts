/**
 * @fileoverview Hook de predicciones con React Query
 * @description Hook personalizado para manejar predicciones de complicaciones diabéticas
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    PredictionService
} from '@/api/predictions';
import { QUERY_KEYS } from '@/config/environment';
import type {
    PatientData,
    PredictionResponse,
    PredictionType
} from '@/types/prediction';
import { showErrorNotification, showSuccessNotification } from '@/utils/notifications';

/**
 * Hook para manejar predicciones
 */
export const usePredictions = (userId: string = '1') => {
  const queryClient = useQueryClient();

  /**
   * Hook para predicción de retinopatía
   */
  const useRetinopathyPrediction = (patientData?: PatientData) => {
    return useQuery({
      queryKey: QUERY_KEYS.PREDICTIONS.RETINOPATHY(userId),
      queryFn: () => PredictionService.predictRetinopathy(userId, patientData),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!userId,
    });
  };

  /**
   * Hook para predicción de nefropatía
   */
  const useNephropathyPrediction = (patientData?: PatientData) => {
    return useQuery({
      queryKey: QUERY_KEYS.PREDICTIONS.NEPHROPATHY(userId),
      queryFn: () => PredictionService.predictNephropathy(userId, patientData),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!userId,
    });
  };

  /**
   * Hook para predicción de neuropatía
   */
  const useNeuropathyPrediction = (patientData?: PatientData) => {
    return useQuery({
      queryKey: QUERY_KEYS.PREDICTIONS.NEUROPATHY(userId),
      queryFn: () => PredictionService.predictNeuropathy(userId, patientData),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!userId,
    });
  };

  /**
   * Hook para predicción de pie diabético
   */
  const useDiabeticFootPrediction = (patientData?: PatientData) => {
    return useQuery({
      queryKey: QUERY_KEYS.PREDICTIONS.DIABETIC_FOOT(userId),
      queryFn: () => PredictionService.predictDiabeticFoot(userId, patientData),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!userId,
    });
  };

  /**
   * Hook para predicción general (todas las complicaciones)
   */
  const useGeneralPrediction = (patientData?: PatientData) => {
    return useQuery({
      queryKey: QUERY_KEYS.PREDICTIONS.GENERAL(userId),
      queryFn: () => PredictionService.predictGeneral(userId, patientData),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!userId,
    });
  };

  /**
   * Hook para histórico de predicciones
   */
  const usePredictionHistory = (type?: PredictionType, limit: number = 10) => {
    return useQuery({
      queryKey: ['predictions', 'history', userId, type, limit],
      queryFn: () => PredictionService.getPredictionHistory(userId, type, limit),
      staleTime: 2 * 60 * 1000, // 2 minutos
      enabled: !!userId,
    });
  };

  /**
   * Hook para estadísticas de predicciones
   */
  const usePredictionStats = (dateRange?: { from: string; to: string }) => {
    return useQuery({
      queryKey: ['predictions', 'stats', userId, dateRange],
      queryFn: () => PredictionService.getPredictionStats(userId, dateRange),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!userId,
    });
  };

  /**
   * Hook para obtener última predicción por tipo
   */
  const useLatestPrediction = (type: PredictionType) => {
    return useQuery({
      queryKey: ['predictions', 'latest', userId, type],
      queryFn: () => PredictionService.getLatestPrediction(userId, type),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!userId && !!type,
    });
  };

  // Mutation para nueva predicción de retinopatía
  const retinopathyMutation = useMutation({
    mutationFn: (patientData?: PatientData) => 
      PredictionService.predictRetinopathy(userId, patientData),
    onSuccess: (data: PredictionResponse) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.PREDICTIONS.RETINOPATHY(userId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', 'history', userId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', 'stats', userId] 
      });
      
      showSuccessNotification('Predicción de retinopatía completada');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al realizar predicción de retinopatía'
      );
    },
  });

  // Mutation para nueva predicción de nefropatía
  const nephropathyMutation = useMutation({
    mutationFn: (patientData?: PatientData) => 
      PredictionService.predictNephropathy(userId, patientData),
    onSuccess: (data: PredictionResponse) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.PREDICTIONS.NEPHROPATHY(userId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', 'history', userId] 
      });
      
      showSuccessNotification('Predicción de nefropatía completada');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al realizar predicción de nefropatía'
      );
    },
  });

  // Mutation para nueva predicción de neuropatía
  const neuropathyMutation = useMutation({
    mutationFn: (patientData?: PatientData) => 
      PredictionService.predictNeuropathy(userId, patientData),
    onSuccess: (data: PredictionResponse) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.PREDICTIONS.NEUROPATHY(userId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', 'history', userId] 
      });
      
      showSuccessNotification('Predicción de neuropatía completada');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al realizar predicción de neuropatía'
      );
    },
  });

  // Mutation para nueva predicción de pie diabético
  const diabeticFootMutation = useMutation({
    mutationFn: (patientData?: PatientData) => 
      PredictionService.predictDiabeticFoot(userId, patientData),
    onSuccess: (data: PredictionResponse) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.PREDICTIONS.DIABETIC_FOOT(userId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', 'history', userId] 
      });
      
      showSuccessNotification('Predicción de pie diabético completada');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al realizar predicción de pie diabético'
      );
    },
  });

  // Mutation para predicción general
  const generalMutation = useMutation({
    mutationFn: (patientData?: PatientData) => 
      PredictionService.predictGeneral(userId, patientData),
    onSuccess: (data) => {
      // Invalidar todas las queries de predicciones
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', userId] 
      });
      
      showSuccessNotification('Predicción general completada');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al realizar predicción general'
      );
    },
  });

  // Mutation para actualizar datos del paciente
  const updatePatientDataMutation = useMutation({
    mutationFn: (patientData: Partial<PatientData>) => 
      PredictionService.updatePatientData(userId, patientData),
    onSuccess: (data: PatientData) => {
      // Invalidar queries que dependan de datos del paciente
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', userId] 
      });
      
      showSuccessNotification('Datos del paciente actualizados');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al actualizar datos del paciente'
      );
    },
  });

  // Mutation para eliminar predicción
  const deletePredictionMutation = useMutation({
    mutationFn: (predictionId: string) => 
      PredictionService.deletePrediction(predictionId),
    onSuccess: () => {
      // Invalidar historial y estadísticas
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', 'history', userId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['predictions', 'stats', userId] 
      });
      
      showSuccessNotification('Predicción eliminada');
    },
    onError: (error: any) => {
      showErrorNotification(
        error.message || 'Error al eliminar predicción'
      );
    },
  });

  // Funciones de conveniencia
  const predictRetinopathy = (patientData?: PatientData) => {
    retinopathyMutation.mutate(patientData);
  };

  const predictNephropathy = (patientData?: PatientData) => {
    nephropathyMutation.mutate(patientData);
  };

  const predictNeuropathy = (patientData?: PatientData) => {
    neuropathyMutation.mutate(patientData);
  };

  const predictDiabeticFoot = (patientData?: PatientData) => {
    diabeticFootMutation.mutate(patientData);
  };

  const predictGeneral = (patientData?: PatientData) => {
    generalMutation.mutate(patientData);
  };

  const updatePatientData = (patientData: Partial<PatientData>) => {
    updatePatientDataMutation.mutate(patientData);
  };

  const deletePrediction = (predictionId: string) => {
    deletePredictionMutation.mutate(predictionId);
  };

  return {
    // Hooks de queries
    useRetinopathyPrediction,
    useNephropathyPrediction,
    useNeuropathyPrediction,
    useDiabeticFootPrediction,
    useGeneralPrediction,
    usePredictionHistory,
    usePredictionStats,
    useLatestPrediction,
    
    // Estados de mutaciones
    isPredictingRetinopathy: retinopathyMutation.isPending,
    isPredictingNephropathy: nephropathyMutation.isPending,
    isPredictingNeuropathy: neuropathyMutation.isPending,
    isPredictingDiabeticFoot: diabeticFootMutation.isPending,
    isPredictingGeneral: generalMutation.isPending,
    isUpdatingPatientData: updatePatientDataMutation.isPending,
    isDeletingPrediction: deletePredictionMutation.isPending,
    
    // Errores
    retinopathyError: retinopathyMutation.error,
    nephropathyError: nephropathyMutation.error,
    neuropathyError: neuropathyMutation.error,
    diabeticFootError: diabeticFootMutation.error,
    generalError: generalMutation.error,
    updatePatientDataError: updatePatientDataMutation.error,
    deletePredictionError: deletePredictionMutation.error,
    
    // Acciones
    predictRetinopathy,
    predictNephropathy,
    predictNeuropathy,
    predictDiabeticFoot,
    predictGeneral,
    updatePatientData,
    deletePrediction,
    
    // Mutaciones para uso avanzado
    retinopathyMutation,
    nephropathyMutation,
    neuropathyMutation,
    diabeticFootMutation,
    generalMutation,
    updatePatientDataMutation,
    deletePredictionMutation,
  };
};
