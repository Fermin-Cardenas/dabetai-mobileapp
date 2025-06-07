import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function OnboardingCompleteScreen() {
  const router = useRouter();

  const handleContinue = () => {
    console.log('Registro completado');
    router.push('/Home/Home');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Card style={styles.card}>
            <Card.Content style={{ padding: 0, marginBottom: 0 }}>
              <View style={{ paddingHorizontal: 0 }}>
                <Text style={styles.labelTitle}>¡Todo listo!</Text>
                <Text style={styles.subtitle}>
                  Hemos configurado tu perfil inicial. Ahora puedes empezar a registrar tus datos, explorar tus tendencias y ver tus predicciones personalizadas.
                </Text>
              </View>
            </Card.Content>

            <Card.Content style={{ marginTop: 500, padding: 0, alignItems: 'center' }}>
              <Button 
                mode="contained" 
                style={styles.button} 
                labelStyle={styles.buttomText}
                onPress={handleContinue}
              >
                Continuar
              </Button>
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
    color: '#314158',
    fontSize: 29,
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 32,
    color: '#62748E',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Source Sans 3',
    paddingLeft: 0, // puedes ajustar si quieres menos
    paddingRight: 0,
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
  buttomText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});