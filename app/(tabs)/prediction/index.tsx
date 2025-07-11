// app/(tabs)/prediction/index.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

// Importar componentes core
import { H2, } from '@/components/common/Typography';

// Importar componentes del dashboard existentes
import { 
  DashboardHeader,
  NavButton 
} from '@/features/dashboard/components';

// Importar componentes específicos para Prediction
import {
  RiskLevelCard,
  ComplicationsList,
  TrendChart,
  DropdownSelector
} from '@/features/dashboard/components';

const Prediction = () => {
  const [selectedRiskType, setSelectedRiskType] = useState('General');
  const [activeTab, setActiveTab] = useState('predicción');
  const router = useRouter();

  const handleNotifications = () => {
    console.log('Abriendo notificaciones...');
  };

  const handleSettings = () => {
    console.log('Abriendo configuración...');
  };

  const handleUpdatePrediction = () => {
    console.log('Actualizando predicción...');
  };

  const handleComplicationPress = (complication: string) => {
    // Rutas específicas para cada complicación
    const routes: Record<string, string> = {
      'Nefropatía diabética': '/prediction/nefropatia',
      'Retinopatía diabética': '/prediction/retinopatia', 
      'Neuropatía diabética': '/prediction/neuropatia',
      'Pie diabético': '/prediction/pie-diabetico'
    };
    
    const route = routes[complication] || '/prediction/complicacion';
    router.push(route as any);
  };

  const handleRiskTypeChange = (type: string) => {
    setSelectedRiskType(type);
  };

  const handleNavigation = (tab: string, route?: string) => {
    setActiveTab(tab.toLowerCase());
    if (route) {
      router.push(route as any);
    }
  };

  // Datos de complicaciones
  const complications = [
    { name: 'Nefropatía diabética', level: 'Bajo', isHigh: false },
    { name: 'Retinopatía diabética', level: 'Bajo', isHigh: false },
    { name: 'Neuropatía diabética', level: 'Alto', isHigh: true },
    { name: 'Pie diabético', level: 'Bajo', isHigh: false }
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView className="flex-1 bg-[#f1f5f9]">
        {/* Header con logo y iconos */}
        <DashboardHeader 
          onNotificationPress={handleNotifications}
          onSettingsPress={handleSettings}
        />
        
        <ScrollView 
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Tu nivel de riesgo general */}
          <H2 className="text-[#2C3E50] font-bold text-lg mt-6 mb-5">
            Tu nivel de riesgo general
          </H2>
          
          {/* Tarjeta de predicción principal */}
          <RiskLevelCard
            riskLevel="bajo"
            title="¡Buen trabajo!"
            description="Mantener tu control actual ayuda a reducir tu riesgo de complicaciones."
            lastUpdate="Hoy, 10:30 AM"
            onUpdatePress={handleUpdatePrediction}
          />

          {/* Tu riesgo por complicación */}
          <H2 className="text-[#2C3E50] font-bold text-lg mt-1 mb-5">
            Tu riesgo por complicación
          </H2>
          
          <ComplicationsList
            complications={complications}
            onComplicationPress={handleComplicationPress}
          />

          {/* Tendencia histórica de riesgo */}
          <H2 className="text-[#2C3E50] font-bold text-lg mt-6 mb-5">
            Tendencia histórica de riesgo
          </H2>

          {/* Selector de tipo de riesgo */}
          <DropdownSelector
            selectedValue={selectedRiskType}
            onPress={() => {/* Implementar dropdown */}}
            placeholder="Seleccionar tipo de riesgo"
          />

          {/* Gráfico de tendencia */}
          <TrendChart selectedType={selectedRiskType} />
        </ScrollView>

        {/* Navegación inferior */}
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