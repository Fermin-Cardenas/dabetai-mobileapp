/**
 * @fileoverview Sistema de notificaciones
 * @description Manejo centralizado de notificaciones para la aplicación
 */

import { Alert } from 'react-native';

/**
 * Tipos de notificación
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Configuración de notificación
 */
interface NotificationConfig {
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  onPress?: () => void;
}

/**
 * Mostrar notificación de éxito
 */
export const showSuccessNotification = (message: string, title: string = 'Éxito'): void => {
  Alert.alert(title, message, [{ text: 'OK', style: 'default' }]);
};

/**
 * Mostrar notificación de error
 */
export const showErrorNotification = (message: string, title: string = 'Error'): void => {
  Alert.alert(title, message, [{ text: 'OK', style: 'destructive' }]);
};

/**
 * Mostrar notificación de advertencia
 */
export const showWarningNotification = (message: string, title: string = 'Advertencia'): void => {
  Alert.alert(title, message, [{ text: 'OK', style: 'default' }]);
};

/**
 * Mostrar notificación de información
 */
export const showInfoNotification = (message: string, title: string = 'Información'): void => {
  Alert.alert(title, message, [{ text: 'OK', style: 'default' }]);
};

/**
 * Mostrar notificación con confirmación
 */
export const showConfirmNotification = (
  message: string,
  onConfirm: () => void,
  onCancel?: () => void,
  title: string = 'Confirmar'
): void => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Confirmar',
        style: 'default',
        onPress: onConfirm,
      },
    ]
  );
};

/**
 * Mostrar notificación genérica
 */
export const showNotification = (config: NotificationConfig): void => {
  const { title, message, type = 'info' } = config;
  
  switch (type) {
    case 'success':
      showSuccessNotification(message, title);
      break;
    case 'error':
      showErrorNotification(message, title);
      break;
    case 'warning':
      showWarningNotification(message, title);
      break;
    case 'info':
    default:
      showInfoNotification(message, title);
      break;
  }
};

/**
 * Formatear mensaje de error de la API
 */
export const formatApiErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.data?.message) {
    return error.data.message;
  }
  
  return 'Ha ocurrido un error inesperado';
};
