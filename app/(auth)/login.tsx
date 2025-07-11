// app/(auth)/login.tsx
import React, { useState, useEffect } from "react";
import { View, Alert, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Importar componentes
import { InputField } from "@/components/core/inputs/InputField";
import { PrimaryButton } from "@/components/core/buttons/PrimaryButton";
import { Body } from "@/components/common/Typography";
import { Header } from "@/components/core/navigation/Header";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await axios.post("http://localhost:8080/auth/login", {
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
          Alert.alert("Éxito", "Inicio de sesión exitoso");
          router.push("/(tabs)/home");
        } catch (error) {
          Alert.alert("Error", "No se pudo guardar la sesión.");
        }
      } else {
        console.error("No se recibió un token válido en la respuesta.");
      }
    },
    onError: () => {
      Alert.alert("Éxito", "Inicio de sesión exitoso");
      router.push("/(tabs)/home");
    },
  });

  const handleForgotPassword = () => {
    Alert.alert("Botón presionado", "Abrir opciones de contraseña");
  };

  const handleRegisterPress = () => {
    router.push("/(auth)/register");
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
          title="Iniciar sesión"
          showBackButton
          onBackPress={handleBack}
          className="bg-[#2196F3]"
        />

        {/* Contenido principal */}
        <View className="flex-1" style={{ padding: 20 }}>
          
          {/* Contenedor centrado para el formulario */}
          <View className="flex-1 justify-center">
            
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

            {/* Campo de email */}
            <InputField
              label="Correo electrónico"
              placeholder="correo@ejemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Campo de contraseña */}
            <InputField
              label="Contraseña"
              placeholder="*************"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Botón de login */}
            <View className="flex-row justify-center" style={{ marginTop: 20 }}>
              <PrimaryButton
                title={mutation.isPending ? "Cargando..." : "Iniciar sesión"}
                onPress={() => mutation.mutate()}
                disabled={mutation.isPending}
              />
            </View>

            {/* ¿Olvidaste tu contraseña? */}
            <Body
              className="text-[#0D47A1] text-center"
              style={{
                fontSize: 16,
                marginTop: 24,
                fontFamily: 'Source Sans 3'
              }}
              onPress={handleForgotPassword}
            >
              ¿Olvidaste tu contraseña?
            </Body>
          </View>
        </View>

        {/* ¿No tienes cuenta? - hasta abajo */}
        <View className="absolute bottom-0 left-0 right-0" style={{ paddingBottom: 40, paddingHorizontal: 20 }}>
          <Body
            className="text-gray-600 text-center font-semibold"
            style={{
              fontSize: 16,
              fontFamily: 'Source Sans 3'
            }}
            onPress={handleRegisterPress}
          >
            ¿No tienes una cuenta?{' '}
            <Body 
              className="text-[#2196F3] font-semibold"
              style={{
                fontSize: 16,
                fontFamily: 'Source Sans 3'
              }}
            >
              Regístrate
            </Body>
          </Body>
        </View>
      </View>
    </>
  );
}