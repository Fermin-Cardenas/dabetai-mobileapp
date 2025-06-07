import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const OneTouchConnectScreen = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleSearchDevice = () => {
    router.push('/Devices/Devicefind');
  };

  const handleTroubleshooting = () => {
    console.log('¿Tienes problemas para conectar?');
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título */}
        <Text style={styles.title}>Conecta tu One Touch Select Plus</Text>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
           Sigue estos sencillos pasos para emparejar tu glucómetro con dabetai y empezar a sincronizar tus mediciones.
        </Text>

        {/* Lista de instrucciones */}
        <View style={styles.instructionsList}>
          {/* Instrucción 1 */}
          <View style={styles.instructionItem}>
            <Text style={styles.numberText}>1.</Text>
            <Text style={styles.instructionText}>
              Asegúrate de que tu glucómetro One Touch Select Plus esté encendido y con
              batería suficiente.
            </Text>
          </View>

          {/* Instrucción 2 */}
          <View style={styles.instructionItem}>
            <Text style={styles.numberText}>2.</Text>
            <Text style={styles.instructionText}>
                Pon tu glucómetro en modo de emparejamiento Bluetooth. (Consulta el manual de tu dispositivo para ver cómo hacerlo, a menudo es en el menú "Configuración" o "Bluetooth").
             </Text>
          </View>

          {/* Instrucción 3 */}
          <View style={styles.instructionItem}>
            <Text style={styles.numberText}>3.</Text>
            <Text style={styles.instructionText}>
              Asegúrate de que el Bluetooth de tu teléfono esté activado.
            </Text>
          </View>

          {/* Instrucción 4 */}
          <View style={styles.instructionItem}>
            <Text style={styles.numberText}>4.</Text>
            <Text style={styles.instructionText}>
              Mantén el glucómetro cerca de tu teléfono.
            </Text>
          </View>

          {/* Instrucción 5 */}
          <View style={[styles.instructionItem, { marginBottom: 0, paddingBottom: 0, borderBottomWidth: 0 }]}>
            <Text style={styles.numberText}>5.</Text>
            <Text style={styles.instructionText}>
              Toca el botón "Buscar glucómetro" abajo. Selecciona tu dispositivo cuando aparezca.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchDevice}>
          <Text style={styles.searchButtonText}>Buscar glucómetro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.troubleButton} onPress={handleTroubleshooting}>
          <Text style={styles.troubleButtonText}>¿Tienes problemas para conectar?</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#314158',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#62748E',
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  instructionsList: {
    marginBottom: 0,
    marginHorizontal: -16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
    paddingBottom: 16,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  numberText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
    fontFamily: 'Source Sans 3',
    marginRight: 16,
    marginTop: 2,
    minWidth: 24,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#314158',
    fontFamily: 'Source Sans 3',
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },
  searchButton: {
    width: 343,
    height: 44,
    borderRadius: 100,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Source Sans 3',
  },
  troubleButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  troubleButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontFamily: 'Source Sans 3',
  },
});

export default OneTouchConnectScreen;