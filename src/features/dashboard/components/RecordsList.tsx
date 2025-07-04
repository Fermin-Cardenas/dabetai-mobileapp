// src/features/record/components/RecordsList.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { H2, Body, BodySmall } from '@/components/common/Typography';
import Feather from '@expo/vector-icons/Feather';
import { FadeSpec } from 'node_modules/@react-navigation/bottom-tabs/lib/typescript/src/TransitionConfigs/TransitionSpecs';

interface RecordData {
  id: string;
  value: string;
  date: string;
  onPress?: () => void;
}

interface RecordsListProps {
  title: string;
  records: RecordData[];
  className?: string;
}

const RecordItem = ({ value, date, onPress }: RecordData) => {
  // Función para procesar texto con negritas
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return (
      <View className="flex-row flex-wrap items-baseline">
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2);
            return (
              <Body key={index} className="text-[#2C3E50] font-bold text-lg">
                {boldText}
              </Body>
            );
          }
          return (
            <Body key={index} className="text-[#2C3E50] font-normal text-lg">
              {part}
            </Body>
          );
        })}
      </View>
    );
  };

  return (
    <TouchableOpacity 
      className="flex-row justify-between items-center px-4 py-6 border-b border-[#E5E7EB]"
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 bg-transparent rounded-full justify-center items-center mr-4">
          <Feather name="alert-circle" size={24} color="#314158" />
        </View>
        <View className="flex-1">
          <View className="mb-2">
            {renderTextWithBold(value)}
          </View>
          <BodySmall className="text-gray-500 text-base">
            {date}
          </BodySmall>
        </View>
      </View>
      <Feather name="chevron-right" size={28} color="#314158" />
    </TouchableOpacity>
  );
};

export const RecordsList = ({ title, records, className }: RecordsListProps) => {
  return (
    <View className={`mb-20 ${className || ''}`}>
      <H2 className="text-[#2C3E50] font-bold text-lg mb-6 px-1">
        {title}
      </H2>
      
      <View className="bg-white -mx-4 shadow-sm">
        {records.map((record, index) => (
          <RecordItem 
            key={record.id || index}
            id={record.id}
            value={record.value}
            date={record.date}
            onPress={record.onPress}
          />
        ))}
      </View>
    </View>
  );
};