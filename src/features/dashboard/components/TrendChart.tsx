import React from 'react';
import { View, Dimensions } from 'react-native';
import { Body } from '@/components/common/Typography';

interface ChartData {
  time: number;
  value: number;
}

interface TrendChartProps {
  selectedType: string;
  data?: ChartData[];
  width?: number;
  height?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export const TrendChart: React.FC<TrendChartProps> = ({ 
  selectedType, 
  data,
  width = screenWidth - 120,
  height = 140
}) => {
  // Datos por defecto del gráfico de riesgo
  const defaultData = [
    { time: 0, value: -0.05 },
    { time: 1, value: 0.18 },
    { time: 2, value: 0.25 },
    { time: 3, value: 0.28 },
    { time: 4, value: 0.26 },
    { time: 5, value: 0.22 },
    { time: 6, value: 0.20 },
    { time: 7, value: 0.30 }
  ];

  const chartData = data || defaultData;
  const chartWidth = width;
  const chartHeight = height;
  const padding = 20;

  const maxValue = 0.45;
  const minValue = -0.1;
  const range = maxValue - minValue;

  // Convertir datos a coordenadas de pantalla
  const points = chartData.map((point, index) => {
    const x = padding + (index / (chartData.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - ((point.value - minValue) / range) * (chartHeight - 40) + 20;
    return { x, y, value: point.value };
  });

  // Etiquetas del eje Y y X
  const yAxisLabels = ['0.45', '0.4', '0.35', '0.3', '0.25', '0.2', '0.15', '0.1', '0.05', '0', '-0.05', '-0.1'];
  const xAxisLabels = ['0', '50', '100', '150', '200', '250', '300', '350'];

  return (
    <View className="bg-white rounded-3xl p-5 mb-6 shadow-sm border" style={{ borderColor: '#CAD5E2' }}>
      <View>
        <View style={{ height: 200 }} className="flex-row">
          {/* Eje Y con etiquetas */}
          <View className="w-16 justify-between py-3 relative">
            {/* Etiqueta [Riesgo] rotada */}
            <View className="absolute left-0 top-16">
              <Body 
                className="text-gray-500 text-xs font-medium"
                style={{
                  transform: [{ rotate: '-90deg' }],
                  width: 50,
                  textAlign: 'center'
                }}
              >
                [Riesgo]
              </Body>
            </View>
            
            {/* Valores del eje Y */}
            <View className="absolute right-0 top-3 bottom-10 justify-between">
              {yAxisLabels.map((label, index) => (
                <Body key={index} className="text-gray-400 text-xs text-right leading-3">
                  {label}
                </Body>
              ))}
            </View>
          </View>

          {/* Área del gráfico */}
          <View className="flex-1 pb-6 ml-2">
            {/* Línea horizontal en y=0 */}
            <View 
              className="absolute left-0 right-0 h-px bg-gray-300" 
              style={{ 
                top: chartHeight - ((0 - minValue) / range) * (chartHeight - 30) + 15 
              }} 
            />
            
            <View 
              className="relative bg-white overflow-hidden" 
              style={{ height: chartHeight }}
            >
              {/* Líneas del gráfico */}
              {points.slice(0, -1).map((point, index) => {
                const nextPoint = points[index + 1];
                const length = Math.sqrt(
                  Math.pow(nextPoint.x - point.x, 2) + Math.pow(nextPoint.y - point.y, 2)
                );
                const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
                
                return (
                  <View
                    key={`line-${index}`}
                    className="absolute bg-[#2196F3]"
                    style={{
                      left: point.x,
                      top: point.y,
                      width: length,
                      height: 2,
                      transform: [{ rotate: `${angle}rad` }],
                      transformOrigin: '0 0',
                    }}
                  />
                );
              })}
              
              {/* Puntos de datos */}
              {points.map((point, index) => (
                <View
                  key={`point-${index}`}
                  className="absolute w-2 h-2 bg-[#2196F3] rounded-full border border-white"
                  style={{
                    left: point.x - 4,
                    top: point.y - 4,
                  }}
                />
              ))}
            </View>

            {/* Eje X */}
            <View className="flex-row justify-between px-4 mt-2">
              {xAxisLabels.map((label, index) => (
                <Body key={index} className="text-gray-400 text-xs">
                  {label}
                </Body>
              ))}
            </View>
            
            {/* Título del eje X */}
            <Body className="text-gray-500 text-center mt-2 font-medium">
              t (min)
            </Body>
          </View>
        </View>
      </View>
    </View>
  );
};
