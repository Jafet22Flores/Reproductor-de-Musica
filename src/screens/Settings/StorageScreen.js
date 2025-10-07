import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function StorageScreen() {
  const storageInfo = {
    totalSpace: '128 GB',
    usedSpace: '45 GB',
    musicSpace: '12 GB',
    availableSpace: '83 GB',
  };

  const downloadedSongs = [
    { id: '1', title: 'Canción 1.mp3', size: '4.2 MB', date: '2 días atrás' },
    { id: '2', title: 'Canción 2.mp3', size: '5.1 MB', date: '5 días atrás' },
    { id: '3', title: 'Canción 3.mp3', size: '3.8 MB', date: '1 semana atrás' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Storage Overview */}
      <View style={styles.storageCard}>
        <Text style={styles.cardTitle}>Almacenamiento</Text>
        <View style={styles.storageBar}>
          <View style={[styles.storageUsed, { width: '35%' }]} />
        </View>
        <View style={styles.storageInfo}>
          <View style={styles.storageItem}>
            <Text style={styles.storageLabel}>Usado</Text>
            <Text style={styles.storageValue}>{storageInfo.usedSpace}</Text>
          </View>
          <View style={styles.storageItem}>
            <Text style={styles.storageLabel}>Disponible</Text>
            <Text style={styles.storageValue}>{storageInfo.availableSpace}</Text>
          </View>
        </View>
      </View>

      {/* Music Storage */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="music-circle" size={24} color="#0891b2" />
          <Text style={styles.sectionTitle}>Música descargada</Text>
        </View>
        <Text style={styles.sectionValue}>{storageInfo.musicSpace}</Text>
      </View>

      {/* Downloaded Files */}
      <View style={styles.filesSection}>
        <Text style={styles.filesSectionTitle}>Archivos descargados</Text>
        {downloadedSongs.map((song) => (
          <View key={song.id} style={styles.fileCard}>
            <View style={styles.fileIcon}>
              <MaterialCommunityIcons name="file-music" size={24} color="#0891b2" />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{song.title}</Text>
              <Text style={styles.fileDetails}>{song.size} • {song.date}</Text>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="delete" size={24} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Clear Cache Button */}
      <TouchableOpacity style={styles.clearButton}>
        <MaterialCommunityIcons name="delete-sweep" size={24} color="#fff" />
        <Text style={styles.clearButtonText}>Limpiar caché</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  storageCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  storageBar: {
    height: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  storageUsed: {
    height: '100%',
    backgroundColor: '#0891b2',
  },
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storageItem: {
    alignItems: 'center',
  },
  storageLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  storageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  sectionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0891b2',
  },
  filesSection: {
    marginBottom: 20,
  },
  filesSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  fileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  fileDetails: {
    fontSize: 12,
    color: '#888',
  },
  clearButton: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});