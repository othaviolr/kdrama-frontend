'use client';

import React, { useState, useEffect } from 'react';
import {
  Music,
  Trash2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Loader,
} from 'lucide-react';
import { DoramaCompleto } from '@/types/admin';
import { SpotifyPlaylist } from '@/types/playlist';
import { playlistService } from '../../services/playlistService';
import PlaylistSpotifySearch from './PlaylistSpotifySearch';

interface PlaylistFormProps {
  selectedDorama: DoramaCompleto | null;
  onDoramaChange: (dorama: DoramaCompleto | null) => void;
}

export default function PlaylistForm({
  selectedDorama,
  onDoramaChange,
}: PlaylistFormProps) {
  const [selectedPlaylists, setSelectedPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
  };

  const handlePlaylistsSelect = (playlists: SpotifyPlaylist[]) => {
    setSelectedPlaylists(playlists);
  };

  const handleRemovePlaylist = (spotifyPlaylistId: string) => {
    setSelectedPlaylists((prev) =>
      prev.filter((p) => p.spotifyPlaylistId !== spotifyPlaylistId)
    );
    showFeedback('Playlist removida!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDorama) {
      showFeedback('Selecione um dorama!', 'error');
      return;
    }

    if (selectedPlaylists.length === 0) {
      showFeedback('Selecione pelo menos uma playlist!', 'error');
      return;
    }

    setIsSaving(true);

    try {
      console.log('💾 Vinculando playlists ao dorama:', selectedDorama.titulo);

      // Vincular cada playlist selecionada
      for (const playlist of selectedPlaylists) {
        await playlistService.vincularPlaylist({
          doramaId: selectedDorama.doramaId,
          spotifyPlaylistId: playlist.spotifyPlaylistId,
          nome: playlist.nome,
          url: playlist.url,
          imagemUrl: playlist.imagemUrl,
          dono: playlist.dono,
          totalMusicas: playlist.totalMusicas,
        });
      }

      console.log('✅ Playlists vinculadas com sucesso!');
      showFeedback(
        `${selectedPlaylists.length} playlist(s) vinculada(s) com sucesso! 🎉`,
        'success'
      );

      // Limpa a seleção
      setSelectedPlaylists([]);
    } catch (error) {
      console.error('❌ Erro ao vincular playlists:', error);
      showFeedback('Erro ao vincular playlists. Tente novamente.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearSelection = () => {
    onDoramaChange(null);
    setSelectedPlaylists([]);
  };

  if (!selectedDorama) {
    return (
      <div className="p-6">
        <div className="text-center py-16 bg-purple-50 rounded-xl border-2 border-dashed border-purple-200">
          <Music className="w-16 h-16 text-purple-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">
            Selecione um dorama para começar
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Use a busca acima para selecionar um dorama
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Vincular Playlists
            </h2>
            <p className="text-gray-600">
              Busque e selecione playlists para:{' '}
              <span className="font-semibold text-purple-600">
                {selectedDorama.titulo}
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={handleClearSelection}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Alterar dorama
        </button>
      </div>

      {feedback.message && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
            feedback.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Busca de Playlists do Spotify */}
        <PlaylistSpotifySearch
          nomeDorama={selectedDorama.titulo}
          onPlaylistsSelect={handlePlaylistsSelect}
        />

        {/* Playlists Selecionadas Preview */}
        {selectedPlaylists.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Playlists Selecionadas ({selectedPlaylists.length})
            </label>
            <div className="space-y-3">
              {selectedPlaylists.map((playlist) => (
                <div
                  key={playlist.spotifyPlaylistId}
                  className="bg-purple-50 border border-purple-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={playlist.imagemUrl}
                      alt={playlist.nome}
                      className="w-16 h-16 rounded-lg object-cover border border-purple-300"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">
                        {playlist.nome}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Por {playlist.dono}
                      </p>
                      <p className="text-sm text-gray-500">
                        {playlist.totalMusicas} músicas
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={playlist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                        title="Abrir no Spotify"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemovePlaylist(playlist.spotifyPlaylistId)
                        }
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6 border-t border-purple-100">
          <button
            type="submit"
            disabled={isSaving || selectedPlaylists.length === 0}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] ${
              isSaving || selectedPlaylists.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/25'
            }`}
          >
            {isSaving ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Vinculando...
              </>
            ) : (
              <>
                <Music className="w-5 h-5" />
                Vincular {selectedPlaylists.length} Playlist(s)
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}