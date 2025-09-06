# Guía de Uso de Layouts

Este documento explica cómo usar los componentes de layout para envolver las páginas de la aplicación con un diseño consistente.

## Layouts Disponibles

1. **AppLayout** - Layout principal para páginas de la app
2. **ChatLayout** - Layout especial para páginas de chat  
3. **OnboardingLayout** - Layout específico para pantallas de onboarding

---

## AppLayout

El `AppLayout` proporciona:
- **Header** en la parte superior
- **NavigationBar** en la parte inferior  
- **Contenido** en el centro con:
  - Padding horizontal: 16px (`px-4`)
  - Padding vertical: 24px (`py-6`)
  - Espaciado entre elementos: 24px (`gap-6`)

## Importación

```tsx
import { AppLayout } from '@/components/layouts';
```

## Uso Básico

### 1. Página Standard (ej: Dashboard, Record, Retinopatía)

```tsx
import { AppLayout } from '@/components/layouts';

const MiPagina = () => {
  return (
    <>
      <AppLayout activeTab="inicio" title="Mi Página">
        <H1>Título Principal</H1>
        
        <Card>
          {/* Contenido de la tarjeta */}
        </Card>
        
        <View>
          {/* Más contenido */}
        </View>
      </AppLayout>
    </>
  );
};
```

### 2. Página de Chat (usar ChatLayout)

Para páginas que requieren manejo especial del teclado:

```tsx
import { ChatLayout } from '@/components/layouts';

const ChatPage = () => {
  return (
    <>
      <ChatLayout title="IA Chat" activeTab="ia-chat">
        <ChatMessagesList messages={messages} />
        <ChatInput message={message} onSend={handleSend} />
      </ChatLayout>
    </>
  );
};
```

## Props del AppLayout

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | ReactNode | - | Contenido a renderizar |
| `title` | string | - | Título del header (opcional) |
| `headerVariant` | 'section' \| 'principal' \| 'onboarding' | 'principal' | Variante del header |
| `activeTab` | string | 'inicio' | Tab activo en la navegación |
| `showHeader` | boolean | true | Mostrar header |
| `showNavigation` | boolean | true | Mostrar barra de navegación |
| `scrollable` | boolean | true | Contenido scrolleable |
| `onBackPress` | () => void | - | Handler personalizado para botón back |
| `className` | string | '' | Clases CSS adicionales |
| `backgroundColor` | string | 'bg-[#f1f5f9]' | Color de fondo |

## Ejemplos de Páginas Convertidas

### Home
```tsx
<AppLayout activeTab="inicio">
  <H1 className="text-gray-700 font-bold text-3xl">Hola, Christian</H1>
  <GlucoseCard value="185" unit="mg/dL" />
  <ActionCard title="Automatiza tus datos" />
</AppLayout>
```

### Record/Historial
```tsx
<AppLayout title="Historial" activeTab="historial">
  <PeriodSelector periods={['Hoy', '1 semana']} />
  <CategoryTabs categories={['Glucosa', 'Comidas']} />
  <RecordChart />
</AppLayout>
```

### Retinopatía
```tsx
<AppLayout activeTab="prediccion" backgroundColor="bg-slate-100">
  <H2>Tu nivel de riesgo de retinopatía diabética</H2>
  <RiskLevelCard riskLevel="alto" />
  <ComplicationsList complications={complications} />
</AppLayout>
```

## Migración de Páginas Existentes

### Antes:
```tsx
<SafeAreaView className="flex-1 bg-[#f1f5f9]">
  <Header variant="principal" />
  <ScrollView className="flex-1 px-4 pb-24">
    <H1>Contenido</H1>
    {/* más contenido */}
  </ScrollView>
  <NavigationBar activeTab="inicio" />
</SafeAreaView>
```

### Después:
```tsx
<AppLayout activeTab="inicio">
  <H1>Contenido</H1>
  {/* más contenido */}
</AppLayout>
```

## Tabs Disponibles

- `"inicio"` - Página de inicio/dashboard
- `"ia-chat"` - Chat con IA
- `"historial"` - Página de record/historial
- `"prediccion"` - Páginas de predicción/retinopatía

---

## OnboardingLayout

### Estructura del OnboardingLayout

El `OnboardingLayout` proporciona:
- **Header** en la parte superior (con botón back)
- **Título principal** centrado
- **Descripción** opcional debajo del título
- **Contenido principal** en el centro (option cards, pickers, etc.)
- **Botones** en la parte inferior

### Uso del OnboardingLayout

#### Ejemplo 1: Pantalla con Option Cards

```tsx
import { OnboardingLayout } from '@/components/layouts';
import { OptionCard } from '@/components/core/inputs/OptionCard';

const DiabetesTypeScreen = () => {
  const [selectedType, setSelectedType] = useState('');

  return (
    <OnboardingLayout
      title="¿Qué tipo de diabetes tienes?"
      onBackPress={() => router.back()}
      buttons={
        <Button
          title="Continuar"
          onPress={handleContinue}
          disabled={!selectedType}
          className="w-full"
        />
      }
    >
      <View className="flex-col gap-4 w-full">
        <OptionCard
          title="Tipo 1"
          isSelected={selectedType === 'tipo1'}
          onPress={() => setSelectedType('tipo1')}
        />
      </View>
    </OnboardingLayout>
  );
};
```

#### Ejemplo 2: Pantalla con Múltiples Botones

```tsx
const DeviceConnectionScreen = () => {
  return (
    <OnboardingLayout
      title="Automatiza tu monitoreo"
      description="Conecta tu glucómetro o sensor para sincronizar mediciones automáticamente."
      onBackPress={() => router.back()}
      buttons={
        <View className="flex-col gap-3 w-full">
          <Button
            title="Conectar un dispositivo"
            onPress={handleConnect}
            className="w-full"
          />
          <Button
            title="Saltar por ahora"
            onPress={handleSkip}
            variant="outline"
            className="w-full"
          />
        </View>
      }
    >
      <IllustrationComponent />
    </OnboardingLayout>
  );
};
```

### OnboardingLayout Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | string | - | Título principal de la pantalla |
| `description` | string | - | Descripción opcional debajo del título |
| `children` | ReactNode | - | Contenido principal (option cards, pickers, etc.) |
| `buttons` | ReactNode | - | Botones en la parte inferior |
| `onBackPress` | () => void | - | Handler personalizado para botón back |
| `showHeader` | boolean | true | Mostrar/ocultar header |
| `className` | string | '' | Clase adicional para el contenedor principal |

---

## Notas Importantes

1. **Siempre usar** `<Stack.Screen options={{ headerShown: false }} />` dentro del componente
2. **No necesitas** `SafeAreaView`, `ScrollView`, `Header`, ni `NavigationBar` manualmente
3. **El espaciado** entre elementos se maneja automáticamente con `gap-6`
4. **Para chats** usar `ChatLayout` en lugar de `AppLayout`
5. **Para onboarding** usar `OnboardingLayout` en lugar de `AppLayout`
6. **OnboardingLayout** no incluye navigation bar (solo para onboarding)
7. **Background personalizado** usando la prop `backgroundColor`

## ChatLayout Props Adicionales

El `ChatLayout` tiene las mismas props que `AppLayout` pero maneja automáticamente:
- Keyboard avoiding behavior
- Ocultar navigation bar cuando el teclado está abierto
- Spacer dinámico para Android
