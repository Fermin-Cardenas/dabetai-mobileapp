// app/config/medic-info.tsx
import React from "react";
import { View } from "react-native";

import { Body, H3 } from "@/components/common/Typography";
import { AppLayout } from "@/components/layouts/AppLayout";

export default function MedicInfoScreen() {
  return (
    <AppLayout
      title="Información médica"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      <View className="gap-6">
        <H3>Mi información médica</H3>
        <Body className="text-gray-600">
          Gestiona tu información médica, incluyendo tipo de diabetes, fecha de
          diagnóstico, medicamentos actuales y otros datos relevantes para tu
          tratamiento.
        </Body>
      </View>
    </AppLayout>
  );
}
