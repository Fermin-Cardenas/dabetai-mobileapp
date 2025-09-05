// src/components/core/navigation/Header.tsx
import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { H3, Subtitle } from '@/components/common/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  className?: string;
  iconColor?: string; // Nueva prop para el color del icono
}

export const Header = ({ 
  title,
  showBackButton = false,
  onBackPress,
  className,
  iconColor = "white" // Color por defecto blanco
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
    
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      <View 
        className={`bg-[#2196F3] ${className || ''}`}
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-row items-center h-14 px-4">
          {/* Botón de regreso */}
          {showBackButton && (
            <TouchableOpacity
              onPress={onBackPress}
              className="mr-4 p-1"
            >
              <MaterialCommunityIcons 
                name="arrow-left"
                size={24}
                color={iconColor} // Usar el color personalizable
              />
            </TouchableOpacity>
          )}
                    
          {/* Título */}
          <Subtitle className="text-white font-bold flex-1">
            {title}
          </Subtitle>
        </View>
      </View>
    </>
  );
};