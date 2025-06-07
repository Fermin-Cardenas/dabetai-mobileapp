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

const RecordatorioRegistroDatos = () => {
  const router = useRouter();
  
  // Estado para el switch principal
  const [allRemindersEnabled, setAllRemindersEnabled] = useState(true);

  const ReminderTypeItem = ({ title, onPress, isLast = false }) => (
    <TouchableOpacity 
      style={[styles.reminderItem, isLast && styles.reminderItemLast]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.reminderText}>{title}</Text>
      <MaterialIcons name="chevron-right" size={20} color="#1F2937" style={styles.chevronIcon} />
    </TouchableOpacity>
  );

  const ControlItem = ({ title, value, onValueChange }) => (
    <View style={styles.controlItem}>
      <Text style={styles.controlText}>{title}</Text>
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
        {/* Control general */}
        <SectionHeader title="Control general" />
        <View style={styles.controlSection}>
          <ControlItem 
            title="Todos los recordatorios de registro"
            value={allRemindersEnabled}
            onValueChange={setAllRemindersEnabled}
          />
        </View>

        {/* Tipos de registro */}
        <SectionHeader title="Tipos de registro" />
        <View style={styles.reminderSection}>
          <ReminderTypeItem 
            title="Recordatorio para registrar glucosa"
            onPress={() => {}}
          />
          <ReminderTypeItem 
            title="Recordatorio para registrar comida"
            onPress={() => {}}
          />
          <ReminderTypeItem 
            title="Recordatorio para registrar actividad física"
            onPress={() => {}}
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
  controlSection: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 1,
  },
  controlItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'white',
  },
  controlText: {
    fontSize: 16,
    color: '#62748E',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
    letterSpacing: 0,
    flex: 1,
  },
  reminderSection: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 1,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  reminderItemLast: {
    borderBottomWidth: 0,
  },
  reminderText: {
    fontSize: 16,
    color: '#62748E',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
    letterSpacing: 0,
  },
  chevronIcon: {
    fontWeight: 'bold',
  },
});

export default RecordatorioRegistroDatos;