// InfoCard - ComplicationList, RecommendationsSection, ComplicationsSection, NotificationsList, NotificationItem implementation
// https://www.figma.com/design/H0g3Wpjofuv56m5NMlWpjP/Design-System---dabetai?node-id=93-147&t=V2OCANMdbQepGXPO-4

import { Icon } from "@/components/common/Icon";
import { Body, BodySmall, BodySmallBold } from "@/components/common/Typography";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface InfoCardProps {
  /** Título de la card */
  title: string;
  /** Descripción de la card */
  description?: string;
  /** Texto de tiempo/fecha */
  caption?: string;
  /** Estado de la card */
  state?: "unread" | "read" | "info";
  /** Si es el último elemento en una lista */
  isLast?: boolean;
  /** Mostrar botón chevron a la derecha */
  showButton?: boolean;
  /** Callback cuando se presiona */
  onPress?: () => void;
  /** Clase CSS adicional */
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  caption,
  state = "info",
  isLast = false,
  showButton = false,
  onPress,
  className = "",
}) => {
  const isUnread = state === "unread";
  const isRead = state === "read";
  const isInfo = state === "info";

  // Determinar el color del texto basado en el nivel de riesgo
  const getTextColorStyles = () => {
    if (!caption) return "!text-gray-700";

    const level = caption.toLowerCase();
    if (level.includes("alto")) {
      return "!text-danger-500"; // Rojo para riesgo alto
    } else if (level.includes("medio")) {
      return "!text-warning-500"; // Amarillo para riesgo medio
    } else if (level.includes("bajo")) {
      return "!text-success-500"; // Verde para riesgo bajo
    }
    return "!text-gray-700";
  };

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      {...(onPress && { onPress, activeOpacity: 0.7 })}
      className={`
        flex-row gap-3 p-4
        ${!isLast ? "border-b border-gray-300" : ""}
        ${className}
      `}
    >
      {/* Unread/Read indicator */}
      {(isUnread || isRead) && (
        <View className="w-3 h-3 justify-center items-center mt-1">
          <View
            className={`
            w-3 h-3 rounded-full
            ${isUnread ? "border border-gray-300" : isRead ? "bg-blue-500" : ""}
          `}
          />
        </View>
      )}

      {/* Content */}
      <View className="flex-1 gap-1">
        <Body className="leading-5">{title}</Body>

        {description && (
          <BodySmall className="!text-gray-500 leading-4">
            {description}
          </BodySmall>
        )}
      </View>

      {/* Caption as Text with Color */}
      {caption && (
        <View className="self-start">
          <BodySmallBold className={`leading-4 ${getTextColorStyles()}`}>
            {caption}
          </BodySmallBold>
        </View>
      )}

      {/* Chevron Button */}
      {showButton && (
        <View className="ml-2">
          <Icon name="chevron-right" size={20} />
        </View>
      )}
    </CardContainer>
  );
};

export default InfoCard;
