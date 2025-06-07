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

const SyncCompleteScreen = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToDevices = () => {
    console.log('Ir a mis dispositivos');
    // Navegar a la pantalla de mis dispositivos
    router.push('/Config/Devicelist');
  };

  const handleContinue = () => {
    console.log('Continuar');
    // Navegar al dashboard principal o pantalla de inicio
    router.push('/Home/Home');
  };

  return (
    <SafeAreaView style={styles.container}>
    
      {/* Content */}
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successIconBackground}>
            <Ionicons name="checkmark" size={32} color="#314158" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Sincronización completa</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Todos los datos de tu dispositivo <Text style={styles.deviceName}>One Touch Select Plus</Text> han sido transferidos exitosamente.
        </Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleGoToDevices}>
          <Text style={styles.primaryButtonText}>Ir a mis dispositivos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleContinue}>
          <Text style={styles.secondaryButtonText}>Continuar</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingBottom: 280,
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
    width: '100%',
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#62748E',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    lineHeight: 22,
    width: '100%',
    paddingHorizontal: 16,
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
  primaryButton: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    fontWeight: 'bold',
  },
});

export default SyncCompleteScreen;