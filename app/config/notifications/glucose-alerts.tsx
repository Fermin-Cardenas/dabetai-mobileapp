// app/config/notifications/glucose-alerts.tsx
import React, { useState } from "react";

// Importar componentes core
import { CardList } from '@/components/core/cards';
import { AppLayout } from "@/components/layouts/AppLayout";

interface AlertConfig {
  id: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
}

const GlucoseAlerts = () => {
  // Estados para las diferentes alertas
  const [criticalAlerts, setCriticalAlerts] = useState<AlertConfig[]>([
    {
      id: "all_alerts",
      title: "Todas alertas de glucosa",
      enabled: true,
    },
    {
      id: "high_glucose",
      title: "Alerta de glucosa alta",
      enabled: true,
    },
    {
      id: "low_glucose",
      title: "Alerta de glucosa baja",
      enabled: true,
    },
  ]);

  const [trendAlerts, setTrendAlerts] = useState<AlertConfig[]>([
    {
      id: "rapid_change",
      title: "Alerta de cambio rápido de glucosa",
      subtitle: "Subidas o bajadas bruscas",
      enabled: true,
    },
    {
      id: "out_of_range",
      title: "Alerta de glucosa fuera de rango objetivo",
      subtitle:
        "Si el valor está fuera del rango personal definido, aunque no sea críticamente alto/bajo",
      enabled: true,
    },
  ]);

  // Manejar cambio de estado para alertas críticas
  const handleCriticalAlertChange = (alertId: string, newValue: boolean) => {
    setCriticalAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, enabled: newValue } : alert
      )
    );
  };

  // Manejar cambio de estado para alertas de tendencia
  const handleTrendAlertChange = (alertId: string, newValue: boolean) => {
    setTrendAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, enabled: newValue } : alert
      )
    );
  };

  return (
    <AppLayout
      title="Alertas de glucosa"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      {/* Alertas críticas */}
      <CardList
        title="Alertas críticas"
        items={criticalAlerts.map(alert => ({
          id: alert.id,
          type: 'button' as const,
          title: alert.title,
          subtitle: alert.subtitle,
          buttonType: 'switch' as const,
          value: alert.enabled
        }))}
        onItemValueChange={(itemId: string, value: boolean) => handleCriticalAlertChange(itemId, value)}
      />

      {/* Alertas de tendencia y rango */}
      <CardList
        title="Alertas de tendencia y rango"
        items={trendAlerts.map(alert => ({
          id: alert.id,
          type: 'button' as const,
          title: alert.title,
          subtitle: alert.subtitle,
          buttonType: 'switch' as const,
          value: alert.enabled
        }))}
        onItemValueChange={(itemId: string, value: boolean) => handleTrendAlertChange(itemId, value)}
      />
    </AppLayout>
  );
};

export default GlucoseAlerts;
