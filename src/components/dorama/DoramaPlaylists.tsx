'use client';

import { useState, useEffect } from 'react';
import { X, Music, Users, ExternalLink, Headphones } from 'lucide-react';

interface Playlist {
  id: string;
  nome: string;
  dono: string;
  totalMusicas: number;
  imagemUrl: string;
  url: string;
}

interface DoramaPlaylistsProps {
  open: boolean;
  onClose: () => void;
  doramaId: string;
  doramaTitulo: string;
}

export default function DoramaPlaylists({
  open,
  onClose,
  doramaId,
  doramaTitulo,
}: DoramaPlaylistsProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        // Mock de dados - substituir pela chamada real futuramente
        const mockPlaylists: Playlist[] = [
          {
            id: '1',
            nome: 'Twenty-Five Twenty-One OST',
            dono: 'K-Drama Official',
            totalMusicas: 18,
            imagemUrl:
              'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210cc546',
            url: 'https://open.spotify.com/playlist/37i9dQZF1DXdOEFt9ZX0dh',
          },
          {
            id: '2',
            nome: 'Romantic K-Drama Vibes',
            dono: 'Spotify',
            totalMusicas: 45,
            imagemUrl:
              'https://i.scdn.co/image/ab67616d0000b273b7e976d6b35c1c4193c2783c',
            url: 'https://open.spotify.com/playlist/37i9dQZF1DX0mIEx62ZLjj',
          },
          {
            id: '3',
            nome: 'Korean Drama Soundtracks',
            dono: 'Drama Lovers',
            totalMusicas: 67,
            imagemUrl:
              'https://i.scdn.co/image/ab67616d0000b273f9320a06f7ab0e0d7fb6c521',
            url: 'https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP',
          },
        ];
        setPlaylists(mockPlaylists);
        setLoading(false);
      }, 800);
    }
  }, [open, doramaId]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-purple-700 p-6 overflow-hidden">
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Playlists do Dorama
                  </h2>
                </div>
                <p className="text-purple-100 text-lg font-medium">
                  {doramaTitulo}
                </p>
              </div>

              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl animate-pulse"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : playlists.length === 0 ? (
              // Empty State
              <div className="text-center py-16">
                <div className="inline-block mb-6">
                  <div className="bg-purple-100 p-8 rounded-full">
                    <Headphones className="w-16 h-16 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Nenhuma playlist associada ainda
                </h3>
                <p className="text-gray-500">
                  Este dorama ainda não possui playlists do Spotify 🎧
                </p>
              </div>
            ) : (
              // Lista de playlists
              <div className="space-y-4">
                {playlists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
                    style={{ 
                      animation: 'slide-in-from-bottom 0.5s ease-out',
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="flex gap-4">
                      {/* Capa da playlist */}
                      <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                          <img
                            src={playlist.imagemUrl}
                            alt={playlist.nome}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Informações */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate group-hover:text-purple-700 transition-colors">
                          {playlist.nome}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Users className="w-4 h-4 text-purple-400" />
                          <span>{playlist.dono}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Music className="w-4 h-4 text-purple-400" />
                          <span>{playlist.totalMusicas} músicas</span>
                        </div>
                      </div>

                      {/* Botão de abrir */}
                      <div className="flex items-center">
                        <a
                          href={playlist.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          <span className="hidden sm:inline">
                            Abrir no Spotify
                          </span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}