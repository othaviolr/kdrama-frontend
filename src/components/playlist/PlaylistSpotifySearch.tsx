'use client';

import React, { useState } from 'react';
import { Search, Music, Loader, ExternalLink, Check } from 'lucide-react';
import { playlistService } from '../../services/playlistService';
import { SpotifyPlaylist } from '@/types/playlist';

interface PlaylistSpotifySearchProps {
  nomeDorama: string;
  onPlaylistsSelect: (playlists: SpotifyPlaylist[]) => void;
}

export default function PlaylistSpotifySearch({
  nomeDorama,
  onPlaylistsSelect,
}: PlaylistSpotifySearchProps) {
  const [searchTerm, setSearchTerm] = useState(nomeDorama);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setHasSearched(false);
    try {
      console.log('🎵 Buscando playlists no Spotify para:', searchTerm);
      const results = await playlistService.buscarPlaylistsSpotify(searchTerm);
      console.log('✅ Playlists encontradas:', results.length);
      setPlaylists(results);
      setHasSearched(true);
    } catch (error) {
      console.error('❌ Erro ao buscar playlists:', error);
      setPlaylists([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const togglePlaylistSelection = (playlist: SpotifyPlaylist) => {
    setSelectedPlaylists((prev) => {
      const isSelected = prev.some(
        (p) => p.spotifyPlaylistId === playlist.spotifyPlaylistId
      );

      let newSelection;
      if (isSelected) {
        newSelection = prev.filter(
          (p) => p.spotifyPlaylistId !== playlist.spotifyPlaylistId
        );
      } else {
        newSelection = [...prev, playlist];
      }

      onPlaylistsSelect(newSelection);
      return newSelection;
    });
  };

  const isSelected = (playlist: SpotifyPlaylist) => {
    return selectedPlaylists.some(
      (p) => p.spotifyPlaylistId === playlist.spotifyPlaylistId
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Buscar Playlists no Spotify
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite o nome do dorama..."
              className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || !searchTerm.trim()}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
              isLoading || !searchTerm.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Buscar
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Digite o nome do dorama para encontrar playlists no Spotify
        </p>
      </div>

      {/* Selected Counter */}
      {selectedPlaylists.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-purple-800 font-medium">
            {selectedPlaylists.length} playlist(s) selecionada(s)
          </p>
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div>
          {playlists.length > 0 ? (
            <>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Playlists Encontradas ({playlists.length})
              </label>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.spotifyPlaylistId}
                    onClick={() => togglePlaylistSelection(playlist)}
                    className={`w-full bg-white border rounded-xl p-4 hover:shadow-md transition-all duration-200 text-left ${
                      isSelected(playlist)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-purple-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox visual */}
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected(playlist)
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected(playlist) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Playlist Image */}
                      <img
                        src={playlist.imagemUrl}
                        alt={playlist.nome}
                        className="w-16 h-16 rounded-lg object-cover border border-purple-200"
                      />

                      {/* Playlist Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">
                          {playlist.nome}
                        </h4>
                        <p className="text-sm text-gray-600">Por {playlist.dono}</p>
                        <p className="text-sm text-gray-500">
                          {playlist.totalMusicas} músicas
                        </p>
                      </div>

                      {/* External Link */}
                      <a
                        href={playlist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                        title="Abrir no Spotify"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <Music className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">
                Nenhuma playlist encontrada
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Tente buscar com outro termo
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}