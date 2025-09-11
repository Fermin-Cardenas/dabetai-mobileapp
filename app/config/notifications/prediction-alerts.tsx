// app/config/notifications/prediction-alerts.tsx
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

const PredictionAlerts = () => {

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
    <AppLayout
      title="Alertas de predicción"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      {/* Control general */}
      <CardList
        title="Control general"
        items={generalControls.map(alert => ({
          id: alert.id,
          type: 'button' as const,
          title: alert.title,
          subtitle: alert.subtitle,
          buttonType: 'switch' as const,
          value: alert.enabled
        }))}
        onItemValueChange={(itemId, value) => handleGeneralControlChange(itemId, value)}
      />

      {/* Tipos de alerta */}
      <CardList
        title="Tipos de alerta"
        items={alertTypes.map(alert => ({
          id: alert.id,
          type: 'button' as const,
          title: alert.title,
          subtitle: alert.subtitle,
          buttonType: 'switch' as const,
          value: alert.enabled
        }))}
        onItemValueChange={(itemId, value) => handleAlertTypeChange(itemId, value)}
      />

      {/* Datos de predicción */}
      <CardList
        title="Datos de predicción"
        items={dataAlerts.map(alert => ({
          id: alert.id,
          type: 'button' as const,
          title: alert.title,
          subtitle: alert.subtitle,
          buttonType: 'switch' as const,
          value: alert.enabled
        }))}
        onItemValueChange={(itemId, value) => handleDataAlertChange(itemId, value)}
      />
    </AppLayout>
  );
};

export default PredictionAlerts;