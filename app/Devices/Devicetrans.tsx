import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const SyncDataScreen = () => {
  const router = useRouter();
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
  const [readingsTransferred, setReadingsTransferred] = useState(0);

  const totalReadings = 250;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    
    rotateAnimation.start();

    // Simular progreso de sincronización
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.02; // Incrementa 2% cada intervalo
        if (newProgress >= 1) {
          clearInterval(progressInterval);
          // Navegar a Devicefind cuando se complete la sincronización
          setTimeout(() => {
            router.push('/Devices/Devicetranscom');
          }, 500);
          return 1;
        }
        return newProgress;
      });
    }, 200);
    
    return () => {
      rotateAnimation.stop();
      clearInterval(progressInterval);
    };
      }, [rotateValue, router]);

  // Actualizar lecturas basado en el progreso
  useEffect(() => {
    const newReadingsTransferred = Math.floor(progress * totalReadings);
    setReadingsTransferred(newReadingsTransferred);
  }, [progress, totalReadings]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleCancelSync = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
     

      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ rotate }] }]}>
          <Icon name="sync" size={48} color="#314158" />
        </Animated.View>

        <Text style={styles.title}>Sincronizando datos de{'\n'}One Touch Select Plus</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>Transferidas {readingsTransferred} de {totalReadings} lecturas</Text>
        </View>

        <Text style={styles.instructions}>
          Por favor, mantén la aplicación abierta y el dispositivo cerca hasta que la sincronización termine.
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSync}>
          <Text style={styles.cancelButtonText}>Cancelar sincronización</Text>
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
    marginBottom: 40,
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 16,
    color: '#62748E',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 350,
    marginBottom: 40,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E7FF',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    color: '#2196F3',
    fontFamily: 'Source Sans 3',
    fontWeight: '600',
  },
  instructions: {
    fontSize: 16,
    color: '#62748E',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 350,
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
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF4444',
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    fontWeight: 'bold',
  },
});

export default SyncDataScreen;