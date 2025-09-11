// app/config/notifications/medication-reminders.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

// Importar componentes core
import { AppLayout } from '@/components/layouts/AppLayout';

// Importar componente unificado
import { CardList } from '@/components/core/cards';

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
    <AppLayout
      title="Recordatorios de medicación"
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

      {/* Tipos de recordatorio */}
      <CardList
        title="Tipos de recordatorio"
        items={reminderTypes.map((type, index) => ({
          id: type.id,
          type: 'button' as const,
          title: type.title,
          buttonType: 'chevron' as const,
          isLast: index === reminderTypes.length - 1
        }))}
        onItemPress={(item) => {
          const category = reminderTypes.find(type => type.id === item.id);
          if (category) {
            handleReminderTypePress(category.route);
          }
        }}
      />
    </AppLayout>
  );
};

export default MedicationReminders;