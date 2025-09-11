// app/config/notifications/device-alerts.tsx
import React, { useState } from 'react';

// Importar componentes core
import { CardList } from '@/components/core/cards';
import { AppLayout } from '@/components/layouts/AppLayout';

interface AlertConfig {
  id: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
}

const DeviceAlerts = () => {

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
    <AppLayout
      title="Alertas del dispositivo"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      {/* Sistema */}
      <CardList
        title="Sistema"
        items={systemAlerts.map(alert => ({
          id: alert.id,
          type: 'button' as const,
          title: alert.title,
          subtitle: alert.subtitle,
          buttonType: 'switch' as const,
          value: alert.enabled
        }))}
        onItemValueChange={(itemId: string, value: boolean) => handleSystemAlertChange(itemId, value)}
      />

      {/* Dispositivo conectado */}
      <CardList
        title="Dispositivo conectado"
        items={deviceAlerts.map(alert => ({
          id: alert.id,
          type: 'button' as const,
          title: alert.title,
          subtitle: alert.subtitle,
          buttonType: 'switch' as const,
          value: alert.enabled
        }))}
        onItemValueChange={(itemId: string, value: boolean) => handleDeviceAlertChange(itemId, value)}
      />
    </AppLayout>
  );
};

export default DeviceAlerts;