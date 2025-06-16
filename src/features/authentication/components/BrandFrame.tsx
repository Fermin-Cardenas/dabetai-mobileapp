// src/features/welcome/components/BrandFrame.tsx
import React from 'react';
import { View, Image } from 'react-native';

export const BrandFrame = () => {
  return (
    <View className="flex flex-col items-center justify-between relative">
      {/* Logo de texto dabetai (imagen) */}
      <View className="relative w-[206px] h-[66px] -mr-1">
        <Image
          className="w-full h-full"
          source={require('@/assets/images/dabetai.png')}
          resizeMode="contain"
        />
      </View>
      
      {/* Imagen del logo símbolo */}
      <Image
        className="relative w-[200px] h-[200px]"
        source={require('@/assets/images/Logo.png')}
        resizeMode="cover"
      />
    </View>
  );
};