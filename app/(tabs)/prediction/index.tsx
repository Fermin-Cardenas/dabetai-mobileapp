// app/(tabs)/prediction/index.tsx
import { TrendChart } from '@/features/dashboard/components/TrendChart';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';

// Importar componentes core
import { H2 } from '@/components/common/Typography';

// Importar componentes del dashboard existentes
import {
  DashboardHeader,
  NavButton
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
  const [activeTab, setActiveTab] = useState<string>('predicción');

  const router = useRouter();

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

  // Navegación de tabs
  const handleNavigation = (tab: string, route?: string) => {
    setActiveTab(tab.toLowerCase());
    if (route) router.push(route as any);
  };

  // Mapeo de complicaciones para el listado
  const complications = complicationData.map((c: any) => ({
    name: c.nombre,
    level: c.nivel,
    isHigh: c.nivel.toLowerCase() === 'alto',
  }));

  const handleComplicationPress = (complication: string) => {
    const routes: Record<string, string> = {
      'Nefropatía diabética': '/prediction/nefropatia',
      'Retinopatía diabética': '/prediction/retinopatia',
      'Neuropatía diabética': '/prediction/neuropatia',
      'Pie diabético': '/prediction/pie-diabetico'
    };
    router.push(routes[complication] || '/prediction/complicacion');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView className="flex-1 bg-[#f1f5f9]">
        <DashboardHeader
          onNotificationPress={handleNotifications}
          onSettingsPress={handleSettings}
        />

        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <H2 className="text-[#2C3E50] font-bold text-lg mt-6 mb-5">
            Tu nivel de riesgo general
          </H2>

          {nivelGeneral !== '' && (
            <RiskLevelCard
              riskLevel={nivelGeneral.toLowerCase() as 'bajo' | 'medio' | 'alto'}
              lastUpdate={`Hoy, ${lastUpdate}`}
              onUpdatePress={handleUpdatePrediction}
            />
          )}

          {/* <H2 className="text-[#2C3E50] font-bold text-lg mt-1 mb-5">
            Tu riesgo por complicación
          </H2>
          <ComplicationsList
            complications={complications}
            onComplicationPress={handleComplicationPress}
          /> */}

          <H2 className="text-[#2C3E50] font-bold text-lg mt-6 mb-5">
            Tendencia histórica de riesgo
          </H2>
          {/* <DropdownSelector
            selectedValue={selectedRiskType}
            onPress={() => }
            placeholder="Seleccionar tipo de riesgo"
          /> */}
          <TrendChart data={trendData} selectedType={selectedRiskType} />
        </ScrollView>

        <View
          className="bg-white border-t border-gray-200 flex-row shadow-lg self-center"
          style={{ width: 375, height: 67 }}
        >
          <NavButton
            title="Inicio"
            iconName="home"
            isActive={activeTab === 'inicio'}
            onPress={() => handleNavigation('home', '/(tabs)/home')}
          />
          <NavButton
            title="Predicción"
            iconName="box"
            isActive={activeTab === 'predicción'}
            onPress={() => handleNavigation('predicción', '/(tabs)/prediction')}
          />
          <NavButton
            title="Historial"
            iconName="activity"
            isActive={activeTab === 'historial'}
            onPress={() => handleNavigation('historial', '/(tabs)/record')}
          />
          <NavButton
            title="IA Chat"
            iconName="codesandbox"
            isActive={activeTab === 'ia chat'}
            onPress={() => handleNavigation('ia chat', '/(tabs)/chatai')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Prediction;
