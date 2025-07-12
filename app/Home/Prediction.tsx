import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
// Cambia esta URL a la IP de tu backend FastAPI
const API_URL = 'http://127.0.0.1:8000';

const Prediction = () => {
  const [nivelGeneral, setNivelGeneral] = useState('Cargando...');
  const [probabilidad, setProbabilidad] = useState('');
  const [tendencia, setTendencia] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');
  const [activeTab, setActiveTab] = useState('predicción');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Fetch a la API para retinopatía
  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/retinopathy/predict/1`);
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      const data = await response.json();

      setNivelGeneral(data.nivel_general);  // ya viene de FastAPI
      setProbabilidad((data.probabilidad * 100).toFixed(1) + '%');
      setTendencia(data.tendencia || []);
      setLastUpdate(new Date().toLocaleString());
    } catch (err) {
      Alert.alert('Error', err.message);
      setNivelGeneral('Error');
      setProbabilidad('N/A');
      setTendencia([]);
      setLastUpdate('');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrediction();

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 3000, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 3000, useNativeDriver: false }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const ChartLine = () => {
    if (tendencia.length === 0) return null;
    const chartWidth = width - 120;
    const chartHeight = 160;
    const padding = 20;
    const values = tendencia.map(p => p.value);
    const maxValue = Math.max(...values, 0);
    const minValue = Math.min(...values, 0);
    const range = maxValue - minValue || 1;

    const points = tendencia.map(point => ({
      x: padding + (point.time / 350) * (chartWidth - 2 * padding),
      y: chartHeight - ((point.value - minValue) / range) * (chartHeight - 40) + 20,
    }));

    return (
      <View style={styles.chartSvg}>
        {points.slice(0, -1).map((pt, i) => {
          const next = points[i + 1];
          const length = Math.hypot(next.x - pt.x, next.y - pt.y);
          const angle = Math.atan2(next.y - pt.y, next.x - pt.x);
          return (
            <View
              key={i}
              style={[
                styles.chartLine,
                { left: pt.x, top: pt.y, width: length, transform: [{ rotate: `${angle}rad` }] }
              ]}
            />
          );
        })}
        {points.map((pt, i) => (
          <View
            key={i}
            style={[styles.chartDot, { left: pt.x - 3, top: pt.y - 3 }]}
          />
        ))}
      </View>
    );
  };

  // Mostrar solo Retinopatía 
  const RiskItem = ({ title, level, isHigh }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.riskItem}
      onPress={() => router.push('/Home/Prediction')}
    >
      <Text style={styles.riskItemTitle}>{title}</Text>
      <View style={styles.riskItemRight}>
        <Text style={[styles.riskLevel, isHigh && styles.riskLevelHigh]}>{level}</Text>
        <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  const NavButton = ({ title, isActive, onPress, iconName, route }) => {
    const handlePress = () => {
      setActiveTab(title.toLowerCase());
      if (route) router.push(route);
      else onPress();
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

        <Text style={styles.sectionTitle}>Tu nivel de riesgo general</Text>

        <View style={styles.riskCard}>
          <View style={styles.riskCardContent}>
            <View style={styles.riskIndicator}>
              <View style={styles.riskCircleContainer}>
                <Animated.View
                  style={[
                    styles.riskCircleGlow,
                    {
                      opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.3] }),
                      transform: [{ scale: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] }) }],
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.riskCircleGlow2,
                    {
                      opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.05, 0.15] }),
                      transform: [{ scale: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [1.02, 1.05] }) }],
                    },
                  ]}
                />
                <View style={styles.riskCircle}>
                  <Text style={styles.riskSubtext}>Nivel</Text>
                  <Text style={styles.riskText}>{nivelGeneral}</Text>
                  {probabilidad !== '' && <Text style={styles.riskEstimated}>Probabilidad: {probabilidad}</Text>}
                </View>
              </View>
            </View>
            <View style={styles.riskTextContainer}>
              <Text style={styles.riskTitle}>Retinopatía diabética</Text>
              <Text style={styles.riskDescription}>
                {nivelGeneral === 'Alto' && 'Se recomienda atención médica urgente.'}
                {nivelGeneral === 'Medio' && 'Monitoreo frecuente recomendado.'}
                {nivelGeneral === 'Bajo' && 'Riesgo bajo, mantener control.'}
                {nivelGeneral === 'Cargando...' && 'Cargando predicción...'}
                {nivelGeneral === 'Error' && 'No se pudo obtener predicción.'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={fetchPrediction}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.updateButtonText}>Actualizar predicción</Text>}
          </TouchableOpacity>

          <Text style={styles.lastUpdate}>Última actualización: {lastUpdate || 'N/A'}</Text>
        </View>

        {/* Solo Retinopatía en la lista (según indicación) */}
        <View style={styles.riskSection}>
          <Text style={styles.sectionTitle}>Tu riesgo por complicación</Text>
          <View style={styles.riskList}>
            <RiskItem title="Retinopatía diabética" level={nivelGeneral} isHigh={nivelGeneral === 'Alto'} />
          </View>
        </View>

        {/* Gráfica histórica */}
        <View style={styles.trendSection}>
          <Text style={styles.sectionTitle}>Tendencia histórica de riesgo</Text>
          <View style={styles.trendCard}>
            <View style={styles.chartContainer}>
              <View style={styles.chartArea}>
                <View style={styles.yAxis}>
                  {['0.45', '0.4', '0.35', '0.3', '0.25', '0.2', '0.15', '0.1', '0.05', '0', '-0.05', '-0.1'].map((label) => (
                    <Text key={label} style={styles.axisLabel}>{label}</Text>
                  ))}
                </View>
                <View style={styles.chartContent}>
                  <ChartLine />
                  <View style={styles.xAxis}>
                    {['0', '50', '100', '150', '200', '250', '300', '350'].map((label) => (
                      <Text key={label} style={styles.axisLabel}>{label}</Text>
                    ))}
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
          isActive={activeTab === 'home'}
          onPress={() => { }}
        />
        <NavButton
          title="Predicción"
          iconName="view-in-ar"
          isActive={activeTab === 'predicción'}
          onPress={() => { }}
        />
        <NavButton
          title="Historial"
          iconName="timeline"
          route="/Home/Record"
          isActive={activeTab === 'record'}
          onPress={() => { }}
        />
        <NavButton
          title="IA Chat"
          iconName="smart-toy"
          route="/Home/Chatai"
          isActive={activeTab === 'ia chat'}
          onPress={() => { }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F1F5' },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 24,
    marginBottom: 24,
  },
  riskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  riskCardContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  riskIndicator: { marginRight: 20 },
  riskCircleContainer: { position: 'relative', justifyContent: 'center', alignItems: 'center' },
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
    fontSize: 28,
    fontWeight: '700',
    color: '#10B981',
  },
  riskSubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
  },
  riskEstimated: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  riskTextContainer: { flex: 1 },
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
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  riskSection: {
    marginBottom: 24,
  },
  riskList: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  riskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  riskItemTitle: {
    fontSize: 16,
    color: '#374151',
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
    marginBottom: 24,
  },
  trendCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
