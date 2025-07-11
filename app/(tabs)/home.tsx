// app/(tabs)/home.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity // <--- vuelve a agregar esto aquí
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

// Importar componentes core
import { H1, H2, Body } from '@/components/common/Typography';
import { SecondaryButton } from '@/components/core/buttons/SecondaryButton';

// Importar componentes del dashboard
import {
  DashboardHeader,
  GlucoseCard,
  ActionCard,
  StatItem,
  SimpleChart,
  RiskIndicator,
  NavButton,
  RecordChart
} from '@/features/dashboard/components';

import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const router = useRouter();

  const handleNotifications = () => {
    console.log('Abriendo notificaciones...');
  };

  const handleSettings = () => {
    console.log('Abriendo configuración...');
  };

  const handleConnect = () => {
    console.log('Conectando dispositivo...');
  };

  const handleLinkDoctor = () => {
    console.log('Vinculando con médico...');
  };

  const handleViewHistory = () => {
    console.log('Mostrando historial detallado...');
  };

  const handleViewAnalysis = () => {
    console.log('Mostrando análisis completo...');
  };

  const handleNavigation = (tab: string, route?: string) => {
    setActiveTab(tab.toLowerCase());
    if (route) {
      router.push(route as any);
    }
  };

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
          {/* Saludo */}
          <H1 className="text-[#2C3E50] font-bold text-3xl mt-5 mb-5">
            Hola, Christian
          </H1>

          {/* Tarjeta de glucosa */}
          <GlucoseCard
            value={98}
            unit="mg/dL"
            trend="stable"
            time="Justo ahora"
            context="Antes de comer"
          />

          {/* Automatizar datos */}
          <ActionCard
            icon={<MaterialIcons name="sync" size={18} color="#6B7280" />}
            title="Automatiza tus datos"
            description="Conecta tu glucómetro o sensor para sincronizar mediciones."
            buttonText="Conectar dispositivo"
            onPress={handleConnect}
          />

          {/* Vincular médico */}
          <ActionCard
            icon={<MaterialIcons name="local-hospital" size={18} color="#6B7280" />}
            title="Informa a tu médico"
            description="Vincúlate con tu médico para monitorear tu diabetes con un profesional."
            buttonText="Vincular médico"
            onPress={handleLinkDoctor}
          />

          {/* Tendencia 24h */}
          <View className="bg-[#f1f5f9] rounded-2xl p-1 mb-4">
            <H2 className="text-[#2C3E50] font-bold text-lg mb-5">
              Tendencia de las últimas 24 hrs
            </H2>

            {/* Primera fila de estadísticas */}
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

            {/* Segunda fila de estadísticas */}
            <View className="flex-row justify-between mb-4">
              <StatItem
                icon={<Feather name="box" size={24} color="#314158" />}
                value="6.5%"
                label="HbA1c Est."
              />
              <StatItem
                icon={<Feather name="heart" size={24} color="#314158" />}
                value="135mg/dL"
                label="Promedio"
              />
            </View>

            {/* Gráfico migrado de Record */}
            <RecordChart
              xAxisLabels={['0', '50', '100', '150', '200', '250', '300', '350']}
              xAxisTitle="t (min)"
            />

            {/* Botón Ver historial con SecondaryButton */}
            <SecondaryButton
              title="Ver historial detallado"
              onPress={handleViewHistory}
            />
          </View>

          {/* Predicción */}
          <View className="bg-white rounded-2xl p-5 mb-4 border" style={{ borderColor: '#CAD5E2' }}>
            <H2 className="text-[#2C3E50] font-bold text-lg mb-5">Predicción</H2>

            <RiskIndicator
  riskLevel="bajo"
  title="Tu riesgo general de complicaciones es bajo."
  lastUpdate={`Última actualización:\nHoy, 10:30 AM`}
/>

<PrimaryButton
  title="Ver análisis completo"
  onPress={handleViewAnalysis}
  size="custom"
/>
          </View>
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
            onPress={() => handleNavigation('inicio')}
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

export default Dashboard;
