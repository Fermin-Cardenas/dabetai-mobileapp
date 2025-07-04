// app/onboarding.tsx
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

// Header de navegación
import { Header } from '@/components/core/navigation/Header';

// Componentes del onboarding
import { WelcomeScreen } from '@/features/onboarding/components/WelcomeScreen';
import { DiabetesTypeScreen } from '@/features/onboarding/components/DiabetesTypeScreen';
import { DiagnosisYearScreen } from '@/features/onboarding/components/DiagnosisYearScreen';
import { BirthDateScreen } from '@/features/onboarding/components/BirthDateScreen';
import { GenderScreen } from '@/features/onboarding/components/GenderScreen';
import { HeightScreen } from '@/features/onboarding/components/HeightScreen';
import { WeightScreen } from '@/features/onboarding/components/WeightScreen';
import { DeviceConnectionScreen } from '@/features/onboarding/components/DeviceConnectionScreen';
import { HealthAppsConnectionScreen } from '@/features/onboarding/components/HealthAppsConnectionScreen';
import { DoctorLinkScreen } from '@/features/onboarding/components/DoctorLinkScreen';
import { OnboardingCompleteScreen } from '@/features/onboarding/components/OnboardingCompleteScreen';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  // Estados para almacenar las respuestas del usuario
  const [onboardingData, setOnboardingData] = useState({
    diabetesType: '',
    diagnosisYear: '',
    birthDate: '',
    gender: '',
    height: '',
    weight: ''
  });

  const handleGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Desde la primera pantalla, regresar a register
      router.push('/(auth)/register'); // Ajusta la ruta según tu proyecto
    }
  };

  const handleContinue = () => {
    if (currentStep < 10) { // 11 pantallas total (0-10)
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding completado, navegar a la siguiente pantalla
      console.log('Onboarding completado:', onboardingData);
      router.push('/(tabs)/home'); // Ajusta la ruta según tu proyecto
    }
  };

  const handleDiabetesTypeSelect = (diabetesType: string) => {
    updateOnboardingData('diabetesType', diabetesType);
    handleContinue(); // Usar la función normal de continuar
  };

  const handleDiagnosisYearSelect = (diagnosisYear: string) => {
    updateOnboardingData('diagnosisYear', diagnosisYear);
    handleContinue(); // Usar la función normal de continuar
  };

  const handleBirthDateSelect = (birthDate: string) => {
    updateOnboardingData('birthDate', birthDate);
    handleContinue(); // Usar la función normal de continuar
  };

  const handleGenderSelect = (gender: string) => {
    updateOnboardingData('gender', gender);
    handleContinue(); // Usar la función normal de continuar
  };

  const handleHeightSelect = (height: string) => {
    updateOnboardingData('height', height);
    handleContinue(); // Usar la función normal de continuar
  };

  const handleWeightSelect = (weight: string) => {
    updateOnboardingData('weight', weight);
    handleContinue(); // Usar la función normal de continuar
  };

  const handleConnectDevice = () => {
    console.log('Conectar dispositivo');
    handleContinue(); // Avanzar al siguiente paso
  };

  const handleSkipDevice = () => {
    console.log('Saltar dispositivo');
    handleContinue(); // Avanzar al siguiente paso
  };

  const handleConnectApps = () => {
    console.log('Conectar aplicaciones de salud');
    handleContinue(); // Avanzar al siguiente paso
  };

  const handleSkipApps = () => {
    console.log('Saltar aplicaciones');
    handleContinue(); // Avanzar al siguiente paso
  };

  const handleLinkDoctor = () => {
    console.log('Vincular médico');
    handleContinue(); // Avanzar al siguiente paso
  };

  const handleSkipDoctor = () => {
    console.log('Saltar médico');
    handleContinue(); // Avanzar al siguiente paso
  };

  const handleGoToHome = () => {
    console.log('Onboarding completado:', onboardingData);
    // Navegar a la app principal
    router.push('/(tabs)/home');
  };

  const updateOnboardingData = (field: string, value: string) => {
    setOnboardingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen onContinue={handleContinue} />;
      
      case 1:
        return (
          <DiabetesTypeScreen 
            onContinue={handleDiabetesTypeSelect}
            initialValue={onboardingData.diabetesType || 'Tipo 1'}
          />
        );
      
      case 2:
        return (
          <DiagnosisYearScreen 
            onContinue={handleDiagnosisYearSelect}
            initialValue={onboardingData.diagnosisYear || '2002'}
          />
        );
      
      case 3:
        return (
          <BirthDateScreen 
            onContinue={handleBirthDateSelect}
            initialValue={onboardingData.birthDate || ''}
          />
        );
      
      case 4:
        return (
          <GenderScreen 
            onContinue={handleGenderSelect}
            initialValue={onboardingData.gender || 'M'}
          />
        );
      
      case 5:
        return (
          <HeightScreen 
            onContinue={handleHeightSelect}
            initialValue={onboardingData.height || '178'}
          />
        );
      
      case 6:
        return (
          <WeightScreen 
            onContinue={handleWeightSelect}
            initialValue={onboardingData.weight || ''}
          />
        );
      
      case 7:
        return (
          <DeviceConnectionScreen 
            onConnectDevice={handleConnectDevice}
            onSkip={handleSkipDevice}
          />
        );
      
      case 8:
        return (
          <HealthAppsConnectionScreen 
            onConnectApps={handleConnectApps}
            onSkip={handleSkipApps}
          />
        );
      
      case 9:
        return (
          <DoctorLinkScreen 
            onLinkDoctor={handleLinkDoctor}
            onSkip={handleSkipDoctor}
          />
        );
      
      case 10:
        return (
          <OnboardingCompleteScreen 
            onGoToHome={handleGoToHome}
          />
        );
      
      default:
        return <WelcomeScreen onContinue={handleContinue} />;
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView className="flex-1 bg-[#f1f5f9]">
        {/* Header transparente siempre visible para regresar */}
        <Header 
          title=""
          showBackButton={true}
          onBackPress={handleGoBack}
          className="bg-transparent"
          iconColor="#314158"
        />
        
        {/* Renderizar la pantalla actual */}
        {renderCurrentScreen()}
      </SafeAreaView>
    </>
  );
};

export default Onboarding;