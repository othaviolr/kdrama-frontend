'use client';

import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
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

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Temporadas ({seasons.length})
      </h2>
      <div className="space-y-4">
        {seasons.map((temporada) => (
          <div
            key={temporada.id}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSeason(temporada.id)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900">
                  {temporada.nome}
                </h3>
                <p className="text-sm text-gray-600">
                  {temporada.numeroEpisodios} episódios •{' '}
                  {new Date(temporada.dataEstreia).getFullYear()}
                </p>
              </div>
              {expandedSeasons.has(temporada.id) ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSeasons.has(temporada.id) && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="space-y-2">
                  {temporada.episodios.map((episodio) => (
                    <div
                      key={episodio.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-purple-600">
                          {episodio.numero}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {episodio.titulo}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{episodio.duracaoMinutos} min</span>
                        </div>
                        {episodio.sinopse && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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
