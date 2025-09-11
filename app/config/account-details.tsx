// app/config/account-details.tsx
import React from "react";
import { View } from "react-native";

import { Body, H3 } from "@/components/common/Typography";
import { AppLayout } from "@/components/layouts/AppLayout";

export default function AccountDetailsScreen() {
  return (
    <AppLayout
      title="Detalles de la cuenta"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      <View className="gap-6">
        <H3>Información de la cuenta</H3>
        <Body className="text-gray-600">
          Esta pantalla mostrará los detalles de la cuenta del usuario,
          incluyendo información personal, preferencias de perfil y
          configuraciones de seguridad.
        </Body>
      </View>
    </AppLayout>
  );
}
