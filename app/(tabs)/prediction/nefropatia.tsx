// app/(tabs)/prediction/nefropatia.tsx
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

// Tipografía
import { H2 } from '@/components/common/Typography';

// Header personalizado
import { Header } from '@/components/core/navigation/Header';

// Componentes específicos
import {
  ComplicationsSection,
  RecommendationsSection,
  RiskLevelCard
} from '@/features/dashboard/components';

const Nefropatia = () => {
  const [selectedRiskType, setSelectedRiskType] = useState('Nefropatía');
  const [activeTab, setActiveTab] = useState('predicción');
  const [showAllFactors, setShowAllFactors] = useState(true); // Estado para mostrar/ocultar factores
  const router = useRouter();

  const handleNotifications = () => console.log('Abriendo notificaciones…');
  const handleSettings = () => console.log('Abriendo configuración…');

  const handleGoBack = () => {
    router.back();
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

  // Datos específicos de nefropatía con valores/descripciones
  const nefropatiaFactors = [
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
        {/* Header con botón de regreso */}
        <Header
          title="Nefropatía diabética"
          showBackButton={true}
          onBackPress={handleGoBack}
        />

        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <H2 className="text-[#2C3E50] font-bold text-lg mt-6 mb-5">
            Tu nivel de riesgo de nefropatía diabética
          </H2>

          <RiskLevelCard
            riskLevel="medio"
            title="Requiere atención"
            description="Tu riesgo de nefropatía diabética requiere atención. Gestionar tu PA y glucosa es clave."
            showUpdateButton={false}
            showLastUpdate={false}
          />

          {/* Factores que influyen en nefropatía */}
          <ComplicationsSection
            title="Factores que influyen en nefropatía"
            complications={nefropatiaFactors}
            showAll={showAllFactors}
            onToggleView={handleToggleFactors}
            buttonText={showAllFactors ? "Ver menos" : "Ver más"}
            onComplicationPress={handleComplicationPress}
            showArrow={false}
          />

          {/* Sección de Recomendaciones */}
          <RecommendationsSection
            title="Recomendaciones para nefropatía"
            recommendations={recommendations}
            onViewMore={handleViewMore}
            buttonTitle="Ver más"
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Nefropatia;