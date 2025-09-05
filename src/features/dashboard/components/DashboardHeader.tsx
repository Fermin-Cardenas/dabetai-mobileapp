// src/features/dashboard/components/DashboardHeader.tsx
import Feather from '@expo/vector-icons/Feather'; // <- ya importado
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DashboardHeaderProps {
  className?: string;
  onNotificationPress?: () => void;
  onSettingsPress?: () => void;
}

export const DashboardHeader = ({ 
  className,
  onNotificationPress,
  onSettingsPress 
}: DashboardHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      router.push('/notify'); // Asegúrate de tener esta ruta
    }
  };

  const handleSettingsPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      router.push('/config'); // Asegúrate de tener esta ruta
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      <View 
        className={`bg-primary-500 ${className || ''}`}
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-row items-center justify-between h-14 px-4">
          {/* Logo dabetai */}
          <View className="flex-1">
            <Image
              source={require('@/assets/images/logos/dabetai-header.png')}
              className="w-26 h-6"
              resizeMode="contain"
            />
          </View>
          
          {/* Iconos de la derecha */}
          <View className="flex-row items-center">
            {/* Icono de notificaciones */}
            <TouchableOpacity 
              onPress={handleNotificationPress}
              className="mr-4 p-2"
            >
              <Feather 
                name="bell" // <- Feather icon
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
            
            {/* Icono de configuración */}
            <TouchableOpacity 
              onPress={handleSettingsPress}
              className="p-2"
            >
              <Feather 
                name="settings" // <- Feather icon
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
