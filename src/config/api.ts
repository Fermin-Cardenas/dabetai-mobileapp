// src/config/api.ts
export const API_CONFIG = {
  // URLs base para diferentes servicios
  AUTH_API_URL: "http://localhost:8080",
  PREDICTION_API_URL: "http://192.168.100.20:8000",
  
  // Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      REFRESH: "/auth/refresh",
      LOGOUT: "/auth/logout",
    },
    PREDICTIONS: {
      RETINOPATHY: "/retinopathy/predict",
      NEPHROPATHY: "/nephropathy/predict", 
      NEUROPATHY: "/neuropathy/predict",
      DIABETIC_FOOT: "/diabetic-foot/predict",
    },
    USER: {
      PROFILE: "/user/profile",
      UPDATE: "/user/update",
    },
  },
  
  // Timeouts y configuración
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
