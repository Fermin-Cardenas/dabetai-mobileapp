// src/components/layouts/OnboardingLayout.tsx
import { Body, H2 } from '@/components/common/Typography';
import { Header } from '@/components/core/navigation/Header';
import { ProgressIndicator } from '@/features/onboarding/components/common/ProgressIndicator';
import { useOnboarding } from '@/features/onboarding/context/OnboardingContext';
import React, { ReactNode } from 'react';
import { SafeAreaView, View } from 'react-native';

interface OnboardingLayoutProps {
  /** Título principal de la pantalla */
  title: string;
  /** Descripción opcional debajo del título */
  description?: string;
  /** Contenido principal (option cards, pickers, etc.) */
  children: ReactNode;
  /** Botones en la parte inferior */
  buttons: ReactNode;
  /** Custom back handler para el header - si no se proporciona, usa la lógica por defecto */
  onBackPress?: () => void;
  /** Mostrar/ocultar header - defaults to true */
  showHeader?: boolean;
  /** Mostrar/ocultar indicador de progreso */
  showProgress?: boolean;
  /** Mensaje de error para mostrar */
  errorMessage?: string;
  /** Clase adicional para el contenedor principal */
  className?: string;
}

export const OnboardingLayout = ({
  title,
  description,
  children,
  buttons,
  onBackPress,
  showHeader = true,
  showProgress = false,
  errorMessage,
  className = ''
}: OnboardingLayoutProps) => {
  const { prevStep, canGoBack, currentStep, totalSteps } = useOnboarding();

  // Usar onBackPress personalizado o la lógica por defecto
  const handleBackPress = onBackPress || (() => {
    if (canGoBack()) {
      prevStep();
    }
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header integrado */}
      {showHeader && (
        <Header 
          variant="onboarding"
          onBackPress={canGoBack() ? handleBackPress : undefined}
        />
      )}

      {/* Container Principal */}
      <View className="flex-1 justify-between items-center px-4 py-6 gap-4">
        {/* Indicador de Progreso */}
        {showProgress && (
          <View className="w-full max-w-sm">
            <ProgressIndicator 
              current={currentStep} 
              total={totalSteps} 
            />
          </View>
        )}

        {/* Sección Superior: Título y Descripción */}
        <View className="flex-col items-center px-0 gap-6 w-full max-w-sm">
          <H2 className="leading-10 text-center">
            {title}
          </H2>
          
          {description && (
            <Body className="leading-5 text-center">
              {description}
            </Body>
          )}

          {/* Mensaje de Error */}
          {errorMessage && (
            <View className="w-full px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
              <Body className="text-red-600 text-sm text-center">
                {errorMessage}
              </Body>
            </View>
          )}
        </View>

        {/* Contenido Principal */}
        <View className={`flex-1 justify-center items-center w-full max-w-sm ${className}`}>
          {children}
        </View>

        {/* Botones Inferiores */}
        <View className="flex-col items-center px-0 gap-4 w-full max-w-sm">
          {buttons}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingLayout;
