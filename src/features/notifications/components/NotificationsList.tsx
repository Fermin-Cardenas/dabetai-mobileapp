// src/features/notifications/components/NotificationsList.tsx
import { Body } from '@/components/common/Typography';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { NotificationItem } from './NotificationItem';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'glucose' | 'alert' | 'reminder' | 'device' | 'glucose-low';
  isUnread: boolean;
}

interface NotificationsListProps {
  notifications: Notification[];
  activeTab: 'no-leidas' | 'leidas';
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  activeTab
}) => {
  const handleNotificationPress = (notification: Notification) => {
    // Implementar navegación específica según el tipo de notificación
    console.log('Notification pressed:', notification.title);
  };

  if (notifications.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Body className="text-gray-400 text-center">
          No tienes notificaciones {activeTab === 'no-leidas' ? 'sin leer' : 'leídas'}
        </Body>
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Encabezado "Title" */}
      <View className="px-4 pt-2 pb-2">
        <Body className="text-gray-800 font-semibold text-base">
          Title
        </Body>
      </View>

      {/* Contenedor de notificaciones */}
      <View className="bg-white mx-4 rounded-xl overflow-hidden">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            title={notification.title}
            description={notification.description}
            time={notification.time}
            type={notification.type}
            isUnread={notification.isUnread}
            isLast={index === notifications.length - 1}
            onPress={() => handleNotificationPress(notification)}
          />
        ))}
      </View>
    </ScrollView>
  );
};