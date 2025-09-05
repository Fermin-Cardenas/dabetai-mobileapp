// src/features/chat/components/ChatInput.tsx
import { Caption } from '@/components/common/Typography';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
interface ChatInputProps {
  message: string;
  onMessageChange: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disclaimer?: string;
}

export const ChatInput = ({ 
  message, 
  onMessageChange, 
  onSend, 
  placeholder = "Haz una pregunta",
  disclaimer = "dai puede cometer errores. Verifica la información."
}: ChatInputProps) => {
  const handleSend = () => {
    if (message.trim()) {
      onSend();
    }
  };

  return (
    <View className="px-4 py-4 bg-slate-50">
      {/* Input wrapper */}
      <View className="flex-row items-end gap-3 mb-2">
        <TextInput
          className="flex-1 bg-gray-100 rounded-3xl px-4 py-3 text-base text-gray-800"
          style={{ 
            maxHeight: 120, 
            minHeight: 44,
            textAlignVertical: 'top' 
          }}
          value={message}
          onChangeText={onMessageChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline
          blurOnSubmit={false}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          enablesReturnKeyAutomatically={true}
        />
        <TouchableOpacity
          className={`w-12 h-12 rounded-full justify-center items-center ${
            message.trim() ? 'bg-primary-500' : 'bg-gray-300'
          }`}
          onPress={handleSend}
          disabled={!message.trim()}
        >
       
<Feather 
  name="send" 
  size={20} 
  color={message.trim() ? "white" : "#9CA3AF"} 
/>
        </TouchableOpacity>
      </View>
      
      {/* Disclaimer */}
      <Caption className="text-gray-400 px-1">
        {disclaimer}
      </Caption>
    </View>
  );
};