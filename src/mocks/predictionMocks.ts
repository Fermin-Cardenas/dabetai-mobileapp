/**
 * @fileoverview Datos mock para predicciones
 * @description Datos de prueba para el modo desarrollador
 */

/**
 * Interfaz para datos de complicación individual
 */
export interface ComplicationData {
  id: string;
  name: string;
  riskLevel: "bajo" | "medio" | "alto";
  description: string;
  factors: {
    name: string;
    level: "Bajo" | "Medio" | "Alto";
    isHigh: boolean;
    value?: string;
  }[];
  recommendations: string[];
}

/**
 * Predicción general mock con todas las complicaciones
 */
export const mockGeneralPrediction = {
  retinopathy: {
    nivel_general: "medio",
    tendencia: Array.from({ length: 7 }, (_, i) => ({
      time: Date.now() - (i * 24 * 60 * 60 * 1000),
      value: Math.random() * 100 + 20
    })),
    timestamp: new Date().toISOString(),
    patient_data: {
      glucoseLevel: 140,
      Glucose_Mean: 135,
      bloodPressure: {
        systolic: 130,
        diastolic: 85
      },
      weight: 75,
      height: 170,
      age: 45,
      Time_In_Range_70_180: 65
    }
  },
  nephropathy: {
    nivel_general: "bajo",
    tendencia: Array.from({ length: 7 }, (_, i) => ({
      time: Date.now() - (i * 24 * 60 * 60 * 1000),
      value: Math.random() * 60 + 10
    })),
    timestamp: new Date().toISOString()
  },
  neuropathy: {
    nivel_general: "alto",
    tendencia: Array.from({ length: 7 }, (_, i) => ({
      time: Date.now() - (i * 24 * 60 * 60 * 1000),
      value: Math.random() * 100 + 60
    })),
    timestamp: new Date().toISOString()
  },
  diabeticFoot: {
    nivel_general: "bajo",
    tendencia: Array.from({ length: 7 }, (_, i) => ({
      time: Date.now() - (i * 24 * 60 * 60 * 1000),
      value: Math.random() * 50 + 15
    })),
    timestamp: new Date().toISOString()
  }
};

/**
 * Lista de complicaciones mock con diferentes niveles de riesgo
 */
export const mockComplications = [
  { name: "Nefropatía diabética", level: "Bajo" as const, isHigh: false },
  { name: "Retinopatía diabética", level: "Medio" as const, isHigh: false },
  { name: "Neuropatía diabética", level: "Alto" as const, isHigh: true },
  { name: "Pie diabético", level: "Bajo" as const, isHigh: false },
];

/**
 * Datos mock detallados para complicaciones individuales
 */
export const mockComplicationData: Record<string, ComplicationData> = {
  nefropatia: {
    id: "nefropatia",
    name: "Nefropatía diabética",
    riskLevel: "medio",
    description:
      "Tu riesgo de nefropatía diabética requiere atención. Gestionar tu PA y glucosa es clave.",
    factors: [
      {
        name: "HbA1c promedio",
        level: "Medio",
        isHigh: false,
        value: "6.5%",
      },
      {
        name: "Tiempo en rango (TIR)",
        level: "Medio",
        isHigh: false,
        value: "78%",
      },
      {
        name: "Presión arterial",
        level: "Alto",
        isHigh: true,
        value: "145/92 mmHg",
      },
      {
        name: "Duración diabetes",
        level: "Alto",
        isHigh: true,
        value: "12 años",
      },
    ],
    recommendations: [
      "Mantén tu presión arterial por debajo de 130/80 mmHg",
      "Controla tu glucosa manteniendo el tiempo en rango >70%",
      "Realiza controles regulares de función renal",
      "Considera medicamentos cardioprotectores",
    ],
  },
  retinopatia: {
    id: "retinopatia",
    name: "Retinopatía diabética",
    riskLevel: "medio",
    description:
      "Tu riesgo de retinopatía diabética es moderado. El control glucémico constante es fundamental.",
    factors: [
      {
        name: "HbA1c promedio",
        level: "Medio",
        isHigh: false,
        value: "7.1%",
      },
      {
        name: "Tiempo en rango (TIR)",
        level: "Medio",
        isHigh: false,
        value: "72%",
      },
      {
        name: "Duración diabetes",
        level: "Alto",
        isHigh: true,
        value: "15 años",
      },
      {
        name: "Exámenes oftalmológicos",
        level: "Bajo",
        isHigh: false,
        value: "Regulares",
      },
    ],
    recommendations: [
      "Mantén tu HbA1c por debajo de 7%",
      "Realiza exámenes oftalmológicos anuales",
      "Controla tu presión arterial",
      "Evita cambios bruscos en la glucosa",
    ],
  },
  neuropatia: {
    id: "neuropatia",
    name: "Neuropatía diabética",
    riskLevel: "alto",
    description:
      "Tu riesgo de neuropatía diabética es alto. Se requiere atención inmediata y seguimiento especializado.",
    factors: [
      {
        name: "HbA1c promedio",
        level: "Alto",
        isHigh: true,
        value: "8.3%",
      },
      {
        name: "Tiempo en rango (TIR)",
        level: "Alto",
        isHigh: true,
        value: "58%",
      },
      {
        name: "Síntomas neurológicos",
        level: "Alto",
        isHigh: true,
        value: "Presentes",
      },
      {
        name: "Duración diabetes",
        level: "Alto",
        isHigh: true,
        value: "18 años",
      },
    ],
    recommendations: [
      "Optimiza urgentemente tu control glucémico",
      "Consulta con un neurólogo especialista",
      "Considera terapia para el dolor neuropático",
      "Realiza ejercicio regular adaptado",
      "Mejora tu cuidado de los pies",
    ],
  },
  "pie-diabetico": {
    id: "pie-diabetico",
    name: "Pie diabético",
    riskLevel: "bajo",
    description:
      "Tu riesgo de pie diabético es bajo. Mantén buenos hábitos de cuidado preventivo.",
    factors: [
      {
        name: "HbA1c promedio",
        level: "Bajo",
        isHigh: false,
        value: "6.8%",
      },
      {
        name: "Sensibilidad podal",
        level: "Bajo",
        isHigh: false,
        value: "Normal",
      },
      {
        name: "Circulación",
        level: "Bajo",
        isHigh: false,
        value: "Buena",
      },
      {
        name: "Cuidado de pies",
        level: "Bajo",
        isHigh: false,
        value: "Excelente",
      },
    ],
    recommendations: [
      "Mantén tu rutina de cuidado de pies",
      "Inspecciona tus pies diariamente",
      "Usa calzado adecuado y cómodo",
      "Mantén tu control glucémico actual",
    ],
  },
};

/**
 * Estadísticas mock para predicciones
 */
export const mockPredictionStats = {
  totalPredictions: 47,
  averageRisk: 65.5,
  riskDistribution: {
    bajo: 15,
    medio: 20,
    alto: 12
  },
  lastPrediction: new Date().toISOString(),
  trends: {
    retinopathy: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
      risk: Math.random() * 100
    })),
    nephropathy: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
      risk: Math.random() * 100
    })),
    neuropathy: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
      risk: Math.random() * 100
    })),
    diabeticFoot: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
      risk: Math.random() * 100
    }))
  }
};

/**
 * Función para generar datos de predicción aleatoria
 */
export const generateRandomPrediction = () => {
  const riskLevels = ['bajo', 'medio', 'alto'];
  const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
  
  return {
    nivel_general: randomRisk,
    tendencia: Array.from({ length: 7 }, (_, i) => ({
      time: Date.now() - (i * 24 * 60 * 60 * 1000),
      value: Math.random() * 100 + 10
    })),
    timestamp: new Date().toISOString()
  };
};

/**
 * Función para obtener el timestamp formateado para "última actualización"
 */
export const getMockLastUpdate = () => {
  return `Hoy, ${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
