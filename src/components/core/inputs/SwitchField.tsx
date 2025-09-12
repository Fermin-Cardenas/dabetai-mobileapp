import { Body, BodySmall } from "@/components/common/Typography";
import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface SwitchProps {
  /** Valor del switch (checked/unchecked) */
  value: boolean;
  /** Callback cuando cambia el valor */
  onValueChange: (value: boolean) => void;
  /** Label del switch (opcional) */
  label?: string;
  /** Estado visual */
  state?: "default" | "focus" | "disabled" | "error";
  /** Mensaje de error (solo visible cuando state='error') */
  errorMessage?: string;
  /** Si está deshabilitado */
  disabled?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

export const SwitchField: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  state = "default",
  errorMessage,
  disabled = false,
  className = "",
}) => {
  const isDisabled = disabled || state === "disabled";
  const isError = state === "error";
  const isFocus = state === "focus";

  // Valores animados
  const thumbPosition = useSharedValue(value ? 1 : 0);
  const trackColor = useSharedValue(value ? 1 : 0);

  // Actualizar animaciones cuando cambia el valor
  useEffect(() => {
    thumbPosition.value = withTiming(value ? 1 : 0, { duration: 200 });
    trackColor.value = withTiming(value ? 1 : 0, { duration: 200 });
  }, [value, thumbPosition, trackColor]);

  // Estilo animado para el thumb
  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: thumbPosition.value * 16, // 16px de movimiento (40px - 24px)
        },
      ],
    };
  });

  // Estilo animado para el track
  const animatedTrackStyle = useAnimatedStyle(() => {
    let backgroundColor = "#D1D5DB"; // gray-300 por defecto

    if (isDisabled) {
      backgroundColor = "#E5E7EB"; // gray-200
    } else {
      backgroundColor = interpolateColor(
        trackColor.value,
        [0, 1],
        ["#D1D5DB", "#3B82F6"] // gray-300 -> primary-500
      );
    }

    return {
      backgroundColor,
    };
  });

  // Estilos del thumb (círculo interno)
  const getThumbStyles = () => {
    return "bg-gray-50"; // slate/50 - siempre blanco
  };

  // Estilos del contenedor exterior (para focus y error)
  const getContainerStyles = () => {
    let styles = "";

    if (isFocus && !isDisabled) {
      styles += "border border-primary-700 "; // primary/700
    }

    if (isError && !isDisabled) {
      styles += "border border-danger-800 "; // red/800
    }

    if (isFocus || isError) {
      styles += "p-1 "; // padding para el borde
    }

    return styles + "rounded-full";
  };

  // Estilos del label
  const getLabelStyles = () => {
    if (isDisabled) {
      return "!text-gray-600"; // slate/600
    }
    return ""; // default text-gray-700
  };

  const handlePress = () => {
    if (!isDisabled) {
      onValueChange(!value);
    }
  };

  return (
    <View className={`${className}`}>
      {/* Switch container con label */}
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        className={`
          flex-row items-center gap-3
          ${isDisabled ? "opacity-60" : ""}
        `}
      >
        {/* Switch container (con borde de focus/error) */}
        <View className={getContainerStyles()}>
          {/* Switch track animado */}
          <Animated.View
            style={[animatedTrackStyle]}
            className={`
              flex-row items-center rounded-full
              w-10 h-6 px-1
            `}
          >
            {/* Switch thumb animado */}
            <Animated.View
              style={[animatedThumbStyle]}
              className={`
                w-[18px] h-[18px] rounded-full
                ${getThumbStyles()}
              `}
            />
          </Animated.View>
        </View>

        {/* Label */}
        {label && <Body className={`flex-1 ${getLabelStyles()}`}>{label}</Body>}
      </Pressable>

      {/* Error message */}
      {isError && errorMessage && (
        <BodySmall className="!text-danger-800 mt-2">{errorMessage}</BodySmall>
      )}
    </View>
  );
};

export default SwitchField;
