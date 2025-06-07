import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';

const GenderScreen = () => {
  const [selectedGender, setSelectedGender] = useState('M');
  const router = useRouter();

  const genderOptions = [
    { id: 'm', label: 'Masculino', value: 'M' },
    { id: 'f', label: 'Femenino', value: 'F' },
  ];

  const handleContinue = () => {
    console.log('Género seleccionado:', selectedGender);
    // Navegar a la siguiente pantalla pasando el género seleccionado
    router.push({
      pathname: '/Onboarding/Onboarding6', // Cambia por la ruta que necesites
      params: { gender: selectedGender }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¿Cuál es tu género?</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {genderOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionRow,
              selectedGender === option.value && styles.optionRowSelected
            ]}
            onPress={() => setSelectedGender(option.value)}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={styles.iconContainer}>
                <View style={styles.infoIcon}>
                  <Text style={styles.infoText}>i</Text>
                </View>
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioButton,
                  selectedGender === option.value && styles.radioButtonSelected
                ]}>
                  {selectedGender === option.value && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  optionRow: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
  },
  optionRowSelected: {
    borderWidth: 1,
    borderColor: '#87CEEB',
    backgroundColor: '#f0f8ff',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  radioContainer: {
    marginLeft: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#007AFF',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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

export default GenderScreen;