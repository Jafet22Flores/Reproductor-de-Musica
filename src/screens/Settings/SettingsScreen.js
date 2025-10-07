import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function SettingsScreen({ navigation }) {
  const settingsOptions = [
    {
      id: '1',
      title: 'Almacenamiento',
      subtitle: 'Gestiona tu música descargada',
      icon: 'folder-music',
      action: 'storageScreen',
    },
    {
      id: '2',
      title: 'Calidad de audio',
      subtitle: 'Alta calidad',
      icon: 'music-circle',
    },
    {
      id: '3',
      title: 'Descargas',
      subtitle: 'Solo WiFi',
      icon: 'download',
    },
    {
      id: '4',
      title: 'Notificaciones',
      subtitle: 'Activadas',
      icon: 'bell',
    },
    {
      id: '5',
      title: 'Tema',
      subtitle: 'Oscuro',
      icon: 'palette',
    },
  ];

  const handlePress = (option) => {
    if (option.action === 'storageScreen') {
      navigation.navigate('StorageScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes</Text>
      </View>

      <ScrollView>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={40} color="#fff" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Usuario</Text>
            <Text style={styles.userEmail}>usuario@email.com</Text>
          </View>
        </View>

        {/* Settings Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => handlePress(option)}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons 
                    name={option.icon} 
                    size={24} 
                    color="#0891b2" 
                  />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color="#555" 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>Versión 1.0.0</Text>
            <Text style={styles.aboutSubtext}>Music Player App</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  userSection: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  aboutCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  aboutSubtext: {
    fontSize: 14,
    color: '#888',
  },
});