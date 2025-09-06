// src/components/common/Logo.tsx
import React from 'react';
import { Image, View } from 'react-native';

interface LogoProps {
  variant?: 'main' | 'symbol';
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ variant = 'main', size = 'large' }: LogoProps) {
  const getLogoStyles = () => {
    switch (size) {
      case 'small':
        return variant === 'main' ? { width: 80, height: 24 } : { width: 32, height: 32 };
      case 'medium':
        return variant === 'main' ? { width: 128, height: 40 } : { width: 48, height: 48 };
      case 'large':
        return variant === 'main' ? { width: 160, height: 48 } : { width: 64, height: 64 };
    }
  };

  const getContainerClasses = () => {
    switch (variant) {
      case 'main':
        return "items-center mb-8";
      case 'symbol':
        return "items-center mb-6";
    }
  };

  return (
    <View className={getContainerClasses()}>
      {variant === 'main' ? (
        <Image
          style={getLogoStyles()}
          source={require('@/assets/images/logos/dabetai-main.png')} 
          resizeMode="contain"
        />
      ) : (
        <Image
          style={getLogoStyles()}
          source={require('@/assets/images/logos/brand-logo.png')} 
          resizeMode="contain"
        />
      )}
    </View>
  );
}