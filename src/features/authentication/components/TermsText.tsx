// src/features/welcome/components/TermsText.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface TermsTextProps {
  onTermsPress: () => void;
  onPrivacyPress: () => void;
  className?: string;
}

export const TermsText = ({ 
  onTermsPress, 
  onPrivacyPress, 
  className 
}: TermsTextProps) => {
  return (
    <Text className={`text-gray-500 text-xs text-center font-semibold ${className || ''}`}>
      <Text className="text-gray-500">
        Continúa solo si estás de acuerdo con nuestros{' '}
      </Text>
      <TouchableOpacity onPress={onTermsPress}>
        <Text className="text-blue-500 text-xs font-semibold">
          Términos y condiciones
        </Text>
      </TouchableOpacity>
      <Text className="text-gray-500"> y nuestra </Text>
      <TouchableOpacity onPress={onPrivacyPress}>
        <Text className="text-blue-500 text-xs font-semibold">
          Política de privacidad
        </Text>
      </TouchableOpacity>
      <Text className="text-gray-500"></Text>
    </Text>
  );
};