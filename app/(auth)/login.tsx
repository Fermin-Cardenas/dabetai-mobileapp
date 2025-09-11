// app/(auth)/login.tsx
import React from "react";
import { Image, View } from "react-native";

// Importar componentes
import { Body } from "@/components/common/Typography";
import { Button } from "@/components/core/buttons";
import {
  InputField,
  useInputField,
  usePasswordInput,
  validators,
} from "@/components/core/inputs";
import { AppLayout } from "@/components/layouts";
import { useAuth } from "@/hooks";

export default function Login() {
  const { login, isLoginLoading } = useAuth();

  // Using our custom hooks for form management and validation
  const emailField = useInputField("");
  const passwordField = usePasswordInput("");

  const handleLogin = () => {
    // Validate fields before submitting
    const emailError = validators.email(emailField.value);
    const passwordError = validators.password(passwordField.value);

    if (emailError || passwordError) {
      alert(
        `Error de validación: ${emailError || passwordError || "Por favor verifica los campos"}`
      );
      return;
    }

    login({
      email: emailField.value,
      password: passwordField.value,
    });
  };

  const handleForgotPassword = () => {
    alert("Funcionalidad de recuperar contraseña en desarrollo");
  };

  const handleRegisterPress = () => {
    // Navigation will be handled by useAuth hook
  };


  return (
    <AppLayout
      title="Iniciar sesión"
      headerVariant="section"
      showNavigation={false}
    >
      {/* Contenedor centrado para el formulario */}
      <View className="flex-1 gap-4">
        {/* Logo dabetai */}
        <View className="items-center gap-2">
          <Image
            source={require("@/assets/images/logos/dabetai-main.png")}
            className="!h-16"
            resizeMode="contain"
          />

          {/* Subtítulo */}
          <Body className="!text-gray-500 text-center px-12">
            Monitorea tu diabetes con inteligencia artificial
          </Body>
        </View>

        <View className="gap-4">
          {/* Campo de email */}
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

          {/* Campo de contraseña */}
          <InputField
            label="Contraseña"
            placeholder="*************"
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

          {/* Botón de login */}
          <Button
            title={isLoginLoading ? "Cargando..." : "Iniciar sesión"}
            onPress={handleLogin}
            disabled={isLoginLoading}
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

      {/* ¿No tienes cuenta? - hasta abajo */}
      <View className="flex-row justify-center items-center">
        <Body className="text-center">¿No tienes una cuenta? </Body>
        <Body
          className="text-primary-900 text-center"
          onPress={handleRegisterPress}
        >
          Regístrate
        </Body>
      </View>
    </AppLayout>
  );
}
