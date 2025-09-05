import { Body } from '@/components/common/Typography';
import React, { useEffect, useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

interface HeightSelectorProps {
  selectedHeight: number;
  onHeightSelect: (height: number) => void;
  minHeight?: number;
  maxHeight?: number;
  initialScrollHeight?: number;
}

export const HeightSelector: React.FC<HeightSelectorProps> = ({
  selectedHeight,
  onHeightSelect,
  minHeight = 100,
  maxHeight = 250,
  initialScrollHeight = 178
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const heights: number[] = [];
  for (let height = minHeight; height <= maxHeight; height++) {
    heights.push(height);
  }

  useEffect(() => {
    if (scrollViewRef.current) {
      const heightIndex = heights.findIndex(height => height === initialScrollHeight);
      if (heightIndex !== -1) {
        const itemHeight = 70;
        const scrollPosition = heightIndex * itemHeight;

        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: scrollPosition,
            animated: true
          });
        }, 100);
      }
    }
  }, []);

  return (
    <View className="flex-1 justify-center items-center w-full">
      <View className="h-56 w-full">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 py-10"
          showsVerticalScrollIndicator={false}
        >
          {heights.map((height) => (
            <View
              key={height}
              className="relative items-center w-full"
            >
              {/* Línea superior */}
              {selectedHeight === height && (
                <View
                  className="absolute top-2 h-0.5 bg-[#2196F3] left-0 right-0"
                />
              )}

              {/* Texto de estatura */}
              <TouchableOpacity
                className="py-6 items-center justify-center w-full"
                onPress={() => onHeightSelect(height)}
                activeOpacity={0.7}
              >
                <Body
                  className={`text-center ${
                    selectedHeight === height
                      ? 'text-2xl text-[#2196F3] font-semibold'
                      : 'text-lg text-[#999]'
                  }`}
                >
                  {height} cm
                </Body>
              </TouchableOpacity>

              {/* Línea inferior */}
              {selectedHeight === height && (
                <View
                  className="absolute bottom-2 h-0.5 bg-[#2196F3] left-0 right-0"
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
