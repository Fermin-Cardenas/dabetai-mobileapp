// app/notify.tsx
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';

// Importar componentes core
import { Header } from '@/components/core/navigation/Header';

// Importar componentes específicos para Notifications Settings
import {
    NotificationCategorySection,
    NotificationPreferencesSection
} from '@/features/notifications/components';

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

  const handleGoBack = () => {
    router.back();
  };

  // Categorías de notificaciones
  const notificationCategories: NotificationCategory[] = [
    {
      id: 'glucose_alerts',
      title: 'Alertas de glucosa',
      route: '/config/notifications/glucose-alerts'
    },
    {
      id: 'medication_reminders',
      title: 'Recordatorios de medicación',
      route: '/config/notifications/medication-reminders'
    },
    {
      id: 'data_reminders',
      title: 'Recordatorio de registro de datos',
      route: '/config/notifications/data-reminders'
    },
    {
      id: 'prediction_alerts',
      title: 'Alertas de predicción',
      route: '/config/notifications/prediction-alerts'
    },
    {
      id: 'device_alerts',
      title: 'Alertas del dispositivo',
      route: '/config/notifications/device-alerts'
    }
  ];

  // Preferencias generales
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'sound',
      title: 'Sonido de las notificaciones',
      enabled: true
    },
    {
      id: 'vibration',
      title: 'Vibración en las notificaciones',
      enabled: true
    }
  ]);

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  const handlePreferenceChange = (preferenceId: string, newValue: boolean) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === preferenceId 
          ? { ...pref, enabled: newValue }
          : pref
      )
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 bg-[#F1F5F9]">
        {/* Header */}
        <Header
          title="Notificaciones"
          showBackButton={true}
          onBackPress={handleGoBack}
        />
        
        {/* Content */}
        <ScrollView 
          className="flex-1 pb-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Categorías de notificaciones */}
          <NotificationCategorySection
            title="Categorías de notificaciones"
            categories={notificationCategories}
            onCategoryPress={handleCategoryPress}
          />

          {/* Preferencias generales */}
          <NotificationPreferencesSection
            title="Preferencias generales"
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default NotificationSettings;