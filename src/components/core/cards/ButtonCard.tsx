// ButtonCard - Configuration interface for SettingsList implementation
// https://www.figma.com/design/H0g3Wpjofuv56m5NMlWpjP/Design-System---dabetai?node-id=81-42&t=V2OCANMdbQepGXPO-4

import { Icon, IconName } from "@/components/common/Icon";
import { Body, BodySmall } from "@/components/common/Typography";
import { SwitchField } from "@/components/core/inputs/SwitchField";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface ButtonCardProps {
  /** Título de la card */
  title: string;
  /** Subtítulo o descripción (opcional) */
  subtitle?: string;
  /** Nombre del icono a mostrar a la izquierda (opcional) */
  icon?: IconName;
  /** Función/tipo de interacción */
  type?: "click" | "switch" | "check" | "chevron";
  /** Estado actual (para switch y check) */
  value?: boolean;
  /** Estado visual */
  state?: "default" | "focus" | "disabled";
  /** Callback cuando se presiona (para click) */
  onPress?: () => void;
  /** Callback cuando cambia el valor (para switch) */
  onValueChange?: (value: boolean) => void;
  /** Si es el último elemento en una lista (no muestra borde inferior) */
  isLast?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

export const ButtonCard: React.FC<ButtonCardProps> = ({
  title,
  subtitle,
  icon,
  type: buttonType = "click",
  value = false,
  state = "default",
  onPress,
  onValueChange,
  isLast = false,
  className = "",
}) => {
  const isDisabled = state === "disabled";

  const textStyles = isDisabled
    ? "!text-gray-400" // #62748E
    : ""; // #314158

  const handlePress = () => {
    if (isDisabled) return;

    if ((buttonType === "click" || buttonType === "chevron") && onPress) {
      onPress();
    } else if (buttonType === "check" && onValueChange) {
      onValueChange(!value);
    }
  };

  const handleSwitchChange = (newValue: boolean) => {
    if (isDisabled || !onValueChange) return;
    onValueChange(newValue);
  };

  return (
    <TouchableOpacity
      onPress={buttonType !== "switch" ? handlePress : undefined}
      activeOpacity={isDisabled ? 1 : 0.7}
      disabled={isDisabled}
      className={`
        flex-row justify-between items-center
        p-4 gap-4
        ${!isLast ? "border-b border-gray-300" : ""}
        ${className}
      `}
    >
      {/* Left Icon */}
      {icon && (
          <Icon name={icon} size={20} />
      )}

      {/* Content */}
      <View className="flex-1">
        <Body className={`${textStyles} leading-5`}>{title}</Body>

        {subtitle && (
          <BodySmall className={`${textStyles} !text-gray-500 leading-4 mt-1`}>
            {subtitle}
          </BodySmall>
        )}
      </View>

      {/* Right side element based on type */}
      {(buttonType === "click" || buttonType === "chevron") && (
        <Icon name="chevron-right" size={24} />
      )}

      {buttonType === "switch" && (
        <SwitchField
          value={value}
          onValueChange={handleSwitchChange}
          state={isDisabled ? 'disabled' : 'default'}
          disabled={isDisabled}
        />
      )}

      {buttonType === "check" && (
        <View
          className={`
          w-5 h-5 rounded-full border
          justify-center items-center
          ${value ? "border-primary-500" : "border-gray-300"}
        `}
        >
          {value && <View className="w-3 h-3 bg-primary-500 rounded-full" />}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonCard;
