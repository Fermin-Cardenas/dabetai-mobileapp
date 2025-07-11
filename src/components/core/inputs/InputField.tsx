// src/components/core/inputs/InputField.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Body } from '@/components/common/Typography';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  error?: string;
  className?: string;
}

export const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  showPasswordToggle = false,
  onTogglePassword,
  error,
  className
}: InputFieldProps) => {
  return (
    <View className={`${className || ''}`}>
      {/* Label */}
      {label && (
        <Body 
          className="text-[#314158]"
          style={{
            marginBottom: 2,
            fontSize: 16,
            fontFamily: 'Source Sans 3'
          }}
        >
          {label}
        </Body>
      )}
      
      {/* Input Container */}
      {showPasswordToggle ? (
        <View 
          className="flex-row items-center bg-white"
          style={{
            borderColor: "#CAD5E2",
            borderWidth: 1,
            borderRadius: 15,
            paddingHorizontal: 10,
            marginBottom: 15
          }}
        >
          <TextInput
            className="flex-1 text-[#62748E]"
            style={{
              height: 44,
              fontFamily: 'Source Sans 3'
            }}
            placeholder={placeholder}
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={onTogglePassword} style={{ padding: 10 }}>
            <MaterialCommunityIcons 
              name={secureTextEntry ? "eye-off" : "eye"} 
              size={24} 
              color="#888" 
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          className="bg-white text-[#62748E]"
          style={{
            height: 44,
            borderColor: "#CAD5E2",
            borderWidth: 1,
            borderRadius: 15,
            marginBottom: 15,
            paddingLeft: 10,
            fontFamily: 'Source Sans 3'
          }}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      )}
      
      {/* Error Message */}
      {error && (
        <Body className="text-red-500 text-sm mt-1">
          {error}
        </Body>
      )}
    </View>
  );
};