// src/features/dashboard/components/LearnMoreSection.tsx
import { Body, H3 } from '@/components/common/Typography';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface LearnMoreItem {
  id: string;
  title: string;
  content: string;
}

interface LearnMoreSectionProps {
  title: string;
  sections: LearnMoreItem[];
}

export const LearnMoreSection: React.FC<LearnMoreSectionProps> = ({
  title,
  sections
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <View className="px-4 mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <H3 className="text-gray-800 font-semibold text-base flex-1">
          {title}
        </H3>
        <TouchableOpacity 
          className="px-6 py-3 bg-transparent border-2 border-secondary-600 rounded-full"
          onPress={() => {}}
        >
          <Body className="text-secondary-600 text-sm font-semibold">
            Ver más
          </Body>
        </TouchableOpacity>
      </View>

      {/* Secciones expandibles */}
      <View>
        {sections.map((section, index) => (
          <View 
            key={section.id}
            className={`bg-white rounded-lg mb-2 ${
              index === sections.length - 1 ? 'mb-0' : ''
            }`}
          >
            <TouchableOpacity 
              className="flex-row justify-between items-center p-4"
              onPress={() => toggleSection(section.id)}
            >
              <Body className="text-gray-800 text-sm font-medium flex-1">
                {section.title}
              </Body>
              <MaterialIcons 
                name={expandedSections[section.id] ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#6B7280" 
              />
            </TouchableOpacity>
            {expandedSections[section.id] && (
              <View className="px-4 pb-4">
                <Body className="text-gray-500 text-sm leading-5">
                  {section.content}
                </Body>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};