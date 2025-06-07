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

const WeightScreen = () => {
  const [selectedKg, setSelectedKg] = useState(96); // 96 kg por defecto
  const [selectedGrams, setSelectedGrams] = useState(100); // 100 g por defecto
  const router = useRouter();
  
  const kgScrollRef = useRef<ScrollView>(null) as React.RefObject<ScrollView>;
  const gramsScrollRef = useRef<ScrollView>(null) as React.RefObject<ScrollView>;
  
  // Generar kilogramos desde 30 kg hasta 200 kg
  const kilograms: number[] = [];
  for (let kg = 30; kg <= 200; kg++) {
    kilograms.push(kg);
  }
  
  // Generar gramos: 000, 100, 200, 300, 400, 500, 600, 700, 800, 900
  const grams: number[] = [];
  for (let g = 0; g <= 900; g += 100) {
    grams.push(g);
  }

  // Efecto para hacer scroll a las posiciones iniciales
  useEffect(() => {
    const scrollToInitialPositions = () => {
      // Scroll para kilogramos (96)
      const kgIndex = kilograms.findIndex(kg => kg === 96);
      if (kgIndex !== -1 && kgScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = kgIndex * itemHeight;
        kgScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
      
      // Scroll para gramos (100)
      const gramsIndex = grams.findIndex(g => g === 100);
      if (gramsIndex !== -1 && gramsScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = gramsIndex * itemHeight;
        gramsScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
    };

    setTimeout(scrollToInitialPositions, 100);
  }, []);

  const handleContinue = () => {
    const totalWeight = selectedKg + (selectedGrams / 1000);
    const weightData = {
      kg: selectedKg,
      grams: selectedGrams,
      total: totalWeight
    };
    
    console.log('Peso seleccionado:', {
      kg: selectedKg,
      grams: selectedGrams,
      total: totalWeight + ' kg'
    });
    
    // Navegar a la siguiente pantalla pasando el peso seleccionado
    router.push({
      pathname: '/Onboarding/Onboarding8', // Cambia por la ruta que necesites
      params: { 
        weightKg: selectedKg,
        weightGrams: selectedGrams,
        totalWeight: totalWeight.toString()
      }
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderScrollColumn = (
    items: number[],
    selectedValue: number,
    onSelect: (value: number) => void,
    scrollRef: React.RefObject<ScrollView>,
    unit: string
  ) => (
    <View style={styles.columnContainer}>
      <ScrollView 
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => {
          const isSelected = selectedValue === item;
          
          return (
            <View key={index} style={styles.itemWrapper}>
              {isSelected && <View style={styles.topline} />}
              <TouchableOpacity
                style={styles.scrollItem}
                onPress={() => onSelect(item)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.itemText,
                  isSelected && styles.itemTextSelected
                ]}>
                  {unit === 'g' && item === 0 ? '000' : item} {unit}
                </Text>
              </TouchableOpacity>
              {isSelected && <View style={styles.underline} />}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¿Cuál es tu peso actual?</Text>
      </View>

      {/* Weight Selector */}
      <View style={styles.centerContainer}>
        <View style={styles.weightSelectorContainer}>
          <View style={styles.columnsWrapper}>
            {/* Kilogramos */}
            {renderScrollColumn(
              kilograms,
              selectedKg,
              setSelectedKg,
              kgScrollRef,
              'kg'
            )}
            
            {/* Gramos */}
            {renderScrollColumn(
              grams,
              selectedGrams,
              setSelectedGrams,
              gramsScrollRef,
              'g'
            )}
          </View>
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
  weightSelectorContainer: {
    height: 220,
    width: '100%',
  },
  columnsWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  columnContainer: {
    flex: 1,
    height: '100%',
  },
  itemWrapper: {
    width: '100%',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 70,
  },
  scrollItem: {
    paddingVertical: 25,
    alignItems: 'center',
    position: 'relative',
    height: 70,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '400',
  },
  itemTextSelected: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  topline: {
    position: 'absolute',
    top: 8,
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: '#007AFF',
  },
  underline: {
    position: 'absolute',
    bottom: 8,
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: '#007AFF',
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

export default WeightScreen;