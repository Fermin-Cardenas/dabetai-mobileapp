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


  // Datos específicos de nefropatía con valores/descripciones
  const nefropatiaFactors = [
    { name: 'HbA1c promedio', level: 'Moderado' as const, isHigh: false, value: '6.5%' },
    { name: 'Tiempo en rango (TIR)', level: 'Moderado' as const, isHigh: false, value: '78%' },
    { name: 'Presión arterial', level: 'Alto' as const, isHigh: true, value: '140/90 mmHg' },
    { name: 'Presión arterial', level: 'Alto' as const, isHigh: true, value: '78%' }
  ];

  // Datos de recomendaciones
  const recommendations = [
    "Controla tu presión arterial regularmente.",
    "Mantén tu glucosa en rango para proteger tus riñones.",
    "Pregunta a tu médico sobre medicamentos que protejan la función renal."
  ];

  return (
    <>
      <SafeAreaView className="flex-1 bg-slate-100">
        {/* Header con botón de regreso */}
        <Header
          title="Nefropatía diabética"
          variant='section'
        />

        <ScrollView
          className="flex-1 px-4 pb-24"
          showsVerticalScrollIndicator={false}
        >
          <H2 className="text-gray-700 font-bold text-lg mt-6 mb-5">
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