// app/(tabs)/record.tsx
import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

// Importar layout
import { AppLayout } from '@/components/layouts';

// Importar componentes core
import { H2 } from '@/components/common/Typography';

// Importar componentes del record
import {
  CategoryTabs,
  PeriodSelector,
  RecordChart,
  RecordsList,
  StatItem
} from '@/features/dashboard/components';

const Record = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Hoy');
  const [selectedCategory, setSelectedCategory] = useState('Glucosa');

  const recordsData = [
    {
      id: '1',
      value: '185 mg/dL **Post-desayuno**',
      date: '8:00 AM, Mayo 19, 2024',
      onPress: () => console.log('Record 1 pressed')
    },
    {
      id: '2',
      value: 'Desayuno 80g **Carbs**',
      date: '7:30 AM, Mayo 19, 2024',
      onPress: () => console.log('Record 2 pressed')
    },
    {
      id: '3',
      value: 'Insulina Rápida **8**',
      date: '7:30 AM, Mayo 19, 2024',
      onPress: () => console.log('Record 3 pressed')
    },
  ];

  const handleNotifications = () => {
    console.log('Abriendo notificaciones...');
  };

  const handleSettings = () => {
    console.log('Abriendo configuración...');
  };

  return (
    <>
      <AppLayout title="Historial" activeTab="historial">
        {/* Selector de período */}
        <PeriodSelector
          periods={['Hoy', '1 semana', '1 mes', '3 meses']}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        {/* Tabs de categorías */}
        <CategoryTabs
          categories={['Glucosa', 'Comidas', 'Actividad']}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Gráfico */}
        <RecordChart
          xAxisLabels={['0', '50', '100', '150', '200', '250', '300', '350']}
          xAxisTitle="t (min)"
        />

        <View className="rounded-2xl p-1">
          <H2 className="text-gray-700 font-bold text-lg mb-5">
            Estadísticas clave ({selectedPeriod})
          </H2>

          {/* Fila 1 */}
          <View className="flex-row justify-between mb-4">
            <StatItem
              icon={<Feather name="activity" size={24} color="#314158" />}
              value="78%"
              label="TIR"
            />
            <StatItem
              icon={<Feather name="heart" size={24} color="#314158" />}
              value="45"
              label="Lecturas"
            />
          </View>

          {/* Fila 2 */}
          <View className="flex-row justify-between mb-4">
            <StatItem
              icon={<Feather name="box" size={24} color="#314158" />}
              value="6.5%"
              label="HbA1c Est."
            />
            <StatItem
              icon={<Feather name="hexagon" size={24} color="#314158" />}
              value="135mg/dL"
              label="Promedio"
            />
          </View>

          {/* Fila 3 */}
          <View className="flex-row justify-between mb-4">
            <StatItem
              icon={<Feather name="box" size={24} color="#314158" />}
              value="4.1/día"
              label="Promedio"
            />
            <StatItem
              icon={<Feather name="heart" size={24} color="#314158" />}
              value="32mg/dL"
              label="Desv. Est."
            />
          </View>

          {/* Fila 4 */}
          <View className="flex-row justify-between mb-2">
            <StatItem
              icon={<Feather name="hexagon" size={24} color="#314158" />}
              value="135mg/dL"
              label="Promedio"
            />
            <StatItem
              icon={<Feather name="box" size={24} color="#314158" />}
              value="4.1/día"
              label="Promedio"
            />
          </View>
        </View>

        {/* Lista de registros */}
        <RecordsList
          title="Registros del período"
          records={recordsData}
        />
      </AppLayout>
    </>
  );
};

export default Record;
