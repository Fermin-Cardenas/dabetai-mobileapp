// app/(tabs)/prediction/retinopatia.tsx
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

// Tipografía
import { H2 } from '@/components/common/Typography';

// Header personalizado

// Componentes específicos
import {
  ComplicationsList,
  ComplicationsSection,
  DashboardHeader,
  NavButton,
  RecommendationsSection,
  RiskLevelCard,
  TrendChart
} from '@/features/dashboard/components';


const Retinopatia = () => {
  const [nivelGeneral, setNivelGeneral] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [trendData, setTrendData] = useState<any[]>([]);
  const [complicationData, setComplicationData] = useState<any[]>([]);
  const [selectedRiskType, setSelectedRiskType] = useState('Retinopatía');
  const [activeTab, setActiveTab] = useState('predicción');
  const [showAllFactors, setShowAllFactors] = useState(true); // Estado para mostrar/ocultar factores
  const router = useRouter();

  const handleNotifications = () => console.log('Abriendo notificaciones…');
  const handleSettings = () => console.log('Abriendo configuración…');

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

  const complications = [
    { name: 'Nefropatía diabética', level: 'Bajo', isHigh: false },
    { name: 'Retinopatía diabética', level: 'Bajo', isHigh: false },
    { name: 'Neuropatía diabética', level: 'Alto', isHigh: true },
    { name: 'Pie diabético', level: 'Bajo', isHigh: false }
  ];

  useEffect(() => {
    fetchPrediction();
  }, []);

  const handleUpdatePrediction = () => {
    fetchPrediction();
  };

  const handleComplicationPress = (complication: string) => {
    const routes: Record<string, string> = {
      'Nefropatía diabética': '/prediction/nefropatia',
      'Retinopatía diabética': '/prediction/retinopatia',
      'Neuropatía diabética': '/prediction/neuropatia',
      'Pie diabético': '/prediction/pie-diabetico'
    };
    router.push((routes[complication] || '/prediction/complicacion') as any);
  };

  const handleViewMore = () => {
    console.log('Ver más recomendaciones...');
  };

  const handleToggleFactors = () => {
    setShowAllFactors(!showAllFactors);
  };

  const handleNavigation = (tab: string, route?: string) => {
    setActiveTab(tab.toLowerCase());
    if (route) router.push(route as any);
  };

  // Datos específicos de retinopatía con valores/descripciones
  const retinopatiaFactors = [
    { name: 'HbA1c promedio', level: 'Moderado', isHigh: false, value: '6.5%' },
    { name: 'Tiempo en rango (TIR)', level: 'Moderado', isHigh: false, value: '78%' },
    { name: 'Presión arterial', level: 'Alto', isHigh: true, value: '140/90 mmHg' },
    { name: 'Presión arterial', level: 'Alto', isHigh: true, value: '78%' }
  ];

  // Datos de recomendaciones
  const recommendations = [
    "Controla tu presión arterial regularmente.",
    "Mantén tu glucosa en rango para proteger tus riñones.",
    "Pregunta a tu médico sobre medicamentos que protejan la función renal."
  ];

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
            Tu nivel de riesgo de retinopatía diabética
          </H2>

          {nivelGeneral !== '' && (
            <RiskLevelCard
              riskLevel={nivelGeneral.toLowerCase() as 'bajo' | 'medio' | 'alto'}
              lastUpdate={`Hoy, ${lastUpdate}`}
              onUpdatePress={handleUpdatePrediction}
            />
          )}

          <H2 className="text-[#2C3E50] font-bold text-lg mt-1 mb-5">
            Tu riesgo por complicación
          </H2>
          <ComplicationsList
            complications={complications}
            onComplicationPress={handleComplicationPress}
          />

          <H2 className="text-[#2C3E50] font-bold text-lg mt-6 mb-5">
            Tendencia histórica de riesgo
          </H2>
          {/* <DropdownSelector
                    selectedValue={selectedRiskType}
                    onPress={() => }
                    placeholder="Seleccionar tipo de riesgo"
                  /> */}
          <TrendChart data={trendData} selectedType={selectedRiskType} />

          <ComplicationsSection
            title="Factores que influyen en la retinopatía"
            complications={retinopatiaFactors}
            showAll={showAllFactors}
            onToggleView={handleToggleFactors}
            buttonText={showAllFactors ? "Ver menos" : "Ver más"}
            onComplicationPress={handleComplicationPress}
            showArrow={false}
          />

          <RecommendationsSection
            title="Recomendaciones para regular la retinopatía"
            recommendations={recommendations}
            onViewMore={handleViewMore}
            buttonTitle="Ver más"
          />

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

export default Retinopatia;