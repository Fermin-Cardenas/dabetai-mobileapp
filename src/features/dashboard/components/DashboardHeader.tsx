// src/features/dashboard/components/DashboardHeader.tsx
import React from 'react';
import { View, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather'; // <- ya importado

interface DashboardHeaderProps {
  className?: string;
}

export const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push('/notify'); // Asegúrate de tener esta ruta
  };

  const handleSettingsPress = () => {
    router.push('/config'); // Asegúrate de tener esta ruta
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      <View 
        className={`bg-[#2196F3] ${className || ''}`}
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-row items-center justify-between h-14 px-4">
          {/* Logo dabetai */}
          <View className="flex-1">
            <Image
              source={require('@/assets/images/dabetai4.png')}
              style={{
                width: 104,
                height: 24,
              }}
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
