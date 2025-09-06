// src/features/welcome/screens/WelcomeScreen.tsx
import { Caption, H2 } from "@/components/common/Typography";
import { Button, ButtonGroup } from "@/components/core/buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

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
    <>
      {/* Contenedor principal */}
      <View className="flex flex-col min-h-screen items-center justify-center gap-6 pt-6 pr-4 pb-6 pl-4 relative">
        {/* Frame superior con logos */}
        <View className="items-center mb-8">
          <Image
            style={{ height: 66 }}
            source={require("@/assets/images/logos/dabetai-main.png")}
            resizeMode="contain"
          />
        </View>

        <Image
          style={{ height: 200 }}
          source={require("@/assets/images/logos/brand-logo.png")}
          resizeMode="contain"
        />

        {/* Frame inferior con contenido */}
        <View className="flex justify-between flex-1 self-stretch w-full grow flex-col items-center relative">
          {/* Contenedor de título y botones */}
          <View className="flex justify-center gap-6 self-stretch w-full flex-col items-center relative">
            {/* Título principal */}
            <H2 className="text-center">
              Monitorea tu diabetes con inteligencia artificial
            </H2>

            {/* Grupo de botones */}
            <View className="self-stretch w-full">
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
          </View>

          {/* Términos y condiciones */}
          <View className="relative self-stretch">
            <Caption className="text-center">
              <Caption className="text-gray-500">
                Continúa solo si estás de acuerdo con nuestros{" "}
              </Caption>
              <TouchableOpacity onPress={handleTermsPress}>
                <Caption className="text-blue-500">
                  Términos y condiciones
                </Caption>
              </TouchableOpacity>
              <Caption className="text-gray-500"> y nuestra </Caption>
              <TouchableOpacity onPress={handlePrivacyPress}>
                <Caption className="text-blue-500">
                  Política de privacidad
                </Caption>
              </TouchableOpacity>
            </Caption>
          </View>
        </View>
      </View>
    </>
  );
}
