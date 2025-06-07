import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';

const HeightScreen = () => {
  const [selectedHeight, setSelectedHeight] = useState(174); // 178 cm por defecto
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  
  // Generar estaturas desde 100 cm hasta 250 cm
  const heights: number[] = [];
  for (let height = 100; height <= 250; height++) {
    heights.push(height);
  }

  // Efecto para hacer scroll a la estatura seleccionada cuando el componente se monte
  useEffect(() => {
    if (scrollViewRef.current) {
      // Encontrar el índice de 178 cm
      const heightIndex = heights.findIndex(height => height === 178);
      if (heightIndex !== -1) {
        // Calcular la posición aproximada (altura de cada item es ~70px basado en paddingVertical)
        const itemHeight = 70;
        const scrollPosition = heightIndex * itemHeight;
        
        // Hacer scroll con un pequeño delay para asegurar que el componente esté montado
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: scrollPosition,
            animated: true
          });
        }, 100);
      }
    }
  }, []);

  const handleContinue = () => {
    console.log('Estatura seleccionada:', selectedHeight + ' cm');
    // Navegar a la siguiente pantalla pasando la estatura seleccionada
    router.push({
      pathname: '/Onboarding/Onboarding7', // Cambia por la ruta que necesites
      params: { height: selectedHeight }
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleHeightSelect = (height: number) => {
    setSelectedHeight(height);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¿Cuál es tu estatura?</Text>
      </View>

      {/* Height Selector */}
      <View style={styles.centerContainer}>
        <View style={styles.heightSelectorContainer}>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {heights.map((height) => (
              <View key={height} style={styles.heightWrapper}>
                {selectedHeight === height && <View style={styles.topline} />}
                <TouchableOpacity
                  style={styles.heightItem}
                  onPress={() => handleHeightSelect(height)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.heightText,
                    selectedHeight === height && styles.heightTextSelected
                  ]}>
                    {height} cm
                  </Text>
                </TouchableOpacity>
                {selectedHeight === height && <View style={styles.underline} />}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heightSelectorContainer: {
    height: 220,
    width: '100%',
  },
  heightWrapper: {
    width: Dimensions.get('window').width,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
  },
  heightItem: {
    paddingVertical: 25,
    alignItems: 'center',
    position: 'relative',
  },
  heightText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '400',
  },
  heightTextSelected: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: '600',
  },
  topline: {
    position: 'absolute',
    top: 8,
    left: 20,
    right: 0,
    height: 2,
    backgroundColor: '#007AFF',
    width: '85%',
  },
  underline: {
    position: 'absolute',
    bottom: 8,
    left: 20,   
    right: 0,
    height: 2,
    backgroundColor: '#007AFF',
    width: '85%',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HeightScreen;