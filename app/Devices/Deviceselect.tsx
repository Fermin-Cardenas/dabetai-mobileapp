import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GlucometerSelectionScreen = () => {
  const router = useRouter();
  const glucometerModels = [
    { id: 1, name: 'OneTouch Select Plus' },
    { id: 2, name: 'Accu-Chek Guide' },
    { id: 3, name: 'Contour Next One' },
    { id: 4, name: 'One Drop™' },
    { id: 5, name: 'Publix TRUE METRIX® AIR' },
    { id: 6, name: 'ReliOn™' },
  ];

  const handleModelSelect = (model) => {
    console.log('Modelo seleccionado:', model.name);
    
    // Solo navegar para OneTouch Select Plus
    if (model.id === 1) {
      router.push('/Devices/Deviceconect');
    } else {
      // Para otros modelos, mostrar mensaje o manejar como prefieras
      console.log('Funcionalidad en desarrollo para:', model.name);
    }
  };

  const handleNotFound = () => {
    console.log('No encuentras tu modelo');
    // Manejar cuando no encuentran su modelo
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="cube-outline" size={50} color="#4a5568" />
        </View>

        {/* Title and Description */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Selecciona tu glucómetro</Text>
          <Text style={styles.description}>
            Elige tu modelo de glucómetro para obtener las instrucciones de conexión exactas.
          </Text>
        </View>
      </ScrollView>

      {/* Footer with Models */}
      <Text style={styles.modelsTitle}>Modelos soportados</Text>
      <View style={styles.footerContainer}>
        {glucometerModels.map((model) => (
          <TouchableOpacity
            key={model.id}
            style={styles.modelItem}
            onPress={() => handleModelSelect(model)}
            activeOpacity={0.7}
          >
            <Text style={styles.modelText}>{model.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" style={{fontWeight: 'bold'}} />
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Not found option - outside white container */}
      <TouchableOpacity
        style={styles.notFoundItem}
        onPress={handleNotFound}
        activeOpacity={0.7}
      >
        <Text style={styles.notFoundText}>¿No encuentras tu modelo?</Text>
      </TouchableOpacity>
      
      <View style={styles.bottomSpacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  modelsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 12,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  footerContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  modelItem: {
    backgroundColor: 'transparent',
    padding: 16,
    paddingHorizontal: 20,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modelText: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '400',
    flex: 1,
  },
  notFoundItem: {
    backgroundColor: 'transparent',
    padding: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '400',
  },
  bottomSpacing: {
    height: 30,
  },
});

export default GlucometerSelectionScreen;