// src/types/prediction.ts

export type RiskLevel = "bajo" | "medio" | "alto";

export type PredictionType = "retinopathy" | "nephropathy" | "neuropathy" | "diabetic-foot" | "general";

export interface PredictionRequest {
  userId: string;
  factors?: Record<string, any>;
}

export interface PredictionResponse {
  nivel_general: string;
  patient_data?: PatientData;
  tendencia?: TrendData[];
  complications?: ComplicationData[];
  timestamp: string;
}

export interface PatientData {
  glucoseLevel?: number;
  Glucose_Mean?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  weight?: number;
  height?: number;
  age?: number;
  Time_In_Range_70_180?: number;
}

export interface TrendData {
  time: number;
  value: number;
  type?: string;
}

export interface ComplicationData {
  name: string;
  level: RiskLevel;
  probability: number;
  factors: string[];
}

export interface ComplicationDetail {
  name: string;
  level: RiskLevel;
  description: string;
  recommendations: string[];
  factors: RiskFactor[];
}

export interface RiskFactor {
  name: string;
  impact: "alto" | "medio" | "bajo";
  controllable: boolean;
  description: string;
}
