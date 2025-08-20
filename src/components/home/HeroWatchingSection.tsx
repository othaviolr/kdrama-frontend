'use client';

import { useState } from 'react';
import { Edit, Clock, Info } from 'lucide-react';
import { Button } from '../ui/Button';

interface WatchingData {
  id: string;
  title: string;
  episode: string;
  season: string;
  progress: number;
  poster: string;
  color: string;
}

export function HeroWatchingSection() {
  const [currentShow] = useState<WatchingData>({
    id: '1',
    title: 'Bloodhounds',
    episode: 'Episódio 6 de 8',
    season: 'Temporada 2',
    progress: 80,
    poster:
      'https://i.pinimg.com/736x/73/a6/4c/73a64cc413461d6f00b8e7f0df150895.jpg',
    color: 'bg-purple-600',
  });

  return (
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

            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {currentShow.title}
            </h1>

            <p className="text-lg text-purple-100 mb-8 opacity-90">
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
                variant="secondary"
                size="lg"
                className="bg-white text-purple-700 hover:bg-white hover:text-purple-800 hover:shadow-2xl hover:-translate-y-1 border-0 shadow-xl transition-all duration-300 rounded-2xl"
              >
                <Edit className="w-4 h-4 mr-2" />
                Atualizar Status
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-2 border-white/40 hover:bg-white/15 hover:border-white hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm transition-all duration-300 rounded-2xl"
              >
                <Info className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          </div>

          {/* Poster Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="w-48 h-64 lg:w-72 lg:h-96 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-3xl p-1 shadow-2xl overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center rounded-2xl relative overflow-hidden transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${currentShow.poster})` }}
                >
                  {/* Overlay escuro para melhor contraste */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>

                  {/* Efeito de brilho sutil */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/5 group-hover:to-white/2 transition-all duration-600"></div>

                  {/* Status indicator */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
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
  );
}
