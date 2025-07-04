// src/features/notifications/components/NotificationCategorySection.tsx
import React from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { NotificationCategoryItem } from './NotificationCategoryItem';

interface NotificationCategory {
  id: string;
  title: string;
  route: string;
}

interface NotificationCategorySectionProps {
  title: string;
  categories: NotificationCategory[];
  onCategoryPress: (route: string) => void;
}

export const NotificationCategorySection: React.FC<NotificationCategorySectionProps> = ({
  title,
  categories,
  onCategoryPress
}) => {
  return (
    <View>
      {/* Section Header */}
      <View className="px-4 pt-5 pb-2">
        <H2 className="text-[#314158] font-bold text-lg">
          {title}
        </H2>
      </View>
      
      {/* Category Items */}
      <View className="bg-white mb-0.5">
        {categories.map((category, index) => (
          <NotificationCategoryItem
            key={category.id}
            title={category.title}
            onPress={() => onCategoryPress(category.route)}
            isLast={index === categories.length - 1}
          />
        ))}
      </View>
    </View>
  );
};
