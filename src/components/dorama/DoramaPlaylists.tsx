'use client';

import { useState, useEffect } from 'react';
import { X, Music, Users, ExternalLink, Headphones, Play } from 'lucide-react';

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
        const mockPlaylists: Playlist[] = [
          {
            id: '1',
            nome: 'Post Human: Nex Gen',
            dono: 'Bring Me The Horizon',
            totalMusicas: 16,
            imagemUrl:
              'https://i.scdn.co/image/ab67616d00001e02df51a3d66223e5b01813e0c4',
            url: 'https://open.spotify.com/album/1k7OXnGQPV4zF3seDwRroD?si=1o79mqdaRaWUNJf594j6-w',
          },
          {
            id: '2',
            nome: 'Sempiternal',
            dono: 'Bring Me The Horizon',
            totalMusicas: 13,
            imagemUrl:
              'https://upload.wikimedia.org/wikipedia/en/b/bb/BMTH_Sempiternal.png',
            url: 'https://open.spotify.com/album/6IYPmM3xsOPL2XPSvf1ZAz?si=t_tWn76bQ_6UYztr32QRFg',
          },
          {
            id: '3',
            nome: 'Suicide Season',
            dono: 'Bring Me The Horizon',
            totalMusicas: 10,
            imagemUrl:
              'https://i.scdn.co/image/ab67616d0000b273b0f86b5d3075a7f93a4c0d50',
            url: 'https://open.spotify.com/album/1prhMiPHHEEzK5ueEx2vWB?si=ypRUwswORMq7eq6iSJrfmQ',
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

      {/* Modal - Ocupa tela toda no mobile */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <div
          className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full h-[95vh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl lg:max-w-4xl overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 duration-300 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header com drag indicator no mobile */}
          <div className="bg-white p-4 sm:p-6 border-b border-gray-200 sticky top-0 flex-shrink-0">
            {/* Drag indicator para mobile */}
            <div className="sm:hidden flex justify-center mb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0 mr-3">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg sm:rounded-xl">
                    <Music className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                    Playlists do Dorama
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse flex-shrink-0" />
                  <p className="text-gray-700 text-base sm:text-lg lg:text-xl font-medium truncate">
                    {doramaTitulo}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 mt-1"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Conteúdo - Scrollável */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/50">
            {loading ? (
              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl animate-pulse border border-gray-200"
                  >
                    <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-lg sm:rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                      <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 sm:h-4 lg:h-5 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 sm:h-4 lg:h-5 bg-gray-200 rounded w-1/3" />
                    </div>
                    <div className="w-16 h-8 sm:w-20 sm:h-10 lg:w-24 lg:h-12 bg-gray-200 rounded-lg flex-shrink-0" />
                  </div>
                ))}
              </div>
            ) : playlists.length === 0 ? (
              // Empty State
              <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
                <div className="inline-block mb-4 sm:mb-6 lg:mb-8 relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                    <Headphones className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
                  </div>
                  <div className="absolute -inset-2 border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                  Nenhuma playlist encontrada
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-sm sm:max-w-md mx-auto leading-relaxed">
                  Este dorama ainda não possui playlists associadas no Spotify
                </p>
              </div>
            ) : (
              // Lista de playlists - Layout responsivo melhorado
              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex gap-3 sm:gap-4 lg:gap-5 items-start">
                      {/* Capa da playlist */}
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22 xl:w-24 xl:h-24 rounded-lg sm:rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                          <img
                            src={playlist.imagemUrl}
                            alt={playlist.nome}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded-full border-[1.5px] sm:border-2 border-white flex items-center justify-center">
                          <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white fill-current" />
                        </div>
                      </div>

                      {/* Informações - Layout responsivo */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                          {playlist.nome}
                        </h3>
                        
                        {/* Dono - sempre visível */}
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base text-gray-700 mb-2 sm:mb-3">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                          <span className="truncate">{playlist.dono}</span>
                        </div>

                        {/* Informações secundárias */}
                        <div className="flex flex-col xs:flex-row xs:items-center gap-1.5 sm:gap-3 text-xs sm:text-sm lg:text-base text-gray-600">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Music className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                            <span>{playlist.totalMusicas} músicas</span>
                          </div>
                          
                          {/* Badge Spotify - MAIS REDONDINHO */}
                          <span className="inline-flex items-center px-2.5 py-1 bg-purple-100 text-purple-700 text-xs sm:text-sm rounded-full font-medium border border-purple-200 w-fit mt-1 xs:mt-0 transition-all duration-300 hover:bg-purple-200 hover:border-purple-300">
                            Spotify
                          </span>
                        </div>
                      </div>

                      {/* Botão de abrir - PEQUENO, REDONDINHO E COM BORDA */}
                      <div className="flex items-center flex-shrink-0">
                        <a
                          href={playlist.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative bg-white hover:bg-purple-50 text-purple-600 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md border border-purple-200 hover:border-purple-300 active:scale-95 text-xs sm:text-sm"
                        >
                          {/* Efeito sutil de brilho */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/0 via-purple-100/30 to-purple-50/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 rounded-full" />
                          
                          {/* Conteúdo do botão */}
                          <div className="relative z-10 flex items-center gap-1.5">
                            <span>Ouvir</span>
                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </div>
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

      <style jsx>{`
        @keyframes slide-in-from-bottom-full {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Melhorias de scroll para mobile */
        @media (max-width: 640px) {
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </>
  );
}