// src/features/welcome/screens    <AppLayout showNavigation={false} showHeader={false}>WelcomeScreen.tsx
import { Caption, H2 } from "@/components/common/Typography";
import { Button, ButtonGroup } from "@/components/core/buttons";
import { AppLayout } from "@/components/layouts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

export default function Welcome() {
  const router = useRouter();

  const handleRegister = async () => {
    await AsyncStorage.clear();
    router.push("/(auth)/register");
  };

  const handleLogin = async () => {
    await AsyncStorage.clear();
    router.push("/(auth)/login");
  };

  const handleTermsPress = () => {
    router.push("/(public)/tyc");
  };

  const handlePrivacyPress = () => {
    router.push("/(public)/privacy");
  };

  return (
    <AppLayout showNavigation={false} showHeader={false}>
      {/* Logos */}
      <View className="items-center gap-4">
        <Image
          source={require("@/assets/images/logos/dabetai-main.png")}
          className="!h-16"
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/logos/brand-logo.png")}
          className="!h-48"
          resizeMode="contain"
        />
      </View>

      {/* Contenido principal */}
      {/* Título y botones */}
      <View className="gap-4">
        <H2 className="text-center">
          Monitorea tu diabetes con inteligencia artificial
        </H2>

        <ButtonGroup align="stack">
          <Button
            title="Registrarse"
            onPress={handleRegister}
            variant="fill"
            color="primary"
          />
          <Button
            title="Iniciar sesión"
            onPress={handleLogin}
            variant="outline"
            color="primary"
          />
        </ButtonGroup>
      </View>

      {/* Términos y condiciones */}
      <Caption className="text-center !text-gray-500">
        Continúa solo si estás de acuerdo con nuestros{" "}
        <Caption className="text-primary-900" onPress={handleTermsPress}>
          Términos y condiciones
        </Caption>{" "}
        y nuestra{" "}
        <Caption className="text-primary-900" onPress={handlePrivacyPress}>
          Política de privacidad
        </Caption>
      </Caption>
    </AppLayout>
  );
}
