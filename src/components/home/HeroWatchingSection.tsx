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
    <div className="relative min-h-[60vh] lg:min-h-[70vh] overflow-hidden">
      {/* Background com imagem de fundo desfocada - ESTILO DO HEADER */}
      <div className="absolute inset-0">
        {currentShow.poster && (
          <img
            src={currentShow.poster}
            alt=""
            className="w-full h-full object-cover opacity-18 blur-[3px] scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/60 to-indigo-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        {/* Gradiente inferior forte para evitar barra branca */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      {/* Efeitos visuais modernos */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
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
              <div className="w-48 h-64 lg:w-72 lg:h-96 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-3xl p-1 shadow-2xl overflow-hidden border border-white/20">
                <div
                  className="w-full h-full bg-cover bg-center rounded-2xl relative overflow-hidden transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${currentShow.poster})` }}
                >
                  {/* Overlay escuro para melhor contraste */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>

                  {/* Efeito de brilho sutil */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/5 group-hover:to-white/2 transition-all duration-600"></div>

                  {/* Status indicator */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
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
    </div>
  );
}
