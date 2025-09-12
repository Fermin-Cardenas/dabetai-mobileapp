// app/config/notifications/data-reminders.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

// Importar componentes core
import { AppLayout } from '@/components/layouts/AppLayout';

// Importar componente unificado
import { CardList } from '@/components/core/cards';

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
    <AppLayout
      title="Recordatorio de registro de datos"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      {/* Control general */}
      <CardList
        title="Control general"
        items={generalControls.map(control => ({
          id: control.id,
          type: 'button' as const,
          title: control.title,
          buttonType: 'switch' as const,
          value: control.enabled,
          isLast: false
        }))}
        onItemValueChange={(id: string, value: boolean) => handleGeneralControlChange(id, value)}
      />

      {/* Tipos de registro */}
      <CardList
        title="Tipos de registro"
        items={dataReminderTypes.map((type, index) => ({
          id: type.id,
          type: 'button' as const,
          title: type.title,
          buttonType: 'chevron' as const,
          isLast: index === dataReminderTypes.length - 1
        }))}
        onItemPress={(item) => {
          const category = dataReminderTypes.find(type => type.id === item.id);
          if (category) {
            handleDataReminderTypePress(category.route);
          }
        }}
      />
    </AppLayout>
  );
};

export default DataReminders;