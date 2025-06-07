import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AlertasDispositivo = () => {
  const router = useRouter();
  
  // Estados para los switches
  const [syncFinishedAlertEnabled, setSyncFinishedAlertEnabled] = useState(true);
  const [connectionLostAlertEnabled, setConnectionLostAlertEnabled] = useState(true);
  const [lowBatteryAlertEnabled, setLowBatteryAlertEnabled] = useState(true);

  const AlertItem = ({ title, subtitle, value, onValueChange, isLast = false }) => (
    <View style={[styles.alertItem, isLast && styles.alertItemLast]}>
      <View style={[styles.alertTextContainer, !subtitle && styles.alertTextCentered]}>
        <Text style={styles.alertTitle}>{title}</Text>
        {subtitle && <Text style={styles.alertSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E5E7EB', true: '#60A5FA' }}
        thumbColor={value ? '#2196F3' : '#F3F4F6'}
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  );

  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sistema */}
        <SectionHeader title="Sistema" />
        <View style={styles.alertSection}>
          <AlertItem 
            title="Alerta cuando la sincronización del dispositivo ha finalizado"
            value={syncFinishedAlertEnabled}
            onValueChange={setSyncFinishedAlertEnabled}
            isLast={true}
          />
        </View>

        {/* Dispositivo conectado */}
        <SectionHeader title="Dispositivo conectado" />
        <View style={styles.alertSection}>
          <AlertItem 
            title="Alerta si un dispositivo conectado pierde la conexión"
            value={connectionLostAlertEnabled}
            onValueChange={setConnectionLostAlertEnabled}
          />
          <AlertItem 
            title="Alerta de batería baja del dispositivo"
            subtitle="Si el dispositivo lo reporta"
            value={lowBatteryAlertEnabled}
            onValueChange={setLowBatteryAlertEnabled}
            isLast={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
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
    fontWeight: '700',
    fontFamily: 'Source Sans Pro',
    lineHeight: 18,
    letterSpacing: 0,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#314158',
    fontFamily: 'Source Sans Pro',
    lineHeight: 18,
    letterSpacing: 0,
  },
  alertSection: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 1,
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
    minHeight: 60,
  },
  alertItemLast: {
    borderBottomWidth: 0,
  },
  alertTextContainer: {
    flex: 1,
    marginRight: 16,
    paddingRight: 8,
  },
  alertTextCentered: {
    justifyContent: 'center',
  },
  alertTitle: {
    fontSize: 16,
    color: '#62748E',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 20,
    letterSpacing: 0,
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  alertSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 18,
    letterSpacing: 0,
    marginTop: 4,
    flexWrap: 'wrap',
  },
});

export default AlertasDispositivo;