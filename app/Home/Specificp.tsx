import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Nefropatia = () => {
  const [activeTab, setActiveTab] = useState('nefropatia');
  const [expandedSections, setExpandedSections] = useState({});
  const [showLessFactors, setShowLessFactors] = useState(false);
  const [showMoreRecommendations, setShowMoreRecommendations] = useState(false);
  const router = useRouter();
  
  // Animación de ondas
  const rippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de ondas con reset
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  const tabs = [
    { id: 'nefropatia', title: 'Nefropatía diabética' },
    { id: 'retinopatia', title: 'Retinopatía diabética' },
    { id: 'neuropatia', title: 'Neuropatía diabética' },
    { id: 'cardiovascular', title: 'Riesgo cardiovascular' },
    { id: 'pie', title: 'Pie diabético' },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FactorItem = ({ label, value, level, levelColor, isLast = false }) => (
    <View style={[styles.factorItem, isLast && styles.factorItemLast]}>
      <View style={styles.factorLeft}>
        <Text style={styles.factorLabel}>{label}</Text>
        <Text style={styles.factorValue}>{value}</Text>
      </View>
      <Text style={[styles.levelText, { color: levelColor }]}>{level}</Text>
    </View>
  );

  const RecommendationItem = ({ text, isLast = false }) => (
    <View style={[styles.recommendationItem, isLast && styles.recommendationItemLast]}>
      <Text style={styles.recommendationText}>{text}</Text>
    </View>
  );

  const ExpandableSection = ({ title, children, sectionKey, isLast = false }) => (
    <View style={[styles.expandableSection, isLast && styles.expandableSectionLast]}>
      <TouchableOpacity 
        style={styles.expandableHeader}
        onPress={() => toggleSection(sectionKey)}
      >
        <Text style={styles.expandableTitle}>{title}</Text>
        <MaterialIcons 
          name={expandedSections[sectionKey] ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#6B7280" 
        />
      </TouchableOpacity>
      {expandedSections[sectionKey] && (
        <View style={styles.expandableContent}>
          {children}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}


      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContainer}
          >
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Risk Level Section */}
        <View style={styles.riskSection}>
          <Text style={styles.riskSectionTitle}>Tu nivel de riesgo de nefropatía diabética</Text>
          
          <View style={styles.riskContentContainer}>
            <View style={styles.riskCircleContainer}>
              {/* Onda expandiéndose */}
              <Animated.View style={[
                styles.rippleCircle,
                {
                  opacity: rippleAnim.interpolate({
                    inputRange: [0, 0.3, 0.7, 1],
                    outputRange: [0, 0.8, 0.4, 0],
                  }),
                  transform: [{
                    scale: rippleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1.2],
                    })
                  }]
                }
              ]} />

              {/* Círculo principal sin animación */}
              <View style={styles.riskCircle}>
                <Text style={styles.riskLevelSmall}>Nivel</Text>
                <Text style={styles.riskLevel}>Medio</Text>
                <Text style={styles.riskSubtext}>Estimado</Text>
              </View>
            </View>
            
            <View style={styles.riskTextContainer}>
              <Text style={styles.riskDescription}>
                Tu riesgo de{'\n'}nefropatía diabética{'\n'}requiere atención.{'\n'}Gestionar tu PA y{'\n'}glucosa es clave.
              </Text>
            </View>
          </View>
        </View>

        {/* Factors Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Factores que influyen{'\n'}en nefropatía</Text>
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => setShowLessFactors(!showLessFactors)}
            >
              <Text style={styles.viewButtonText}>Ver menos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.factorsContainer}>
            <FactorItem 
              label="HbA1c promedio"
              value="6.5%"
              level="Moderado"
              levelColor="#F59E0B"
            />
            <FactorItem 
              label="Tiempo en rango (TIR)"
              value="78%"
              level="Moderado"
              levelColor="#F59E0B"
            />
            <FactorItem 
              label="Presión arterial"
              value="140/90 mmHg"
              level="Alto"
              levelColor="#EF4444"
            />
            <FactorItem 
              label="Años con diabetes"
              value="15 años"
              level="Moderado"
              levelColor="#F59E0B"
            />
            <FactorItem 
              label="HbA1c promedio"
              value="140/90 mmHg"
              level="Moderado"
              levelColor="#F59E0B"
            />
            <FactorItem 
              label="Presión arterial"
              value="78%"
              level="Alto"
              levelColor="#EF4444"
              isLast={true}
            />
          </View>
        </View>

        {/* Recommendations Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recomendaciones para{'\n'}nefropatía</Text>
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => setShowMoreRecommendations(!showMoreRecommendations)}
            >
              <Text style={styles.viewButtonText}>Ver más</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recommendationsContainer}>
            <RecommendationItem 
              text="Controla tu presión arterial regularmente." 
            />
            <RecommendationItem 
              text="Mantén tu glucosa en rango para proteger tus riñones." 
              isLast={true}
            />
          </View>
        </View>

        {/* Learn More Section */}
        <View style={styles.section}>
          <View style={styles.learnMoreHeader}>
            <Text style={styles.sectionTitle}>Aprende más sobre{'\n'}nefropatía</Text>
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => {}}
            >
              <Text style={styles.viewButtonText}>Ver más</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.expandableSectionsContainer}>
            <ExpandableSection 
              title="¿Qué es la nefropatía diabética?" 
              sectionKey="que-es"
            >
              <Text style={styles.expandableText}>
                La nefropatía diabética es una complicación grave de la diabetes que afecta los riñones. 
                Se produce cuando los altos niveles de glucosa en sangre dañan los pequeños vasos sanguíneos 
                de los riñones a lo largo del tiempo. Esto puede provocar que los riñones no funcionen 
                correctamente y, en casos graves, puede llevar a insuficiencia renal.
              </Text>
            </ExpandableSection>

            <ExpandableSection 
              title="Síntomas y diagnóstico." 
              sectionKey="sintomas"
              isLast={true}
            >
              <Text style={styles.expandableText}>
                Los síntomas iniciales pueden incluir proteinuria (proteínas en la orina), hinchazón 
                en pies y tobillos, hipertensión arterial, y fatiga. El diagnóstico se realiza mediante 
                análisis de orina para detectar proteínas, análisis de sangre para medir la función renal, 
                y monitoreo regular de la presión arterial.
              </Text>
            </ExpandableSection>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 20,
  },
  tabsScrollContainer: {
    paddingRight: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 120,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 22,
  },
  viewButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0891B2',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#0891B2',
    fontWeight: '600',
  },
  riskSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  riskSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  riskContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskCircleContainer: {
    marginRight: 20,
    position: 'relative',
  },
  riskTextContainer: {
    flex: 1,
  },
  riskLevelSmall: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },

  rippleCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#F59E0B',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  riskCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 4,
    position: 'relative',
    zIndex: 1,
  },
  riskLevel: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F59E0B',
    textAlign: 'center',
  },
  riskSubtext: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
  riskDescription: {
    fontSize: 14,
    color: '#D97706',
    lineHeight: 20,
    fontWeight: '500',
  },
  factorsContainer: {
    backgroundColor: 'white',
    borderRadius: 0,
    marginHorizontal: -16,
  },
  factorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  factorItemLast: {
    borderBottomWidth: 0,
  },
  factorLeft: {
    flex: 1,
  },
  factorLabel: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 4,
  },
  factorValue: {
    fontSize: 13,
    color: '#6B7280',
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  recommendationsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 0,
  },
  learnMoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  recommendationItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  recommendationItemLast: {
    borderBottomWidth: 0,
  },
  recommendationText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  expandableSectionsContainer: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 0,
    marginTop: 16,
  },
  expandableSection: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 8,
    borderRadius: 8,
  },
  expandableSectionLast: {
    borderBottomWidth: 0,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  expandableTitle: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  expandableContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
  },
  expandableText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default Nefropatia;