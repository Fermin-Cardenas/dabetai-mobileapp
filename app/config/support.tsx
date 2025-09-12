// app/config/support.tsx
import React from "react";
import { View } from "react-native";

import { Body, H3 } from "@/components/common/Typography";
import { AppLayout } from "@/components/layouts/AppLayout";

export default function SupportScreen() {
  return (
    <AppLayout
      title="Contactar soporte"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      <View className="gap-6">
        <H3>Contactar soporte</H3>
        <Body className="text-gray-600">
          ¿Necesitas ayuda? Ponte en contacto con nuestro equipo de soporte para
          resolver cualquier duda o problema que tengas con la aplicación.
        </Body>
      </View>
    </AppLayout>
  );
}
