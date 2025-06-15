/**
 * typography.tsx
 * * Este archivo centraliza todos los componentes de texto semánticos de la aplicación.
 * Usar estos componentes en lugar de <Text> directamente asegura consistencia visual
 * y facilita los cambios de diseño a nivel global.
 * * Creado a partir de las clases de componentes definidas en `tailwind.config.js`.
 */
import { Text, TextProps } from "react-native";
import { styled } from "nativewind";

// Se crea un componente Text estilizado por NativeWind como base.
const StyledText = styled(Text);

// Se define una interfaz base para que todos los componentes de tipografía
// puedan aceptar las props estándar de Text y una `className` para sobreescrituras.
interface TypographyProps extends TextProps {
  className?: string;
}

// Componente para el título más grande de la aplicación (ej: en pantallas de bienvenida).
export const Display = ({ className = "", ...props }: TypographyProps) => (
  <StyledText className={`text-display ${className}`} {...props} />
);

// Componente para Títulos de Nivel 1.
export const H1 = ({ className = "", ...props }: TypographyProps) => (
  <StyledText className={`text-h1 ${className}`} {...props} />
);

// Componente para Títulos de Nivel 2.
export const H2 = ({ className = "", ...props }: TypographyProps) => (
  <StyledText className={`text-h2 ${className}`} {...props} />
);

// Componente para Títulos de Nivel 3.
export const H3 = ({ className = "", ...props }: TypographyProps) => (
  <StyledText className={`text-h3 ${className}`} {...props} />
);

// Componente para Subtítulos.
export const Subtitle = ({ className = "", ...props }: TypographyProps) => (
  <StyledText className={`text-subtitle ${className}`} {...props} />
);

// Componente para el texto de cuerpo principal. Es el más común.
export const Body = ({ className = "", ...props }: TypographyProps) => (
  <StyledText className={`text-body ${className}`} {...props} />
);

// Variante en negrita de Body, para destacar texto importante.
export const BodyBold = ({ className = "", ...props }: TypographyProps) => (
  <Body className={`font-bold ${className}`} {...props} />
);

// Componente para texto de cuerpo más pequeño.
export const BodySmall = ({ className = "", ...props }: TypographyProps) => (
  <StyledText className={`text-body-sm ${className}`} {...props} />
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
  <StyledText className={`text-caption ${className}`} {...props} />
);

// Variante en negrita de Caption.
export const CaptionBold = ({ className = "", ...props }: TypographyProps) => (
  <Caption className={`font-bold ${className}`} {...props} />
);
