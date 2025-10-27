'use client';

import React, { useState } from 'react';
import {
  Music,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Loader,
} from 'lucide-react';
import { DoramaCompleto } from '@/types/admin';

interface PlaylistData {
  id: string;
  url: string;
  nome: string;
  dono: string;
  totalMusicas: number;
  imagemUrl: string;
}

interface PlaylistFormProps {
  selectedDorama: DoramaCompleto | null;
  onDoramaChange: (dorama: DoramaCompleto | null) => void;
}

export default function PlaylistForm({ selectedDorama, onDoramaChange }: PlaylistFormProps) {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
  };

  const validateSpotifyUrl = (url: string): boolean => {
    const spotifyRegex =
      /^https?:\/\/(open\.spotify\.com|spotify\.com)\/(playlist|album)\/[a-zA-Z0-9]+/;
    return spotifyRegex.test(url);
  };

  const handleAddPlaylist = async () => {
    if (!selectedDorama) {
      showFeedback('Selecione um dorama primeiro!', 'error');
      return;
    }

    if (!playlistUrl.trim()) {
      showFeedback('Digite a URL da playlist do Spotify!', 'error');
      return;
    }

    if (!validateSpotifyUrl(playlistUrl)) {
      showFeedback('URL inválida! Use uma URL do Spotify válida.', 'error');
      return;
    }

    setIsLoadingPlaylist(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockPlaylist: PlaylistData = {
        id: `playlist-${Date.now()}`,
        url: playlistUrl,
        nome: 'Korean Drama OST Collection',
        dono: 'K-Drama Lovers',
        totalMusicas: Math.floor(Math.random() * 50) + 10,
        imagemUrl:
          'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210cc546',
      };

      if (playlists.some((p) => p.url === playlistUrl)) {
        showFeedback('Esta playlist já foi adicionada!', 'error');
        return;
      }

      setPlaylists((prev) => [...prev, mockPlaylist]);
      setPlaylistUrl('');
      showFeedback('Playlist adicionada com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao buscar playlist:', error);
      showFeedback('Erro ao buscar playlist. Tente novamente.', 'error');
    } finally {
      setIsLoadingPlaylist(false);
    }
  };

  const handleRemovePlaylist = (id: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
    showFeedback('Playlist removida!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDorama) {
      showFeedback('Selecione um dorama!', 'error');
      return;
    }

    if (playlists.length === 0) {
      showFeedback('Adicione pelo menos uma playlist!', 'error');
      return;
    }

    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const dataToSave = {
        doramaId: selectedDorama.doramaId,
        playlists: playlists.map((p) => ({
          url: p.url,
          nome: p.nome,
          dono: p.dono,
          totalMusicas: p.totalMusicas,
          imagemUrl: p.imagemUrl,
        })),
      };

      console.log('Dados a serem salvos:', dataToSave);

      showFeedback(
        `${playlists.length} playlist(s) atribuída(s) com sucesso! 🎉`,
        'success'
      );

      setPlaylists([]);
      setPlaylistUrl('');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      showFeedback('Erro ao salvar playlists. Tente novamente.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearSelection = () => {
    onDoramaChange(null);
    setPlaylists([]);
    setPlaylistUrl('');
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
              Atribuir Playlists
            </h2>
            <p className="text-gray-600">
              Adicione playlists do Spotify para:{' '}
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
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            URL da Playlist do Spotify *
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                placeholder="https://open.spotify.com/playlist/..."
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                disabled={isLoadingPlaylist}
              />
              {isLoadingPlaylist && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader className="w-5 h-5 text-purple-500 animate-spin" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleAddPlaylist}
              disabled={isLoadingPlaylist || !playlistUrl.trim()}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                isLoadingPlaylist || !playlistUrl.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
              }`}
            >
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Cole a URL completa da playlist do Spotify
          </p>
        </div>

        {playlists.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Playlists Adicionadas ({playlists.length})
            </label>
            <div className="space-y-3">
              {playlists.map((playlist, index) => (
                <div
                  key={playlist.id}
                  className="bg-white border border-purple-100 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                  style={{
                    animation: 'slide-in-from-bottom 0.3s ease-out',
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={playlist.imagemUrl}
                      alt={playlist.nome}
                      className="w-16 h-16 rounded-lg object-cover border border-purple-200"
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
                        className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Abrir no Spotify"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemovePlaylist(playlist.id)}
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

        <div className="pt-6 border-t border-purple-100">
          <button
            type="submit"
            disabled={isSaving || playlists.length === 0}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] ${
              isSaving || playlists.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/25'
            }`}
          >
            {isSaving ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Music className="w-5 h-5" />
                Salvar Playlists
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}