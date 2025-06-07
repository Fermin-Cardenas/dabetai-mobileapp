import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const DeviceSelectionScreen = () => {
  const router = useRouter();

  const deviceCategories = [
    { 
      id: 1, 
      title: 'Glucómetro', 
      icon: 'information-circle-outline',
      route: '/Devices/Deviceselect'
    },
    { 
      id: 2, 
      title: 'Monitor de glucosa continuo (CGM)', 
      icon: 'information-circle-outline',
      route: '/Devices/Deviceselect'
    },
    { 
      id: 3, 
      title: 'Monitor de actividad / Wearable', 
      icon: 'information-circle-outline',
      route: '/Devices/Deviceselect'
    },
  ];

  const handleDeviceSelect = (device) => {
    console.log('Dispositivo seleccionado:', device.title);
    router.push(device.route);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        

        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="cube-outline" size={50} color="#4a5568" />
          
      </View>

        {/* Title and Description */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Selecciona el tipo de dispositivo</Text>
          <Text style={styles.description}>
            Esto nos ayuda a mostrarte las instrucciones de conexión correctas para tu dispositivo específico.
          </Text>
        </View>
      </ScrollView>

      {/* Footer with Categories */}
      <Text style={styles.categoriesTitle}>Categorías</Text>
      <View style={styles.footerContainer}>
        {deviceCategories.map((device) => (
          <TouchableOpacity
            key={device.id}
            style={styles.categoryItem}
            onPress={() => handleDeviceSelect(device)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryContent}>
              <View style={styles.categoryIcon}>
                <MaterialIcons name="error-outline" size={24} color="#666" />
              </View>
              <Text style={styles.categoryText}>{device.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomSpacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  footerContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 12,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  categoryItem: {
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
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
    flex: 1,
  },
  bottomSpacing: {
    height: 30,
  },
});

export default DeviceSelectionScreen;