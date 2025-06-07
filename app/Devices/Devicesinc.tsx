import React, { useEffect, useRef } from 'react';
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

const PairingScreen = () => {
  const router = useRouter();
  const blinkValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de parpadeo del icono bluetooth
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(blinkValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    blinkAnimation.start();

    // Timer para cambiar de pantalla después de 5 segundos
    const timer = setTimeout(() => {
      // Navegar a la pantalla de emparejamiento exitoso
      router.push('/Devices/Devicesincom');
    }, 5000);

    // Limpiar el timer y animación cuando el componente se desmonte
    return () => {
      blinkAnimation.stop();
      clearTimeout(timer);
    };
  }, [router, blinkValue]);

  // Interpolación para opacidad en lugar de color
  const iconOpacity = blinkValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1], // De semi-transparente a opaco
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleCancelPairing = () => {
    console.log('Cancelar emparejamiento');
    // Navegar de vuelta a la pantalla anterior o al inicio
    router.back();
  };

  const handleTroubleshooting = () => {
    console.log('¿Problemas durante el emparejamiento?');
    // Navegar a una pantalla de ayuda
    // router.push('/Devices/TroubleshootScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
   

      {/* Content */}
      <View style={styles.content}>
        {/* Bluetooth Icon */}
        <View style={styles.iconContainer}>
          <Animated.View style={{ opacity: iconOpacity }}>
            <Ionicons name="bluetooth" size={48} color="#2196F3" />
          </Animated.View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Emparejando con OneTouch Select Plus</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Por favor, revisa la pantalla de tu glucómetro y la pantalla de tu teléfono. Si aparece un código en ambos, verifica que coincidan y confírmalo.
        </Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPairing}>
          <Text style={styles.cancelButtonText}>Cancelar emparejamiento</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.troubleButton} onPress={handleTroubleshooting}>
          <Text style={styles.troubleButtonText}>¿Problemas durante el emparejamiento?</Text>
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
    paddingHorizontal: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF4444',
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    fontWeight: 'bold',
  },
  troubleButton: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  troubleButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
  },
});

export default PairingScreen;