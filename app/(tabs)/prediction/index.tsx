// app/(tabs)/prediction/index.tsx
import { TrendChart } from '@/features/dashboard/components/TrendChart';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView
} from 'react-native';

// Importar componentes core
import { H2 } from '@/components/common/Typography';
import { NavigationBar } from '@/components/core/navigation';
import { Header } from '@/components/core/navigation/Header';

// Importar componentes del dashboard existentes
import {
  ComplicationsList
} from '@/features/dashboard/components';

// Importar componentes específicos para Prediction
import {
  RiskLevelCard
} from '@/features/dashboard/components';

const Prediction = () => {
  const [nivelGeneral, setNivelGeneral] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [trendData, setTrendData] = useState<any[]>([]);
  const [complicationData, setComplicationData] = useState<any[]>([]);
  const [selectedRiskType, setSelectedRiskType] = useState<string>('General');

  const fetchPrediction = async () => {
    try {
      const res = await fetch('http://192.168.100.20:8000/retinopathy/predict/1');
      const json = await res.json();

      setNivelGeneral(json.nivel_general);
      setLastUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setTrendData(json.tendencia || []);
      setComplicationData(json.complicaciones || []);
    } catch (error) {
      console.error('Error al obtener predicción:', error);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  const handleUpdatePrediction = () => {
    fetchPrediction();
  };

  const handleNotifications = () => console.log('Abriendo notificaciones...');
  const handleSettings = () => console.log('Abriendo configuración...');

  // Mapeo de complicaciones para el listado
  const complications = [
    { name: 'Nefropatía diabética', level: 'Bajo' as const, isHigh: false },
    { name: 'Retinopatía diabética', level: 'Bajo' as const, isHigh: false },
    { name: 'Neuropatía diabética', level: 'Alto' as const, isHigh: true },
    { name: 'Pie diabético', level: 'Bajo' as const, isHigh: false }
  ];

  const handleComplicationPress = (complication: string) => {
    console.log(`Navegando a detalle de: ${complication}`);
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-slate-100">
        <Header
          title="Predicción"
          variant="principal"
        />

        <ScrollView
          className="flex-1 px-4 pb-24"
          showsVerticalScrollIndicator={false}
        >
          <H2 className="text-gray-700 font-bold text-lg mt-6 mb-5">
            Tu nivel de riesgo general
          </H2>

          {nivelGeneral !== '' && (
            <RiskLevelCard
              riskLevel={nivelGeneral.toLowerCase() as 'bajo' | 'medio' | 'alto'}
              lastUpdate={`Hoy, ${lastUpdate}`}
              onUpdatePress={handleUpdatePrediction}
            />
          )}

          <H2 className="text-gray-700 font-bold text-lg mt-1 mb-5">
            Tu riesgo por complicación
          </H2>
          <ComplicationsList
            complications={complications}
            onComplicationPress={handleComplicationPress}
          />

          <H2 className="text-gray-700 font-bold text-lg mt-6 mb-5">
            Tendencia histórica de riesgo
          </H2>
          {/* <DropdownSelector
            selectedValue={selectedRiskType}
            onPress={() => }
            placeholder="Seleccionar tipo de riesgo"
          /> */}
          <TrendChart data={trendData} selectedType={selectedRiskType} />
        </ScrollView>

        <NavigationBar activeTab="prediccion" />
      </SafeAreaView>
    </>
  );
};

export default Prediction;
