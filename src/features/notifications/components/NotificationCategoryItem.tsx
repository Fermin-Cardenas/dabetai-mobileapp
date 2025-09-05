import { Body } from '@/components/common/Typography';
import Feather from '@expo/vector-icons/Feather'; // Cambiado a Feather
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface NotificationCategoryItemProps {
  title: string;
  onPress: () => void;
  isLast?: boolean;
}

export const NotificationCategoryItem: React.FC<NotificationCategoryItemProps> = ({
  title,
  onPress,
  isLast = false
}) => {
  return (
    <TouchableOpacity 
      className={`bg-white flex-row justify-between items-center px-4 py-3.5 ${
        !isLast ? 'border-b border-gray-200' : ''
      }`}
      style={{ borderBottomWidth: isLast ? 0 : 0.5 }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Contenido izquierdo */}
      <View className="flex-row items-center flex-1">
        {/* Icono */}
        <View className="w-6 h-6 rounded-full justify-center items-center mr-3">
          <Feather name="info" size={20} color="#6B7280" />
        </View>
        
        {/* Título */}
        <Body className="text-slate-600 text-base font-normal">
          {title}
        </Body>
      </View>
      
      {/* Chevron */}
      <Feather 
        name="chevron-right" 
        size={20} 
        color="#1F2937" 
        className="font-bold"
      />
    </TouchableOpacity>
  );
};
