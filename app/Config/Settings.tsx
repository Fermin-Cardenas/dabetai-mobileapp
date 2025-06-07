import React from 'react';
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

const Configuracion = () => {
  const router = useRouter();

  const MenuItem = ({ title, onPress, isLast = false }) => (
    <TouchableOpacity 
      style={[styles.menuItem, isLast && styles.menuItemLast]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.menuText}>{title}</Text>
      <MaterialIcons name="chevron-right" size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Mi cuenta */}
        <SectionHeader title="Mi cuenta" />
        <View style={styles.menuSection}>
          <MenuItem 
            title="Detalles de la cuenta"
            onPress={() => router.push('/Config/Notify')}
          />
          <MenuItem 
            title="Notificaciones"
            onPress={() => router.push('/Config/Notify')}
            isLast={true}
          />
        </View>

        {/* Mi salud y tratamiento */}
        <SectionHeader title="Mi salud y tratamiento" />
        <View style={styles.menuSection}>
          <MenuItem 
            title="Información médica"
            onPress={() => router.push('/Config/Notify')}
          />
          <MenuItem 
            title="Mi medicación habitual"
            onPress={() => router.push('/Config/Notify')}
            isLast={true}
          />
        </View>

        {/* Dispositivos y aplicaciones */}
        <SectionHeader title="Dispositivos y aplicaciones" />
        <View style={styles.menuSection}>
          <MenuItem 
            title="Gestionar mis dispositivos"
            onPress={() => router.push('/Config/Devicelist')}
          />
          <MenuItem 
            title="Gestionar mis aplicaciones"
            onPress={() => router.push('/Config/Notify')}
            isLast={true}
          />
        </View>

        {/* Soporte y ayuda */}
        <SectionHeader title="Soporte y ayuda" />
        <View style={styles.menuSection}>
          <MenuItem 
            title="Preguntas frecuentes"
            onPress={() => router.push('/Config/Notify')}
          />
          <MenuItem 
            title="Contactar soporte"
            onPress={() => router.push('/Config/Notify')}
            isLast={true}
          />
        </View>

        {/* Legal */}
        <SectionHeader title="Legal" />
        <View style={styles.menuSection}>
          <MenuItem 
            title="Términos y condiciones"
            onPress={() => router.push('/Config/Notify')}
          />
          <MenuItem 
            title="Política de privacidad"
            onPress={() => router.push('/Config/Notify')}
            isLast={true}
          />
        </View>

        {/* Eliminar cuenta */}
        <View style={styles.deleteSection}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => router.push('/Config/Notify')}
          >
            <Text style={styles.deleteButtonText}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Galería. Todos los derechos reservados.</Text>
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
  menuSection: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 16,
    color: '#62748E',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
    letterSpacing: 0,
  },
  deleteSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
    letterSpacing: 0,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#62748E',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
  },
});

export default Configuracion;