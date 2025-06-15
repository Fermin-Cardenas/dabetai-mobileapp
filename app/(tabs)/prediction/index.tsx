import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Prediction = () => {
  const [selectedRiskType, setSelectedRiskType] = useState('General');
  const [activeTab, setActiveTab] = useState('predicción');
  const router = useRouter();
  
  // Animación para el aro de luz del círculo
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Crear animación de brillo continua y sutil
    const createGlowAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: false,
          }),
        ])
      );
    };

    const animation = createGlowAnimation();
    animation.start();

    return () => animation.stop();
  }, []);

  // Componente para crear la línea del gráfico exacto como la imagen
  const ChartLine = () => {
    const chartWidth = width - 120;
    const chartHeight = 160;
    const padding = 20;
    
    // Datos exactos que coinciden con la imagen
    const riskData = [
      { time: 0, value: -0.05 },
      { time: 50, value: 0.2 },
      { time: 100, value: 0.25 },
      { time: 150, value: 0.37 },
      { time: 200, value: 0.35 },
      { time: 250, value: 0.3 },
      { time: 300, value: 0.39 },
      { time: 350, value: 0.39 }
    ];

    const maxValue = 0.45;
    const minValue = -0.1;
    const range = maxValue - minValue;

    // Convertir datos a coordenadas de pantalla
    const points = riskData.map((point, index) => {
      const x = padding + (point.time / 350) * (chartWidth - padding * 2);
      const y = chartHeight - ((point.value - minValue) / range) * (chartHeight - 40) + 20;
      return { x, y, value: point.value, time: point.time };
    });

    return (
      <View style={styles.chartSvg}>
        {/* Líneas de cuadrícula horizontales sutiles */}
        {[0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0, -0.05, -0.1].map((value, index) => {
          const y = chartHeight - ((value - minValue) / range) * (chartHeight - 40) + 20;
          return (
            <View
              key={`grid-${index}`}
              style={[
                styles.gridLine,
                {
                  top: y,
                  left: 20,
                  right: 20,
                }
              ]}
            />
          );
        })}
        
        {/* Conectar puntos con líneas rectas */}
        {points.slice(0, -1).map((point, index) => {
          const nextPoint = points[index + 1];
          const length = Math.sqrt(
            Math.pow(nextPoint.x - point.x, 2) + Math.pow(nextPoint.y - point.y, 2)
          );
          const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
          
          return (
            <View
              key={`line-${index}`}
              style={[
                styles.chartLine,
                {
                  left: point.x,
                  top: point.y,
                  width: length,
                  transform: [{ rotate: `${angle}rad` }],
                }
              ]}
            />
          );
        })}
        
        {/* Puntos de datos */}
        {points.map((point, index) => (
          <View
            key={`point-${index}`}
            style={[
              styles.chartDot,
              {
                left: point.x - 4,
                top: point.y - 4,
              }
            ]}
          />
        ))}
      </View>
    );
  };

  const RiskItem = ({ title, level, isHigh = false }) => {
    const handlePress = () => {
      // Rutas estáticas específicas para cada complicación
      let route;
      switch (title) {
        case 'Nefropatía diabética':
          route = '/Home/Specificp';
          break;
        case 'Retinopatía diabética':
          route = '/Home/retinopatia';
          break;
        case 'Neuropatía diabética':
          route = '/Home/neuropatia';
          break;
        case 'Pie diabético':
          route = '/Home/piediabetico';
          break;
        default:
          route = '/Home/complicacion';
          break;
      }
      
      router.push(route);
    };

    return (
      <TouchableOpacity style={styles.riskItem} onPress={handlePress}>
        <Text style={styles.riskItemTitle}>{title}</Text>
        <View style={styles.riskItemRight}>
          <Text style={[styles.riskLevel, isHigh && styles.riskLevelHigh]}>{level}</Text>
          <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
        </View>
      </TouchableOpacity>
    );
  };

  const NavButton = ({ title, isActive, onPress, iconName, route }) => {
    const handlePress = () => {
      setActiveTab(title.toLowerCase());
      if (route) {
        router.push(route);
      } else {
        onPress();
      }
    };

    return (
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={handlePress}
      >
        <View style={[styles.navIcon, isActive && styles.navIconActive]}>
          <MaterialIcons 
            name={iconName} 
            size={24} 
            color={isActive ? '#2196F3' : '#6B7280'} 
          />
        </View>
        <Text style={[styles.navText, isActive && styles.navTextActive]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
    

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* General Risk Level */}
        <Text style={styles.sectionTitle}>Tu nivel de riesgo general</Text>
        
        <View style={styles.riskCard}>
          <View style={styles.riskCardContent}>
            <View style={styles.riskIndicator}>
              <View style={styles.riskCircleContainer}>
                {/* Aro de luz animado */}
                <Animated.View style={[
                  styles.riskCircleGlow,
                  {
                    opacity: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.1, 0.3],
                    }),
                    transform: [{
                      scale: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.02],
                      })
                    }]
                  }
                ]} />
                
                {/* Segundo aro más grande */}
                <Animated.View style={[
                  styles.riskCircleGlow2,
                  {
                    opacity: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.05, 0.15],
                    }),
                    transform: [{
                      scale: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.02, 1.05],
                      })
                    }]
                  }
                ]} />
                
                {/* Círculo principal */}
                <View style={styles.riskCircle}>
                  <Text style={styles.riskSubtext}>Nivel</Text>
                  <Text style={styles.riskText}>Bajo</Text>
                  <Text style={styles.riskEstimated}>Estimado</Text>
                </View>
              </View>
            </View>
            <View style={styles.riskTextContainer}>
              <Text style={styles.riskTitle}>¡Buen trabajo!</Text>
              <Text style={styles.riskDescription}>
                Mantener tu control actual ayuda a reducir tu riesgo de complicaciones.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Actualizar predicción</Text>
          </TouchableOpacity>
          
          <Text style={styles.lastUpdate}>Última actualización: Hoy, 10:30 AM</Text>
        </View>

        {/* Risk by Complications */}
        <View style={styles.riskSection}>
          <Text style={styles.sectionTitle}>Tu riesgo por complicación</Text>
          
          <View style={styles.riskList}>
            <RiskItem title="Nefropatía diabética" level="Bajo" />
            <RiskItem title="Retinopatía diabética" level="Bajo" />
            <RiskItem title="Neuropatía diabética" level="Alto" isHigh={true} />
            <RiskItem title="Pie diabético" level="Bajo" />
          </View>
        </View>

        {/* Historical Risk Trend */}
        <View style={styles.trendSection}>
          <Text style={styles.sectionTitle}>Tendencia histórica de riesgo</Text>
          
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{selectedRiskType}</Text>
              <MaterialIcons name="expand-more" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.trendCard}>
            {/* Chart Area */}
            <View style={styles.chartContainer}>
              <View style={styles.chartArea}>
                <View style={styles.yAxis}>
                  <Text style={styles.axisLabel}>0.45</Text>
                  <Text style={styles.axisLabel}>0.4</Text>
                  <Text style={styles.axisLabel}>0.35</Text>
                  <Text style={styles.axisLabel}>0.3</Text>
                  <Text style={styles.axisLabel}>0.25</Text>
                  <Text style={styles.axisLabel}>0.2</Text>
                  <Text style={styles.axisLabel}>0.15</Text>
                  <Text style={styles.axisLabel}>0.1</Text>
                  <Text style={styles.axisLabel}>0.05</Text>
                  <Text style={styles.axisLabel}>0</Text>
                  <Text style={styles.axisLabel}>-0.05</Text>
                  <Text style={styles.axisLabel}>-0.1</Text>
                </View>
                <View style={styles.chartContent}>
                  <ChartLine />
                  <View style={styles.xAxis}>
                    <Text style={styles.axisLabel}>0</Text>
                    <Text style={styles.axisLabel}>50</Text>
                    <Text style={styles.axisLabel}>100</Text>
                    <Text style={styles.axisLabel}>150</Text>
                    <Text style={styles.axisLabel}>200</Text>
                    <Text style={styles.axisLabel}>250</Text>
                    <Text style={styles.axisLabel}>300</Text>
                    <Text style={styles.axisLabel}>350</Text>
                  </View>
                  <Text style={styles.xAxisLabel}>t (min)</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
         <NavButton 
          title="Home" 
          iconName="home"
          route="/Home"
          isActive={activeTab === 'Home'} 
          onPress={() => {}} 
        />
        <NavButton 
          title="Predicción" 
          iconName="view-in-ar"
          isActive={activeTab === 'predicción'} 
          onPress={() => {}} 
        />
        <NavButton 
          title="Historial" 
          iconName="timeline"
          route="/Home/Record"
          isActive={activeTab === 'Record'} 
          onPress={() => {}} 
        />
        <NavButton 
          title="IA Chat" 
          iconName="smart-toy"
          route="/Home/Chatai"
          isActive={activeTab === 'ia chat'} 
          onPress={() => {}} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1F5',
  },
  header: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  appName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
    marginRight: 16,
  },
  headerButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 24,
    marginBottom: 24,
    fontFamily: "Source Sans Pro",
  },
  riskCard: {
    backgroundColor: '#E8F1F5',
    borderRadius: 0,
    padding: 10,
    marginBottom: 0,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  riskCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  riskIndicator: {
    marginRight: 20,
  },
  riskCircleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskCircleGlow: {
    position: 'absolute',
    width: 155,
    height: 155,
    borderRadius: 77.5,
    borderWidth: 1,
    borderColor: '#10B981',
    opacity: 0.2,
  },
  riskCircleGlow2: {
    position: 'absolute',
    width: 165,
    height: 165,
    borderRadius: 82.5,
    borderWidth: 1,
    borderColor: '#10B981',
    opacity: 0.1,
  },
  riskCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#10B981',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  riskText: {
    color: '#10B981',
    fontSize: 28,
    fontWeight: '700',
  },
  riskSubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
  },
  riskEstimated: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  riskTextContainer: {
    flex: 1,
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  riskDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  updateButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  updateButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  riskSection: {
    backgroundColor: '#E8F1F5',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  riskList: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    marginBottom: 0,
  },
  riskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    backgroundColor: 'white',
    marginHorizontal: -16,
    marginBottom: 1,
    activeOpacity: 0.7,
  },
  riskItemTitle: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    fontWeight: '400',
  },
  riskItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  riskLevel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  riskLevelHigh: {
    color: '#EF4444',
  },
  trendSection: {
    backgroundColor: '#E8F1F5',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  trendCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  dropdownContainer: {
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  chartContainer: {
    marginBottom: 0,
  },
  chartArea: {
    height: 180,
    flexDirection: 'row',
  },
  yAxis: {
    width: 45,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 5,
  },
  chartContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chartSvg: {
    height: 160,
    position: 'relative',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  chartLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#2196F3',
    borderRadius: 1,
  },
  chartDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#2196F3',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
  },
  curvedSegment: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#2196F3',
    borderRadius: 1,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 5,
  },
  axisLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navIconActive: {
    backgroundColor: 'transparent',
  },
  navText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default Prediction;