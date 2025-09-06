import React from 'react';
import { View } from 'react-native';

export type ButtonGroupAlign = 'justify' | 'start' | 'end' | 'center' | 'stack';

export interface ButtonGroupProps {
  /** Child button components */
  children: React.ReactNode;
  /** Alignment of buttons */
  align?: ButtonGroupAlign;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ButtonGroup component for organizing buttons with flexible layout options
 */
export const ButtonGroup = React.memo<ButtonGroupProps>(({
  children,
  align = 'justify',
  className = '',
}) => {
  // Generate container classes using Tailwind
  const getContainerClasses = () => {
    const baseClasses = ['space-x-4']; // gap between buttons

    switch (align) {
      case 'justify':
        baseClasses.push('flex-row', 'flex-1', 'justify-between');
        break;
      case 'start':
        baseClasses.push('flex-row', 'justify-start');
        break;
      case 'end':
        baseClasses.push('flex-row', 'justify-end');
        break;
      case 'center':
        baseClasses.push('flex-row', 'justify-center');
        break;
      case 'stack':
        baseClasses.pop(); // Remove space-x-4 for stack
        baseClasses.push('flex-col', 'space-y-4', 'w-full');
        break;
    }

    return baseClasses.join(' ');
  };

  return (
    <View className={`${getContainerClasses()} ${className}`}>
      {children}
    </View>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

ButtonGroup.displayName = 'ButtonGroup';
