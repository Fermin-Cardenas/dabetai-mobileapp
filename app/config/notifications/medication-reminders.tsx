// app/config/notifications/medication-reminders.tsx
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';

// Importar componentes core
import { Header } from '@/components/core/navigation/Header';

// Importar componentes reutilizables de notifications
import {
    NotificationCategorySection,
    NotificationPreferencesSection
} from '@/features/notifications/components';

interface ReminderCategory {
  id: string;
  title: string;
  route: string;
}

interface ReminderPreference {
  id: string;
  title: string;
  enabled: boolean;
}

const MedicationReminders = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Control general - reutilizando NotificationPreferencesSection
  const [generalControls, setGeneralControls] = useState<ReminderPreference[]>([
    {
      id: 'all_medication_reminders',
      title: 'Todos los recordatorios de medicación',
      enabled: true
    }
  ]);

  // Tipos de recordatorio - reutilizando NotificationCategorySection
  const reminderTypes: ReminderCategory[] = [
    {
      id: 'take_dose',
      title: 'Recordatorio para tomar dosis',
      route: '/config/notifications/take-dose-reminders'
    },
    {
      id: 'register_dose',
      title: 'Recordatorio para registrar dosis',
      route: '/config/notifications/register-dose-reminders'
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

  const handleReminderTypePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 bg-[#F1F5F9]">
        {/* Header */}
        <Header
          title="Recordatorios de medicación"
          showBackButton={true}
          onBackPress={handleGoBack}
        />
        
        {/* Content */}
        <ScrollView 
          className="flex-1 pb-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Control general */}
          <NotificationPreferencesSection
            title="Control general"
            preferences={generalControls}
            onPreferenceChange={handleGeneralControlChange}
          />

          {/* Tipos de recordatorio */}
          <NotificationCategorySection
            title="Tipos de recordatorio"
            categories={reminderTypes}
            onCategoryPress={handleReminderTypePress}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default MedicationReminders;