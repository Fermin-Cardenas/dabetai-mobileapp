// src/features/onboarding/constants/defaults.ts

/**
 * Constantes por defecto para el flujo de onboarding
 * Centraliza valores que se usan por defecto en lugar de hardcodearlos
 */

// Valores por defecto para fechas y edad
export const DEFAULT_VALUES = {
  // Fecha de nacimiento por defecto (persona adulta promedio)
  birthDate: {
    day: 15,
    month: 6,
    year: new Date().getFullYear() - 28, // 28 años por defecto
  },
  
  // Año de diagnóstico por defecto (hace algunos años)
  diagnosisYear: new Date().getFullYear() - 5,
  
  // Altura por defecto en cm (promedio mundial)
  height: 170,
  
  // Peso por defecto en kg (promedio saludable)
  weight: {
    kg: 70,
    grams: 0,
  },
} as const;

// Rangos para validaciones
export const RANGES = {
  height: {
    min: 120,
    max: 220,
  },
  weight: {
    minKg: 30,
    maxKg: 200,
  },
  diagnosisYear: {
    min: 1950,
    max: new Date().getFullYear(),
  },
} as const;

// Configuración de UI
export const UI_CONFIG = {
  // Ancho máximo de contenedores (equivalente a max-w-sm en Tailwind)
  maxContentWidth: '24rem', // 384px
  
  // Valores de espaciado comunes
  spacing: {
    container: 'px-4 py-6',
    section: 'gap-6',
    buttons: 'gap-4',
  },
  
  // Clases de texto comunes
  text: {
    title: 'text-gray-700 font-bold text-3xl leading-10 text-center',
    description: 'text-gray-700 text-base leading-5 text-center',
    error: 'text-red-600 text-sm text-center',
  },
  
  // Colores del tema
  colors: {
    background: 'bg-gray-100',
    error: 'bg-red-50 border-red-200',
  },
} as const;
