'use client';

import { Edit } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { useProgresso } from 'src/context/ProgressoContext';
import { useDorama } from 'src/context/DoramaContext';
import { StatusDoramaEnum } from 'src/types/progresso';

interface WatchingShow {
  id: string;
  title: string;
  episode: string;
  progress: number;
  imageUrl: string;
}

export function ContinueWatchingList() {
  const { progressos } = useProgresso();
  const { doramas } = useDorama();

  const continueWatching: WatchingShow[] = progressos
    .filter((p) => p.status === StatusDoramaEnum.Assistindo)
    .sort(
      (a, b) =>
        new Date(b.dataAtualizacao).getTime() -
        new Date(a.dataAtualizacao).getTime()
    )
    .map((p) => {
      const dorama = doramas.find((d) =>
        d.temporadas.some((t) => t.id === p.temporadaId)
      );

      if (!dorama) return null;

      const temporada = dorama.temporadas.find((t) => t.id === p.temporadaId);

      return {
        id: dorama.doramaId,
        title: dorama.titulo,
        episode: temporada
          ? `Ep ${p.episodiosAssistidos}/${temporada.numeroEpisodios}`
          : `Ep ${p.episodiosAssistidos}/?`,
        progress: temporada
          ? Math.floor(
              (p.episodiosAssistidos / temporada.numeroEpisodios) * 100
            )
          : 0,
        imageUrl: dorama.capaUrl,
      } as WatchingShow;
    })
    .filter(Boolean) as WatchingShow[];

  if (continueWatching.length === 0) return null;

  return (
    <div className="bg-gray-50 -mt-1 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Continue Assistindo
            </h2>
            <Button
              variant="ghost"
              className="text-purple-600 hover:bg-purple-50 font-semibold"
            >
              Ver todos →
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {continueWatching.map((show) => (
              <div key={show.id} className="group cursor-pointer">
                <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: `url(${show.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>

                  <div className="absolute top-3 right-3 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:bg-purple-600 group-hover:scale-105 transition-all duration-300">
                      <Edit className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/10 group-hover:to-white/5 transition-all duration-600"></div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors text-lg">
                  {show.title}
                </h3>
                <p className="text-gray-500 mb-3 text-sm">{show.episode}</p>
                <ProgressBar progress={show.progress} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
