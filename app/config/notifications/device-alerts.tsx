// app/config/notifications/device-alerts.tsx
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

const DeviceAlerts = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Sistema
  const [systemAlerts, setSystemAlerts] = useState<AlertConfig[]>([
    {
      id: 'sync_finished_alert',
      title: 'Alerta cuando la sincronización del dispositivo ha finalizado',
      enabled: true
    }
  ]);

  // Dispositivo conectado
  const [deviceAlerts, setDeviceAlerts] = useState<AlertConfig[]>([
    {
      id: 'connection_lost_alert',
      title: 'Alerta si un dispositivo conectado pierde la conexión',
      enabled: true
    },
    {
      id: 'low_battery_alert',
      title: 'Alerta de batería baja del dispositivo',
      subtitle: 'Si el dispositivo lo reporta',
      enabled: true
    }
  ]);

  // Handlers para cambio de estado
  const handleSystemAlertChange = (alertId: string, newValue: boolean) => {
    setSystemAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, enabled: newValue }
          : alert
      )
    );
  };

  const handleDeviceAlertChange = (alertId: string, newValue: boolean) => {
    setDeviceAlerts(prev => 
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
          title="Alertas del dispositivo"
          showBackButton={true}
          onBackPress={handleGoBack}
        />
        
        {/* Content */}
        <ScrollView 
          className="flex-1 pb-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Sistema */}
          <AlertSection
            title="Sistema"
            alerts={systemAlerts}
            onAlertChange={handleSystemAlertChange}
          />

          {/* Dispositivo conectado */}
          <AlertSection
            title="Dispositivo conectado"
            alerts={deviceAlerts}
            onAlertChange={handleDeviceAlertChange}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default DeviceAlerts;