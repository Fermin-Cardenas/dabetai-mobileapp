// app/config/medication.tsx
import React from "react";
import { View } from "react-native";

import { Body, H3 } from "@/components/common/Typography";
import { AppLayout } from "@/components/layouts/AppLayout";

export default function MedicationScreen() {
  return (
    <AppLayout
      title="Mi medicación habitual"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      <View className="gap-6">
        <H3>Medicación habitual</H3>
        <Body className="text-gray-600">
          Configura y gestiona tu medicación habitual, incluyendo insulina,
          medicamentos orales y otros tratamientos relacionados con tu diabetes.
        </Body>
      </View>
    </AppLayout>
  );
}
