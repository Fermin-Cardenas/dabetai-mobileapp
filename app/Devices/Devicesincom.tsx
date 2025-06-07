import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SuccessfulConnectionScreen = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleSyncData = () => {
    console.log('Sincronizar datos ahora');
    // Navegar a la pantalla de sincronización
    router.push('/Devices/Devicetrans');
  };

  const handleGoToDevices = () => {
    console.log('Ir a mis dispositivos');
    // Navegar a la pantalla de mis dispositivos
    router.push('/Config/Devicelist');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
     

      {/* Content */}
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successIconBackground}>
            <Ionicons name="checkmark" size={32} color="#314158" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Conexión exitosa</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Tu dispositivo <Text style={styles.deviceName}>One Touch Select Plus</Text> se ha conectado correctamente con dabetai.
        </Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.syncButton} onPress={handleSyncData}>
          <Text style={styles.syncButtonText}>Sincronizar datos ahora</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.devicesButton} onPress={handleGoToDevices}>
          <Text style={styles.devicesButtonText}>Ir a mis dispositivos</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  iconContainer: {
    marginBottom: 32,
  },
  successIconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#314158',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#314158',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 16,
    color: '#62748E',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 350,
    paddingHorizontal: 0,
  },
  deviceName: {
    fontWeight: 'bold',
    color: '#314158',
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  syncButton: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    fontWeight: 'bold',
  },
  devicesButton: {
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  devicesButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    fontWeight: 'bold',
  },
});

export default SuccessfulConnectionScreen;