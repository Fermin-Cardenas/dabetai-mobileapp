// src/components/core/navigation/TabsControl.tsx
import React from 'react';
import { View } from 'react-native';
import { Tabs } from './Tabs';

// Types
interface TabsControlProps {
  /** Array of option labels */
  options: string[];
  /** Currently selected index */
  selectedIndex: number;
  /** Callback when selection changes */
  onSelectionChange: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

export const TabsControl: React.FC<TabsControlProps> = ({
  options,
  selectedIndex,
  onSelectionChange,
  className = '',
}) => {
  return (
    <View className={`flex-row items-center ${className}`}>
      {options.map((option, index) => (
        <Tabs
          key={`${option}-${index}`}
          state={selectedIndex === index ? 'selected' : 'default'}
          onPress={() => onSelectionChange(index)}
        >
          {option}
        </Tabs>
      ))}
    </View>
  );
};
