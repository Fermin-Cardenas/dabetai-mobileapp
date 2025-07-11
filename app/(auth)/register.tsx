// app/(auth)/register.tsx
import React, { useState, useEffect } from "react";
import { View, Alert, Image, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Importar componentes
import { InputField } from "@/components/core/inputs/InputField";
import { PrimaryButton } from "@/components/core/buttons/PrimaryButton";
import { Body } from "@/components/common/Typography";
import { Header } from "@/components/core/navigation/Header";

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
          router.push("/(auth)/login");
        } catch (error) {
          Alert.alert("Error", "No se pudo guardar la sesión.");
        }
      } else {
        console.error("Éxito", "Registro exitoso");
      }
    },
    onError: () => {
      Alert.alert("Éxito", "Registro exitoso");
    },
  });

  const handleRegister = () => {
    mutation.mutate();
    router.push("/onboarding");
  };

  const handleLoginPress = () => {
    router.push("/(auth)/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 bg-[#f1f5f9]">
        {/* Header azul con título y flecha de regreso */}
        <Header 
          title="Registrarse"
          showBackButton
          onBackPress={handleBack}
        />

        {/* ScrollView para contenido scrolleable */}
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Contenido principal */}
          <View className="flex-1" style={{ padding: 20 }}>
            
            {/* Logo dabetai */}
            <View className="items-center" style={{ marginBottom: 8 }}>
              <Image
                source={require('@/assets/images/dabetai.png')}
                style={{
                  width: 203,
                  height: 66,
                  alignSelf: "center"
                }}
                resizeMode="contain"
              />
            </View>
            
            {/* Subtítulo */}
            <Body 
              className="text-[#62748E] text-center text-base"
              style={{
                marginBottom: 32,
                fontFamily: 'Source Sans 3',
                paddingLeft: 50,
                paddingRight: 50
              }}
            >
              Monitorea tu diabetes con inteligencia artificial
            </Body>

            {/* Formulario */}
            <View>
              {/* Campo Nombre */}
              <InputField
                label="Nombre"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChangeText={setNombre}
              />

              {/* Campo Primer Apellido */}
              <InputField
                label="Primer apellido"
                placeholder="Ingresa tu primer apellido"
                value={primerApellido}
                onChangeText={setPrimerApellido}
              />

              {/* Campo Segundo Apellido */}
              <InputField
                label="Segundo apellido"
                placeholder="Ingresa tu segundo apellido"
                value={segundoApellido}
                onChangeText={setSegundoApellido}
              />

              {/* Campo Email */}
              <InputField
                label="Correo electrónico"
                placeholder="correo@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Campo Contraseña */}
              <InputField
                label="Contraseña"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                showPasswordToggle
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              {/* Campo Repetir Contraseña */}
              <InputField
                label="Repetir contraseña"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                showPasswordToggle
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              {/* Botón de registro */}
              <View className="flex-row justify-center" style={{ marginTop: 20 }}>
                <PrimaryButton
                  title={mutation.isPending ? "Cargando..." : "Registrarse"}
                  onPress={handleRegister}
                  disabled={mutation.isPending}
                />
              </View>
            </View>
          </View>

          {/* ¿Ya tienes cuenta? - al final del scroll */}
          <View className="items-center" style={{ paddingBottom: 40, paddingHorizontal: 20 }}>
            <Body
              className="text-gray-600 text-center font-semibold"
              style={{
                fontSize: 16,
                fontFamily: 'Source Sans 3'
              }}
              onPress={handleLoginPress}
            >
              ¿Ya tienes una cuenta?{' '}
              <Body 
                className="text-[#2196F3] font-semibold"
                style={{
                  fontSize: 16,
                  fontFamily: 'Source Sans 3'
                }}
              >
                Inicia sesión
              </Body>
            </Body>
          </View>
        </ScrollView>
      </View>
    </>
  );
}