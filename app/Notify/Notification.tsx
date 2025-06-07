import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Notificaciones = () => {
  const [activeTab, setActiveTab] = useState('no-leidas');
  const router = useRouter();

  const tabs = [
    { id: 'no-leidas', title: 'No leídas' },
    { id: 'leidas', title: 'Leídas' },
  ];

  const NotificationItem = ({ 
    title, 
    description, 
    time, 
    isUnread = false, 
    type = 'default',
    isLast = false 
  }) => {
    return (
      <View style={[styles.notificationItem, isLast && styles.notificationItemLast]}>
        <View style={styles.notificationContent}>
          <View style={styles.notificationLeft}>
            <View style={styles.unreadIndicator}>
              {isUnread && <View style={styles.blueDot} />}
            </View>
            <View style={styles.notificationText}>
              <Text style={[
                styles.notificationTitle,
                isUnread ? styles.unreadTitle : styles.readTitle
              ]}>
                {title}
              </Text>
              <Text style={[
                styles.notificationDescription,
                isUnread ? styles.unreadDescription : styles.readDescription
              ]}>
                {description}
              </Text>
            </View>
          </View>
          <Text style={[
            styles.notificationTime,
            isUnread ? styles.unreadTime : styles.readTime
          ]}>
            {time}
          </Text>
        </View>
      </View>
    );
  };

  const noLeidasNotifications = [
    {
      title: 'Glucosa alta',
      description: 'Valor registrado: 185 mg/dL',
      time: 'Hace 5 min',
      type: 'glucose',
      isUnread: true
    },
    {
      title: 'Alerta de protección',
      description: 'Tu riesgo de complicación ha cambiado.',
      time: 'Hace 30 min',
      type: 'alert',
      isUnread: true
    },
    {
      title: 'Recordatorios',
      description: 'No olvides registrar tu dosis de insulina a las 8:00 PM.',
      time: 'Abr 18:00',
      type: 'reminder',
      isUnread: true
    },
    {
      title: 'Alerta de dispositivo',
      description: 'Sincronización completada.',
      time: 'Abr 16:05',
      type: 'device',
      isUnread: true
    },
    {
      title: 'Glucosa baja',
      description: 'Valor registrado: 65 mg/dL',
      time: '4/03/2024 10:15',
      type: 'glucose-low',
      isUnread: true
    }
  ];

  const leidasNotifications = [
    {
      title: 'Recordatorio de medicación',
      description: 'Hora de tomar tu medicación matutina.',
      time: 'Ayer 8:00',
      type: 'reminder',
      isUnread: false
    },
    {
      title: 'Glucosa en rango',
      description: 'Valor registrado: 120 mg/dL',
      time: 'Ayer 14:30',
      type: 'glucose',
      isUnread: false
    },
    {
      title: 'Dispositivo conectado',
      description: 'Tu glucómetro se ha sincronizado correctamente.',
      time: '2 días',
      type: 'device',
      isUnread: false
    }
  ];

  const currentNotifications = activeTab === 'no-leidas' ? noLeidasNotifications : leidasNotifications;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}


      <View style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mark all as read button - only for unread tab */}
        {activeTab === 'no-leidas' && (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.markAllButton}>
              <Text style={styles.markAllText}>Marcar todas como leídas</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Notifications List */}
        <ScrollView 
          style={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.notificationsContainer}>
            {currentNotifications.map((notification, index) => (
              <NotificationItem
                key={index}
                title={notification.title}
                description={notification.description}
                time={notification.time}
                type={notification.type}
                isUnread={notification.isUnread}
                isLast={index === currentNotifications.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  markAllButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  markAllText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContainer: {
    backgroundColor: 'white',
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  notificationItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationItemLast: {
    borderBottomWidth: 0,
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notificationLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  unreadIndicator: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    marginBottom: 4,
  },
  unreadTitle: {
    color: '#1F2937',
    fontWeight: '600',
  },
  readTitle: {
    color: '#6B7280',
    fontWeight: '500',
  },
  notificationDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  unreadDescription: {
    color: '#374151',
  },
  readDescription: {
    color: '#9CA3AF',
  },
  notificationTime: {
    fontSize: 12,
    marginLeft: 8,
    textAlign: 'right',
    minWidth: 70,
  },
  unreadTime: {
    color: '#6B7280',
  },
  readTime: {
    color: '#D1D5DB',
  },
});

export default Notificaciones;