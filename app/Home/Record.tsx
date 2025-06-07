import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Record = () => {
  const [activeTab, setActiveTab] = useState('historial');
  const [selectedPeriod, setSelectedPeriod] = useState('Hoy');
  const [selectedCategory, setSelectedCategory] = useState('Glucosa');
  const router = useRouter();

  // Componente para crear la línea del gráfico
  const ChartLine = () => {
    const chartWidth = width - 80;
    const chartHeight = 120;
    const padding = 20;
    
    // Datos del gráfico de glucosa
    const glucoseData = [
      { time: 0, value: 0.2 },
      { time: 1, value: 0.28 },
      { time: 2, value: 0.35 },
      { time: 3, value: 0.33 },
      { time: 4, value: 0.25 },
      { time: 5, value: 0.32 },
      { time: 6, value: 0.38 }
    ];

    const maxValue = 0.45;
    const minValue = -0.1;
    const range = maxValue - minValue;

    // Convertir datos a coordenadas de pantalla
    const points = glucoseData.map((point, index) => {
      const x = padding + (index / (glucoseData.length - 1)) * (chartWidth - padding * 2);
      const y = chartHeight - ((point.value - minValue) / range) * (chartHeight - 40) + 20;
      return { x, y, value: point.value };
    });

    return (
      <View style={styles.chartSvg}>
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

  const PeriodButton = ({ title, isActive, onPress, isFirst, isLast }) => (
    <TouchableOpacity 
      style={[
        styles.periodButton, 
        isActive && styles.periodButtonActive,
        isFirst && styles.periodButtonFirst,
        isLast && styles.periodButtonLast
      ]} 
      onPress={onPress}
    >
      <Text style={[styles.periodButtonText, isActive && styles.periodButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const CategoryButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity 
      style={[styles.categoryButton, isActive && styles.categoryButtonActive]} 
      onPress={onPress}
    >
      <Text style={[styles.categoryButtonText, isActive && styles.categoryButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const StatItem = ({ icon, value, label }) => (
    <View style={styles.statItem}>
      <View style={styles.statIconContainer}>
        <View style={styles.statIcon}>
          <MaterialIcons name={icon} size={32} color="#6B7280" />
        </View>
      </View>
      <View style={styles.statTextGroup}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );

  const RecordItem = ({ value, date }) => {
    // Función para procesar texto con negritas
    const renderTextWithBold = (text) => {
      const parts = text.split(/(\*\*.*?\*\*)/);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return <Text key={index} style={styles.recordValueBold}>{boldText}</Text>;
        }
        return <Text key={index}>{part}</Text>;
      });
    };

    return (
      <TouchableOpacity style={styles.recordItem}>
        <View style={styles.recordLeft}>
          <View style={styles.recordIcon}>
            <MaterialIcons name="info-outline" size={24} color="#6B7280" />
          </View>
          <View style={styles.recordInfo}>
            <Text style={styles.recordValue}>
              {renderTextWithBold(value)}
            </Text>
            <Text style={styles.recordTime}>{date}</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
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

  const periods = ['Hoy', '1 semana', '1 mes', '3 meses'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
  

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selection */}
        <View style={styles.periodSection}>
          <View style={styles.periodButtons}>
            {periods.map((period, index) => (
              <PeriodButton 
                key={period}
                title={period} 
                isActive={selectedPeriod === period} 
                onPress={() => setSelectedPeriod(period)}
                isFirst={index === 0}
                isLast={index === periods.length - 1}
              />
            ))}
          </View>
        </View>

        {/* Category Selection */}
        <View style={styles.categorySection}>
          <View style={styles.categoryButtons}>
            <CategoryButton 
              title="Glucosa" 
              isActive={selectedCategory === 'Glucosa'} 
              onPress={() => setSelectedCategory('Glucosa')} 
            />
            <CategoryButton 
              title="Comidas" 
              isActive={selectedCategory === 'Comidas'} 
              onPress={() => setSelectedCategory('Comidas')} 
            />
            <CategoryButton 
              title="Actividad" 
              isActive={selectedCategory === 'Actividad'} 
              onPress={() => setSelectedCategory('Actividad')} 
            />
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartCard}>
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
                  <Text style={styles.axisLabel}>0h</Text>
                  <Text style={styles.axisLabel}>4h</Text>
                  <Text style={styles.axisLabel}>8h</Text>
                  <Text style={styles.axisLabel}>12h</Text>
                  <Text style={styles.axisLabel}>16h</Text>
                  <Text style={styles.axisLabel}>20h</Text>
                  <Text style={styles.axisLabel}>24h</Text>
                </View>
                <Text style={styles.xAxisLabel}>Horas</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Key Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas clave (período)</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <StatItem icon="trending-up" value="78%" label="TIR" />
              <StatItem icon="favorite-border" value="45" label="Lecturas" />
            </View>
            <View style={styles.statsRow}>
              <StatItem icon="view-in-ar" value="6.5%" label="HbA1c Est." />
              <StatItem icon="radio-button-unchecked" value="135mg/dL" label="Promedio" />
            </View>
            <View style={styles.statsRow}>
              <StatItem icon="view-in-ar" value="4.1/día" label="Promedio" />
              <StatItem icon="favorite-border" value="32mg/dL" label="Desv. Est." />
            </View>
            <View style={styles.statsRow}>
              <StatItem icon="radio-button-unchecked" value="135mg/dL" label="Promedio" />
              <StatItem icon="view-in-ar" value="4.1/día" label="Promedio" />
            </View>
          </View>
        </View>

        {/* Records */}
        <View style={styles.recordsSection}>
          <Text style={styles.sectionTitle}>Registros del período</Text>
          
          <View style={styles.recordsList}>
            <RecordItem 
              value="185 mg/dL **Post-desayuno**"
              date="8:00 AM, Mayo 19, 2024"
            />
            <RecordItem 
              value="Desayuno 80g **Carbs**"
              date="7:30 AM, Mayo 19, 2024"
            />
            <RecordItem 
              value="Insulina Rápida **8**"
              date="7:30 AM, Mayo 19, 2024"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavButton 
          title="Inicio" 
          iconName="home"
          route="/Home/Home"
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
    backgroundColor: '#F8FAFC',
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
  periodSection: {
    marginTop: 16,
    marginBottom: 16,
  },
  periodButtons: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 30,
    padding: 4,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  periodButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 1,
    minWidth: 0,
  },
  periodButtonActive: {
    backgroundColor: '#2196F3',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  periodButtonFirst: {
    // Ya no necesitamos estilos específicos para first
  },
  periodButtonLast: {
    // Ya no necesitamos estilos específicos para last
  },
  periodButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  categoryButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
    height: 160,
    flexDirection: 'row',
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingRight: 8,
  },
  chartContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chartSvg: {
    height: 120,
    position: 'relative',
    backgroundColor: 'white',
    marginBottom: 15,
    overflow: 'hidden',
  },
  chartLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#3B82F6',
    borderRadius: 1,
  },
  chartDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  axisLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  statsGrid: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
    gap: 12,
  },
  statIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'white',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  recordsSection: {
    marginBottom: 100,
  },
  recordsList: {
    backgroundColor: 'white',
    marginHorizontal: -16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recordIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordNumber: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  recordInfo: {
    flex: 1,
  },
  recordValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1F2937',
    marginBottom: 4,
  },
  recordValueBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  recordTime: {
    fontSize: 14,
    color: '#6B7280',
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

export default Record;