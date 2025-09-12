// app/config/faq.tsx
import React from "react";
import { View } from "react-native";

import { Body, H3 } from "@/components/common/Typography";
import { AppLayout } from "@/components/layouts/AppLayout";

export default function FAQScreen() {
  return (
    <AppLayout
      title="Preguntas frecuentes"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      <View className="gap-6">
        <H3>Preguntas frecuentes</H3>
        <Body className="text-gray-600">
          Aquí encontrarás las preguntas más frecuentes sobre el uso de dabetai,
          gestión de datos de diabetes y funcionalidades de la aplicación.
        </Body>
      </View>
    </AppLayout>
  );
}
