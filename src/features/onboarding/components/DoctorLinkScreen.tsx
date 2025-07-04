// src/features/onboarding/components/DoctorLinkScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { H2, Body } from '@/components/common/Typography';
import { PrimaryButton } from '@/components/core/buttons/PrimaryButton';
import { SecondaryButton } from '@/components/core/buttons/SecondaryButton';

interface DoctorLinkScreenProps {
  onLinkDoctor: () => void;
  onSkip: () => void;
}

export const DoctorLinkScreen: React.FC<DoctorLinkScreenProps> = ({
  onLinkDoctor,
  onSkip
}) => {
  return (
    <View className="flex-1 bg-[#f1f5f9]">
      {/* Contenedor principal como card */}
      <View className="flex-1 justify-center items-center px-0">
        {/* Contenido de la card */}
        <View className="px-6">
          <H2 className="text-[#314158] text-[29px] font-bold text-center mb-2">
            Vincula a tu médico
          </H2>
          
          <Body className="text-[#62748E] text-base text-center mb-2 px-0 leading-6">
            Permite que tu médico vea tus datos de dabetai para un seguimiento más completo.
          </Body>
          
          <Body className="text-[#62748E] text-base text-center mb-8 px-0 leading-6">
            Tú siempre mantendrás el control sobre lo que compartes.
          </Body>
        </View>
        
        {/* Espacio grande como en el diseño original */}
        <View style={{ marginTop: 430 }} className="items-center">
          <PrimaryButton
            title="Vincular médico"
            onPress={onLinkDoctor}
            size="large"
          />
          
          <View className="mt-3">
            <SecondaryButton
              title="Saltar por ahora"
              onPress={onSkip}
              size="large"
            />
          </View>
        </View>
      </View>
    </View>
  );
};