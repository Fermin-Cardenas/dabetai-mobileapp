// src/components/common/Typography.tsx
import { Text, TextProps, TouchableOpacity } from "react-native";

// Se define una interfaz base para que todos los componentes de tipografía
// puedan aceptar las props estándar de Text y una `className` para sobreescrituras.
interface TypographyProps extends TextProps {
  className?: string;
  onPress?: () => void;
}

// Componente base que maneja onPress
const BaseText = ({ className = "", onPress, children, ...props }: TypographyProps) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text className={className} {...props}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
  
  return (
    <Text className={className} {...props}>
      {children}
    </Text>
  );
};

// Componente para el título más grande de la aplicación (ej: en pantallas de bienvenida).
export const Display = ({ className = "", ...props }: TypographyProps) => (
  <BaseText className={`text-display ${className}`} {...props} />
);

// Componente para Títulos de Nivel 1.
export const H1 = ({ className = "", ...props }: TypographyProps) => (
  <BaseText className={`text-h1 ${className}`} {...props} />
);

// Componente para Títulos de Nivel 2.
export const H2 = ({ className = "", ...props }: TypographyProps) => (
  <BaseText className={`text-h2 ${className}`} {...props} />
);

// Componente para Títulos de Nivel 3.
export const H3 = ({ className = "", ...props }: TypographyProps) => (
  <BaseText className={`text-h3 ${className}`} {...props} />
);

// Componente para Subtítulos.
export const Subtitle = ({ className = "", ...props }: TypographyProps) => (
  <BaseText className={`text-subtitle ${className}`} {...props} />
);

// Componente para el texto de cuerpo principal. Es el más común.
export const Body = ({ className = "", ...props }: TypographyProps) => (
  <BaseText className={`text-body ${className}`} {...props} />
);

// Variante en negrita de Body, para destacar texto importante.
export const BodyBold = ({ className = "", ...props }: TypographyProps) => (
  <Body className={`font-bold ${className}`} {...props} />
);

// Componente para texto de cuerpo más pequeño.
export const BodySmall = ({ className = "", ...props }: TypographyProps) => (
  <BaseText className={`text-body-sm ${className}`} {...props} />
);

// Variante en negrita de BodySmall.
export const BodySmallBold = ({
  className = "",
  ...props
}: TypographyProps) => (
  <BodySmall className={`font-bold ${className}`} {...props} />
);

// Componente para leyendas, notas al pie o texto secundario muy pequeño.
export const Caption = ({ className = "", ...props }: TypographyProps) => (
  <BaseText className={`text-caption ${className}`} {...props} />
);

// Variante en negrita de Caption.
export const CaptionBold = ({ className = "", ...props }: TypographyProps) => (
  <Caption className={`font-bold ${className}`} {...props} />
);