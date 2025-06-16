// src/components/common/Logo.tsx
import React from 'react';
import { View, Image } from 'react-native';

interface LogoProps {
  variant?: 'main' | 'symbol';
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ variant = 'main', size = 'large' }: LogoProps) {
  const getLogoClasses = () => {
    switch (size) {
      case 'small':
        return variant === 'main' ? "w-24 h-6" : "w-16 h-16";
      case 'medium':
        return variant === 'main' ? "w-32 h-8" : "w-24 h-24";
      case 'large':
        return variant === 'main' ? "w-[202px] h-[66px]" : "w-[200px] h-[200px]";
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
          source={require('@/assets/images/dabetai.png')} 
          className={getLogoClasses()}
          resizeMode="contain"
        />
      ) : (
        <Image 
          source={require('@/assets/images/Logo.png')} 
          className={getLogoClasses()}
          resizeMode="contain"
        />
      )}
    </View>
  );
}