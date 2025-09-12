import { useRouter } from "expo-router";
import React, { useState } from "react";

import { Subtitle } from "@/components/common/Typography";
import { SelectField } from "@/components/core/inputs";
import { AppLayout } from "@/components/layouts";
import {
  RiskLevelCard,
  TrendChart,
} from "@/features/dashboard/components";

// Importar componentes unificados de cards
import { CardList } from "@/components/core/cards";
import { ENV } from "@/config/environment";
import { useAuth, usePredictions } from "@/hooks";
import {
  getMockLastUpdate,
  mockComplications,
  mockGeneralPrediction
} from "@/mocks";

const Prediction = () => {
  const [selectedRiskType] = useState("General");
  const router = useRouter();
  
  // Obtener usuario actual de auth
  const { currentUser } = useAuth();
  const userId = currentUser?.id || "1"; // Fallback para desarrollo
  
  // Usar hook de predicciones con la nueva arquitectura
  const { 
    useGeneralPrediction,
    predictGeneral,
    isPredictingGeneral,
  } = usePredictions(userId);

  // Obtener predicción general actual
  const { 
    data: generalPrediction,
    isLoading,
    error,
    refetch: refreshPrediction,
  } = useGeneralPrediction();

  // Definir complications originales para producción
  const complications = [
    { name: "Nefropatía diabética", level: "Bajo" as const, isHigh: false },
    { name: "Retinopatía diabética", level: "Bajo" as const, isHigh: false },
    { name: "Neuropatía diabética", level: "Alto" as const, isHigh: true },
    { name: "Pie diabético", level: "Bajo" as const, isHigh: false },
  ];

  // Usar datos mock en modo desarrollador o datos reales en producción
  const currentPrediction = ENV.DEVELOPER_MODE ? mockGeneralPrediction : generalPrediction;
  const currentComplications = ENV.DEVELOPER_MODE ? mockComplications : complications;

  // Extraer datos de la predicción general (tomamos retinopathy como referencia)
  const retinopathyData = currentPrediction?.retinopathy;
  const nivelGeneral = retinopathyData?.nivel_general || "";
  const lastUpdate = ENV.DEVELOPER_MODE ? 
    getMockLastUpdate() :
    retinopathyData ? 
      `Hoy, ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}` : "";
  const trendData = retinopathyData?.tendencia || [];

  const handleUpdatePrediction = () => {
    // Usar nueva función de predicción
    predictGeneral();
  };

  const handleComplicationPress = (complication: string) => {
    const routes: Record<string, any> = {
      "Nefropatía diabética": "/(tabs)/prediction/nefropatia",
      "Retinopatía diabética": "/(tabs)/prediction/retinopatia", 
      "Neuropatía diabética": "/(tabs)/prediction/neuropatia",
      "Pie diabético": "/(tabs)/prediction/pie-diabetico",
    };
    const route = routes[complication];
    if (route) {
      router.push(route as any);
    }
  };

  return (
    <AppLayout activeTab="prediccion">
      
      <Subtitle>
        Tu nivel de riesgo general
      </Subtitle>

      {(nivelGeneral !== "" || ENV.DEVELOPER_MODE) && (
        <RiskLevelCard
          riskLevel={nivelGeneral as "bajo" | "medio" | "alto"}
          lastUpdate={lastUpdate}
          onUpdatePress={handleUpdatePrediction}
          showUpdateButton={true}
          showLastUpdate={true}
        />
      )}

      <CardList
        title="Tu riesgo por complicación"
        items={currentComplications.map((comp, index) => ({
          id: `comp-${index}`,
          type: 'info' as const,
          title: comp.name,
          caption: comp.level,
          showButton: true,
          state: 'info' as const
        }))}
        onItemPress={(item) => {
          handleComplicationPress(item.title);
        }}
      />

      <Subtitle>
        Tendencia histórica de riesgo
      </Subtitle>

      <SelectField
        label=""
        value={selectedRiskType}
        onPress={() => {}}
        placeholder="Seleccionar tipo de riesgo"
      />

      <TrendChart data={trendData} selectedType={selectedRiskType} />
    </AppLayout>
  );
};

export default Prediction;
