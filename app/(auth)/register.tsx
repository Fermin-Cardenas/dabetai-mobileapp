// app/(auth)/register.tsx
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

export default function Register() {
  const { register, isRegisterLoading } = useAuth();

  // Using our custom hooks for form management and validation
  const nombreField = useInputField("");
  const primerApellidoField = useInputField("");
  const segundoApellidoField = useInputField("");
  const emailField = useInputField("");
  const passwordField = usePasswordInput("");
  const confirmPasswordField = usePasswordInput("");

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
      alert(
        `Error de validación: ${errors[0] || "Por favor verifica los campos"}`
      );
      return;
    }

    register({
      nombre: nombreField.value,
      primerApellido: primerApellidoField.value,
      segundoApellido: segundoApellidoField.value,
      email: emailField.value,
      password: passwordField.value,
    });
  };

  const handleLoginPress = () => {
    // Navigation will be handled by useAuth hook
  };

  return (
    <AppLayout
      title="Registrarse"
      headerVariant="section"
      showNavigation={false}
    >
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
            (passwordField.value && validators.password(passwordField.value)) ||
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
          title={isRegisterLoading ? "Cargando..." : "Registrarse"}
          onPress={handleRegister}
          disabled={isRegisterLoading}
          variant="fill"
          color="primary"
        />
      </View>

      {/* ¿Ya tienes cuenta? - al final */}
      <View className="items-center mt-8 pb-4">
        <Body className="text-center" onPress={handleLoginPress}>
          ¿Ya tienes una cuenta?{" "}
          <Body className="text-primary-900">Inicia sesión</Body>
        </Body>
      </View>
    </AppLayout>
  );
}
