import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { Body, H2 } from '@/components/common/Typography';
import {
  ComplicationsList,
  ComplicationsSection,
  DashboardHeader,
  NavButton,
  RecommendationsSection,
  RiskLevelCard,
  TrendChart
} from '@/features/dashboard/components';

interface Factor {
  name: string;
  level: 'Alto' | 'Moderado' | 'Bajo';
  isHigh: boolean;
  value?: string;
}

const buildFactorsFromPatientData = (patientData: any): Factor[] => {
  if (!patientData) return [];

  const age = Number(patientData.Age) || 0;
  const duration = Number(patientData.Duration_of_Diabetes) || 0;
  const imc = Number(patientData.IMC) || 0;
  const tir = Number(patientData.Time_In_Range_70_180) || 0;

  return [
    {
      name: 'Edad',
      level: age > 50 ? 'Alto' : 'Bajo',
      isHigh: age > 50,
      value: age.toString(),
    },
    {
      name: 'Duración de la diabetes',
      level: duration > 5 ? 'Alto' : 'Moderado',
      isHigh: duration > 5,
      value: duration.toString() + ' años',
    },
    {
      name: 'Índice de Masa Corporal (IMC)',
      level: imc > 25 ? 'Alto' : 'Bajo',
      isHigh: imc > 25,
      value: imc.toFixed(1),
    },
    {
      name: 'Tiempo en rango (TIR)',
      level: tir < 70 ? 'Alto' : 'Bajo',
      isHigh: tir < 70,
      value: tir.toFixed(1) + '%',
    },
  ];
};

const Retinopatia = () => {
  const [nivelGeneral, setNivelGeneral] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [trendData, setTrendData] = useState<any[]>([]);
  const [complicationData, setComplicationData] = useState<any[]>([]);
  const [selectedRiskType, setSelectedRiskType] = useState('Retinopatía');
  const [activeTab, setActiveTab] = useState('predicción');
  const [showAllFactors, setShowAllFactors] = useState(true);
  const [retinopatiaFactors, setRetinopatiaFactors] = useState<Factor[]>([]);
  const router = useRouter();

  const handleNotifications = () => console.log('Abriendo notificaciones…');
  const handleSettings = () => console.log('Abriendo configuración…');

  const fetchPrediction = async () => {
    try {
      const res = await fetch("http://192.168.100.20:8000/retinopathy/predict/1");
      const json = await res.json();

      setNivelGeneral(json.nivel_general);
      setLastUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setTrendData(json.tendencia || []);
      setComplicationData(json.complicaciones || []);

      if (json.patient_data) {
        const dynamicFactors = buildFactorsFromPatientData(json.patient_data);
        setRetinopatiaFactors(dynamicFactors);
      } else {
        setRetinopatiaFactors([]);
      }
    } catch (error) {
      console.error("Error al obtener predicción:", error);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  const handleUpdatePrediction = () => fetchPrediction();

  const complications = [
    { name: 'Nefropatía diabética', level: 'Bajo' as const, isHigh: false },
    { name: 'Retinopatía diabética', level: 'Medio' as const, isHigh: false },
    { name: 'Neuropatía diabética', level: 'Alto' as const, isHigh: true },
    { name: 'Pie diabético', level: 'Bajo' as const, isHigh: false }
  ];

  const handleComplicationPress = (complication: string) => {
    const routes: Record<string, any> = {
      'Nefropatía diabética': '/(tabs)/prediction/nefropatia',
      'Retinopatía diabética': '/(tabs)/retinopatia',
      'Neuropatía diabética': '/(tabs)/prediction/neuropatia',
      'Pie diabético': '/(tabs)/prediction/pie-diabetico'
    };
    const route = routes[complication];
    if (route) {
      router.push(route as any);
    }
  };

  const handleViewMore = () => console.log('Ver más recomendaciones...');

  const handleToggleFactors = () => setShowAllFactors(!showAllFactors);

  const handleNavigation = (tab: string, route?: string) => {
    setActiveTab(tab.toLowerCase());
    if (route) router.push(route as any);
  };

  // Recomendaciones de ejemplo
  const recommendations = [
    "Controla tu presión arterial regularmente.",
    "Mantén tu glucosa en rango para proteger tus riñones.",
    "Pregunta a tu médico sobre medicamentos que protejan la función renal."
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-slate-100">
        <DashboardHeader onNotificationPress={handleNotifications} onSettingsPress={handleSettings} />
        <ScrollView className="flex-1 px-4 pb-24" showsVerticalScrollIndicator={false}>
          <H2 className="text-gray-700 font-bold text-lg mt-6 mb-5">Tu nivel de riesgo de retinopatía diabética</H2>

          {nivelGeneral !== '' && (
            <RiskLevelCard
              riskLevel={nivelGeneral.toLowerCase() as 'bajo' | 'medio' | 'alto'}
              lastUpdate={`Hoy, ${lastUpdate}`}
              onUpdatePress={handleUpdatePrediction}
            />
          )}

          <H2 className="text-gray-700 font-bold text-lg mt-1 mb-5">Tu riesgo por complicación</H2>
          <ComplicationsList complications={complications} onComplicationPress={handleComplicationPress} />

          <H2 className="text-gray-700 font-bold text-lg mt-6 mb-5">Tendencia histórica de riesgo</H2>
          <TrendChart data={trendData} selectedType={selectedRiskType} />

          {retinopatiaFactors.length === 0 ? (
            <Body className="text-center text-gray-500">Cargando factores…</Body>
          ) : (
            <ComplicationsSection
              title="Factores que influyen en la retinopatía"
              complications={retinopatiaFactors}
              showAll={showAllFactors}
              onToggleView={handleToggleFactors}
              buttonText={showAllFactors ? "Ver menos" : "Ver más"}
              onComplicationPress={handleComplicationPress}
              showArrow={false}
            />
          )}

          <RecommendationsSection
            title="Recomendaciones para regular la retinopatía"
            recommendations={recommendations}
            onViewMore={handleViewMore}
            buttonTitle="Ver más"
          />
        </ScrollView>

        <View className="bg-white border-t border-gray-200 flex-row shadow-lg self-center w-full max-w-md h-16">
          <NavButton title="Inicio" iconName="home" isActive={activeTab === 'inicio'} onPress={() => handleNavigation('home', '/(tabs)/home')} />
          <NavButton title="Predicción" iconName="box" isActive={activeTab === 'predicción'} onPress={() => handleNavigation('predicción', '/(tabs)/prediction')} />
          <NavButton title="Historial" iconName="activity" isActive={activeTab === 'historial'} onPress={() => handleNavigation('historial', '/(tabs)/record')} />
          <NavButton title="IA Chat" iconName="codesandbox" isActive={activeTab === 'ia chat'} onPress={() => handleNavigation('ia chat', '/(tabs)/chatai')} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Retinopatia;
