// src/features/configuration/components/DeleteAccountButton.tsx
import React from 'react';
import { View } from 'react-native';
import { SecondaryButton } from '@/components/core/buttons/SecondaryButton';

interface DeleteAccountButtonProps {
  onPress: () => void;
}

export const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = ({
  onPress
}) => {
  return (
    <View className="px-4 pt-5 pb-5">
      <SecondaryButton
        title="Eliminar cuenta"
        onPress={onPress}
        size="customRedLarge"
      />
    </View>
  );
};