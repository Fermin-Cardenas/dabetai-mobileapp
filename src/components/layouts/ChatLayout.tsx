// src/components/layouts/ChatLayout.tsx
import { Header } from '@/components/core/navigation/Header';
import { NavigationBar } from '@/components/core/navigation/NavigationBar';
import React, { ReactNode, useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    View
} from 'react-native';

interface ChatLayoutProps {
  /** Content to be rendered in the main area */
  children: ReactNode;
  /** Header title - optional */
  title?: string;
  /** Header variant */
  headerVariant?: 'section' | 'principal' | 'onboarding';
  /** Active tab for navigation bar */
  activeTab?: string;
  /** Whether to show header - defaults to true */
  showHeader?: boolean;
  /** Whether to show navigation bar - defaults to true */
  showNavigation?: boolean;
  /** Custom back handler for header */
  onBackPress?: () => void;
  /** Additional className for the main container */
  className?: string;
  /** Background color for the safe area - defaults to bg-slate-50 */
  backgroundColor?: string;
}

export const ChatLayout = ({
  children,
  title,
  headerVariant = 'principal',
  activeTab = 'ia-chat',
  showHeader = true,
  showNavigation = true,
  onBackPress,
  className = '',
  backgroundColor = 'bg-slate-50'
}: ChatLayoutProps) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Listener para el teclado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return (
    <SafeAreaView className={`flex-1 ${backgroundColor}`}>
      {/* Header */}
      {showHeader && (
        <Header
          title={title}
          variant={headerVariant}
          onBackPress={onBackPress}
        />
      )}

      {/* Chat Container */}
      <View className="flex-1">
        <KeyboardAvoidingView 
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
        >
          <View className={`flex-1 ${className}`}>
            {children}
          </View>

          {/* Spacer dinámico para Android - SOLO cuando el teclado está abierto */}
          {Platform.OS === 'android' && keyboardHeight > 0 && (
            <View className="h-14" />
          )}
        </KeyboardAvoidingView>
      </View>

      {/* Navegación inferior - SOLO visible cuando el teclado está cerrado */}
      {showNavigation && keyboardHeight === 0 && (
        <NavigationBar activeTab={activeTab} />
      )}
    </SafeAreaView>
  );
};

export default ChatLayout;
