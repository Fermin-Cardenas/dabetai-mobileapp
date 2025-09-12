// app/config/notifications/index.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";

// Importar componentes core
import { AppLayout } from "@/components/layouts/AppLayout";

// Importar componente unificado
import { CardList } from '@/components/core/cards';

interface NotificationCategory {
  id: string;
  title: string;
  route: string;
}

interface NotificationPreference {
  id: string;
  title: string;
  enabled: boolean;
}

const NotificationSettings = () => {
  const router = useRouter();

  // Categorías de notificaciones
  const notificationCategories: NotificationCategory[] = [
    {
      id: "glucose_alerts",
      title: "Alertas de glucosa",
      route: "/config/notifications/glucose-alerts",
    },
    {
      id: "medication_reminders",
      title: "Recordatorios de medicación",
      route: "/config/notifications/medication-reminders",
    },
    {
      id: "data_reminders",
      title: "Recordatorio de registro de datos",
      route: "/config/notifications/data-reminders",
    },
    {
      id: "prediction_alerts",
      title: "Alertas de predicción",
      route: "/config/notifications/prediction-alerts",
    },
    {
      id: "device_alerts",
      title: "Alertas del dispositivo",
      route: "/config/notifications/device-alerts",
    },
  ];

  // Preferencias generales
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: "sound",
      title: "Sonido de las notificaciones",
      enabled: true,
    },
    {
      id: "vibration",
      title: "Vibración en las notificaciones",
      enabled: true,
    },
  ]);

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  const handlePreferenceChange = (preferenceId: string, newValue: boolean) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === preferenceId ? { ...pref, enabled: newValue } : pref
      )
    );
  };

  return (
    <AppLayout
      title="Notificaciones"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      {/* Categorías de notificaciones */}
      <CardList
        title="Categorías de notificaciones"
        items={notificationCategories.map((category, index) => ({
          id: category.id,
          type: 'button' as const,
          title: category.title,
          buttonType: 'chevron' as const,
          isLast: index === notificationCategories.length - 1
        }))}
        onItemPress={(item) => {
          const category = notificationCategories.find(cat => cat.id === item.id);
          if (category) {
            handleCategoryPress(category.route);
          }
        }}
      />

      {/* Preferencias generales */}
      <CardList
        title="Preferencias generales"
        items={preferences.map((preference, index) => ({
          id: preference.id,
          type: 'button' as const,
          title: preference.title,
          buttonType: 'switch' as const,
          value: preference.enabled,
          isLast: index === preferences.length - 1
        }))}
        onItemValueChange={(id: string, value: boolean) => handlePreferenceChange(id, value)}
      />
    </AppLayout>
  );
};

export default NotificationSettings;
