// src/features/configuration/components/ConfigSection.tsx
import React from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { ConfigMenuItem } from './ConfigMenuItem';

interface MenuItem {
  title: string;
  route: string;
}

interface ConfigSectionProps {
  title: string;
  items: MenuItem[];
  onItemPress: (route: string) => void;
}

export const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  items,
  onItemPress
}) => {
  return (
    <View>
      {/* Section Header */}
      <View className="px-4 pt-5 pb-2">
        <H2 className="text-[#314158] font-bold text-lg">
          {title}
        </H2>
      </View>
      
      {/* Menu Items */}
      <View className="bg-white mb-0.5">
        {items.map((item, index) => (
          <ConfigMenuItem
            key={index}
            title={item.title}
            onPress={() => onItemPress(item.route)}
            isLast={index === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
};
