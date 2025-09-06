// app/config/notifications/index.tsx
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    View
} from 'react-native';

// Importar componentes core
import { Button } from '@/components/core/buttons';
import { Header } from '@/components/core/navigation/Header';

// Importar componentes específicos para Notifications
import {
    NotificationTabs,
    NotificationsList
} from '@/features/notifications/components';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'glucose' | 'alert' | 'reminder' | 'device' | 'glucose-low';
  isUnread: boolean;
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<'no-leidas' | 'leidas'>('no-leidas');
  const router = useRouter();

  const handleMarkAllAsRead = () => {
    // Implementar lógica para marcar todas como leídas
    console.log('Marcar todas como leídas...');
  };

  // Datos de notificaciones no leídas
  const noLeidasNotifications: Notification[] = [
    {
      id: '1',
      title: 'Glucosa alta',
      description: 'Valor registrado: 185 mg/dL',
      time: 'Hace 5 min',
      type: 'glucose',
      isUnread: true
    },
    {
      id: '2',
      title: 'Alerta de predicción',
      description: 'Tu riesgo de complicación ha cambiado.',
      time: 'Hace 30 min',
      type: 'alert',
      isUnread: true
    },
    {
      id: '3',
      title: 'Recordatorios',
      description: 'No olvides registrar tu dosis de insulina a las 8:00 PM.',
      time: 'Abr 18:00',
      type: 'reminder',
      isUnread: true
    },
    {
      id: '4',
      title: 'Alerta de dispositivo',
      description: 'Sincronización completada.',
      time: 'Abr 16:05',
      type: 'device',
      isUnread: true
    },
    {
      id: '5',
      title: 'Glucosa baja',
      description: 'Valor registrado: 65 mg/dL.',
      time: '15/05/2025 10:15',
      type: 'glucose-low',
      isUnread: true
    }
  ];

  // Datos de notificaciones leídas
  const leidasNotifications: Notification[] = [
    {
      id: '6',
      title: 'Recordatorio de medicación',
      description: 'Hora de tomar tu medicación matutina.',
      time: 'Ayer 8:00',
      type: 'reminder',
      isUnread: false
    },
    {
      id: '7',
      title: 'Glucosa en rango',
      description: 'Valor registrado: 120 mg/dL',
      time: 'Ayer 14:30',
      type: 'glucose',
      isUnread: false
    },
    {
      id: '8',
      title: 'Dispositivo conectado',
      description: 'Tu glucómetro se ha sincronizado correctamente.',
      time: '2 días',
      type: 'device',
      isUnread: false
    }
  ];

  const currentNotifications = activeTab === 'no-leidas' ? noLeidasNotifications : leidasNotifications;

  return (
    <>
      <View className="flex-1 bg-slate-100">
        {/* Header */}
        <Header
          title="Notificaciones"
          variant='section'
          
        />
        
        <View className="flex-1">
          {/* Tabs */}
          <NotificationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Botón "Marcar todas como leídas" - solo para tab no leídas */}
          {activeTab === 'no-leidas' && (
            <View className="px-4 py-3">
              <Button
                title="Marcar todas como leídas"
                onPress={handleMarkAllAsRead}
                variant="outline"
                color="secondary"
              />
            </View>
          )}

          {/* Lista de notificaciones */}
          <NotificationsList
            notifications={currentNotifications}
            activeTab={activeTab}
          />
        </View>
      </View>
    </>
  );
};

export default Notifications;