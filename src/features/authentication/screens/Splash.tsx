import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Mantener la splash screen nativa visible
SplashScreen.preventAutoHideAsync();

const CustomSplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // PRIMERO: Ocultar la splash nativa inmediatamente para mostrar la personalizada
        await SplashScreen.hideAsync();
        
        // SEGUNDO: Mostrar tu splash personalizada por el tiempo deseado
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 segundos de tu splash
        
        // TERCERO: Navegar a la pantalla principal
        router.replace('/welcome');
      } catch (error) {
        console.error('Error en splash screen:', error);
        // En caso de error, aún navegar
        router.replace('/welcome');
      }
    };

    initializeApp();
  }, [router]);

  return (
    <View style={styles.container}>
      
      
            
      <Image 
        source={require('../assets/images/dabetai3.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'System', // Cambiado a fuente del sistema por compatibilidad
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  logo: {
    width: 200,
    height: 100,
  },
});

export default CustomSplashScreen;