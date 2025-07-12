import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack, useRouter } from 'expo-router'; // Importamos Link y useRouter para las rutas
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, Provider as PaperProvider } from 'react-native-paper';

export default function Load() {
  const router = useRouter();

  return (
    <PaperProvider>
      {/* Añade esta línea para ocultar el header */}
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Card style={styles.card}>
            <Card.Content >
                <Image source={require('@/src/assets/images/dabetai.png')} style={styles.imageDabetai} />
              <Image source={require('@/src/assets/images/Logo.png')} style={styles.image} />

              <Card.Content style={{ marginBottom: 0, padding:0 }}>
                <Text style={styles.labelTitle}>Monitorea tu diabetes con inteligencia artificial</Text>
              </Card.Content>

            
            </Card.Content>

            {/* Botón para iniciar sesión */}
            <View style={styles.actions}>
              <Link href="/Auth/Register" asChild>
                <TouchableOpacity onPress={async () => {
                  await AsyncStorage.clear(); // Limpiar AsyncStorage
                }}>
                  <Button mode="contained" style={styles.button} labelStyle={styles.buttomText}>
                    Registrarse
                  </Button>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Botón para registrarse */}
            <View style={styles.actions}>
              <Link href="/Auth/Login" asChild>
                <TouchableOpacity onPress={async () => {
                  await AsyncStorage.clear(); // Limpiar AsyncStorage
                }}>
                  <Button mode="contained" style={styles.buttonAlternative} labelStyle={styles.buttonAlternativeText}>
                    Iniciar sesión
                  </Button>
                </TouchableOpacity>
              </Link>
            </View>

            <Card.Content style={{ marginTop: 100, padding: 16 }}>
              <Text style={styles.labelSubtitle}>
                Continúa solo si estás de acuerdo con nuestros{' '}
                <Text 
                  style={[styles.labelSubtitle, { color: '#2196F3' }]}
                  onPress={() => router.push('/ScreenLoad/tyc')}
                >
                  Términos y condiciones 
                </Text>
                y nuestra{' '}
                <Text 
                  style={[styles.labelSubtitle, { color: '#2196F3' }]}
                  onPress={() => router.push('/ScreenLoad/privacy')}
                >
                  Política de privacidad
                </Text>.
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 0,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#f1f5f9',
  },
  card: {
    width: '100%',  
    padding: 0,
    borderRadius: 8,
    backgroundColor: '#f1f5f9', 
    elevation: 0,
    shadowColor: 'transparent',
    borderWidth: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  labelTitle: {
    marginBottom: 2,
    color: '#314158 ', 
    fontSize: 26,
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  labelSubtitle: {
    marginBottom: 100,
    color: 'gray', 
    fontSize: 12,
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
    alignSelf: 'center',
  },
  imageDabetai: {
    width:  202,
    height: 66,
    marginBottom: 120,
    marginTop: 90,
    alignSelf: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,

  },
  button: {
    width: 343,
    height: 44,
    borderRadius: 28.17,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 24,
  },
  buttonAlternative: {
    width: 343,
    height: 44,
    borderRadius: 28.17,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
    
  },
  buttonAlternativeText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
  },
  buttomText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
    fontWeight: '500',
  },
});