import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather'; // Cambiado a Feather
import { Body } from '@/components/common/Typography';

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
        !isLast ? 'border-b border-[#E5E7EB]' : ''
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
        <Body className="text-[#62748E] text-base font-normal">
          {title}
        </Body>
      </View>
      
      {/* Chevron */}
      <Feather 
        name="chevron-right" 
        size={20} 
        color="#1F2937" 
        style={{ fontWeight: 'bold' }}
      />
    </TouchableOpacity>
  );
};
