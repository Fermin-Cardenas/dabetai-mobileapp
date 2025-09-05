// app/(auth)/register.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";

// Importar componentes
import { Body } from "@/components/common/Typography";
import { Button } from "@/components/core/buttons";
import {
    InputField,
    useInputField,
    usePasswordInput,
    validators,
} from "@/components/core/inputs";
import { Header } from "@/components/core/navigation/Header";

export default function Register() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Using our custom hooks for form management and validation
  const nombreField = useInputField("");
  const primerApellidoField = useInputField("");
  const segundoApellidoField = useInputField("");
  const emailField = useInputField("");
  const passwordField = usePasswordInput("");
  const confirmPasswordField = usePasswordInput("");

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
        nombre: nombreField.value,
        primerApellido: primerApellidoField.value,
        segundoApellido: segundoApellidoField.value,
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
    // Validate all fields
    const nameError = nombreField.value.trim()
      ? null
      : "El nombre es requerido";
    const firstLastNameError = primerApellidoField.value.trim()
      ? null
      : "El primer apellido es requerido";
    const emailError = validators.email(emailField.value);
    const passwordError = validators.password(passwordField.value);
    const confirmPasswordError =
      confirmPasswordField.value !== passwordField.value
        ? "Las contraseñas no coinciden"
        : null;

    const errors = [
      nameError,
      firstLastNameError,
      emailError,
      passwordError,
      confirmPasswordError,
    ].filter(Boolean);

    if (errors.length > 0) {
      Alert.alert(
        "Error de validación",
        errors[0] || "Por favor verifica los campos"
      );
      return;
    }

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
        <Header title="Registrarse" showBackButton onBackPress={handleBack} />

        {/* ScrollView para contenido scrolleable */}
        <ScrollView
          className="flex-1 flex-grow"
          showsVerticalScrollIndicator={false}
        >
          {/* Contenido principal */}
          <View className="flex-1 p-5">
            {/* Logo dabetai */}
            <View className="items-center mb-2">
              <Image
                source={require("@/assets/images/logos/dabetai-main.png")}
                className="w-48 h-16 self-center"
                resizeMode="contain"
              />
            </View>

            {/* Subtítulo */}
            <Body
              className="text-gray-500 text-center text-base mb-8 px-12 font-normal"
            >
              Monitorea tu diabetes con inteligencia artificial
            </Body>

            {/* Formulario */}
            <View className="gap-6">
              {/* Campo Nombre */}
              <InputField
                label="Nombre"
                placeholder="Ingresa tu nombre"
                value={nombreField.value}
                onChangeText={nombreField.handleChange}
                error={
                  nombreField.value && !nombreField.value.trim()
                    ? "El nombre es requerido"
                    : undefined
                }
              />

              {/* Campo Primer Apellido */}
              <InputField
                label="Primer apellido"
                placeholder="Ingresa tu primer apellido"
                value={primerApellidoField.value}
                onChangeText={primerApellidoField.handleChange}
                error={
                  primerApellidoField.value && !primerApellidoField.value.trim()
                    ? "El primer apellido es requerido"
                    : undefined
                }
              />

              {/* Campo Segundo Apellido */}
              <InputField
                label="Segundo apellido"
                placeholder="Ingresa tu segundo apellido"
                value={segundoApellidoField.value}
                onChangeText={segundoApellidoField.handleChange}
              />

              {/* Campo Email */}
              <InputField
                label="Correo electrónico"
                placeholder="correo@ejemplo.com"
                value={emailField.value}
                onChangeText={emailField.handleChange}
                keyboardType="email-address"
                autoCapitalize="none"
                error={
                  (emailField.value && validators.email(emailField.value)) ||
                  undefined
                }
              />

              {/* Campo Contraseña */}
              <InputField
                label="Contraseña"
                placeholder="Mínimo 6 caracteres"
                value={passwordField.value}
                onChangeText={passwordField.handleChange}
                secureTextEntry={passwordField.secureTextEntry}
                showPasswordToggle
                onTogglePassword={passwordField.togglePasswordVisibility}
                error={
                  (passwordField.value &&
                    validators.password(passwordField.value)) ||
                  undefined
                }
              />

              {/* Campo Repetir Contraseña */}
              <InputField
                label="Repetir contraseña"
                placeholder="Confirma tu contraseña"
                value={confirmPasswordField.value}
                onChangeText={confirmPasswordField.handleChange}
                secureTextEntry={confirmPasswordField.secureTextEntry}
                showPasswordToggle
                onTogglePassword={confirmPasswordField.togglePasswordVisibility}
                error={
                  confirmPasswordField.value &&
                  confirmPasswordField.value !== passwordField.value
                    ? "Las contraseñas no coinciden"
                    : undefined
                }
              />

              {/* Botón de registro */}
              <Button
                title={mutation.isPending ? "Cargando..." : "Registrarse"}
                onPress={handleRegister}
                disabled={mutation.isPending}
                variant="fill"
                color="primary"
              />
            </View>
          </View>

          {/* ¿Ya tienes cuenta? - al final del scroll */}
          <View className="items-center">
            <Body className="text-center" onPress={handleLoginPress}>
              ¿Ya tienes una cuenta?{" "}
              <Body className="text-primary-900">Inicia sesión</Body>
            </Body>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
