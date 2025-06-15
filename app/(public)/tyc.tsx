import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const tyc = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      
 

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdate}>Última actualización: 14/08/2024</Text>
        
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue 
          lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut 
          feugiat diam. Fusce a scelerisque neque, sed accumsan metus.
        </Text>

        <Text style={styles.paragraph}>
          Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Aenean arcu metus, 
          bibendum at rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper 
          ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex placerat. Mauris ut 
          lacinia justo, sed suscipit tortor. Nam egestas nulla posuere neque tincidunt porta.
        </Text>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue 
          lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut 
          feugiat diam. Fusce a scelerisque neque, sed accumsan metus.
        </Text>

        <Text style={styles.paragraph}>
          Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Aenean arcu metus, 
          bibendum at rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper 
          ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex placerat. Mauris ut 
          lacinia justo, sed suscipit tortor. Nam egestas nulla posuere neque tincidunt porta.
        </Text>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue 
          lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut 
          feugiat diam. Fusce a scelerisque neque, sed accumsan metus.
        </Text>

        <Text style={styles.paragraph}>
          Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Aenean arcu metus, 
          bibendum at rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper 
          ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex placerat. Mauris ut 
          lacinia justo, sed suscipit tortor. Nam egestas nulla posuere neque tincidunt porta.
        </Text>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue 
          lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut 
          feugiat diam. Fusce a scelerisque neque, sed accumsan metus.
        </Text>

        <Text style={styles.paragraph}>
          Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Aenean arcu metus, 
          bibendum at rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper 
          ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex placerat. Mauris ut 
          lacinia justo, sed suscipit tortor. Nam egestas nulla posuere neque tincidunt porta.
        </Text>

        {/* Espacio adicional al final para mejor scroll */}
        <View style={styles.bottomSpacing} />
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
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  lastUpdate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    fontWeight: '500',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'justify',
    fontFamily: 'System',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default tyc;