import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function FavoritesScreen() {
  const favorites = [
    { id: '1', title: 'Canción Favorita 1', artist: 'Artista 1', duration: '3:45' },
    { id: '2', title: 'Canción Favorita 2', artist: 'Artista 2', duration: '4:20' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="heart-outline" size={64} color="#555" />
          <Text style={styles.emptyText}>No tienes favoritos aún</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.songCard}>
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
              </View>
              <View style={styles.songActions}>
                <Text style={styles.duration}>{item.duration}</Text>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="heart" size={24} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#555',
    fontSize: 16,
    marginTop: 16,
  },
  songCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    color: '#888',
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  duration: {
    color: '#888',
    fontSize: 14,
  },
});