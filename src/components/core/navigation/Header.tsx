// src/components/core/navigation/Header.tsx
import { Subtitle } from '@/components/common/Typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderVariant = 'section' | 'principal' | 'onboarding';

interface HeaderProps {
  title?: string;
  variant?: HeaderVariant;
  onBackPress?: () => void; // Only for custom back behavior
  className?: string;
}

export const Header = ({ 
  title,
  variant = 'principal',
  onBackPress,
  className
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Internal navigation handlers - always navigate to the same routes
  const handleNotifications = () => {
    router.push('/notify' as any);
  };

  const handleSettings = () => {
    router.push('/config' as any);
  };

  // Default back handler if none provided
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };
  
  // Figma-based styling using Tailwind classes
  const getVariantStyles = () => {
    switch (variant) {
      case 'section':
        return {
          backgroundColor: 'bg-primary-500',// #2196F3
          statusBarStyle: 'dark-content' as const,
          textColor: '!text-gray-50', // #F8FAFC
          iconColor: '#F8FAFC', // #F8FAFC
          padding: 'px-4 py-4'
        };
      case 'onboarding':
        return {
          backgroundColor: 'bg-transparent',
          statusBarStyle: 'dark-content' as const,
          textColor: 'text-gray-700', // #314158
          iconColor: '#314158',
          padding: 'px-4 py-4'
        };
      case 'principal':
      default:
        return {
          backgroundColor: 'bg-primary-500', // #2196F3
          statusBarStyle: 'light-content' as const,
          textColor: '!text-gray-50',
          iconColor: '#F8FAFC',
          padding: 'px-6 py-4'
        };
    }
  };

  const styles = getVariantStyles();
  const shouldShowBackButton = variant !== 'principal'; // Section and onboarding always show back button

  // Render principal variant (dashboard header with logo and actions)
  if (variant === 'principal') {
    return (
      <>
        <StatusBar 
          barStyle={styles.statusBarStyle} 
          backgroundColor="#2196F3" // Use hex for StatusBar compatibility
        />
        <View 
          className={`${styles.backgroundColor} ${styles.padding} ${className || ''}`}
          style={{ 
            paddingTop: insets.top + 16 // 16px from Figma + safe area
          }}
        >
          <View className="flex-row justify-between items-center">
            {/* Logo - Figma spec: 104x24px */}
            <Image
              source={require('@/assets/images/logos/dabetai-isotipo-compact.png')}
              style={{ height: 24 }}
              resizeMode="contain"
            />
            
            {/* Action Icons - Figma spec: gap 16px, icons 24x24px */}
            <View className="flex-row items-center gap-4">
              {/* Notification Button */}
              <TouchableOpacity
                onPress={handleNotifications}
                className="w-6 h-6 justify-center items-center"
                accessibilityRole="button"
                accessibilityLabel="Notificaciones"
              >
                <MaterialCommunityIcons 
                  name="bell-outline"
                  size={24}
                  color={styles.iconColor}
                  strokeWidth={2.5} // Figma spec
                />
              </TouchableOpacity>
              
              {/* Settings Button */}
              <TouchableOpacity
                onPress={handleSettings}
                className="w-6 h-6 justify-center items-center"
                accessibilityRole="button"
                accessibilityLabel="Configuración"
              >
                <MaterialCommunityIcons 
                  name="cog-outline"
                  size={24}
                  color={styles.iconColor}
                  strokeWidth={2.5} // Figma spec
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }

  // Render section/onboarding variants (simple header with title and back button)
  return (
    <>
      <StatusBar 
        barStyle={styles.statusBarStyle} 
        backgroundColor={variant === 'section' ? '#F8FAFC' : '#FFFFFF'} // Use hex for StatusBar compatibility
      />
      <View 
        className={`${styles.backgroundColor} ${styles.padding} ${className || ''}`}
        style={{ 
          paddingTop: insets.top + 16 // 16px from Figma + safe area
        }}
      >
        <View className="flex-row items-center">
          {/* Back Button - Always shown for section/onboarding variants */}
          {shouldShowBackButton && (
            <TouchableOpacity
              onPress={handleBackPress}
              className="mr-4 w-6 h-6 justify-center items-center"
              accessibilityRole="button"
              accessibilityLabel="Regresar"
            >
              <MaterialCommunityIcons 
                name="arrow-left"
                size={24}
                color={styles.iconColor}
              />
            </TouchableOpacity>
          )}
                    
          {/* Title - Figma spec: Source Sans Pro, 18px, bold */}
          {title && (
            <Subtitle className={`${styles.textColor} flex-1`}>
              {title}
            </Subtitle>
          )}
        </View>
      </View>
    </>
  );
};
