// src/components/core/navigation/NavigationButton.tsx
import { Caption } from '@/components/common/Typography';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

type NavigationButtonState = 'default' | 'active';
type NavigationButtonDirection = 'column' | 'row';

interface NavigationButtonProps {
  title: string;
  icon: React.ReactNode;
  state?: NavigationButtonState;
  direction?: NavigationButtonDirection;
  onPress: () => void;
  className?: string;
}

export const NavigationButton = ({ 
  title, 
  icon,
  state = 'default',
  direction = 'column',
  onPress,
  className 
}: NavigationButtonProps) => {
  // Figma-based styling
  const getButtonStyles = () => {
    const isActive = state === 'active';
    const isColumn = direction === 'column';
    
    return {
      container: isColumn 
        ? 'flex-col justify-center items-center gap-1 p-3' // Column: 8px padding, 4px gap
        : 'flex-row justify-center items-center gap-1.5 px-2 py-2', // Row: 8px padding, 6px gap
      textColor: isActive ? 'text-[#2196F3]' : 'text-[#62748E]', // Active: #2196F3, Default: #62748E
      iconColor: isActive ? '#2196F3' : '#62748E',
      minHeight: isColumn ? 'min-h-[63px]' : 'min-h-[40px]' // Figma spec heights
    };
  };

  const styles = getButtonStyles();

  return (
    <TouchableOpacity 
      className={`${styles.container} ${styles.minHeight} ${className || ''}`}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ selected: state === 'active' }}
    >
      {/* Icon - Figma spec: 24x24px */}
      <View className="w-6 h-6 justify-center items-center">
        {React.isValidElement(icon) 
          ? React.cloneElement(icon, { 
              color: styles.iconColor,
              size: 24,
              strokeWidth: 2.5 // Figma spec
            } as any)
          : icon
        }
      </View>
      
      {/* Label - Figma spec: Inter, 12px, bold, center aligned */}
      <Caption className={`${styles.textColor} font-bold text-center text-xs leading-tight`}>
        {title}
      </Caption>
    </TouchableOpacity>
  );
};
