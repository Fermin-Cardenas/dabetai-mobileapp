import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

import { H1, H2 } from "@/components/common/Typography";
import { Button } from "@/components/core/buttons";
import { AppLayout } from "@/components/layouts";

import {
  ActionCard,
  GlucoseCard,
  RecordChart,
  RiskIndicator,
  StatItem,
} from "@/features/dashboard/components";

const API_URL = "http://192.168.100.20:8000"; // Usar IP local real aquí

const Dashboard = () => {
  const [patientData, setPatientData] = useState<any>(null);
  const [glucoseData, setGlucoseData] = useState<
    { time: number; value: number }[]
  >([]);
  const [nivelGeneral, setNivelGeneral] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const res = await fetch(`${API_URL}/retinopathy/predict/1`);
        const json = await res.json();

        setPatientData(json.patient_data);
        setGlucoseData(json.tendencia);
        setNivelGeneral(json.nivel_general);

        const now = new Date();
        const hora = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setLastUpdate(`Última actualización:\nHoy, ${hora}`);
      } catch (e) {
        console.error("Error al obtener datos de la API:", e);
        setNivelGeneral("Error");
      }
    };

    fetchPrediction();
  }, []);


  return (
    <>
      <AppLayout activeTab="inicio">
        <H1 className="text-gray-700 font-bold text-3xl">Hola, Christian</H1>

        <GlucoseCard
          value={patientData?.Glucose_Mean?.toFixed(1) || "--"}
          unit="mg/dL"
          trend="stable"
          time="Justo ahora"
          context="Antes de comer"
        />

        {/* Automatizar datos */}
        <ActionCard
          icon={<MaterialIcons name="sync" size={18} color="#6B7280" />}
          title="Automatiza tus datos"
          description="Conecta tu glucómetro o sensor para sincronizar mediciones."
          buttonText="Conectar dispositivo"
          onPress={() => console.log("Conectando dispositivo...")}
        />

        {/* Vincular médico */}
        <ActionCard
          icon={
            <MaterialIcons name="local-hospital" size={18} color="#6B7280" />
          }
          title="Informa a tu médico"
          description="Vincúlate con tu médico para monitorear tu diabetes con un profesional."
          buttonText="Vincular médico"
          onPress={() => console.log("Vinculando con médico...")}
        />

        {/* Tendencia 24h */}
        <View className="bg-[#f1f5f9] rounded-2xl p-1">
          <H2 className="text-gray-700 font-bold text-lg mb-5">
            Tendencia de las últimas 24 hrs
          </H2>

          <View className="flex-row justify-between mb-4">
            <StatItem
              icon={<Feather name="activity" size={24} color="#314158" />}
              value={
                patientData?.Time_In_Range_70_180
                  ? `${patientData.Time_In_Range_70_180}%`
                  : "--"
              }
              label="TIR"
            />
            <StatItem
              icon={<Feather name="heart" size={24} color="#314158" />}
              value={glucoseData?.length ? `${glucoseData.length}` : "--"}
              label="Lecturas"
            />
          </View>

          <View className="flex-row justify-between mb-4">
            <StatItem
              icon={<Feather name="box" size={24} color="#314158" />}
              value="6.5%"
              label="HbA1c Est."
            />
            <StatItem
              icon={<Feather name="heart" size={24} color="#314158" />}
              value={`${patientData?.Glucose_Mean || "--"}mg/dL`}
              label="Promedio"
            />
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
            color="secondary"
          />
        </View>

        <View className="bg-white rounded-2xl p-5 border border-gray-300">
          <H2 className="text-gray-700 font-bold text-lg mb-5">Predicción</H2>

          <RiskIndicator
            riskLevel={nivelGeneral.toLowerCase() as "bajo" | "medio" | "alto"}
            title={`Tu riesgo general de complicaciones es ${nivelGeneral.toLowerCase()}.`}
            lastUpdate={lastUpdate}
          />

          <Button
            title="Ver análisis completo"
            onPress={() => console.log("Análisis")}
            variant="fill"
            color="primary"
          />
        </View>
      </AppLayout>
    </>
  );
};

export default Dashboard;
