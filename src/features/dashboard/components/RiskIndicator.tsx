// src/features/dashboard/components/RiskIndicator.tsx
import { Body, BodyBold, Caption } from "@/components/common/Typography";
import React from "react";
import { View } from "react-native";

interface RiskIndicatorProps {
  riskLevel: "bajo" | "medio" | "alto";
  title: string;
  lastUpdate: string;
  className?: string;
}

export const RiskIndicator = ({
  riskLevel = "bajo",
  title,
  lastUpdate,
  className,
}: RiskIndicatorProps) => {
  const getRiskConfig = () => {
    switch (riskLevel) {
      case "alto":
        return {
          text: "Alto",
          borderClass: "border-danger-500",
          textClass: "text-danger-500",
          bgClass: "bg-danger-200",
        };
      case "medio":
        return {
          text: "Medio",
          borderClass: "border-warning-500",
          textClass: "text-warning-500",
          bgClass: "bg-warning-200",
        };
      default:
        return {
          text: "Bajo",
          borderClass: "border-success-500",
          textClass: "text-success-500",
          bgClass: "bg-success-200",
        };
    }
  };

  const config = getRiskConfig();

  return (
    <View className={`flex-row items-center mb-4 ${className || ""}`}>
      <View
        className={`w-20 h-20 border-4 rounded-full justify-center items-center mr-4 ${config.borderClass}`}
      >
        <Body className={`${config.textClass}`}>
          {config.text}
        </Body>
        <Caption className="!text-gray-500">Riesgo</Caption>
      </View>
      <View className="flex-1">
        <BodyBold>
          {title}
        </BodyBold>
        <Caption className="!text-gray-500">{lastUpdate}</Caption>
      </View>
    </View>
  );
};
