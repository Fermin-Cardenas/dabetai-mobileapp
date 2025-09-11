/**
 * @fileoverview Datos mock para el dashboard
 * @description Datos de prueba para componentes del dashboard en modo desarrollador
 */

/**
 * Datos mock para el perfil de usuario
 */
export const mockUserProfile = {
  id: "dev-user-123",
  email: "developer@dabetai.com",
  nombre: "Usuario",
  primerApellido: "Desarrollador",
  segundoApellido: "Mock",
  telefono: "+34 123 456 789",
  fechaNacimiento: "1990-01-15",
  genero: "masculino" as const,
  configuraciones: {
    notificaciones: true,
    recordatorios: true,
    compartirDatos: false
  },
  estadisticas: {
    prediccionesRealizadas: 25,
    ultimaPrediccion: new Date().toISOString(),
    riesgoPromedio: "Moderado"
  }
};

/**
 * Datos mock para niveles de glucosa
 */
export const mockGlucoseData = {
  current: 125,
  average: 132,
  timeInRange: 78,
  lastMeasurement: new Date().toISOString(),
  trend: "stable" as const,
  history: Array.from({ length: 14 }, (_, i) => ({
    date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
    value: Math.floor(Math.random() * 100) + 80,
    timeInRange: Math.floor(Math.random() * 40) + 60
  }))
};

/**
 * Datos mock para métricas del dashboard
 */
export const mockDashboardMetrics = {
  riskLevel: "medio" as const,
  lastUpdate: new Date().toISOString(),
  glucoseStatus: {
    level: 125,
    status: "normal" as const,
    trend: "stable" as const
  },
  complications: {
    retinopathy: { risk: "medio", confidence: 0.75 },
    nephropathy: { risk: "bajo", confidence: 0.82 },
    neuropathy: { risk: "alto", confidence: 0.68 },
    diabeticFoot: { risk: "bajo", confidence: 0.91 }
  },
  recommendations: [
    "Mantén tu rutina de ejercicio actual",
    "Considera revisar tu plan de alimentación",
    "Programa tu próxima cita médica",
    "Continúa monitoreando tu glucosa regularmente"
  ]
};

/**
 * Datos mock para notificaciones
 */
export const mockNotifications = [
  {
    id: "notif-1",
    type: "reminder" as const,
    title: "Recordatorio de medicación",
    message: "Es hora de tomar tu metformina",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: "notif-2",
    type: "alert" as const,
    title: "Glucosa alta detectada",
    message: "Tu última medición fue de 180 mg/dl",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: "notif-3",
    type: "info" as const,
    title: "Nueva predicción disponible",
    message: "Se ha actualizado tu análisis de riesgo",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true
  }
];

/**
 * Datos mock para el chat AI
 */
export const mockChatMessages = [
  {
    id: "msg-1",
    role: "assistant" as const,
    content: "¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: "msg-2",
    role: "user" as const,
    content: "¿Cómo puedo mejorar mi control glucémico?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: "msg-3",
    role: "assistant" as const,
    content: "Basándome en tus datos, te recomiendo: 1) Mantener horarios regulares de comida, 2) Incrementar ligeramente tu actividad física, 3) Monitorear tu glucosa después de las comidas principales.",
    timestamp: new Date().toISOString()
  }
];

/**
 * Función para obtener fecha y hora mock formateada
 */
export const getMockTimestamp = (minutesAgo: number = 0) => {
  return new Date(Date.now() - (minutesAgo * 60 * 1000)).toISOString();
};

/**
 * Función para generar valor de glucosa aleatorio
 */
export const generateRandomGlucose = (min: number = 80, max: number = 180) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Función para obtener estado de glucosa basado en el valor
 */
export const getGlucoseStatus = (value: number) => {
  if (value < 70) return "low";
  if (value > 180) return "high";
  return "normal";
};
