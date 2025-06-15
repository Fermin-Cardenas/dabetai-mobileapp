import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated
} from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const router = useRouter();
  
  // Animación para el círculo de respiración
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Crear animación de pulso continua
    const createPulseAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(pulseAnim, {
              toValue: 1.4,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.3,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    };

    const animation = createPulseAnimation();
    animation.start();

    return () => animation.stop();
  }, []);

  const handleConnect = () => {
    console.log('Conectando dispositivo...');
  };

  const handleLinkDoctor = () => {
    console.log('Vinculando con médico...');
  };

  const handleViewHistory = () => {
    console.log('Mostrando historial detallado...');
  };

  const handleViewAnalysis = () => {
    console.log('Mostrando análisis completo...');
  };

  // Componente para crear la línea del gráfico con curvas suaves
  const ChartLine = () => {
    const chartWidth = width - 100;
    const chartHeight = 80;
    const padding = 20;
    
    // Datos que crean una curva similar a la imagen
    const glucoseData = [
      { time: 0, value: 85 },
      { time: 1, value: 95 },
      { time: 2, value: 105 },
      { time: 3, value: 125 },
      { time: 4, value: 140 },
      { time: 5, value: 135 },
      { time: 6, value: 120 },
      { time: 7, value: 130 },
      { time: 8, value: 145 }
    ];

    const maxValue = 180;
    const minValue = 70;
    const range = maxValue - minValue;

    // Convertir datos a coordenadas de pantalla
    const points = glucoseData.map((point, index) => {
      const x = padding + (index / (glucoseData.length - 1)) * (chartWidth - padding * 2);
      const y = chartHeight - ((point.value - minValue) / range) * (chartHeight - 20) + 10;
      return { x, y, value: point.value };
    });

    // Crear segmentos curvos entre puntos
    const createCurvedSegments = () => {
      const segments = [];
      
      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const segmentWidth = next.x - current.x;
        const numSteps = 8;
        
        for (let step = 0; step < numSteps; step++) {
          const t = step / numSteps;
          const t2 = t * t;
          
          const x = current.x + t * segmentWidth;
          const y = current.y + t * (next.y - current.y) + 
                   t2 * (next.y - current.y) * 0.1 * (Math.sin(t * Math.PI) - 0.5);
          
          const nextT = (step + 1) / numSteps;
          const nextX = current.x + nextT * segmentWidth;
          const nextY = current.y + nextT * (next.y - current.y) + 
                       nextT * nextT * (next.y - current.y) * 0.1 * (Math.sin(nextT * Math.PI) - 0.5);
          
          segments.push({
            id: `${i}-${step}`,
            x1: x,
            y1: y,
            x2: nextX,
            y2: nextY,
            width: Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2)),
            angle: Math.atan2(nextY - y, nextX - x)
          });
        }
      }
      
      return segments;
    };

    const curvedSegments = createCurvedSegments();

    return (
      <View style={styles.chartSvg}>
        {/* Líneas curvas */}
        {curvedSegments.map((segment) => (
          <View
            key={segment.id}
            style={[
              styles.curvedSegment,
              {
                left: segment.x1,
                top: segment.y1,
                width: segment.width,
                transform: [{ rotate: `${segment.angle}rad` }],
              }
            ]}
          />
        ))}
        
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Text style={styles.greeting}>Hola, Christian</Text>
        
        {/* Glucose Level Card */}
        <View style={styles.glucoseCard}>
          <View style={styles.glucoseContainer}>
            <View style={styles.glucoseLeft}>
              <View style={styles.glucoseMain}>
                <Text style={styles.glucoseValue}>98</Text>
                <AntDesign name="arrowright" size={18} color="#10B981" style={styles.trendIcon} />
              </View>
              <Text style={styles.glucoseUnit}>mg/dL</Text>
            </View>
            
            <View style={styles.glucoseCenter}>
              <Text style={styles.glucoseTime}>Justo ahora</Text>
              <Text style={styles.glucoseContext}>Antes de comer</Text>
            </View>
            
            <View style={styles.glucoseIndicator}>
              {/* Círculo de pulso animado (respiración) */}
              <Animated.View 
                style={[
                  styles.pulseCircle,
                  {
                    transform: [{ scale: pulseAnim }],
                    opacity: opacityAnim,
                  }
                ]} 
              />
              {/* Círculo principal con cruz */}
              <View style={styles.glucoseInnerCircle}>
                <MaterialIcons name="add" size={16} color="white" />
              </View>
            </View>
          </View>
        </View>

        {/* Automation Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.automationIcon}>
              <MaterialIcons name="sync" size={18} color="#6B7280" />
            </View>
            <Text style={styles.cardTitle}>Automatiza tus datos</Text>
          </View>
          <Text style={styles.cardDescription}>
            Conecta tu glucómetro o sensor para sincronizar mediciones.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={handleConnect}>
            <Text style={styles.primaryButtonText}>Conectar dispositivo</Text>
          </TouchableOpacity>
        </View>

        {/* Doctor Link Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.doctorIcon}>
              <MaterialIcons name="local-hospital" size={18} color="#6B7280" />
            </View>
            <Text style={styles.cardTitle}>Informa a tu médico</Text>
          </View>
          <Text style={styles.cardDescription}>
            Vincúlate con tu médico para monitorear tu diabetes con un profesional.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLinkDoctor}>
            <Text style={styles.primaryButtonText}>Vincular médico</Text>
          </TouchableOpacity>
        </View>

        {/* 24h Trend */}
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>Tendencia de las últimas 24 hrs</Text>
          
          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="pulse-outline" size={20} color="#6B7280" />
              </View>
              <View style={styles.statTextGroup}>
                <Text style={styles.statValue}>78%</Text>
                <Text style={styles.statLabel}>TIR</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="heart-outline" size={20} color="#6B7280" />
              </View>
              <View style={styles.statTextGroup}>
                <Text style={styles.statValue}>45</Text>
                <Text style={styles.statLabel}>Lecturas</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <MaterialIcons name="view-in-ar" size={20} color="#6B7280" />
              </View>
              <View style={styles.statTextGroup}>
                <Text style={styles.statValue}>6.5%</Text>
                <Text style={styles.statLabel}>HbA1c Est.</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="heart-outline" size={20} color="#6B7280" />
              </View>
              <View style={styles.statTextGroup}>
                <Text style={styles.statValue}>135mg/dL</Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </View>
            </View>
          </View>

          {/* Chart Area */}
          <View style={styles.chartContainer}>
            <View style={styles.chartArea}>
              <View style={styles.yAxis}>
                <Text style={styles.axisLabel}>0.4</Text>
                <Text style={styles.axisLabel}>0.3</Text>
                <Text style={styles.axisLabel}>0.2</Text>
                <Text style={styles.axisLabel}>0.1</Text>
                <Text style={styles.axisLabel}>0</Text>
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

          <TouchableOpacity style={styles.historyButton} onPress={handleViewHistory}>
            <Text style={styles.historyButtonText}>Ver historial detallado</Text>
          </TouchableOpacity>
        </View>

        {/* Prediction Card */}
        <View style={[styles.card, styles.lastCard]}>
          <Text style={styles.cardTitle}>Predicción</Text>
          
          <View style={styles.predictionContainer}>
            <View style={styles.riskIndicator}>
              <View style={styles.riskCircle}>
                <Text style={styles.riskText}>Bajo</Text>
                <Text style={styles.riskSubtext}>Riesgo</Text>
              </View>
            </View>
            <View style={styles.predictionTextContainer}>
              <Text style={styles.predictionTitle}>
                Tu riesgo general de complicaciones es bajo.
              </Text>
              <Text style={styles.predictionTime}>
                Última actualización: Hoy, 10:30 AM
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.analysisButton} onPress={handleViewAnalysis}>
            <Text style={styles.analysisButtonText}>Ver análisis completo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavButton 
          title="Inicio" 
          iconName="home"
          isActive={activeTab === 'inicio'} 
          onPress={() => {}} 
        />
        <NavButton 
          title="Predicción" 
          iconName="view-in-ar"
          route="/Home/Prediction"
          isActive={activeTab === 'predicción'} 
          onPress={() => {}} 
        />
        <NavButton 
          title="Historial" 
          iconName="timeline"
          route="/Home/Record"
          isActive={activeTab === 'historial'} 
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 20,
  },
  glucoseCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  glucoseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  glucoseLeft: {
    alignItems: 'flex-start',
  },
  glucoseCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 0,

  },
  glucoseMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  glucoseValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#10B981',
    marginRight: 8,
  },
  trendIcon: {
    marginLeft: 4,
  },
  glucoseUnit: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  glucoseTime: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
    textAlign: 'center',
  },
  glucoseContext: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
  glucoseIndicator: {
    width: 50,
    height: 50,
    backgroundColor: '#10B981',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pulseCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#10B981',
    borderRadius: 25,
    zIndex: 1,
  },
  glucoseInnerCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#10B981',
    borderRadius: 25,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  automationIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trendCard: {
    backgroundColor: '#E8F1F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  historyButton: {
    borderWidth: 2,
    borderColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#E8F1F5',
    marginTop: 16,
  },
  historyButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  analysisButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  analysisButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  statIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTextGroup: {
    flexDirection: 'column',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartArea: {
    height: 120,
    flexDirection: 'row',
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  chartContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chartSvg: {
    height: 100,
    position: 'relative',
    backgroundColor: '#FAFBFC',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
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
    color: '#9CA3AF',
  },
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  riskIndicator: {
    marginRight: 16,
  },
  riskCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#10B981',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
  riskSubtext: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '400',
    marginTop: 2,
  },
  predictionTextContainer: {
    flex: 1,
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
    lineHeight: 22,
  },
  predictionTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  lastCard: {
    marginBottom: 100,
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

export default Dashboard;