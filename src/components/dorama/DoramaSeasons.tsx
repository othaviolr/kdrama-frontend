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
    <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-gray-200">
      {/* Header da seção - Responsivo */}
      <div className="flex items-start sm:items-center justify-between mb-6 sm:mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold sm:font-black text-gray-900 mb-2">
            Temporadas & Episódios
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-medium">
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
        <div className="p-2 bg-purple-100 rounded-xl sm:p-0 sm:bg-transparent">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
        </div>
      </div>

      {/* Lista de temporadas */}
      <div className="space-y-3 sm:space-y-4">
        {seasons.map((temporada, index) => (
          <div
            key={temporada.id}
            className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:bg-gray-100/50 transition-colors"
          >
            <button
              onClick={() => toggleSeason(temporada.id)}
              className="w-full p-4 sm:p-6 text-left transition-colors flex items-center justify-between touch-manipulation"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-600 font-semibold text-sm">
                    T{index + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                    {temporada.nome}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm font-medium mt-1">
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
              <div className="p-2 -m-2 touch-manipulation">
                {expandedSeasons.has(temporada.id) ? (
                  <ChevronUp className="w-5 h-5 text-purple-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {expandedSeasons.has(temporada.id) && (
              <div className="border-t border-gray-200 bg-white">
                <div className="p-4 sm:p-6 space-y-3">
                  {temporada.episodios.map((episodio, episodeIndex) => (
                    <div
                      key={episodio.id}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100/50 transition-colors"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-purple-700">
                          {episodio.numero}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-2 leading-tight">
                          {episodio.titulo}
                        </h4>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded-lg">
                            <Clock className="w-3 h-3" />
                            <span>{episodio.duracaoMinutos} min</span>
                          </div>
                        </div>
                        {episodio.sinopse && (
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
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
    </section>
  );
}
