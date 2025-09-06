// src/features/onboarding/validators/index.ts
import { OnboardingData } from '../types';

export const validators = {
  diabetesType: (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Por favor selecciona un tipo de diabetes';
    }
    const validTypes = ['type1', 'type2', 'gestational', 'unknown'];
    if (!validTypes.includes(value)) {
      return 'Tipo de diabetes no válido';
    }
    return null;
  },

  diagnosisYear: (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Por favor selecciona el año de diagnóstico';
    }
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1950 || year > currentYear) {
      return `El año debe estar entre 1950 y ${currentYear}`;
    }
    return null;
  },

  birthDate: (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Por favor selecciona tu fecha de nacimiento';
    }
    
    const date = new Date(value);
    const currentDate = new Date();
    const minDate = new Date('1900-01-01');
    
    if (isNaN(date.getTime())) {
      return 'Fecha de nacimiento no válida';
    }
    
    if (date > currentDate) {
      return 'La fecha de nacimiento no puede ser futura';
    }
    
    if (date < minDate) {
      return 'Fecha de nacimiento demasiado antigua';
    }
    
    // Verificar que la persona tenga al menos 1 año
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    if (date > oneYearAgo) {
      return 'Debes tener al menos 1 año';
    }
    
    return null;
  },

  gender: (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Por favor selecciona tu género';
    }
    const validGenders = ['M', 'F'];
    if (!validGenders.includes(value)) {
      return 'Género no válido';
    }
    return null;
  },

  height: (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Por favor ingresa tu estatura';
    }
    const height = parseFloat(value);
    if (isNaN(height) || height < 50 || height > 300) {
      return 'La estatura debe estar entre 50 y 300 cm';
    }
    return null;
  },

  weight: (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Por favor ingresa tu peso';
    }
    const weight = parseFloat(value);
    if (isNaN(weight) || weight < 20 || weight > 500) {
      return 'El peso debe estar entre 20 y 500 kg';
    }
    return null;
  },

  deviceConnected: (value: boolean): string | null => {
    // Este campo es opcional, siempre válido
    return null;
  },

  healthAppsConnected: (value: boolean): string | null => {
    // Este campo es opcional, siempre válido
    return null;
  },

  doctorLinked: (value: boolean): string | null => {
    // Este campo es opcional, siempre válido
    return null;
  }
};

export const validateField = (field: keyof OnboardingData, value: any): string | null => {
  const validator = validators[field] as (value: any) => string | null;
  if (!validator) return null;
  return validator(value);
};

export const validateAllData = (data: OnboardingData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(validators).forEach(field => {
    const error = validateField(field as keyof OnboardingData, data[field as keyof OnboardingData]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};
