// src/components/core/navigation/NavigationBar.tsx
import { useTabNavigation } from '@/hooks/useTabNavigation';
import React from 'react';
import { View } from 'react-native';
import { NavigationButton } from './NavigationButton';

type NavigationBarDirection = 'row' | 'column';

interface NavigationBarProps {
  /** Current active tab ID */
  activeTab?: string;
  /** Layout direction - defaults to 'row' for bottom navigation */
  direction?: NavigationBarDirection;
  /** Additional CSS classes */
  className?: string;
}

export const NavigationBar = ({ 
  activeTab = 'inicio',
  direction = 'row',
  className 
}: NavigationBarProps) => {
  const { navigationItems } = useTabNavigation(activeTab);

  // Figma-based styling
  const getContainerStyles = () => {
    const isRow = direction === 'row';
    
    return {
      layout: isRow 
        ? 'flex-row justify-stretch items-stretch' // Row layout with stretch
        : 'flex-col', // Column layout
      background: 'bg-gray-50', // Figma spec: #F8FAFC
      border: 'border-gray-300', // Figma spec: #CAD5E2
      borderWidth: isRow ? 'border-t' : 'border-r',
      dimensions: isRow ? 'h-16' : 'w-[115px]', // Figma spec dimensions
      maxWidth: isRow ? 'max-w-md' : undefined,
      position: isRow ? 'absolute bottom-0' : undefined,
      selfAlign: isRow ? 'self-center' : undefined,
      fullWidth: isRow ? 'w-full' : undefined
    };
  };

  const styles = getContainerStyles();

  return (
    <View 
      className={`
        ${styles.layout} 
        ${styles.background} 
        ${styles.border} 
        ${styles.borderWidth} 
        ${styles.dimensions}
        ${styles.maxWidth || ''}
        ${styles.position || ''}
        ${styles.selfAlign || ''}
        ${styles.fullWidth || ''}
        ${className || ''}
      `}
    >
      {navigationItems.map((item) => (
        <NavigationButton
          key={item.id}
          title={item.title}
          icon={item.icon}
          state={activeTab === item.id ? 'active' : 'default'}
          direction={direction === 'row' ? 'column' : 'row'} // Navigation items are opposite of container
          onPress={item.onPress}
          className={direction === 'row' ? 'flex-1' : undefined}
        />
      ))}
    </View>
  );
};
