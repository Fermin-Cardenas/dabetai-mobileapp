// src/components/core/inputs/SelectField.tsx
import { Icon } from "@/components/common/Icon";
import { Body, BodySmall } from "@/components/common/Typography";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface SelectFieldProps {
  /** Label text displayed above the select field */
  label: string;
  /** Current selected value */
  value: string;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Function called when the select field is pressed */
  onPress: () => void;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Error message to display below the field */
  error?: string;
  /** Success message to display below the field */
  success?: string;
  /** Whether the field is currently focused */
  focused?: boolean;
  /** Additional className for styling */
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  placeholder = "Seleccionar...",
  onPress,
  disabled = false,
  error,
  success,
  focused = false,
  className = "",
}) => {
  // Determine the current state for styling
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;
  const hasValue = value.trim() !== "";

  // Container border styles based on state
  const getBorderStyles = () => {
    if (disabled) return "border-gray-300 bg-gray-200";
    if (hasError) return "border-red-800 bg-gray-50";
    if (hasSuccess) return "border-green-800 bg-gray-50";
    if (focused) return "border-primary-700 bg-gray-50";
    return "border-gray-300 bg-gray-50";
  };

  // Label color based on state
  const getLabelColor = () => {
    if (disabled) return "!text-gray-600";
    return "!text-gray-700";
  };

  // Value/placeholder color based on state
  const getValueColor = () => {
    if (disabled) return "!text-gray-600";
    if (!hasValue) return "!text-gray-500";
    return "!text-gray-700";
  };

  // Icon color based on state
  const getIconColor = () => {
    if (disabled) return "text-gray-600";
    return "text-gray-700";
  };

  // Feedback message color
  const getFeedbackColor = () => {
    if (hasError) return "!text-red-800";
    if (hasSuccess) return "!text-green-800";
    return "!text-gray-600";
  };

  return (
    <View className={`gap-2 ${className}`}>
      {/* Label */}
      <Body className={getLabelColor()}>{label}</Body>

      {/* Select Container */}
      <TouchableOpacity
        className={`flex-row justify-between items-center rounded-lg border px-4 py-3 ${getBorderStyles()} ${
          disabled ? "opacity-60" : ""
        }`}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {/* Value or Placeholder */}
        <Body className={getValueColor()}>
          {hasValue ? value : placeholder}
        </Body>

        {/* Chevron Down Icon */}
        <Icon
          name="chevron-down"
          size={16}
          className={getIconColor()}
        />
      </TouchableOpacity>

      {/* Feedback Message */}
      {(error || success) && (
        <BodySmall className={getFeedbackColor()}>
          {error || success}
        </BodySmall>
      )}
    </View>
  );
};
