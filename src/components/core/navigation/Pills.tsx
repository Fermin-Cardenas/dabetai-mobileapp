// src/components/core/navigation/Pills.tsx
import { BodySmallBold } from '@/components/common/Typography';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

// Types
type PillState = 'default' | 'selected' | 'disabled';

interface PillsProps extends Omit<TouchableOpacityProps, 'onPress'> {
  /** Text content of the pill */
  children: string;
  /** Current state of the pill */
  state?: PillState;
  /** Callback when pill is pressed */
  onPress?: () => void;
  /** Additional CSS classes */
  className?: string;
}

// Theme configuration based on Figma design
const PILL_THEME: Record<PillState, {
  container: string;
  text: string;
}> = {
  default: {
    container: 'bg-transparent',
    text: '', // #314158
  },
  selected: {
    container: 'bg-primary-500', // #2196F3
    text: '!text-white', // #F8FAFC
  },
  disabled: {
    container: 'bg-gray-500', // #62748E
    text: '!text-white',
  },
};

export const Pills: React.FC<PillsProps> = ({
  children,
  state = 'default',
  onPress,
  className = '',
  disabled,
  ...props
}) => {
  // Determine the actual state (disabled overrides other states)
  const actualState = disabled ? 'disabled' : state;
  const theme = PILL_THEME[actualState];

  return (
    <TouchableOpacity
      className={`
        rounded-full py-3 px-4 justify-center items-center
        ${theme.container}
        ${className}
      `}
      onPress={onPress}
      disabled={disabled || actualState === 'disabled'}
      activeOpacity={0.8}
      {...props}
    >
      <BodySmallBold className={theme.text}>
        {children}
      </BodySmallBold>
    </TouchableOpacity>
  );
};