// app/config/notifications/glucose-alerts.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

// Importar componentes core
import { Header } from '@/components/core/navigation/Header';

// Importar componentes específicos para Glucose Alerts
import {
  AlertSection,
  AlertItem
} from '@/features/notifications/components';

interface AlertConfig {
  id: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
}

const GlucoseAlerts = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Estados para las diferentes alertas
  const [criticalAlerts, setCriticalAlerts] = useState<AlertConfig[]>([
    {
      id: 'all_alerts',
      title: 'Todas alertas de glucosa',
      enabled: true
    },
    {
      id: 'high_glucose',
      title: 'Alerta de glucosa alta',
      enabled: true
    },
    {
      id: 'low_glucose',
      title: 'Alerta de glucosa baja',
      enabled: true
    }
  ]);

  const [trendAlerts, setTrendAlerts] = useState<AlertConfig[]>([
    {
      id: 'rapid_change',
      title: 'Alerta de cambio rápido de glucosa',
      subtitle: 'Subidas o bajadas bruscas',
      enabled: true
    },
    {
      id: 'out_of_range',
      title: 'Alerta de glucosa fuera de rango objetivo',
      subtitle: 'Si el valor está fuera del rango personal definido, aunque no sea críticamente alto/bajo',
      enabled: true
    }
  ]);

  // Manejar cambio de estado para alertas críticas
  const handleCriticalAlertChange = (alertId: string, newValue: boolean) => {
    setCriticalAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, enabled: newValue }
          : alert
      )
    );
  };

  // Manejar cambio de estado para alertas de tendencia
  const handleTrendAlertChange = (alertId: string, newValue: boolean) => {
    setTrendAlerts(prev => 
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
          title="Alertas de glucosa"
          showBackButton={true}
          onBackPress={handleGoBack}
        />
        
        {/* Content */}
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Alertas críticas */}
          <AlertSection
            title="Alertas críticas"
            alerts={criticalAlerts}
            onAlertChange={handleCriticalAlertChange}
          />

          {/* Alertas de tendencia y rango */}
          <AlertSection
            title="Alertas de tendencia y rango"
            alerts={trendAlerts}
            onAlertChange={handleTrendAlertChange}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default GlucoseAlerts;