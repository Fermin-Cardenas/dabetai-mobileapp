// src/features/dashboard/components/TrendChart.tsx
import { Caption } from "@/components/common/Typography";
import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const { width: windowWidth } = Dimensions.get("window");

interface TrendPoint {
  time: number;
  value: number;
}

interface TrendChartProps {
  data?: TrendPoint[];
  xAxisLabels?: string[];
  xAxisTitle?: string;
  className?: string;
  selectedType?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  xAxisLabels = ["0", "50", "100", "150", "200", "250", "300", "350"],
  xAxisTitle = "t (min)",
  className,
  selectedType,
}) => {
  const chartData =
    data && data.length > 0
      ? data
      : [
          { time: 0, value: -0.05 },
          { time: 50, value: 0.18 },
          { time: 100, value: 0.25 },
          { time: 150, value: 0.28 },
          { time: 200, value: 0.26 },
          { time: 250, value: 0.22 },
          { time: 300, value: 0.2 },
          { time: 350, value: 0.3 },
        ];

  const labels = chartData.map((p) => String(p.time));
  const values = chartData.map((p) => p.value);

  const horizontalPadding = 16 * 2 + 4 * 2;
  const chartWidth = windowWidth - horizontalPadding - 40; // 40px para el eje Y

  return (
    <View
      className={`bg-white rounded-3xl pl-5 py-4 border border-gray-300 flex-row ${className || ""}`}
    >
      {/* Leyenda vertical */}
      <View className="w-0 justify-center items-center">
        <Caption
          className="text-gray-500 text-xs"
          style={{
            transform: [{ rotate: "-90deg" }],
            width: 65,
            textAlign: "center",
          }}
        >
          [Probabilidad]
        </Caption>
      </View>

      {/* Contenedor del gráfico */}
      <View className="flex-1 items-center">
        <LineChart
          data={{
            labels,
            datasets: [{ data: values }],
          }}
          width={chartWidth}
          height={190}
          chartConfig={{
            backgroundGradientFrom: "#f1f5f9",
            backgroundGradientTo: "#f1f5f9",
            decimalPlaces: 3,
            color: (opacity = 1) => `rgba(33,150,243,${opacity})`,
            labelColor: () => "#6B7280",
            style: { borderRadius: 16 },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#2196F3",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignContent: "center",
          }}
        />

        {/* Leyenda X abajo */}
        <Caption className="text-gray-500 text-xs text-center">
          {xAxisTitle}
        </Caption>
      </View>
    </View>
  );
};
