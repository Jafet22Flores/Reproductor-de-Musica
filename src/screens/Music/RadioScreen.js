import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export function RadioScreen() {
  const radioStations = [
    { id: '1', name: 'Rock FM', genre: 'Rock', frequency: '101.5' },
    { id: '2', name: 'Pop Radio', genre: 'Pop', frequency: '95.3' },
    { id: '3', name: 'Jazz Station', genre: 'Jazz', frequency: '88.1' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Radio</Text>
      <FlatList
        data={radioStations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.stationCard}>
            <Text style={styles.stationName}>{item.name}</Text>
            <Text style={styles.stationInfo}>{item.genre} • {item.frequency} FM</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  stationCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  stationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  stationInfo: {
    fontSize: 14,
    color: '#888',
  },
});