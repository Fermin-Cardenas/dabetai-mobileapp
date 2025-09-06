import React from "react";
import type { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";
import { BodyBold } from "../../common/Typography";

// Types
export type ButtonVariant = "fill" | "outline";
export type ButtonColor = "primary" | "secondary" | "danger";
export type IconPosition = "none" | "left" | "right" | "only";

export interface ButtonProps extends TouchableOpacityProps {
  /** Button text content */
  title?: string;
  /** Press handler function */
  onPress: () => void;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Color theme */
  color?: ButtonColor;
  /** Icon position relative to text */
  iconPosition?: IconPosition;
  /** Whether button should be circular (for icon-only buttons) */
  circular?: boolean;
  /** Icon component */
  icon?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

export const Button = React.memo<ButtonProps>(
  ({
    title,
    onPress,
    variant = "fill",
    color = "primary",
    iconPosition = "none",
    circular = false,
    icon,
    loading = false,
    className = "",
    testID,
    disabled = false,
    style,
    ...props
  }) => {
    const isDisabled = disabled || loading;

    const getButtonClasses = () => {
      const baseClasses = [
        "min-h-[44px]",
        "rounded-full",
        "flex-row",
        "items-center",
        "justify-center",
        circular ? "w-11 h-11 p-3" : "py-3 px-6", // padding: 12px for circular, 12px 24px for regular
      ];

      // Add spacing for icons (gap: 12px from Figma)
      if (iconPosition !== "none" && iconPosition !== "only") {
        baseClasses.push("gap-3"); // 12px gap
      }

      // Color and variant styles using Tailwind classes
      if (variant === "outline") {
        // Outlined buttons with transparent background
        baseClasses.push("bg-transparent border-2");

        // Disabled state
        if (isDisabled) {
          baseClasses.push("border-gray-500 opacity-50");
        } else {
          // Normal and interaction states for outlined buttons
          switch (color) {
            case "primary":
              baseClasses.push(
                "border-primary-500 active:border-primary-700 active:bg-primary-50"
              );
              break;
            case "secondary":
              baseClasses.push(
                "border-secondary-500 active:border-secondary-700 active:bg-secondary-50"
              );
              break;
            case "danger":
              baseClasses.push(
                "border-danger-500 active:border-danger-800 active:bg-danger-200"
              );
              break;
          }
        }
      } else {
        // Filled buttons
        if (isDisabled) {
          baseClasses.push("bg-gray-500 opacity-50");
        } else {
          // Normal and interaction states for filled buttons
          switch (color) {
            case "primary":
              baseClasses.push("bg-primary-500 active:bg-primary-700");
              break;
            case "secondary":
              baseClasses.push("bg-secondary-500 active:bg-secondary-700");
              break;
            case "danger":
              baseClasses.push("bg-danger-500 active:bg-danger-800");
              break;
          }
        }
      }

      return baseClasses.join(" ");
    };

    // Generate text classes using Tailwind colors
    const getTextClasses = () => {
      const textClasses: string[] = [];

      // Text color based on variant and state
      if (variant === "fill") {
        // Fill variant always uses white text
        if (isDisabled) {
          textClasses.push("!text-gray-50 opacity-50");
        } else {
          textClasses.push("!text-gray-50");
        }
      } else {
        // Outline variant uses color-matched text
        if (isDisabled) {
          textClasses.push("!text-gray-50 opacity-50");
        } else {
          switch (color) {
            case "primary":
              textClasses.push("text-primary-500 active:text-primary-700");
              break;
            case "secondary":
              textClasses.push("text-secondary-500 active:text-secondary-700");
              break;
            case "danger":
              textClasses.push("text-danger-500 active:text-danger-800");
              break;
          }
        }
      }

      return textClasses.join(" ");
    };

    // Content rendering
    const renderContent = () => {
      if (loading) {
        return <BodyBold className={getTextClasses()}>⋯</BodyBold>;
      }

      if (iconPosition === "only") {
        return icon;
      }

      const textElement = title ? (
        <BodyBold className={getTextClasses()} numberOfLines={1}>
          {title}
        </BodyBold>
      ) : null;

      if (iconPosition === "left") {
        return (
          <>
            {icon}
            {textElement}
          </>
        );
      }

      if (iconPosition === "right") {
        return (
          <>
            {textElement}
            {icon}
          </>
        );
      }

      return textElement;
    };

    return (
      <TouchableOpacity
        className={`${getButtonClasses()} ${className}`}
        style={style}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={title || "Button"}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        {...props}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";
