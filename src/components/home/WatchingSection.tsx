'use client';

import { useState } from 'react';
import { Edit, Clock, Info, Play } from 'lucide-react';
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
    <div className="mb-0">
      {/* Hero Section - Tela Inteira com Design Moderno */}
      <div className="min-h-[60vh] lg:min-h-[70vh] bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Geometric shapes */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Clock className="w-4 h-4 text-purple-200" />
                <span className="text-purple-100 text-sm font-medium">
                  Continue assistindo
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {currentShow.title}
              </h1>

              <p className="text-xl text-purple-100 mb-8 opacity-90">
                {currentShow.episode} • {currentShow.season}
              </p>

              <div className="max-w-md mx-auto lg:mx-0 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-purple-200 text-sm font-medium">
                    Progresso
                  </span>
                  <span className="text-white text-lg font-bold">
                    {currentShow.progress}%
                  </span>
                </div>
                {/* Progress bar moderna */}
                <div className="w-full bg-white/20 rounded-full overflow-hidden h-2 backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-white to-purple-100 rounded-full transition-all duration-500 ease-out shadow-lg"
                    style={{
                      width: `${Math.min(100, Math.max(0, currentShow.progress))}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="flex items-center gap-3 bg-white text-purple-700 hover:bg-purple-50 border-0 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  <Edit className="w-5 h-5" />
                  Atualizar Status
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="flex items-center gap-3 text-white border-2 border-white/30 hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all hover:scale-105"
                >
                  <Info className="w-5 h-5" />
                  Ver Detalhes
                </Button>
              </div>
            </div>

            {/* Poster Section */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="w-48 h-64 lg:w-72 lg:h-96 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-3xl p-1 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400/20 to-indigo-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 animate-pulse"></div>

                    {/* Drama masks */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="text-6xl lg:text-8xl transform group-hover:scale-110 transition-transform duration-300">
                        🎭
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl -z-10 group-hover:scale-110 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full h-20 text-gray-50">
            <path
              fill="currentColor"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </div>

      {/* Continue Watching List - Integrada ao design */}
      <div className="bg-gray-50 -mt-1 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📺</span>
                </div>
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
                  <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div
                      className={`w-full h-full ${show.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-3xl">🎭</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:bg-purple-600 transition-colors">
                        <Edit className="w-5 h-5" />
                      </div>
                    </div>
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
    </div>
  );
}
