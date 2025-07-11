// app/config/notifications/data-reminders.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

// Importar componentes core
import { Header } from '@/components/core/navigation/Header';

// Importar componentes reutilizables de notifications
import {
  NotificationPreferencesSection,
  NotificationCategorySection
} from '@/features/notifications/components';

interface DataReminderCategory {
  id: string;
  title: string;
  route: string;
}

interface DataReminderPreference {
  id: string;
  title: string;
  enabled: boolean;
}

const DataReminders = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Control general - reutilizando NotificationPreferencesSection
  const [generalControls, setGeneralControls] = useState<DataReminderPreference[]>([
    {
      id: 'all_data_reminders',
      title: 'Todos los recordatorios de registro',
      enabled: true
    }
  ]);

  // Tipos de registro - reutilizando NotificationCategorySection
  const dataReminderTypes: DataReminderCategory[] = [
    {
      id: 'glucose_reminder',
      title: 'Recordatorio para registrar glucosa',
      route: '/config/notifications/glucose-reminders'
    },
    {
      id: 'food_reminder',
      title: 'Recordatorio para registrar comida',
      route: '/config/notifications/food-reminders'
    },
    {
      id: 'activity_reminder',
      title: 'Recordatorio para registrar actividad física',
      route: '/config/notifications/activity-reminders'
    }
  ];

  const handleGeneralControlChange = (preferenceId: string, newValue: boolean) => {
    setGeneralControls(prev => 
      prev.map(control => 
        control.id === preferenceId 
          ? { ...control, enabled: newValue }
          : control
      )
    );
  };

  const handleDataReminderTypePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 bg-[#F1F5F9]">
        {/* Header */}
        <Header
          title="Recordatorio de registro de datos"
          showBackButton={true}
          onBackPress={handleGoBack}
        />
        
        {/* Content */}
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Control general */}
          <NotificationPreferencesSection
            title="Control general"
            preferences={generalControls}
            onPreferenceChange={handleGeneralControlChange}
          />

          {/* Tipos de registro */}
          <NotificationCategorySection
            title="Tipos de registro"
            categories={dataReminderTypes}
            onCategoryPress={handleDataReminderTypePress}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default DataReminders;