import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Card } from "react-native-paper";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estados únicos para cada campo
  const [nombre, setNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("Token recuperado:", storedToken);
        setToken(storedToken);
      } catch (error) {
        console.error("Error al recuperar el token", error);
      }
    };

    fetchToken();
  }, []);

  const storeUserData = async (jwt: string, user: object) => {
    try {
      await AsyncStorage.setItem("token", jwt);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setToken(jwt);
      console.log("Token guardado correctamente:", jwt);
    } catch (error) {
      console.error("Error guardando datos en AsyncStorage", error);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://localhost:8080/auth/register", {
        nombre,
        primerApellido,
        segundoApellido,
        email,
        password,
      });
      console.log("Respuesta del servidor:", response.data);
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.jwt) {
        try {
          await storeUserData(data.jwt, data);
          Alert.alert("Éxito", "Registro exitoso");
          router.push("/ScreenLoad/Load");
        } catch (error) {
          Alert.alert("Error", "No se pudo guardar la sesión.");
        }
      } else {
        console.error("No se recibió un token válido en la respuesta.");
      }
    },
    onError: () => {
      Alert.alert("Error", "Error en el registro o datos incorrectos");
    },
  });

  const handleRegister = () => {
    mutation.mutate();
    router.push("/Devices/Typeselect");
  };

  return (
<ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container} >
      <View style={styles.formContainer}>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <Image source={require("../../src/assets/images/dabetai.png")} style={styles.image} />
            <Text style={styles.subtitle}>Monitorea tu diabetes con inteligencia artificial</Text>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nombre"
              placeholderTextColor="#888"
              value={nombre}
              onChangeText={setNombre}
            />
            <Text style={styles.label}>Primer Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu primer apellido"
              placeholderTextColor="#888"
              value={primerApellido}
              onChangeText={setPrimerApellido}
            />
            <Text style={styles.label}>Segundo Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu segundo apellido"
              placeholderTextColor="#888"
              value={segundoApellido}
              onChangeText={setSegundoApellido}
            />
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="#888" />
              </TouchableOpacity>
            </View>
             <Text style={styles.label}>Repetir Contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#888"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.icon}>
                <MaterialCommunityIcons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="#888" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.actions}>
              <Button mode="contained" style={styles.buttons} onPress={handleRegister} disabled={mutation.isPending}>
                {mutation.isPending ? "Cargando..." : "Registrarse"}
              </Button>
            </View>
         
            
          </Card.Content>
          
        </Card>
<Card.Content style={{ paddingTop: 0}}>
  <TouchableOpacity onPress={() => router.push("/Auth/Login")}>
    <Text style={styles.labelSubtitle}>
      ¿Ya tienes una cuenta?{' '}
      <Text style={[styles.labelSubtitle, { color: '#2196F3' }]}>Inicia sesión</Text>
    </Text>
  </TouchableOpacity>
</Card.Content>

      </View>
      

{/* 
  // Mostrar el token almacenado
  <View style={styles.tokenContainer}>
    <Text style={styles.label}>Token guardado:</Text>
    <Text style={styles.token}>{token ?? "No hay token almacenado"}</Text>
  </View>
*/}

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
      scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 0,
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  card: {
    width: "100%",
    padding: 0,
    backgroundColor: "#f1f5f9",
  },
  label: {
    marginBottom: 2,
    color: "#314158",
    fontSize: 16,
    fontFamily: 'Source Sans 3',
  },
  input: {
    height: 44,
    borderColor: "#CAD5E2",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingLeft: 10,
    color: "#62748E",
    backgroundColor: "#fff",
    fontFamily: 'Source Sans 3',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CAD5E2",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 44,
    color: "#62748E",
    fontFamily: 'Source Sans 3',
    
  },
    buttons: {
        width: 343,
        height: 44,
        borderRadius: 100,
        backgroundColor: "#2196F3",
        color: "#fff",
        fontFamily: 'Source Sans 3',
    },
  icon: {
    padding: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    width: 203,
    height: 66,
    marginTop: 0,
    alignSelf: "center",
  },
  button: {
    width: 210,
    height: 42,
    borderRadius: 8,
    color: "#fff",
  },
    subtitle: {
        marginBottom: 32,
        color: "#62748E",
        fontSize: 16,
   
        textAlign: "center",
        fontFamily: 'Source Sans 3',
        paddingLeft:50,
        paddingRight:50,    
    },
  tokenContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
  },
  token: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
    labelSubtitle: {
    marginBottom: 0,
    color: 'gray', 
    fontSize: 16,
    fontFamily: 'Source Sans 3',
    textAlign: 'center',
    fontWeight: '600',
  },
});