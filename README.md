Reproductor de Música con IMDB API

Aplicación móvil construida en React Native (Expo) que permite reproducir música y administrar playlists personalizadas.
La app consume la IMDB API para obtener información de películas, series y soundtracks, mostrando al usuario datos relacionados mientras disfruta de la música.

📱 Características principales

🎶 Reproducción de música en streaming (archivos locales o URLs).

🔍 Búsqueda de películas/series en IMDB para obtener soundtracks y metadata.

⭐ Favoritos: guarda tus canciones o soundtracks preferidos en almacenamiento local.

🔁 Controles de reproducción completos: reproducir, pausar, siguiente, anterior, aleatorio.

📡 Pantalla de Radio con streams de ejemplo.

📂 Persistencia con AsyncStorage para mantener playlists y favoritos.

🚀 Instalación
1. Clonar repositorio
git clone https://github.com/tuusuario/reproductor-musica-imdb.git
cd reproductor-musica-imdb

2. Instalar dependencias
yarn install


o

npm install

3. Instalar Expo (si no lo tienes)
npm install -g expo-cli

4. Ejecutar la aplicación
expo start


Escanea el código QR en tu dispositivo con Expo Go o usa un emulador Android/iOS.

🔑 Configuración de la API IMDB

La aplicación requiere una API Key de IMDB (IMDB API / RapidAPI).

Regístrate en RapidAPI - IMDB API

Obtén tu API Key.

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

IMDB_API_KEY=tu_api_key_aqui
IMDB_BASE_URL=https://imdb8.p.rapidapi.com


Instala react-native-dotenv para gestionar variables de entorno:

yarn add react-native-dotenv


Configura en babel.config.js:

plugins: [
  ["module:react-native-dotenv"]
]

🏗️ Estructura de Carpetas
/src
  /assets        # Imágenes y audios locales
  /components    # PlayerControls, SongItem, etc.
  /contexts      # MusicContext
  /hooks         # useMusic.js
  /navigations   # AppNavigation
  /screens       # Radio, Favoritos, Busqueda
  /services      # imdbApi.js (consumo de IMDB API)
  /utils         # data.js, helpers

🌐 Ejemplo de consumo IMDB API

Archivo: src/services/imdbApi.js

import { IMDB_API_KEY, IMDB_BASE_URL } from "@env";

export async function searchMovie(query) {
  const url = `${IMDB_BASE_URL}/title/find?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": IMDB_API_KEY,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
    }
  });
  return await res.json();
}


Uso en pantalla de Búsqueda:

import { searchMovie } from "../services/imdbApi";

📋 Roadmap

 Integración básica con IMDB API

 Reproducción de música local/streaming

 Favoritos con AsyncStorage

 Integrar soundtracks de películas/series

 Reproducción en background con notificaciones (react-native-track-player)

 Soporte offline para playlists

🤝 Contribuciones

¡Las PRs son bienvenidas! Abre un issue para nuevas funcionalidades o mejoras.

📜 Licencia

MIT © 2025 - Melvin Jaffet