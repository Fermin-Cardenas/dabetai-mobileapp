// src/features/welcome/components/TermsText.tsx
import { Caption } from '@/components/common/Typography';
import React from 'react';
import { TouchableOpacity } from 'react-native';

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
    <Caption className={`text-gray-500 text-xs text-center font-semibold ${className || ''}`}>
      <Caption className="text-gray-500">
        Continúa solo si estás de acuerdo con nuestros{' '}
      </Caption>
      <TouchableOpacity onPress={onTermsPress}>
        <Caption className="text-blue-500 text-xs font-semibold">
          Términos y condiciones
        </Caption>
      </TouchableOpacity>
      <Caption className="text-gray-500"> y nuestra </Caption>
      <TouchableOpacity onPress={onPrivacyPress}>
        <Caption className="text-blue-500 text-xs font-semibold">
          Política de privacidad
        </Caption>
      </TouchableOpacity>
      <Caption className="text-gray-500"></Caption>
    </Caption>
  );
};