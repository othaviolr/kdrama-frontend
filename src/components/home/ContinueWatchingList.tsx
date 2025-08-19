'use client';

import { Edit } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

interface WatchingShow {
  id: string;
  title: string;
  episode: string;
  progress: number;
  color: string;
}

export function ContinueWatchingList() {
  const continueWatching: WatchingShow[] = [
    {
      id: '1',
      title: 'Queen of Tears',
      episode: 'Ep 8/16',
      progress: 50,
      color: 'bg-pink-500',
    },
    {
      id: '2',
      title: 'Business Proposal',
      episode: 'Ep 4/12',
      progress: 33,
      color: 'bg-blue-500',
    },
    {
      id: '3',
      title: 'Romance is Bonus',
      episode: 'Ep 6/16',
      progress: 37,
      color: 'bg-green-500',
    },
    {
      id: '4',
      title: 'Strong Girl',
      episode: 'Ep 2/16',
      progress: 12,
      color: 'bg-orange-500',
    },
    {
      id: '5',
      title: 'My Demon',
      episode: 'Ep 1/16',
      progress: 6,
      color: 'bg-purple-500',
    },
  ];

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
                  {/* Background com zoom controlado */}
                  <div
                    className={`absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%] ${show.color} opacity-10 group-hover:opacity-25 transition-all duration-700 ease-out transform scale-100 group-hover:scale-110`}
                  />

                  {/* Overlay que escurece suavemente */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>

                  {/* Máscara de drama */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/40 transition-all duration-400 ease-out">
                      <span className="text-3xl transform group-hover:scale-105 transition-transform duration-300">
                        🎭
                      </span>
                    </div>
                  </div>

                  {/* Botão de editar */}
                  <div className="absolute top-3 right-3 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:bg-purple-600 group-hover:scale-105 transition-all duration-300">
                      <Edit className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Efeito de brilho sutil */}
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
