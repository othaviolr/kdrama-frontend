'use client';

import { useState } from 'react';
import {
  Clock,
  ChevronDown,
  ChevronUp,
  Play,
  Calendar,
  Hash,
} from 'lucide-react';
import { Temporada } from '@/types/dorama';

interface DoramaSeasonsProps {
  seasons: Temporada[];
}

export default function DoramaSeasons({ seasons }: DoramaSeasonsProps) {
  const [expandedSeasons, setExpandedSeasons] = useState<Set<string>>(
    new Set()
  );

  const toggleSeason = (seasonId: string) => {
    const newExpanded = new Set(expandedSeasons);
    if (newExpanded.has(seasonId)) {
      newExpanded.delete(seasonId);
    } else {
      newExpanded.add(seasonId);
    }
    setExpandedSeasons(newExpanded);
  };

  const totalEpisodes = seasons.reduce(
    (acc, season) => acc + season.numeroEpisodios,
    0
  );

  return (
    <section className="relative bg-gradient-to-br from-white via-purple-50/20 to-white rounded-3xl p-8 shadow-xl border border-purple-100/50 overflow-hidden">
      {/* Efeitos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-300/20 to-transparent rounded-full blur-3xl" />

      {/* Header da seção */}
      <div className="relative flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Temporadas & Episódios
          </h2>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 text-purple-600">
              <Hash className="w-4 h-4" />
              <span>
                {seasons.length} temporada{seasons.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Play className="w-4 h-4" />
              <span>{totalEpisodes} episódios</span>
            </div>
          </div>
        </div>
        <Calendar className="w-6 h-6 text-purple-600" />
      </div>

      {/* Lista de temporadas */}
      <div className="space-y-4 relative">
        {seasons.map((temporada, index) => (
          <div
            key={temporada.id}
            className="group bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards',
            }}
          >
            <button
              onClick={() => toggleSeason(temporada.id)}
              className="w-full p-6 text-left hover:bg-purple-50/50 transition-all duration-300 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-600 font-semibold text-sm">
                    T{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors duration-300">
                    {temporada.nome}
                  </h3>
                  <div className="flex items-center gap-3 text-sm font-medium mt-1">
                    <div className="flex items-center gap-1 text-purple-600">
                      <Play className="w-3 h-3" />
                      <span>{temporada.numeroEpisodios} episódios</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(temporada.dataEstreia).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedSeasons.has(temporada.id) ? (
                  <ChevronUp className="w-5 h-5 text-purple-600 group-hover:-translate-y-1 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:translate-y-1 group-hover:text-purple-600 transition-all duration-300" />
                )}
              </div>
            </button>

            {expandedSeasons.has(temporada.id) && (
              <div className="border-t border-purple-100/50 bg-gradient-to-r from-purple-50/30 to-white/50 backdrop-blur-sm">
                <div className="p-6 space-y-3">
                  {temporada.episodios.map((episodio, episodeIndex) => (
                    <div
                      key={episodio.id}
                      className="group flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/50 hover:border-purple-200/50 transform hover:scale-[1.02]"
                      style={{
                        animationDelay: `${episodeIndex * 50}ms`,
                        animation: 'slideInRight 0.4s ease-out forwards',
                      }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                        <span className="text-sm font-bold text-purple-700">
                          {episodio.numero}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 mb-1">
                          {episodio.titulo}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 text-sm text-purple-600 font-medium bg-purple-100/50 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            <span>{episodio.duracaoMinutos} min</span>
                          </div>
                        </div>
                        {episodio.sinopse && (
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                            {episodio.sinopse}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
