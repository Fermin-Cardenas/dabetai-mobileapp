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

const NotificacionesSettings = () => {
  const router = useRouter();
  
  // Estados para los switches
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const CategoryItem = ({ title, onPress, isLast = false }) => (
    <TouchableOpacity 
      style={[styles.categoryItem, isLast && styles.categoryItemLast]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.categoryLeft}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="info-outline" size={20} color="#6B7280" />
        </View>
        <Text style={styles.categoryText}>{title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#1F2937" style={styles.chevronIcon} />
    </TouchableOpacity>
  );

  const PreferenceItem = ({ title, value, onValueChange, isLast = false }) => (
    <View style={[styles.preferenceItem, isLast && styles.preferenceItemLast]}>
      <Text style={styles.preferenceText}>{title}</Text>
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
        {/* Categorías de notificaciones */}
        <SectionHeader title="Categorías de notificaciones" />
        <View style={styles.categorySection}>
          <CategoryItem 
            title="Alertas de glucosa"
            onPress={() => router.push('/Config/Glucosealert')}
          />
          <CategoryItem 
            title="Recordatorios de medicación"
            onPress={() => router.push('/Config/Medicationalert')}
          />
          <CategoryItem 
            title="Recordatorio de registro de datos"
            onPress={() => router.push('/Config/Dataregister')}
          />
          <CategoryItem 
            title="Alertas de predicción"
            onPress={() => router.push('/Config/Predictionsalert')}
          />
          <CategoryItem 
            title="Alertas del dispositivo"
            onPress={() => router.push('/Config/Devicealert')}
            isLast={true}
          />
        </View>

        {/* Preferencias generales */}
        <SectionHeader title="Preferencias generales" />
        <View style={styles.preferenceSection}>
          <PreferenceItem 
            title="Sonido de las notificaciones"
            value={soundEnabled}
            onValueChange={setSoundEnabled}
          />
          <PreferenceItem 
            title="Vibración en las notificaciones"
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
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
  categorySection: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  categoryItemLast: {
    borderBottomWidth: 0,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#62748E',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
    letterSpacing: 0,
  },
  preferenceSection: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 1,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  preferenceItemLast: {
    borderBottomWidth: 0,
  },
  preferenceText: {
    fontSize: 16,
    color: '#62748E',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
    letterSpacing: 0,
    flex: 1,
  },
  chevronIcon: {
    fontWeight: 'bold',
  },
});

export default NotificacionesSettings;