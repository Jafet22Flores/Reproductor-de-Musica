import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Slider } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(0.3);

  return (
    <View style={styles.container}>
      {/* Header con botón de cerrar */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-down" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reproduciendo</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Carátula del álbum */}
      <View style={styles.albumArtContainer}>
        <View style={styles.albumArt}>
          <MaterialCommunityIcons name="music" size={120} color="#555" />
        </View>
      </View>

      {/* Información de la canción */}
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>Nombre de la Canción</Text>
        <Text style={styles.artistName}>Nombre del Artista</Text>
      </View>

      {/* Barra de progreso */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          value={progress}
          onValueChange={setProgress}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#0891b2"
          maximumTrackTintColor="#333"
          thumbTintColor="#fff"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>1:23</Text>
          <Text style={styles.timeText}>4:56</Text>
        </View>
      </View>

      {/* Controles principales */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          onPress={() => setIsShuffle(!isShuffle)}
          style={styles.secondaryControl}
        >
          <MaterialCommunityIcons 
            name="shuffle-variant" 
            size={28} 
            color={isShuffle ? "#0891b2" : "#888"} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainControl}>
          <MaterialCommunityIcons name="skip-previous" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <MaterialCommunityIcons 
            name={isPlaying ? "pause" : "play"} 
            size={48} 
            color="#000" 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainControl}>
          <MaterialCommunityIcons name="skip-next" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setIsRepeat(!isRepeat)}
          style={styles.secondaryControl}
        >
          <MaterialCommunityIcons 
            name="repeat" 
            size={28} 
            color={isRepeat ? "#0891b2" : "#888"} 
          />
        </TouchableOpacity>
      </View>

      {/* Controles secundarios */}
      <View style={styles.secondaryControls}>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <MaterialCommunityIcons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={28} 
            color={isFavorite ? "#e74c3c" : "#888"} 
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="delete-outline" size={28} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="playlist-music" size={28} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  albumArt: {
    width: 300,
    height: 300,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 16,
    color: '#888',
  },
  progressContainer: {
    marginBottom: 40,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#888',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainControl: {
    padding: 10,
  },
  secondaryControl: {
    padding: 10,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
});