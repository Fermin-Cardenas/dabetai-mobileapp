import React from "react";
import { View } from "react-native";

import { Icon } from "@/components/common/Icon";
import { H2, Subtitle } from "@/components/common/Typography";
import { Button } from "@/components/core/buttons";
import { AppLayout } from "@/components/layouts";

import {
  GlucoseCard,
  RecordChart,
  RiskIndicator,
} from "@/features/dashboard/components";

// Importar componentes unificados de cards
import { ComplexCard, SimpleCard } from "@/components/core/cards";
import { useAuth, usePredictions } from "@/hooks";

const Dashboard = () => {
  // Obtener usuario actual de auth
  const { currentUser } = useAuth();
  const userId = currentUser?.id || "1"; // Fallback para desarrollo
  
  // Usar hook de predicciones con la nueva arquitectura
  const { 
    useGeneralPrediction,
  } = usePredictions(userId);

  // Obtener predicción general actual
  const { 
    data: generalPrediction,
    refetch: refetchGeneral,
  } = useGeneralPrediction();

  // Extraer datos de la predicción
  const patientData = generalPrediction?.retinopathy?.patient_data || 
                     generalPrediction?.nephropathy?.patient_data || 
                     generalPrediction?.neuropathy?.patient_data || 
                     generalPrediction?.diabeticFoot?.patient_data;
  
  const glucoseData = generalPrediction?.retinopathy?.tendencia || 
                     generalPrediction?.nephropathy?.tendencia || [];
  
  const nivelGeneral = generalPrediction?.retinopathy?.nivel_general || 
                      generalPrediction?.nephropathy?.nivel_general || 
                      generalPrediction?.neuropathy?.nivel_general || 
                      generalPrediction?.diabeticFoot?.nivel_general || "";
  
  // Generar última actualización
  const lastUpdate = generalPrediction ? 
    `Última actualización:\nHoy, ${new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}` : "";


  return (
    <>
      <AppLayout activeTab="inicio">
        <H2>Hola, {currentUser?.nombre || "Usuario"}</H2>

        <GlucoseCard
          value={patientData?.Glucose_Mean || 0}
          unit="mg/dL"
          trend="stable"
          time="Justo ahora"
          context="Antes de comer"
        />

        {/* Automatizar datos */}
        <ComplexCard
          title="Automatiza tus datos"
          showButtons={true}
          variant="stroke"
          buttons={[
            {
              title: "Conectar dispositivo",
              variant: "fill",
              onPress: () => console.log("Conectando dispositivo...")
            }
          ]}
          description="Conecta tu glucómetro o sensor para sincronizar mediciones."
        />

        {/* Vincular médico */}
        <ComplexCard
          title="Informa a tu médico"
          showButtons={true}
          variant="stroke"
          buttons={[
            {
              title: "Vincular médico",
              variant: "fill",
              onPress: () => console.log("Vinculando con médico...")
            }
          ]}
          description="Vincúlate con tu médico para monitorear tu diabetes con un profesional."
        />

        {/* Tendencia 24h */}
        <View className="gap-4">
          <Subtitle>Tendencia de las últimas 24 hrs</Subtitle>

          {/* Grid 2x2 de métricas */}
          <View className="gap-4">
            {/* Primera fila */}
            <View className="flex-row justify-between gap-4">
              <SimpleCard
                icon={
                  <Icon name="activity" size={24} />
                }
                title={
                  patientData?.Time_In_Range_70_180
                    ? `${patientData.Time_In_Range_70_180}%`
                    : "78%"
                }
                description="TIR"
                className="flex-1"
              />
              <SimpleCard
                icon={<Icon name="box" size={24} />}
                title="6.5%"
                description="HbA1c Est."
                className="flex-1"
              />
            </View>

            {/* Segunda fila */}
            <View className="flex-row justify-between gap-4">
              <SimpleCard
                icon={
                  <Icon name="heart" size={24} />
                }
                title={glucoseData?.length ? `${glucoseData.length}` : "45"}
                description="Lecturas"
                className="flex-1"
              />
              <SimpleCard
                icon={
                  <Icon name="heart" size={24} />
                }
                title={`${patientData?.Glucose_Mean?.toFixed(0) || "135"}mg/dL`}
                description="Promedio"
                className="flex-1"
              />
            </View>
          </View>

          <RecordChart
            data={glucoseData}
            xAxisLabels={["0", "50", "100", "150", "200", "250", "300", "350"]}
            xAxisTitle="t (min)"
          />

          <Button
            title="Ver historial detallado"
            onPress={() => console.log("Historial")}
            variant="outline"
            color="primary"
          />
        </View>

        <Subtitle>Predicción</Subtitle>

        <View className="bg-gray-50 rounded-2xl p-4 border border-gray-300">
          <RiskIndicator
            riskLevel={nivelGeneral.toLowerCase() as "bajo" | "medio" | "alto"}
            title={`Tu riesgo general de complicaciones es ${nivelGeneral.toLowerCase()}.`}
            lastUpdate={lastUpdate}
          />

          <Button
            title="Ver análisis completo"
            onPress={() => console.log("Análisis")}
            variant="fill"
            color="secondary"
          />
        </View>
      </AppLayout>
    </>
  );
};

export default Dashboard;
