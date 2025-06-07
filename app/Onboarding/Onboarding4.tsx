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

const BirthDateScreen = () => {
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedMonth, setSelectedMonth] = useState(6); // Junio
  const [selectedYear, setSelectedYear] = useState(1986);
  const router = useRouter();
  
  const dayScrollRef = useRef<ScrollView>(null) as React.RefObject<ScrollView>;
  const monthScrollRef = useRef<ScrollView>(null) as React.RefObject<ScrollView>;
  const yearScrollRef = useRef<ScrollView>(null) as React.RefObject<ScrollView>;
  
  // Generar días (1-31)
  const days: number[] = [];
  for (let day = 1; day <= 31; day++) {
    days.push(day);
  }
  
  // Meses en español
  const months = [
    { number: 1, name: 'Enero' },
    { number: 2, name: 'Febrero' },
    { number: 3, name: 'Marzo' },
    { number: 4, name: 'Abril' },
    { number: 5, name: 'Mayo' },
    { number: 6, name: 'Junio' },
    { number: 7, name: 'Julio' },
    { number: 8, name: 'Agosto' },
    { number: 9, name: 'Septiembre' },
    { number: 10, name: 'Octubre' },
    { number: 11, name: 'Noviembre' },
    { number: 12, name: 'Diciembre' }
  ];
  
  // Generar años (desde 1950 hasta año actual)
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = 1950; year <= currentYear; year++) {
    years.push(year);
  }

  // Efecto para hacer scroll a las posiciones iniciales
  useEffect(() => {
    const scrollToInitialPositions = () => {
      // Scroll para día (15)
      const dayIndex = days.findIndex(day => day === 15);
      if (dayIndex !== -1 && dayScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = dayIndex * itemHeight;
        dayScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
      
      // Scroll para mes (Junio)
      const monthIndex = months.findIndex(month => month.number === 6);
      if (monthIndex !== -1 && monthScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = monthIndex * itemHeight;
        monthScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
      
      // Scroll para año (1986)
      const yearIndex = years.findIndex(year => year === 1986);
      if (yearIndex !== -1 && yearScrollRef.current) {
        const itemHeight = 70;
        const scrollPosition = yearIndex * itemHeight;
        yearScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }
    };

    setTimeout(scrollToInitialPositions, 100);
  }, []);

  const handleContinue = () => {
    const selectedMonthName = months.find(m => m.number === selectedMonth)?.name;
    const birthDate = {
      day: selectedDay,
      month: selectedMonth,
      monthName: selectedMonthName,
      year: selectedYear
    };
    
    console.log('Fecha seleccionada:', birthDate);
    
    // Navegar a la siguiente pantalla pasando la fecha de nacimiento
    router.push({
      pathname: '/Onboarding/Onboarding5', // Cambia por la ruta que necesites
      params: { 
        birthDay: selectedDay,
        birthMonth: selectedMonth,
        birthMonthName: selectedMonthName,
        birthYear: selectedYear
      }
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderScrollColumn = (
    items: any[],
    selectedValue: any,
    onSelect: (value: any) => void,
    scrollRef: React.RefObject<ScrollView>,
    renderItem: (item: any) => string | number
  ) => (
    <View style={styles.columnContainer}>
      <ScrollView 
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => {
          const itemValue = typeof item === 'object' ? item.number : item;
          const isSelected = selectedValue === itemValue;
          
          return (
            <View key={index} style={styles.itemWrapper}>
              {isSelected && <View style={styles.topline} />}
              <TouchableOpacity
                style={styles.scrollItem}
                onPress={() => onSelect(itemValue)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.itemText,
                  isSelected && styles.itemTextSelected
                ]}>
                  {renderItem(item)}
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
      
      {/* Header with back button */}

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¿Cuál es tu fecha de nacimiento?</Text>
      </View>

      {/* Date Selector */}
      <View style={styles.centerContainer}>
        <View style={styles.dateSelectorContainer}>
          <View style={styles.columnsWrapper}>
            {/* Día */}
            {renderScrollColumn(
              days,
              selectedDay,
              setSelectedDay,
              dayScrollRef,
              (day) => day
            )}
            
            {/* Mes */}
            {renderScrollColumn(
              months,
              selectedMonth,
              setSelectedMonth,
              monthScrollRef,
              (month) => month.name
            )}
            
            {/* Año */}
            {renderScrollColumn(
              years,
              selectedYear,
              setSelectedYear,
              yearScrollRef,
              (year) => year
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
  dateSelectorContainer: {
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
    fontSize: 18,
    color: '#999',
    fontWeight: '400',
  },
  itemTextSelected: {
    fontSize: 18,
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

export default BirthDateScreen;