import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyDevicesScreen = () => {
  const devicesData = [
    {
      id: 1,
      name: 'OneTouch Select Plus',
      description: 'Última sync: Hoy 8:30 AM',
      icon: 'check-circle',
    },
    {
      id: 2,
      name: 'Recordatorios de medicación',
      description: 'Description',
      icon: 'check-circle',
    },
    {
      id: 3,
      name: 'Recordatorio de registro de datos',
      description: 'Description',
      icon: 'check-circle',
    },
    {
      id: 4,
      name: 'Alertas de predicción',
      description: 'Description',
      icon: 'check-circle',
    },
    {
      id: 5,
      name: 'Alertas del dispositivo',
      description: 'Description',
      icon: 'check-circle',
    },
  ];

  const renderDeviceItem = (device) => (
    <TouchableOpacity key={device.id} style={styles.deviceItem}>
      <View style={styles.deviceContent}>
        <View style={styles.iconContainer}>
          <Icon name={device.icon} size={24} color="#314158" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.deviceDescription}>{device.description}</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Icon name="chevron-right" size={24} color="#62748E" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>


      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section Title */}
        <Text style={styles.sectionTitle}>Mis dispositivos</Text>

        {/* Devices List */}
        <View style={styles.devicesList}>
          {devicesData.map(device => renderDeviceItem(device))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Source Sans 3',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#314158',
    fontFamily: 'Source Sans 3',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  devicesList: {
    backgroundColor: '#FFFFFF',
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  deviceContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#314158',
    fontFamily: 'Source Sans 3',
    marginBottom: 4,
  },
  deviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Source Sans 3',
  },
  arrowContainer: {
    marginLeft: 12,
  },
});

export default MyDevicesScreen;