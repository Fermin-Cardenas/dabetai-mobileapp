// src/features/dashboard/components/RiskLevelCard.tsx
import { Body, Caption } from "@/components/common/Typography";
import { Button } from "@/components/core/buttons";
import React, { useRef, useState } from "react";
import { Animated, View } from "react-native";
import { RiskCircle } from "./RiskCircle";

// Types
type RiskLevel = "bajo" | "medio" | "alto";

interface RiskLevelCardProps {
  riskLevel: RiskLevel;
  title?: string;
  description?: string;
  lastUpdate?: string;
  onUpdatePress?: () => void;
  showUpdateButton?: boolean;
  showLastUpdate?: boolean;
}

// Theme configuration using Tailwind colors
const RISK_THEME: Record<RiskLevel, {
  textColor: string;
  defaultDescription: string;
}> = {
  bajo: {
    textColor: "text-success-800", // #016630 según Figma
    defaultDescription: "¡Buen trabajo! Mantener tu control actual ayuda a reducir tu riesgo de complicaciones.",
  },
  medio: {
    textColor: "text-warning-800", // #894B00
    defaultDescription: "Tu riesgo es moderado. Mantente atento y sigue las recomendaciones médicas.",
  },
  alto: {
    textColor: "text-danger-800", // Similar color
    defaultDescription: "Tu riesgo de complicaciones es elevado. Consulta a tu médico.",
  },
};

export const AnimatedRiskCircleRiskLevelCard: React.FC<RiskLevelCardProps> = ({
  riskLevel,
  description: descriptionProp,
  lastUpdate,
  onUpdatePress,
  showUpdateButton = true,
  showLastUpdate = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Get theme configuration for current risk level
  const theme = RISK_THEME[riskLevel];
  const description = descriptionProp || theme.defaultDescription;

  const handleUpdatePress = () => {
    if (isLoading || !onUpdatePress) return;

    setIsLoading(true);
    progressAnim.setValue(0);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      progressAnim.setValue(0);
      setTimeout(() => {
        setIsLoading(false);
        onUpdatePress();
      }, 100);
    });
  };

  return (
    <View className="gap-4">
      {/* Main Risk Card */}
        <View className="flex-row items-center gap-6">
          {/* Risk Circle */}
          <RiskCircle riskLevel={riskLevel} size="lg" />

          {/* Description Text */}
          <View className="flex-1">
            <Body className={`${theme.textColor}`}>
              {description}
            </Body>
          </View>
        </View>

      {/* Action Section */}
      {(showUpdateButton || showLastUpdate) && (
        <View className="gap-4">
          {showUpdateButton && onUpdatePress && (
            <View className="relative overflow-hidden rounded-full">
              {isLoading && (
                <Animated.View
                  className="absolute left-0 top-0 bottom-0 rounded-full bg-secondary-100"
                  style={{
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  }}
                />
              )}

              <Button
                title={isLoading ? "Actualizando..." : "Actualizar predicción"}
                onPress={handleUpdatePress}
                disabled={isLoading}
                variant="outline"
                color="secondary"
              />
            </View>
          )}

          {showLastUpdate && lastUpdate && (
            <Caption className="!text-gray-500 text-center">
              Última actualización: {lastUpdate}
            </Caption>
          )}
        </View>
      )}
    </View>
  );
};
