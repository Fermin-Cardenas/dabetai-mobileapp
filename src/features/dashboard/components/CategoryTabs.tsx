// src/features/record/components/CategoryTabs.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Body } from '@/components/common/Typography';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export const CategoryTabs = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className 
}: CategoryTabsProps) => {
  return (
    <View className={`mb-6 ${className || ''}`}>
      <View className="flex-row justify-between px-1">
        {categories.map((category) => (
          <TouchableOpacity 
            key={category}
            className={`pb-3 flex-1 ${
              selectedCategory === category 
                ? 'border-b-2 border-[#2196F3]' 
                : 'border-b-2 border-transparent'
            }`}
            onPress={() => onCategoryChange(category)}
          >
            <Body 
              className={`text-lg font-medium text-center ${
                selectedCategory === category 
                  ? 'text-[#2196F3] font-semibold' 
                  : 'text-gray-600'
              }`}
            >
              {category}
            </Body>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};