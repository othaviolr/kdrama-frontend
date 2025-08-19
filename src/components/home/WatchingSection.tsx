'use client';

import { useState } from 'react';
import { Play, Clock, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

interface WatchingData {
  id: string;
  title: string;
  episode: string;
  season: string;
  progress: number;
  poster: string;
  color: string;
}

export function WatchingSection() {
  const [currentShow] = useState<WatchingData>({
    id: '1',
    title: "Hometown's Embrace",
    episode: 'Episódio 12 de 16',
    season: 'Temporada 1',
    progress: 75,
    poster: '/api/placeholder/400/600',
    color: 'bg-purple-600',
  });

  const continueWatching = [
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
    <div className="mb-12">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Continue assistindo
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {currentShow.title}
            </h1>

            <p className="text-gray-600 mb-6">
              {currentShow.episode} • {currentShow.season}
            </p>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progresso</span>
                <span className="text-sm font-medium text-gray-900">
                  {currentShow.progress}%
                </span>
              </div>
              <ProgressBar progress={currentShow.progress} />
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Continuar Assistindo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex items-center gap-2"
              >
                <Info className="w-5 h-5" />
                Ver Detalhes
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-32 h-32 lg:w-48 lg:h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
              <div className="w-16 h-16 lg:w-24 lg:h-24 bg-purple-100 rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-lg lg:text-2xl">🎭</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Watching List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              📺
            </div>
            Continue Assistindo
          </h2>
          <Button variant="ghost" size="sm">
            Ver todos →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {continueWatching.map((show) => (
            <div key={show.id} className="group cursor-pointer">
              <div className="aspect-[3/4] mb-3 relative overflow-hidden rounded-xl bg-gray-100">
                <div
                  className={`w-full h-full ${show.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎭</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                    <Play className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <h3 className="font-medium text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                {show.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{show.episode}</p>
              <ProgressBar progress={show.progress} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
