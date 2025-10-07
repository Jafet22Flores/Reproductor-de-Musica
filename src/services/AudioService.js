import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

class AudioService {
  constructor() {
    this.sound = null;
    this.currentTrack = null;
    this.playlist = [];
    this.isPlaying = false;
    this.isShuffle = false;
    this.repeatMode = 'off'; // 'off', 'one', 'all'
  }

  // Escanear carpeta de descargas del dispositivo
  async scanDownloads() {
    try {
      const downloadDir = FileSystem.documentDirectory + 'Downloads/';
      const files = await FileSystem.readDirectoryAsync(downloadDir);
      
      // Filtrar solo archivos de audio
      const audioFiles = files.filter(file => 
        file.endsWith('.mp3') || 
        file.endsWith('.m4a') || 
        file.endsWith('.wav') ||
        file.endsWith('.aac')
      );

      // Obtener metadatos de cada archivo
      const tracks = await Promise.all(
        audioFiles.map(async (file) => {
          const uri = downloadDir + file;
          const info = await FileSystem.getInfoAsync(uri);
          
          return {
            id: file,
            title: file.replace(/\.[^/.]+$/, ""), // Remover extensión
            artist: "Desconocido",
            uri: uri,
            duration: 0,
            size: info.size,
            modificationTime: info.modificationTime,
          };
        })
      );

      this.playlist = tracks;
      return tracks;
    } catch (error) {
      console.error('Error escaneando descargas:', error);
      return [];
    }
  }

  // Cargar y reproducir una canción
  async loadAndPlay(track) {
    try {
      // Detener canción actual si existe
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // Configurar audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      // Cargar nuevo archivo
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true }
      );

      this.sound = sound;
      this.currentTrack = track;
      this.isPlaying = true;

      // Configurar callbacks
      sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate.bind(this));

      return true;
    } catch (error) {
      console.error('Error cargando audio:', error);
      return false;
    }
  }

  // Control de reproducción
  async play() {
    if (this.sound) {
      await this.sound.playAsync();
      this.isPlaying = true;
    }
  }

  async pause() {
    if (this.sound) {
      await this.sound.pauseAsync();
      this.isPlaying = false;
    }
  }

  async skipNext() {
    const currentIndex = this.playlist.findIndex(
      track => track.id === this.currentTrack?.id
    );
    
    let nextIndex;
    if (this.isShuffle) {
      nextIndex = Math.floor(Math.random() * this.playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % this.playlist.length;
    }

    const nextTrack = this.playlist[nextIndex];
    if (nextTrack) {
      await this.loadAndPlay(nextTrack);
    }
  }

  async skipPrevious() {
    const currentIndex = this.playlist.findIndex(
      track => track.id === this.currentTrack?.id
    );
    
    const prevIndex = currentIndex === 0 
      ? this.playlist.length - 1 
      : currentIndex - 1;

    const prevTrack = this.playlist[prevIndex];
    if (prevTrack) {
      await this.loadAndPlay(prevTrack);
    }
  }

  async seek(position) {
    if (this.sound) {
      await this.sound.setPositionAsync(position);
    }
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    return this.isShuffle;
  }

  toggleRepeat() {
    const modes = ['off', 'one', 'all'];
    const currentIndex = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(currentIndex + 1) % modes.length];
    return this.repeatMode;
  }

  async deleteTrack(trackId) {
    try {
      const track = this.playlist.find(t => t.id === trackId);
      if (!track) return false;

      // Si es la canción actual, detenerla
      if (this.currentTrack?.id === trackId) {
        await this.sound?.unloadAsync();
        this.sound = null;
        this.currentTrack = null;
      }

      // Eliminar archivo
      await FileSystem.deleteAsync(track.uri);
      
      // Actualizar playlist
      this.playlist = this.playlist.filter(t => t.id !== trackId);
      
      return true;
    } catch (error) {
      console.error('Error eliminando archivo:', error);
      return false;
    }
  }

  _onPlaybackStatusUpdate(status) {
    if (status.didJustFinish && !status.isLooping) {
      if (this.repeatMode === 'one') {
        this.sound?.replayAsync();
      } else if (this.repeatMode === 'all') {
        this.skipNext();
      }
    }
  }

  // Limpieza
  async cleanup() {
    if (this.sound) {
      await this.sound.unloadAsync();
    }
  }
}

export default new AudioService();