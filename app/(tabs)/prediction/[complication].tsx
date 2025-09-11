// app/(tabs)/prediction/[complication].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";

import { Subtitle } from "@/components/common/Typography";
import { CardList } from "@/components/core/cards";
import { SegmentedControl } from "@/components/core/navigation/SegmentedControl";
import { AppLayout } from "@/components/layouts";
import {
    RiskLevelCard,
} from "@/features/dashboard/components";

// Importar componentes unificados de cards

// Complication data types
interface ComplicationData {
  id: string;
  name: string;
  riskLevel: "bajo" | "medio" | "alto";
  description: string;
  factors: {
    name: string;
    level: "Alto" | "Medio" | "Bajo";
    isHigh: boolean;
    value?: string;
  }[];
  recommendations: string[];
}

// Mock data for different complications
const complicationData: Record<string, ComplicationData> = {
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
        value: "140/90 mmHg",
      },
      { name: "Función renal", level: "Alto", isHigh: true, value: "78%" },
    ],
    recommendations: [
      "Controla tu presión arterial regularmente.",
      "Mantén tu glucosa en rango para proteger tus riñones.",
      "Pregunta a tu médico sobre medicamentos que protejen la función renal.",
    ],
  },
  retinopatia: {
    id: "retinopatia",
    name: "Retinopatía diabética",
    riskLevel: "bajo",
    description:
      "Tu riesgo de retinopatía diabética es bajo. Mantén el buen control.",
    factors: [
      { name: "HbA1c promedio", level: "Bajo", isHigh: false, value: "6.2%" },
      {
        name: "Tiempo en rango (TIR)",
        level: "Bajo",
        isHigh: false,
        value: "85%",
      },
      {
        name: "Duración diabetes",
        level: "Medio",
        isHigh: false,
        value: "8 años",
      },
      {
        name: "Presión arterial",
        level: "Bajo",
        isHigh: false,
        value: "120/80 mmHg",
      },
    ],
    recommendations: [
      "Continúa con tu buen control glucémico.",
      "Realiza exámenes oftalmológicos anuales.",
      "Mantén una presión arterial óptima.",
    ],
  },
  neuropatia: {
    id: "neuropatia",
    name: "Neuropatía diabética",
    riskLevel: "alto",
    description:
      "Tu riesgo de neuropatía diabética es alto. Se requiere atención inmediata.",
    factors: [
      { name: "HbA1c promedio", level: "Alto", isHigh: true, value: "8.2%" },
      {
        name: "Tiempo en rango (TIR)",
        level: "Alto",
        isHigh: true,
        value: "55%",
      },
      {
        name: "Duración diabetes",
        level: "Alto",
        isHigh: true,
        value: "15 años",
      },
      {
        name: "Síntomas neurológicos",
        level: "Alto",
        isHigh: true,
        value: "Presentes",
      },
    ],
    recommendations: [
      "Consulta con tu médico inmediatamente.",
      "Mejora tu control glucémico urgentemente.",
      "Revisa tus pies diariamente para detectar lesiones.",
    ],
  },
  "pie-diabetico": {
    id: "pie-diabetico",
    name: "Pie diabético",
    riskLevel: "bajo",
    description:
      "Tu riesgo de pie diabético es bajo. Mantén buenos cuidados preventivos.",
    factors: [
      {
        name: "Sensibilidad en pies",
        level: "Bajo",
        isHigh: false,
        value: "Normal",
      },
      { name: "Circulación", level: "Bajo", isHigh: false, value: "Buena" },
      {
        name: "Cuidado de pies",
        level: "Bajo",
        isHigh: false,
        value: "Adecuado",
      },
      {
        name: "Historial de úlceras",
        level: "Bajo",
        isHigh: false,
        value: "Sin historial",
      },
    ],
    recommendations: [
      "Revisa tus pies diariamente.",
      "Usa calzado cómodo y adecuado.",
      "Mantén una buena higiene en los pies.",
    ],
  },
};

const ComplicationDetail = () => {
  const { complication } = useLocalSearchParams<{ complication: string }>();
  const router = useRouter();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [showAllFactors, setShowAllFactors] = useState(true);

  // Get complication data
  const data = complication ? complicationData[complication] : null;

  // Tabs for segmented control
  const tabs = useMemo(
    () => [
      "Nefropatía diabética",
      "Retinopatía diabética",
      "Neuropatía diabética",
      "Pie diabético",
    ],
    []
  );
  const tabKeys = useMemo(
    () => ["nefropatia", "retinopatia", "neuropatia", "pie-diabetico"],
    []
  );

  useEffect(() => {
    if (complication) {
      const index = tabKeys.indexOf(complication);
      if (index !== -1) {
        setSelectedTabIndex(index);
      }
    }
  }, [complication, tabKeys]);

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
    const newComplication = tabKeys[index];
    router.push(`/(tabs)/prediction/${newComplication}` as any);
  };

  const handleToggleFactors = () => {
    setShowAllFactors(!showAllFactors);
  };

  const handleViewMoreRecommendations = () => {
    console.log("Ver más recomendaciones...");
  };

  if (!data) {
    return (
      <AppLayout
        title="Predicción no encontrada"
        headerVariant="section"
        showNavigation={false}
      >
        <Subtitle className="text-center">
          No se encontró información para esta complicación
        </Subtitle>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title={data.name}
      headerVariant="section"
      showNavigation={false}
      scrollable={true}
    >
      {/* Segmented Control for switching between complications */}
      <SegmentedControl
        options={tabs}
        selectedIndex={selectedTabIndex}
        onSelectionChange={handleTabChange}
        scrollable={true}
      />

      {/* Risk Level Section */}
      <Subtitle>Tu nivel de riesgo de {data.name.toLowerCase()}</Subtitle>

      <RiskLevelCard
        riskLevel={data.riskLevel}
        description={data.description}
        showUpdateButton={false}
        showLastUpdate={false}
      />

      {/* Factors Section */}
      <CardList
        title={`Factores que influyen en ${data.name.toLowerCase()}`}
        items={data.factors.slice(0, showAllFactors ? data.factors.length : 3).map((factor) => ({
          id: factor.name,
          type: 'info' as const,
          title: factor.name,
          description: factor.value || '',
          caption: factor.level,
          state: 'info' as const
        }))}
        onItemPress={(item) => console.log('Factor pressed:', item.title)}
      />

      {/* Recommendations Section */}
      <CardList
        title={`Recomendaciones para ${data.name.toLowerCase()}`}
        items={data.recommendations.map((rec, index) => ({
          id: `rec-${index}`,
          type: 'info' as const,
          title: rec,
          state: 'info' as const
        }))}
        onItemPress={(item) => console.log('Recommendation pressed:', item.title)}
      />
    </AppLayout>
  );
};

export default ComplicationDetail;
