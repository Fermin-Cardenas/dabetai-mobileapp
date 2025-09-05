// src/components/core/inputs/InputField.tsx
import { Body, BodySmall } from '@/components/common/Typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { InputFieldProps, InputState } from './types';

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
  feedback,
  disabled = false,
  valid = false,
  onFocus,
  onBlur,
  className,
  inputRef
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  // Determine the current state for styling
  const getState = (): InputState => {
    if (disabled) return 'disabled';
    if (error) return 'error';
    if (valid) return 'valid';
    if (isFocused) return 'focus';
    return 'default';
  };

  const state = getState();

  // Get Tailwind classes based on state
  const getContainerClasses = () => {
    return `gap-2 ${className || ''}`;
  };

  const getLabelClasses = () => {
    const baseClasses = 'text-body';
    return disabled 
      ? `${baseClasses} text-gray-400` 
      : `${baseClasses} text-gray-600`;
  };

  const getInputContainerClasses = () => {
    const baseClasses = 'flex-row items-center self-stretch gap-2.5 px-4 py-3 rounded-lg border';
    
    let stateClasses = '';
    switch (state) {
      case 'disabled':
        stateClasses = 'bg-gray-200 border-gray-300';
        break;
      case 'error':
        stateClasses = 'bg-gray-50 border-danger-800';
        break;
      case 'valid':
        stateClasses = 'bg-gray-50 border-success-800';
        break;
      case 'focus':
        stateClasses = 'bg-gray-50 border-primary-700';
        break;
      default:
        stateClasses = 'bg-gray-50 border-gray-300';
    }
    
    return `${baseClasses} ${stateClasses}`;
  };

  const getTextInputClasses = () => {
    const baseClasses = 'flex-1 text-body';
    return disabled 
      ? `${baseClasses} text-gray-400` 
      : `${baseClasses} text-gray-600`;
  };

  const getFeedbackClasses = () => {
    return 'text-body-sm text-danger-800';
  };

  const getIconColor = () => {
    return disabled ? '#90A1B9' : '#314158'; // gray-400 : gray-600
  };

  const getPlaceholderColor = () => {
    return '#62748E'; // gray-500
  };

  return (
    <View className={getContainerClasses()}>
      {/* Label */}
      {label && (
        <Body className={getLabelClasses()}>
          {label}
        </Body>
      )}
      
      {/* Input Container */}
      <View className={getInputContainerClasses()}>
        <TextInput
          ref={inputRef}
          className={getTextInputClasses()}
          placeholder={placeholder}
          placeholderTextColor={getPlaceholderColor()}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {/* Password Toggle Icon */}
        {showPasswordToggle && (
          <TouchableOpacity 
            onPress={onTogglePassword}
            disabled={disabled}
            className="w-4 h-4 justify-center items-center"
          >
            <MaterialCommunityIcons 
              name={secureTextEntry ? "eye-off" : "eye"} 
              size={16} 
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Feedback Message */}
      {(error || feedback) && (
        <BodySmall className={getFeedbackClasses()}>
          {error || feedback}
        </BodySmall>
      )}
    </View>
  );
};