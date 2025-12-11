import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DEEZER_API = 'https://api.deezer.com';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'; // Por si hay problemas de CORS

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState('track'); // 'track', 'artist', 'album'

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      setLoading(true);
      // Cargar top tracks
      const res = await fetch(`${DEEZER_API}/chart/0/tracks?limit=30`);
      const data = await res.json();
      
      if (data.data) {
        setResults(data.data.map(t => ({
          id: t.id,
          type: 'track',
          title: t.title,
          artist: t.artist?.name,
          artistId: t.artist?.id,
          album: t.album?.title,
          image: t.album?.cover_medium || t.album?.cover,
          duration: t.duration,
          preview: t.preview, // URL de preview de 30 segundos
        })));
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo cargar música');
    } finally {
      setLoading(false);
    }
  };

  const search = async () => {
    if (!query.trim()) {
      loadChart();
      return;
    }

    try {
      setLoading(true);
      
      let url = '';
      if (searchType === 'track') {
        url = `${DEEZER_API}/search/track?q=${encodeURIComponent(query)}&limit=50`;
      } else if (searchType === 'artist') {
        url = `${DEEZER_API}/search/artist?q=${encodeURIComponent(query)}&limit=30`;
      } else {
        url = `${DEEZER_API}/search/album?q=${encodeURIComponent(query)}&limit=30`;
      }

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.data && data.data.length > 0) {
        if (searchType === 'track') {
          setResults(data.data.map(t => ({
            id: t.id,
            type: 'track',
            title: t.title,
            artist: t.artist?.name,
            artistId: t.artist?.id,
            album: t.album?.title,
            image: t.album?.cover_medium || t.album?.cover,
            duration: t.duration,
            preview: t.preview,
          })));
        } else if (searchType === 'artist') {
          setResults(data.data.map(a => ({
            id: a.id,
            type: 'artist',
            name: a.name,
            image: a.picture_medium || a.picture,
            fans: a.nb_fan,
            albumCount: a.nb_album,
          })));
        } else {
          setResults(data.data.map(a => ({
            id: a.id,
            type: 'album',
            title: a.title,
            artist: a.artist?.name,
            artistId: a.artist?.id,
            image: a.cover_medium || a.cover,
            trackCount: a.nb_tracks,
            releaseDate: a.release_date,
          })));
        }
      } else {
        setResults([]);
        Alert.alert('Sin resultados', `No se encontró "${query}"`);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo buscar');
    } finally {
      setLoading(false);
    }
  };

  const loadArtistTracks = async (artistId, artistName) => {
    try {
      setLoading(true);
      const res = await fetch(`${DEEZER_API}/artist/${artistId}/top?limit=30`);
      const data = await res.json();
      
      if (data.data) {
        setResults(data.data.map(t => ({
          id: t.id,
          type: 'track',
          title: t.title,
          artist: t.artist?.name,
          artistId: t.artist?.id,
          album: t.album?.title,
          image: t.album?.cover_medium || t.album?.cover,
          duration: t.duration,
          preview: t.preview,
        })));
        setSearchType('track');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las canciones');
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumTracks = async (albumId, albumTitle) => {
    try {
      setLoading(true);
      const res = await fetch(`${DEEZER_API}/album/${albumId}/tracks`);
      const data = await res.json();
      
      if (data.data) {
        setResults(data.data.map(t => ({
          id: t.id,
          type: 'track',
          title: t.title,
          artist: t.artist?.name,
          artistId: t.artist?.id,
          album: albumTitle,
          image: null,
          duration: t.duration,
          preview: t.preview,
        })));
        setSearchType('track');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las canciones');
    } finally {
      setLoading(false);
    }
  };

  const handleItemPress = (item) => {
    if (item.type === 'track') {
      Alert.alert(
        '🎵 ' + item.title,
        `🎤 ${item.artist}\n💿 ${item.album}\n\n✅ Preview de 30 segundos disponible\n\n🔗 ${item.preview}`,
        [
          { text: 'OK' },
          { 
            text: '▶️ Reproducir Preview', 
            onPress: () => Alert.alert('Info', 'Aquí puedes integrar expo-av para reproducir el preview')
          }
        ]
      );
    } else if (item.type === 'artist') {
      Alert.alert(
        '👤 ' + item.name,
        `👥 ${item.fans?.toLocaleString()} fans\n💿 ${item.albumCount} álbumes`,
        [
          { text: 'Cancelar' },
          { text: '🎵 Ver canciones', onPress: () => loadArtistTracks(item.id, item.name) }
        ]
      );
    } else if (item.type === 'album') {
      Alert.alert(
        '💿 ' + item.title,
        `🎤 ${item.artist}\n📅 ${item.releaseDate}\n🎵 ${item.trackCount} canciones`,
        [
          { text: 'Cancelar' },
          { text: '🎵 Ver canciones', onPress: () => loadAlbumTracks(item.id, item.title) }
        ]
      );
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const renderTrack = ({ item }) => (
    <TouchableOpacity style={s.track} onPress={() => handleItemPress(item)}>
      <Image 
        source={{ uri: item.image || 'https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/250x250-000000-80-0-0.jpg' }} 
        style={s.img} 
      />
      <View style={s.info}>
        <Text style={s.trackTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={s.artist} numberOfLines={1}>{item.artist}</Text>
        <Text style={s.album} numberOfLines={1}>{item.album}</Text>
      </View>
      <View style={s.right}>
        <Text style={s.time}>{formatTime(item.duration)}</Text>
        <MaterialCommunityIcons name="play-circle" size={32} color="#1DB954" />
      </View>
    </TouchableOpacity>
  );

  const renderArtist = ({ item }) => (
    <TouchableOpacity style={s.artistCard} onPress={() => handleItemPress(item)}>
      <Image 
        source={{ uri: item.image || 'https://e-cdns-images.dzcdn.net/images/artist//250x250-000000-80-0-0.jpg' }} 
        style={s.artistImg} 
      />
      <View style={s.info}>
        <Text style={s.artistName} numberOfLines={1}>{item.name}</Text>
        <Text style={s.artistInfo}>{item.fans?.toLocaleString()} fans • {item.albumCount} álbumes</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
    </TouchableOpacity>
  );

  const renderAlbum = ({ item }) => (
    <TouchableOpacity style={s.track} onPress={() => handleItemPress(item)}>
      <Image 
        source={{ uri: item.image || 'https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/250x250-000000-80-0-0.jpg' }} 
        style={s.img} 
      />
      <View style={s.info}>
        <Text style={s.trackTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={s.artist} numberOfLines={1}>{item.artist}</Text>
        <Text style={s.album} numberOfLines={1}>{item.trackCount} canciones • {item.releaseDate}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={s.container}>
      <View style={s.searchBox}>
        <MaterialCommunityIcons name="magnify" size={24} color="#888" />
        <TextInput
          style={s.input}
          placeholder="Buscar música, artistas, álbumes..."
          placeholderTextColor="#555"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={search}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); loadChart(); }}>
            <MaterialCommunityIcons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <View style={s.filterRow}>
        <TouchableOpacity 
          style={[s.filterBtn, searchType === 'track' && s.filterBtnActive]}
          onPress={() => setSearchType('track')}
        >
          <Text style={[s.filterText, searchType === 'track' && s.filterTextActive]}>Canciones</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[s.filterBtn, searchType === 'artist' && s.filterBtnActive]}
          onPress={() => setSearchType('artist')}
        >
          <Text style={[s.filterText, searchType === 'artist' && s.filterTextActive]}>Artistas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[s.filterBtn, searchType === 'album' && s.filterBtnActive]}
          onPress={() => setSearchType('album')}
        >
          <Text style={[s.filterText, searchType === 'album' && s.filterTextActive]}>Álbumes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.btnSearch} onPress={search} disabled={loading}>
          <MaterialCommunityIcons name="magnify" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={s.title}>
        {query ? `📊 ${results.length} resultados` : `🔥 Top ${searchType === 'track' ? 'Canciones' : searchType === 'artist' ? 'Artistas' : 'Álbumes'}`}
      </Text>

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={s.loadingText}>Buscando...</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={
            searchType === 'track' ? renderTrack : 
            searchType === 'artist' ? renderArtist : 
            renderAlbum
          }
        />
      ) : (
        <View style={s.center}>
          <MaterialCommunityIcons name="music-off" size={64} color="#333" />
          <Text style={s.emptyText}>No se encontraron resultados</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12 },
  input: { flex: 1, color: '#fff', fontSize: 16, marginLeft: 12 },
  filterRow: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1a1a1a', marginRight: 8 },
  filterBtnActive: { backgroundColor: '#1DB954' },
  filterText: { color: '#888', fontSize: 14, fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  btnSearch: { marginLeft: 'auto', backgroundColor: '#1DB954', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#888', fontSize: 16, marginTop: 12 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  track: { flexDirection: 'row', backgroundColor: '#1a1a1a', padding: 12, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  img: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  trackTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 4 },
  artist: { fontSize: 14, color: '#888', marginBottom: 2 },
  album: { fontSize: 12, color: '#666' },
  right: { alignItems: 'flex-end' },
  time: { color: '#888', fontSize: 12, marginBottom: 4 },
  artistCard: { flexDirection: 'row', backgroundColor: '#1a1a1a', padding: 12, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  artistImg: { width: 70, height: 70, borderRadius: 35, marginRight: 12 },
  artistName: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  artistInfo: { fontSize: 14, color: '#1DB954' },
});