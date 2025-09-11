// src/components/core/navigation/SegmentedControl.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Pills } from './Pills';

// Types
interface SegmentedControlProps {
  /** Array of option labels */
  options: string[];
  /** Currently selected index */
  selectedIndex: number;
  /** Callback when selection changes */
  onSelectionChange: (index: number) => void;
  /** Enable horizontal scrolling for many items */
  scrollable?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onSelectionChange,
  scrollable = false,
  className = '',
}) => {
  const renderPills = () => (
    <>
      {options.map((option, index) => (
        <Pills
          key={`${option}-${index}`}
          state={selectedIndex === index ? 'selected' : 'default'}
          onPress={() => onSelectionChange(index)}
          className="flex-1"
        >
          {option}
        </Pills>
      ))}
    </>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className={`bg-gray-50 rounded-full p-1 ${className}`}
        contentContainerStyle={{
          paddingHorizontal: 4,
          gap: 4,
        }}
      >
        <View className="flex-row gap-1">
          {options.map((option, index) => (
            <Pills
              key={`${option}-${index}`}
              state={selectedIndex === index ? 'selected' : 'default'}
              onPress={() => onSelectionChange(index)}
            >
              {option}
            </Pills>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View className={`bg-gray-50 rounded-full p-1 flex-row gap-1 ${className}`}>
      {renderPills()}
    </View>
  );
};
