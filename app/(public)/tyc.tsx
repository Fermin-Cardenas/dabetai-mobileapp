// app/(public)/tyc.tsx
import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { H1, Body, H2 } from '@/components/common/Typography';
import { Header } from '@/components/core/navigation/Header';

export default function TermsScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Contenido de términos y condiciones
  const termsContent = [
    {
      id: 1,
      text: "Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex nisl laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget rutrum pharetra, lectus nisl posuere risus, vel facilisis nisl tellus ac turpis."
    },
    {
      id: 2,
      text: "Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex nisl laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget rutrum pharetra, lectus nisl posuere risus, vel facilisis nisl tellus."
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."
    },
    {
      id: 4,
      text: "Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Aenean arcu metus, bibendum at rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex placerat. Mauris ut lacinia justo, sed suscipit tortor. Nam egestas nulla posuere neque."
    }
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 bg-[#f1f5f9]">
        {/* Header con botón de regreso */}
        <Header
          title="Términos y condiciones"
          showBackButton={true}
          onBackPress={handleGoBack}
        />
        
        {/* Content */}
        <ScrollView 
          className="flex-1 bg-[#f1f5f9] px-5 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Última actualización */}
          <H2 className="text-[#2C3E50] font-bold text-lg mb-5">
            Última actualización: 14/08/2024
          </H2>
          
          {/* Contenido de términos */}
          {termsContent.map((item) => (
            <Body 
              key={item.id}
              className="text-[#333333] text-base leading-6 mb-5 text-justify"
              style={{ fontFamily: 'System' }}
            >
              {item.id}. {item.text}
            </Body>
          ))}
        </ScrollView>
      </View>
    </>
  );
}