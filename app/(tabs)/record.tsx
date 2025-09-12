// app/(tabs)/record.tsx
import React, { useState } from "react";
import { View } from "react-native";

// Importar layout
import { AppLayout } from "@/components/layouts";

// Importar componentes core
import { Icon } from "@/components/common/Icon";
import { Subtitle } from "@/components/common/Typography";

// Importar componentes del record
import { RecordChart } from "@/features/dashboard/components";

// Importar componentes unificados de cards
import { CardList, SimpleCard } from "@/components/core/cards";

// Importar SegmentedControl y TabsControl directamente
import { SegmentedControl, TabsControl } from "@/components/core/navigation";

const Record = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Hoy");
  const [selectedCategory, setSelectedCategory] = useState("Glucosa");

  const recordsData = [
    {
      id: "1",
      title: "185 mg/dL Post-desayuno",
      subtitle: "8:00 AM, Mayo 19, 2024",
      icon: "glucose" as const,
      type: "click" as const,
    },
    {
      id: "2",
      title: "Desayuno 80g Carbs",
      subtitle: "7:30 AM, Mayo 19, 2024",
      icon: "box" as const,
      type: "click" as const,
    },
    {
      id: "3",
      title: "Insulina Rápida 8",
      subtitle: "7:30 AM, Mayo 19, 2024",
      icon: "insulin" as const,
      type: "click" as const,
    },
  ];

  const handleNotifications = () => {
    console.log("Abriendo notificaciones...");
  };

  const handleSettings = () => {
    console.log("Abriendo configuración...");
  };

  return (
    <>
      <AppLayout title="Historial" activeTab="historial">
        {/* Selector de período */}
        <SegmentedControl
          scrollable={true}
          options={["Hoy", "1 semana", "1 mes", "3 meses"]}
          selectedIndex={["Hoy", "1 semana", "1 mes", "3 meses"].indexOf(
            selectedPeriod
          )}
          onSelectionChange={(index) => {
            setSelectedPeriod(["Hoy", "1 semana", "1 mes", "3 meses"][index]);
          }}
        />

        {/* Tabs de categorías */}
        <TabsControl
          options={["Glucosa", "Comidas", "Actividad"]}
          selectedIndex={["Glucosa", "Comidas", "Actividad"].indexOf(
            selectedCategory
          )}
          onSelectionChange={(index) => {
            setSelectedCategory(["Glucosa", "Comidas", "Actividad"][index]);
          }}
        />

        {/* Gráfico */}
        <RecordChart
          xAxisLabels={["0", "50", "100", "150", "200", "250", "300", "350"]}
          xAxisTitle="t (min)"
        />

        <View className="gap-4">
          <Subtitle>Estadísticas clave ({selectedPeriod})</Subtitle>

          {/* Grid 2x2 de métricas - estilo Figma */}
          <View className="gap-4">
            {/* Primera fila */}
            <View className="flex-row justify-between gap-4">
              <SimpleCard
                icon={<Icon name="activity" size={24} />}
                title="78%"
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
                icon={<Icon name="heart" size={24} />}
                title="45"
                description="Lecturas"
                className="flex-1"
              />
              <SimpleCard
                icon={<Icon name="hexagon" size={24} />}
                title="135mg/dL"
                description="Promedio"
                className="flex-1"
              />
            </View>

            {/* Tercera fila */}
            <View className="flex-row justify-between gap-4">
              <SimpleCard
                icon={<Icon name="box" size={24} />}
                title="4.1/día"
                description="Frecuencia"
                className="flex-1"
              />
              <SimpleCard
                icon={<Icon name="heart" size={24} />}
                title="32mg/dL"
                description="Desv. Est."
                className="flex-1"
              />
            </View>

            {/* Cuarta fila */}
            <View className="flex-row justify-between gap-4">
              <SimpleCard
                icon={<Icon name="activity" size={24} />}
                title="78%"
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
          </View>
        </View>

        {/* Lista de registros */}
        <CardList
          title="Registros del período"
          items={recordsData.map(record => ({
            ...record,
            type: 'button' as const,
            buttonType: record.type
          }))}
          onItemPress={(item) => console.log("Record pressed:", item.id)}
        />
      </AppLayout>
    </>
  );
};

export default Record;
