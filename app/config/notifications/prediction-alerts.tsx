// app/config/notifications/prediction-alerts.tsx
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';

// Importar componentes core
import { Header } from '@/components/core/navigation/Header';

// Importar componentes reutilizables de notifications
import { AlertSection } from '@/features/notifications/components';

interface AlertConfig {
  id: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
}

const PredictionAlerts = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Control general
  const [generalControls, setGeneralControls] = useState<AlertConfig[]>([
    {
      id: 'all_prediction_alerts',
      title: 'Todas alertas de predicción',
      enabled: true
    }
  ]);

  // Tipos de alerta
  const [alertTypes, setAlertTypes] = useState<AlertConfig[]>([
    {
      id: 'risk_change_alert',
      title: 'Alerta de cambio significativo en el nivel de riesgo',
      subtitle: 'Notifica si tu predicción de riesgo de complicación cambia notablemente',
      enabled: true
    },
    {
      id: 'insights_reminder',
      title: 'Recordatorio para revisar tus insights de predicción',
      enabled: true
    }
  ]);

  // Datos de predicción
  const [dataAlerts, setDataAlerts] = useState<AlertConfig[]>([
    {
      id: 'missing_data_alert',
      title: 'Alerta si faltan datos clave para la predicción',
      enabled: true
    }
  ]);

  // Handlers para cambio de estado
  const handleGeneralControlChange = (alertId: string, newValue: boolean) => {
    setGeneralControls(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, enabled: newValue }
          : alert
      )
    );
  };

  const handleAlertTypeChange = (alertId: string, newValue: boolean) => {
    setAlertTypes(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, enabled: newValue }
          : alert
      )
    );
  };

  const handleDataAlertChange = (alertId: string, newValue: boolean) => {
    setDataAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, enabled: newValue }
          : alert
      )
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 bg-[#F1F5F9]">
        {/* Header */}
        <Header
          title="Alertas de predicción"
          showBackButton={true}
          onBackPress={handleGoBack}
        />
        
        {/* Content */}
        <ScrollView 
          className="flex-1 pb-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Control general */}
          <AlertSection
            title="Control general"
            alerts={generalControls}
            onAlertChange={handleGeneralControlChange}
          />

          {/* Tipos de alerta */}
          <AlertSection
            title="Tipos de alerta"
            alerts={alertTypes}
            onAlertChange={handleAlertTypeChange}
          />

          {/* Datos de predicción */}
          <AlertSection
            title="Datos de predicción"
            alerts={dataAlerts}
            onAlertChange={handleDataAlertChange}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default PredictionAlerts;