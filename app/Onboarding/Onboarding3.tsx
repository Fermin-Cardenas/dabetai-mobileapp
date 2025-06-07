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

const DiabetesYearScreen = () => {
  const [selectedYear, setSelectedYear] = useState(1999); // Cambiado a 2002
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  
  // Generar años desde 1950 hasta el año actual
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = 1950; year <= currentYear; year++) {
    years.push(year);
  }

  // Efecto para hacer scroll al año seleccionado cuando el componente se monte
  useEffect(() => {
    if (scrollViewRef.current) {
      // Encontrar el índice del año 2002
      const yearIndex = years.findIndex(year => year === 2002);
      if (yearIndex !== -1) {
        // Calcular la posición aproximada (altura de cada item es ~70px basado en paddingVertical)
        const itemHeight = 70;
        const scrollPosition = yearIndex * itemHeight;
        
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
    console.log('Año seleccionado:', selectedYear);
    // Navegar a la siguiente pantalla pasando el año de diagnóstico
    router.push({
      pathname: '/Onboarding/Onboarding4', // Cambia por la ruta que necesites
      params: { diagnosisYear: selectedYear }
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¿En qué año te diagnosticaron diabetes?</Text>
      </View>

      {/* Year Selector */}
      <View style={styles.centerContainer}>
        <View style={styles.yearSelectorContainer}>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {years.map((year) => (
              <View key={year} style={styles.yearWrapper}>
                {selectedYear === year && <View style={styles.topline} />}
                <TouchableOpacity
                  style={styles.yearItem}
                  onPress={() => handleYearSelect(year)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.yearText,
                    selectedYear === year && styles.yearTextSelected
                  ]}>
                    {year}
                  </Text>
                </TouchableOpacity>
                {selectedYear === year && <View style={styles.underline} />}
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
    marginBottom: 0,
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
  yearSelectorContainer: {
    height: 220,
    width: '100%',
  },
  yearWrapper: {
    width: Dimensions.get('window').width,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
  },
  yearItem: {
    paddingVertical: 25,
    alignItems: 'center',
    position: 'relative',
  },
  yearText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '400',
  },
  yearTextSelected: {
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

export default DiabetesYearScreen;