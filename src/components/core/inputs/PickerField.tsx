// src/components/core/inputs/PickerField.tsx
import { Body, Subtitle } from '@/components/common/Typography';
import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';

// Base interfaces
interface BasePickerProps {
  state?: 'default' | 'error' | 'disabled';
  feedback?: string;
}

// Date picker props - Base
interface BaseDatePickerProps extends BasePickerProps {
  variant: 'date';
  selectedYear: number;
  onYearSelect: (year: number) => void;
  initialYear?: number;
  startYear?: number;
  endYear?: number;
}

// Date picker props - Full (todas las columnas)
interface FullDatePickerProps extends BaseDatePickerProps {
  columns?: 'full';
  selectedDay: number;
  selectedMonth: number;
  onDaySelect: (day: number) => void;
  onMonthSelect: (month: number) => void;
  initialDay?: number;
  initialMonth?: number;
}

// Date picker props - Year only
interface YearOnlyDatePickerProps extends BaseDatePickerProps {
  columns: 'year-only';
  selectedDay?: never; // Excluir estas props cuando es year-only
  selectedMonth?: never;
  onDaySelect?: never;
  onMonthSelect?: never;
  initialDay?: never;
  initialMonth?: never;
}

type DatePickerProps = FullDatePickerProps | YearOnlyDatePickerProps;

// Height picker props
interface HeightPickerProps extends BasePickerProps {
  variant: 'height';
  selectedHeight: number;
  onHeightSelect: (height: number) => void;
  minHeight?: number;
  maxHeight?: number;
  initialScrollHeight?: number;
}

// Weight picker props
interface WeightPickerProps extends BasePickerProps {
  variant: 'weight';
  selectedKg: number;
  selectedGrams: number;
  onKgSelect: (kg: number) => void;
  onGramsSelect: (grams: number) => void;
  initialKg?: number;
  initialGrams?: number;
  minKg?: number;
  maxKg?: number;
}

type PickerFieldProps = DatePickerProps | HeightPickerProps | WeightPickerProps;

export const PickerField: React.FC<PickerFieldProps> = (props) => {
  const { state = 'default', feedback } = props;

  // State-based styling
  const getStateStyles = () => {
    switch (state) {
      case 'error':
        return {
          selectedColor: 'text-danger-800',
          strokeColor: 'bg-danger-800',
          feedbackColor: 'text-danger-800'
        };
      case 'disabled':
        return {
          selectedColor: 'text-gray-400',
          strokeColor: 'bg-gray-400',
          feedbackColor: 'text-gray-400'
        };
      default:
        return {
          selectedColor: '!text-primary-700',
          strokeColor: '!bg-primary-700',
          feedbackColor: '!text-primary-700'
        };
    }
  };

  const styles = getStateStyles();

  const renderContent = () => {
    switch (props.variant) {
      case 'date':
        return <DatePickerContent {...props} styles={styles} />;
      case 'height':
        return <HeightPickerContent {...props} styles={styles} />;
      case 'weight':
        return <WeightPickerContent {...props} styles={styles} />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-full">
      <View className="h-56 w-full">
        {renderContent()}
      </View>
      {feedback && (
        <Body className={`mt-2 ${styles.feedbackColor}`}>
          {feedback}
        </Body>
      )}
    </View>
  );
};

// Date Picker Content Component
const DatePickerContent: React.FC<DatePickerProps & { styles: any }> = (props) => {
  const {
    columns = 'full',
    selectedYear,
    onYearSelect,
    initialYear = 1986,
    startYear = 1950,
    endYear = new Date().getFullYear(),
    state,
    styles
  } = props;

  // Props específicas para fecha completa
  const selectedDay = columns === 'full' ? (props as FullDatePickerProps).selectedDay : 15;
  const selectedMonth = columns === 'full' ? (props as FullDatePickerProps).selectedMonth : 6;
  const onDaySelect = columns === 'full' ? (props as FullDatePickerProps).onDaySelect : () => {};
  const onMonthSelect = columns === 'full' ? (props as FullDatePickerProps).onMonthSelect : () => {};
  const initialDay = columns === 'full' ? (props as FullDatePickerProps).initialDay || 15 : 15;
  const initialMonth = columns === 'full' ? (props as FullDatePickerProps).initialMonth || 6 : 6;

  const dayScrollRef = useRef<ScrollView>(null);
  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  // Constants for consistent spacing
  const ITEM_HEIGHT = 70;
  const CONTAINER_HEIGHT = 224; // h-56 = 14rem = 224px
  const VISIBLE_ITEMS = 3.2; // Aproximadamente 3.2 items visibles
  const CENTER_OFFSET = ITEM_HEIGHT; // Un item de altura para centrar correctamente

  // Generar días (1-31) - solo si no es year-only
  const days: number[] = [];
  if (columns === 'full') {
    for (let day = 1; day <= 31; day++) {
      days.push(day);
    }
  }

  // Meses en español - solo si no es year-only
  const months = columns === 'full' ? [
    { number: 1, name: 'Enero' },
    { number: 2, name: 'Febrero' },
    { number: 3, name: 'Marzo' },
    { number: 4, name: 'Abril' },
    { number: 5, name: 'Mayo' },
    { number: 6, name: 'Junio' },
    { number: 7, name: 'Julio' },
    { number: 8, name: 'Agosto' },
    { number: 9, name: 'Septiembre' },
    { number: 10, name: 'Octubre' },
    { number: 11, name: 'Noviembre' },
    { number: 12, name: 'Diciembre' }
  ] : [];

  // Generar años con rango configurable
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  // Auto-scroll a posiciones iniciales
  useEffect(() => {
    const scrollToInitialPositions = () => {
      // Scroll para día (solo si columns === 'full')
      if (columns === 'full') {
        const dayIndex = days.findIndex(day => day === initialDay);
        if (dayIndex !== -1 && dayScrollRef.current) {
          const scrollPosition = dayIndex * ITEM_HEIGHT;
          dayScrollRef.current.scrollTo({
            y: scrollPosition,
            animated: false
          });
        }
        
        // Scroll para mes (solo si columns === 'full')
        const monthIndex = months.findIndex(month => month.number === initialMonth);
        if (monthIndex !== -1 && monthScrollRef.current) {
          const scrollPosition = monthIndex * ITEM_HEIGHT;
          monthScrollRef.current.scrollTo({
            y: scrollPosition,
            animated: false
          });
        }
      }
      
      // Scroll para año (siempre)
      const yearIndex = years.findIndex(year => year === initialYear);
      if (yearIndex !== -1 && yearScrollRef.current) {
        const scrollPosition = yearIndex * ITEM_HEIGHT;
        yearScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: false
        });
      }
    };

    setTimeout(scrollToInitialPositions, 150);
  }, []);

  const renderScrollColumn = (
    items: any[],
    selectedValue: any,
    onSelect: (value: any) => void,
    scrollRef: React.RefObject<ScrollView | null>,
    renderItem: (item: any) => string | number,
    disabled: boolean = state === 'disabled'
  ) => {
    const handleScroll = (event: any) => {
      if (disabled) return;
      
      const { y } = event.nativeEvent.contentOffset;
      // Calcular qué item está centrado - el item del medio de los 3 visibles
      const centerIndex = Math.round(y / ITEM_HEIGHT);
      const centerItem = items[centerIndex];
      
      if (centerItem) {
        const itemValue = typeof centerItem === 'object' ? centerItem.number : centerItem;
        if (itemValue !== selectedValue) {
          onSelect(itemValue);
        }
      }
    };

    return (
      <View className="flex-1 h-full relative">
        <ScrollView 
          ref={scrollRef}
          className="flex-1"
          showsVerticalScrollIndicator={false}
          scrollEnabled={!disabled}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{
            paddingTop: CENTER_OFFSET,
            paddingBottom: CENTER_OFFSET,
          }}
        >
          {items.map((item, index) => {
            const itemValue = typeof item === 'object' ? item.number : item;
            const isSelected = selectedValue === itemValue;
            
            return (
              <View key={index} className="w-full relative" style={{ height: ITEM_HEIGHT }}>
                {/* Línea superior */}
                {isSelected && (
                  <View 
                    className={`absolute top-2 left-[10%] right-[10%] h-px ${styles.strokeColor}`}
                  />
                )}
                
                {/* Item - Solo visual, no clickeable */}
                <View className="flex-1 items-center justify-center">
                  {isSelected ? (
                    <Subtitle className={`${styles.selectedColor}`}>
                      {renderItem(item)}
                    </Subtitle>
                  ) : (
                    <Subtitle className="!text-gray-500">
                      {renderItem(item)}
                    </Subtitle>
                  )}
                </View>
                
                {/* Línea inferior */}
                {isSelected && (
                  <View 
                    className={`absolute bottom-2 left-[10%] right-[10%] h-px ${styles.strokeColor}`}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
        
        {/* Efecto de fade superior - indica que hay más opciones arriba */}
        <View 
          className="absolute top-0 left-0 right-0 h-6 pointer-events-none bg-gray-100"
          style={{ opacity: 0.8 }}
        />
        
        {/* Efecto de fade inferior - indica que hay más opciones abajo */}
        <View 
          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none bg-gray-100"
          style={{ opacity: 0.8 }}
        />
      </View>
    );
  };

  // Para year-only, usar un layout diferente    // Para year-only, usar un layout diferente
  if (columns === 'year-only') {
    const handleYearScroll = (event: any) => {
      if (state === 'disabled') return;
      
      const { y } = event.nativeEvent.contentOffset;
      const centerIndex = Math.round(y / ITEM_HEIGHT);
      const centerYear = years[centerIndex];
      
      if (centerYear && centerYear !== selectedYear) {
        onYearSelect(centerYear);
      }
    };

    return (
      <View className="flex-1 relative">
        <ScrollView
          ref={yearScrollRef}
          className="flex-1"
          showsVerticalScrollIndicator={false}
          scrollEnabled={state !== 'disabled'}
          onScroll={handleYearScroll}
          scrollEventThrottle={16}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{
            paddingTop: CENTER_OFFSET,
            paddingBottom: CENTER_OFFSET,
          }}
        >
          {years.map((year) => (
            <View
              key={year}
              className="relative items-center w-full"
              style={{ height: ITEM_HEIGHT }}
            >
              {/* Línea superior */}
              {selectedYear === year && (
                <View
                  className={`absolute top-2 h-px ${styles.strokeColor} left-0 right-0`}
                />
              )}

              {/* Año - Solo visual, no clickeable */}
              <View className="flex-1 items-center justify-center w-full">
                {selectedYear === year ? (
                  <Subtitle className={`text-center ${styles.selectedColor}`}>
                    {year}
                  </Subtitle>
                ) : (
                  <Subtitle className="text-center !text-gray-500">
                    {year}
                  </Subtitle>
                )}
              </View>

              {/* Línea inferior */}
              {selectedYear === year && (
                <View
                  className={`absolute bottom-2 h-px ${styles.strokeColor} left-0 right-0`}
                />
              )}
            </View>
          ))}
        </ScrollView>
        
        {/* Efecto de fade superior */}
        <View 
          className="absolute top-0 left-0 right-0 h-6 pointer-events-none bg-gray-100"
          style={{ opacity: 0.8 }}
        />
        
        {/* Efecto de fade inferior */}
        <View 
          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none bg-gray-100"
          style={{ opacity: 0.8 }}
        />
      </View>
    );
  }

  // Layout de 3 columnas para fecha completa
  return (
    <View className="flex-row flex-1">
      {/* Columna Día */}
      {renderScrollColumn(
        days,
        selectedDay,
        onDaySelect,
        dayScrollRef,
        (day) => day
      )}
      
      {/* Columna Mes */}
      {renderScrollColumn(
        months,
        selectedMonth,
        onMonthSelect,
        monthScrollRef,
        (month) => month.name
      )}
      
      {/* Columna Año */}
      {renderScrollColumn(
        years,
        selectedYear,
        onYearSelect,
        yearScrollRef,
        (year) => year
      )}
    </View>
  );
};

// Height Picker Content Component
const HeightPickerContent: React.FC<HeightPickerProps & { styles: any }> = ({
  selectedHeight,
  onHeightSelect,
  minHeight = 100,
  maxHeight = 250,
  initialScrollHeight = 178,
  state,
  styles
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // Constants for consistent spacing
  const ITEM_HEIGHT = 70;
  const CONTAINER_HEIGHT = 224; // h-56 = 14rem = 224px
  const VISIBLE_ITEMS = 3.2; // Aproximadamente 3.2 items visibles
  const CENTER_OFFSET = ITEM_HEIGHT; // Un item de altura para centrar correctamente

  const heights: number[] = [];
  for (let height = minHeight; height <= maxHeight; height++) {
    heights.push(height);
  }

  useEffect(() => {
    if (scrollViewRef.current) {
      const heightIndex = heights.findIndex(height => height === initialScrollHeight);
      if (heightIndex !== -1) {
        const scrollPosition = heightIndex * ITEM_HEIGHT;

        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: scrollPosition,
            animated: false
          });
        }, 150);
      }
    }
  }, []);

  const disabled = state === 'disabled';

  const handleHeightScroll = (event: any) => {
    if (disabled) return;
    
    const { y } = event.nativeEvent.contentOffset;
    const centerIndex = Math.round(y / ITEM_HEIGHT);
    const centerHeight = heights[centerIndex];
    
    if (centerHeight && centerHeight !== selectedHeight) {
      onHeightSelect(centerHeight);
    }
  };

  return (
    <View className="flex-1 relative">
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        scrollEnabled={!disabled}
        onScroll={handleHeightScroll}
        scrollEventThrottle={16}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingTop: CENTER_OFFSET,
          paddingBottom: CENTER_OFFSET,
        }}
      >
        {heights.map((height) => (
          <View
            key={height}
            className="relative items-center w-full"
            style={{ height: ITEM_HEIGHT }}
          >
            {/* Línea superior */}
            {selectedHeight === height && (
              <View
                className={`absolute top-2 h-px ${styles.strokeColor} left-0 right-0`}
              />
            )}

            {/* Texto de estatura - Solo visual, no clickeable */}
            <View className="flex-1 items-center justify-center w-full">
              {selectedHeight === height ? (
                <Subtitle className={`text-center ${styles.selectedColor}`}>
                  {height} cm
                </Subtitle>
              ) : (
                <Subtitle className="text-center !text-gray-500">
                  {height} cm
                </Subtitle>
              )}
            </View>

            {/* Línea inferior */}
            {selectedHeight === height && (
              <View
                className={`absolute bottom-2 h-px ${styles.strokeColor} left-0 right-0`}
              />
            )}
          </View>
        ))}
      </ScrollView>
      
      {/* Efecto de fade superior */}
      <View 
        className="absolute top-0 left-0 right-0 h-6 pointer-events-none bg-gray-100"
        style={{ opacity: 0.8 }}
      />
      
      {/* Efecto de fade inferior */}
      <View 
        className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none bg-gray-100"
        style={{ opacity: 0.8 }}
      />
    </View>
  );
};

// Weight Picker Content Component
const WeightPickerContent: React.FC<WeightPickerProps & { styles: any }> = ({
  selectedKg,
  selectedGrams,
  onKgSelect,
  onGramsSelect,
  initialKg = 96,
  initialGrams = 100,
  minKg = 30,
  maxKg = 200,
  state,
  styles
}) => {
  const kgScrollRef = useRef<ScrollView>(null);
  const gramsScrollRef = useRef<ScrollView>(null);

  // Constants for consistent spacing
  const ITEM_HEIGHT = 70;
  const CONTAINER_HEIGHT = 224; // h-56 = 14rem = 224px
  const VISIBLE_ITEMS = 3.2; // Aproximadamente 3.2 items visibles
  const CENTER_OFFSET = ITEM_HEIGHT; // Un item de altura para centrar correctamente

  // Generar kilogramos
  const kilograms: number[] = [];
  for (let kg = minKg; kg <= maxKg; kg++) {
    kilograms.push(kg);
  }

  // Generar gramos: 000, 100, 200, 300, 400, 500, 600, 700, 800, 900
  const grams: number[] = [];
  for (let g = 0; g <= 900; g += 100) {
    grams.push(g);
  }

  // Auto-scroll a posiciones iniciales
  useEffect(() => {
    const scrollToInitialPositions = () => {
      // Scroll para kilogramos
      const kgIndex = kilograms.findIndex(kg => kg === initialKg);
      if (kgIndex !== -1 && kgScrollRef.current) {
        const scrollPosition = kgIndex * ITEM_HEIGHT;
        kgScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: false
        });
      }
      
      // Scroll para gramos
      const gramsIndex = grams.findIndex(g => g === initialGrams);
      if (gramsIndex !== -1 && gramsScrollRef.current) {
        const scrollPosition = gramsIndex * ITEM_HEIGHT;
        gramsScrollRef.current.scrollTo({
          y: scrollPosition,
          animated: false
        });
      }
    };

    setTimeout(scrollToInitialPositions, 150);
  }, []);

  const renderScrollColumn = (
    items: number[],
    selectedValue: number,
    onSelect: (value: number) => void,
    scrollRef: React.RefObject<ScrollView | null>,
    unit: string,
    disabled: boolean = state === 'disabled'
  ) => {
    const handleScroll = (event: any) => {
      if (disabled) return;
      
      const { y } = event.nativeEvent.contentOffset;
      const centerIndex = Math.round(y / ITEM_HEIGHT);
      const centerItem = items[centerIndex];
      
      if (centerItem !== undefined && centerItem !== selectedValue) {
        onSelect(centerItem);
      }
    };

    return (
      <View className="flex-1 h-full relative">
        <ScrollView 
          ref={scrollRef}
          className="flex-1"
          showsVerticalScrollIndicator={false}
          scrollEnabled={!disabled}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{
            paddingTop: CENTER_OFFSET,
            paddingBottom: CENTER_OFFSET,
          }}
        >
          {items.map((item, index) => {
            const isSelected = selectedValue === item;
            
            return (
              <View key={index} className="w-full relative" style={{ height: ITEM_HEIGHT }}>
                {/* Línea superior */}
                {isSelected && (
                  <View 
                    className={`absolute top-2 left-[10%] right-[10%] h-px ${styles.strokeColor}`}
                  />
                )}
                
                {/* Item - Solo visual, no clickeable */}
                <View className="flex-1 items-center justify-center">
                  <View className="flex-row items-center gap-2">
                    {isSelected ? (
                      <>
                        <Subtitle className={`${styles.selectedColor}`}>
                          {unit === 'g' && item === 0 ? '000' : item}
                        </Subtitle>
                        <Subtitle className={styles.selectedColor}>
                          {unit}
                        </Subtitle>
                      </>
                    ) : (
                      <>
                        <Subtitle className="!text-gray-500">
                          {unit === 'g' && item === 0 ? '000' : item}
                        </Subtitle>
                        <Subtitle className="!text-gray-500">
                          {unit}
                        </Subtitle>
                      </>
                    )}
                  </View>
                </View>
                
                {/* Línea inferior */}
                {isSelected && (
                  <View 
                    className={`absolute bottom-2 left-[10%] right-[10%] h-px ${styles.strokeColor}`}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
        
        {/* Efecto de fade superior */}
        <View 
          className="absolute top-0 left-0 right-0 h-6 pointer-events-none bg-gray-100"
          style={{ opacity: 0.8 }}
        />
        
        {/* Efecto de fade inferior */}
        <View 
          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none bg-gray-100"
          style={{ opacity: 0.8 }}
        />
      </View>
    );
  };

  return (
    <View className="flex-row flex-1">
      {/* Columna Kilogramos */}
      {renderScrollColumn(
        kilograms,
        selectedKg,
        onKgSelect,
        kgScrollRef,
        'kg'
      )}
      
      {/* Columna Gramos */}
      {renderScrollColumn(
        grams,
        selectedGrams,
        onGramsSelect,
        gramsScrollRef,
        'g'
      )}
    </View>
  );
};