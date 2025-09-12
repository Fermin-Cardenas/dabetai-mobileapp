// src/features/dashboard/components/RiskCircle.tsx
import { Body, Caption, Display, H1, H2 } from "@/components/common/Typography";
import React from "react";
import { View } from "react-native";

// Types
type RiskLevel = "bajo" | "medio" | "alto";

interface RiskCircleProps {
  riskLevel: RiskLevel;
  size?: "sm" | "md" | "lg";
}

// Theme configuration using Tailwind classes
const RISK_CIRCLE_THEME: Record<
  RiskLevel,
  {
    borderColor: string;
    textColor: string;
  }
> = {
  bajo: {
    borderColor: "border-success-500",
    textColor: "!text-success-500",
  },
  medio: {
    borderColor: "border-warning-500",
    textColor: "!text-warning-500",
  },
  alto: {
    borderColor: "border-danger-500",
    textColor: "!text-danger-500",
  },
};

// Size variants using Tailwind classes
const SIZE_VARIANTS = {
  sm: {
    container: "w-24 h-24",
    border: "border-4",
    mainText: "text-lg",
    labelText: "text-xs",
  },
  md: {
    container: "w-32 h-32",
    border: "border-4",
    mainText: "text-2xl",
    labelText: "text-xs",
  },
  lg: {
    container: "w-36 h-36",
    border: "border-[5px]",
    mainText: "text-4xl",
    labelText: "text-xs",
  },
};

export const RiskCircle: React.FC<RiskCircleProps> = ({
  riskLevel,
  size = "lg",
}) => {
  // Get theme configuration for current risk level
  const theme = RISK_CIRCLE_THEME[riskLevel];
  const sizeConfig = SIZE_VARIANTS[size];

  return (
    <View className="justify-center items-center">
      {/* Main Circle */}
      <View
        className={`
          rounded-full justify-center items-center
          ${sizeConfig.container}
          ${sizeConfig.border}
          ${theme.borderColor}
        `}
      >
        <Caption className="!text-gray-500">Nivel</Caption>
        <H2 className={`${sizeConfig.mainText} ${theme.textColor} capitalize`}>
          {riskLevel}
        </H2>
        <Caption className="text-gray-500">Estimado</Caption>
      </View>
    </View>
  );
};
