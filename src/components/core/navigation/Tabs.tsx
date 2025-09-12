// src/components/core/navigation/Tabs.tsx
import { BodySmallBold } from "@/components/common/Typography";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

// Types
type TabState = "default" | "selected" | "focus" | "disabled";

interface TabsProps extends Omit<TouchableOpacityProps, "onPress"> {
  /** Text content of the tab */
  children: string;
  /** Current state of the tab */
  state?: TabState;
  /** Callback when tab is pressed */
  onPress?: () => void;
  /** Additional CSS classes */
  className?: string;
}

// Theme configuration based on Figma design
const TAB_THEME: Record<
  TabState,
  {
    container: string;
    text: string;
    border: string;
  }
> = {
  default: {
    container: "px-4 py-3",
    text: "text-gray-700", // #314158
    border: "border-b-0",
  },
  selected: {
    container: "px-4 py-3",
    text: "text-primary-700", // #1976D2
    border: "border-b border-primary-700",
  },
  focus: {
    container: "px-4 py-3",
    text: "text-primary-800", // #0D47A1
    border: "border-b border-primary-800",
  },
  disabled: {
    container: "px-4 py-3",
    text: "text-gray-500", // #62748E
    border: "border-b-0",
  },
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  state = "default",
  onPress,
  className = "",
  disabled,
  ...props
}) => {
  // Determine the actual state (disabled overrides other states)
  const actualState = disabled ? "disabled" : state;
  const theme = TAB_THEME[actualState];

  return (
    <TouchableOpacity
      className={`
        justify-center items-center flex-1
        ${theme.container}
        ${theme.border}
        ${className}
      `}
      onPress={onPress}
      disabled={disabled || actualState === "disabled"}
      activeOpacity={0.8}
      {...props}
    >
      <BodySmallBold className={theme.text}>{children}</BodySmallBold>
    </TouchableOpacity>
  );
};
