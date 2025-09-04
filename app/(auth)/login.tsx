// app/(auth)/login.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, View } from "react-native";

// Importar componentes
import { Body } from "@/components/common/Typography";
import { Button } from "@/components/core/buttons";
import { InputField, useInputField, usePasswordInput, validators } from "@/components/core/inputs";
import { Header } from "@/components/core/navigation/Header";

export default function Login() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Using our custom hooks for form management and validation
  const emailField = useInputField("");
  const passwordField = usePasswordInput("");

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
        email: emailField.value,
        password: passwordField.value,
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

  const handleLogin = () => {
    // Validate fields before submitting
    const emailError = validators.email(emailField.value);
    const passwordError = validators.password(passwordField.value);

    if (emailError || passwordError) {
      Alert.alert("Error de validación", emailError || passwordError || "Por favor verifica los campos");
      return;
    }

    mutation.mutate();
  };

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
                source={require("@/assets/images/dabetai.png")}
                style={{
                  width: 203,
                  height: 66,
                  alignSelf: "center",
                }}
                resizeMode="contain"
              />
            </View>

            {/* Subtítulo */}
            <Body
              className="text-[#62748E] text-center text-base"
              style={{
                marginBottom: 32,
                fontFamily: "Source Sans 3",
                paddingLeft: 50,
                paddingRight: 50,
              }}
            >
              Monitorea tu diabetes con inteligencia artificial
            </Body>

            <View className="gap-6">
              {/* Campo de email */}
              <InputField
                label="Correo electrónico"
                placeholder="correo@ejemplo.com"
                value={emailField.value}
                onChangeText={emailField.handleChange}
                keyboardType="email-address"
                autoCapitalize="none"
                error={emailField.value && validators.email(emailField.value) || undefined}
              />

              {/* Campo de contraseña */}
              <InputField
                label="Contraseña"
                placeholder="*************"
                value={passwordField.value}
                onChangeText={passwordField.handleChange}
                secureTextEntry={passwordField.secureTextEntry}
                showPasswordToggle
                onTogglePassword={passwordField.togglePasswordVisibility}
                error={passwordField.value && validators.password(passwordField.value) || undefined}
              />

              {/* Botón de login */}
              <Button
                title={mutation.isPending ? "Cargando..." : "Iniciar sesión"}
                onPress={handleLogin}
                disabled={mutation.isPending}
                variant="fill"
                color="primary"
              />

              {/* ¿Olvidaste tu contraseña? */}
              <Body
                className="text-center text-primary-900"
                onPress={handleForgotPassword}
              >
                ¿Olvidaste tu contraseña?
              </Body>
            </View>
          </View>
        </View>

        {/* ¿No tienes cuenta? - hasta abajo */}
        <View className="flex-row justify-center items-center">
          <Body className="text-center">¿No tienes una cuenta? </Body>
          <Body className="text-primary-900 text-center" onPress={handleRegisterPress}>
            Regístrate
          </Body>
        </View>
      </View>
    </>
  );
}
