// src/features/welcome/components/BrandFrame.tsx
import React from 'react';
import { Image, View } from 'react-native';

export const BrandFrame = () => {
  return (
    <View className="flex flex-col items-center justify-between relative">
      {/* Logo de texto dabetai (imagen) */}
      <View className="relative w-[206px] h-[66px] -mr-1">
                <Image
          className="w-48 h-16 mb-2"
          source={require('@/assets/images/logos/dabetai-main.png')}
          resizeMode="contain"
        />
      </View>

      {/* Logo de marca */}
      <Image
        className="w-16 h-12"
        source={require('@/assets/images/logos/brand-logo.png')}
        resizeMode="contain"
      />
    </View>
  );
};