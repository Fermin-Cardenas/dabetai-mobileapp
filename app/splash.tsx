import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Mantener la splash screen nativa visible
SplashScreen.preventAutoHideAsync();

const CustomSplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Ocultar splash nativa y navegar
      SplashScreen.hideAsync();
      router.replace('/Auth/Login'); // Cambia por tu ruta principal
    }, 2000); // 2 segundos

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Opción 1: Solo texto */}
      <Text style={styles.logoText}>dabetai</Text>
      
      {/* Opción 2: Si tienes imagen, descomenta esto y comenta el texto
      <Image 
        source={require('../assets/images/dabetai.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3', // Fondo azul
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto blanco
    fontFamily: 'Source Sans 3', // Tu fuente
  },
  logo: {
    width: 200,
    height: 100,
  },
});

export default CustomSplashScreen;