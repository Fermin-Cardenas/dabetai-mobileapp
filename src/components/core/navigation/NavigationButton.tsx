// src/components/core/navigation/NavigationButton.tsx
import { Caption } from "@/components/common/Typography";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type NavigationButtonState = "default" | "active";
type NavigationButtonDirection = "column" | "row";

interface NavigationButtonProps {
  title: string;
  icon: React.ReactNode;
  state?: NavigationButtonState;
  direction?: NavigationButtonDirection;
  onPress: () => void;
  className?: string;
}

export const NavigationButton = ({
  title,
  icon,
  state = "default",
  direction = "column",
  onPress,
  className,
}: NavigationButtonProps) => {
  const getButtonStyles = () => {
    const isActive = state === "active";
    const isColumn = direction === "column";

    return {
      container: isColumn
        ? "flex-col justify-center items-center gap-1 p-3"
        : "flex-row justify-center items-center gap-1.5 px-2 py-2",
      textColor: isActive ? "text-primary-700" : "text-gray-500",
      iconColor: isActive ? "#1976D2" : "#62748E",
      minHeight: isColumn ? "min-h-[63px]" : "min-h-[40px]",
    };
  };

  const styles = getButtonStyles();

  return (
    <TouchableOpacity
      className={`${styles.container} ${styles.minHeight} ${className || ""}`}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ selected: state === "active" }}
    >
      <View
        className={`w-6 h-6 justify-center items-center ${styles.iconColor}`}
      >
        {React.isValidElement(icon)
          ? React.cloneElement(icon, {
              color: styles.iconColor,
              size: 24,
              strokeWidth: 2.5,
            } as any)
          : icon}
      </View>

      <Caption
        className={`${styles.textColor} font-bold text-center text-xs leading-tight`}
      >
        {title}
      </Caption>
    </TouchableOpacity>
  );
};
