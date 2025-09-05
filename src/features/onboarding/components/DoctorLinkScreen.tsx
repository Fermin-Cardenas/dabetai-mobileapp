// src/features/onboarding/components/DoctorLinkScreen.tsx
import { Body, H2 } from '@/components/common/Typography';
import { Button, ButtonGroup } from '@/components/core/buttons';
import React from 'react';
import { View } from 'react-native';

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
        <View className="mt-80 items-center">
          <ButtonGroup align="stack">
            <Button
              title="Vincular médico"
              onPress={onLinkDoctor}
              variant="fill"
              color="primary"
            />
            <Button
              title="Saltar por ahora"
              onPress={onSkip}
              variant="outline"
              color="secondary"
            />
          </ButtonGroup>
        </View>
      </View>
    </View>
  );
};