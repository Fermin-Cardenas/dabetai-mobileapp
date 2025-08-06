import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { Stack, useRouter } from 'expo-router';

import { H1, H2 } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { SecondaryButton } from '@/components/core/buttons/SecondaryButton';

import {
  ActionCard,
  DashboardHeader,
  GlucoseCard,
  NavButton,
  RecordChart,
  RiskIndicator,
  StatItem
} from '@/features/dashboard/components';

const API_URL = 'http://192.168.100.20:8000'; // Usar IP local real aquí

const screenWidth = Dimensions.get('window').width;


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [patientData, setPatientData] = useState(null);
  const [glucoseData, setGlucoseData] = useState<{ time: number; value: number }[]>([]);
  const [nivelGeneral, setNivelGeneral] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const res = await fetch(`${API_URL}/retinopathy/predict/1`);
        const json = await res.json();

        setPatientData(json.patient_data);
        setGlucoseData(json.tendencia);
        setNivelGeneral(json.nivel_general);

        const now = new Date();
        const hora = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastUpdate(`Última actualización:\nHoy, ${hora}`);
      } catch (e) {
        console.error('Error al obtener datos de la API:', e);
        setNivelGeneral('Error');
      }
    };

    fetchPrediction();
  }, []);

  const labels = glucoseData.map(p => String(p.time));
  const data = glucoseData.map(p => p.value);

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
        <DashboardHeader
          onNotificationPress={() => console.log('Notif')}
          onSettingsPress={() => console.log('Config')}
        />

        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 100 }}>
          <H1 className="text-[#2C3E50] font-bold text-3xl mt-5 mb-5">
            Hola, Christian
          </H1>

          <GlucoseCard
            value={patientData?.Glucose_Mean?.toFixed(1) || '--'}
            unit="mg/dL"
            trend="stable"
            time="Justo ahora"
            context="Antes de comer"
          />

          <ActionCard
            icon={<MaterialIcons name="sync" size={18} color="#6B7280" />}
            title="Automatiza tus datos"
            description="Conecta tu glucómetro o sensor para sincronizar mediciones."
            buttonText="Conectar dispositivo"
            onPress={() => console.log('Conectando dispositivo...')}
          />

          <ActionCard
            icon={<MaterialIcons name="local-hospital" size={18} color="#6B7280" />}
            title="Informa a tu médico"
            description="Vincúlate con tu médico para monitorear tu diabetes con un profesional."
            buttonText="Vincular médico"
            onPress={() => console.log('Vinculando con médico...')}
          />

          {/* Tendencia 24h */}
          <View className="bg-[#f1f5f9] rounded-2xl p-1 mb-4">
            <H2 className="text-[#2C3E50] font-bold text-lg mb-5">
              Tendencia de las últimas 24 hrs
            </H2>

            <View className="flex-row justify-between mb-4">
              <StatItem
                icon={<Feather name="activity" size={24} color="#314158" />}
                value={patientData?.Time_In_Range_70_180 + '%' || '--'}
                label="TIR"
              />
              <StatItem
                icon={<Feather name="heart" size={24} color="#314158" />}
                value={glucoseData?.length || '--'}
                label="Lecturas"
              />
            </View>

            <View className="flex-row justify-between mb-4">
              <StatItem
                icon={<Feather name="box" size={24} color="#314158" />}
                value="6.5%"
                label="HbA1c Est."
              />
              <StatItem
                icon={<Feather name="heart" size={24} color="#314158" />}
                value={`${patientData?.Glucose_Mean || '--'}mg/dL`}
                label="Promedio"
              />
            </View>

            <RecordChart
              data={glucoseData}
              xAxisLabels={['0', '50', '100', '150', '200', '250', '300', '350']}
              xAxisTitle="t (min)"
            />


            <SecondaryButton title="Ver historial detallado" onPress={() => console.log('Historial')} />
          </View>

          <View className="bg-white rounded-2xl p-5 mb-4 border" style={{ borderColor: '#CAD5E2' }}>
            <H2 className="text-[#2C3E50] font-bold text-lg mb-5">Predicción</H2>

            <RiskIndicator
              riskLevel={nivelGeneral.toLowerCase()}
              title={`Tu riesgo general de complicaciones es ${nivelGeneral.toLowerCase()}.`}
              lastUpdate={lastUpdate}
            />

            <PrimaryButton title="Ver análisis completo" onPress={() => console.log('Análisis')} size="custom" />
          </View>
        </ScrollView>

        <View
          className="bg-white border-t border-gray-200 flex-row shadow-lg self-center"
          style={{ width: 375, height: 67 }}
        >
          <NavButton title="Inicio" iconName="home" isActive={activeTab === 'inicio'} onPress={() => handleNavigation('inicio')} />
          <NavButton title="Predicción" iconName="box" isActive={activeTab === 'predicción'} onPress={() => handleNavigation('predicción', '/(tabs)/retinopatia')} />
          <NavButton title="Historial" iconName="activity" isActive={activeTab === 'historial'} onPress={() => handleNavigation('historial', '/(tabs)/record')} />
          <NavButton title="IA Chat" iconName="codesandbox" isActive={activeTab === 'ia chat'} onPress={() => handleNavigation('ia chat', '/(tabs)/chatai')} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
