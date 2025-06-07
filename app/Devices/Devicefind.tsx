import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SearchingDevicesScreen = () => {
  const router = useRouter();
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [showDeviceFound, setShowDeviceFound] = useState(false);

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    
    rotateAnimation.start();
    
    // Timer para cambiar de pantalla después de 5 segundos
    const timer = setTimeout(() => {
      setShowDeviceFound(true);
    }, 5000);
    
    return () => {
      rotateAnimation.stop();
      clearTimeout(timer);
    };
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleBackPress = () => {
    router.back();
  };

  const handleTroubleshooting = () => {
    console.log('¿Problemas para encontrarlo?');
    // Puedes agregar navegación a una pantalla de ayuda aquí
    // router.push('/Devices/TroubleshootScreen');
  };

  const handleConnectDevice = (deviceName) => {
    console.log('Conectar dispositivo:', deviceName);
    // Navegar a la pantalla de conexión exitosa o siguiente paso
    router.push('/Devices/Devicesinc');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
     

      {!showDeviceFound ? (
        // Pantalla de búsqueda
        <>
          {/* Content */}
          <View style={styles.content}>
            {/* Icono de búsqueda */}
            <Animated.View style={[styles.iconContainer, { transform: [{ rotate }] }]}>
              <Ionicons name="sync" size={48} color="#314158" />
            </Animated.View>

            {/* Título */}
            <Text style={styles.title}>Buscando dispositivos</Text>

            {/* Subtítulo */}
            <Text style={styles.subtitle}>
              Asegúrate de que tu glucómetro esté prendido y en modo emparejamiento.
            </Text>
          </View>

          {/* Botón de ayuda */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.troubleButton} onPress={handleTroubleshooting}>
              <Text style={styles.troubleButtonText}>¿Problemas para encontrarlo?</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // Pantalla de búsqueda exitosa
        <>
          {/* Content */}
          <View style={styles.content}>
            {/* Icono de éxito */}
            <View style={styles.iconContainer}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark" size={24} color="#FFFFFF" />
              </View>
            </View>

            {/* Título */}
            <Text style={styles.title}>Búsqueda exitosa</Text>

            {/* Subtítulo */}
            <Text style={styles.subtitle}>
              Se han encontrado los siguientes dispositivos. Selecciona el que deseas emparejar.
            </Text>
          </View>

          {/* Lista de dispositivos */}
          <View style={styles.devicesList}>
            <Text style={styles.devicesTitle}>Dispositivos encontrados</Text>
            
            <TouchableOpacity 
              style={styles.deviceItem} 
              onPress={() => handleConnectDevice('OneTouch Select Plus')}
            >
              <Text style={styles.deviceName}>OneTouch Select Plus</Text>
              <Ionicons name="checkmark" size={24} color="#62748E" />
            </TouchableOpacity>

            <View style={styles.deviceSeparator} />

            <TouchableOpacity 
              style={styles.deviceItem} 
              onPress={() => handleConnectDevice('Accu-Chek Guide')}
            >
              <Text style={styles.deviceName}>Accu-Chek Guide</Text>
              <Ionicons name="chevron-forward" size={24} color="#62748E" />
            </TouchableOpacity>
          </View>

          {/* Botón de ayuda */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.troubleButton} onPress={handleTroubleshooting}>
              <Text style={styles.troubleButtonText}>¿Problemas para encontrarlo?</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    paddingTop: 40,
  },
  iconContainer: {
    marginBottom: 32,
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  troubleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  troubleButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
  },
  successContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 100,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#314158',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 35,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#62748E',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 350,
    paddingHorizontal: 0,
  },
  successIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#314158',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8EDF3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#314158',
  },
  successIconInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#314158',
    justifyContent: 'center',
    alignItems: 'center',
  },
  devicesList: {
    flex: 1,
    paddingTop: 220,
    paddingBottom: 120,
  },
  devicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#314158',
    fontFamily: 'Source Sans 3',
    marginBottom: 20,
    paddingLeft: 16,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  deviceName: {
    fontSize: 16,
    color: '#314158',
    fontFamily: 'Source Sans 3',
  },
  deviceSeparator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 16,
    marginRight: 16,
  },
});

export default SearchingDevicesScreen;