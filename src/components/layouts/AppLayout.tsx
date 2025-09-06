// src/components/layouts/AppLayout.tsx
import { Header } from '@/components/core/navigation/Header';
import { NavigationBar } from '@/components/core/navigation/NavigationBar';
import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

interface AppLayoutProps {
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
  /** Whether content should be scrollable - defaults to true */
  scrollable?: boolean;
  /** Custom back handler for header */
  onBackPress?: () => void;
  /** Additional className for the main container */
  className?: string;
  /** Background color for the safe area - defaults to bg-[#f1f5f9] */
  backgroundColor?: string;
}

export const AppLayout = ({
  children,
  title,
  headerVariant = 'principal',
  activeTab = 'inicio',
  showHeader = true,
  showNavigation = true,
  scrollable = true,
  onBackPress,
  className = '',
  backgroundColor = 'bg-[#f1f5f9]'
}: AppLayoutProps) => {
  const ContentContainer = scrollable ? ScrollView : View;
  
  const contentProps = scrollable 
    ? { 
        className: 'flex-1',
        contentContainerStyle: { paddingBottom: showNavigation ? 80 : 24 } // Extra padding for navigation bar
      }
    : { 
        className: 'flex-1' 
      };

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

      {/* Main Content Area */}
      <ContentContainer {...contentProps}>
        <View className={`px-4 py-6 gap-6 ${className}`}>
          {children}
        </View>
      </ContentContainer>

      {/* Navigation Bar */}
      {showNavigation && (
        <NavigationBar activeTab={activeTab} />
      )}
    </SafeAreaView>
  );
};

export default AppLayout;
