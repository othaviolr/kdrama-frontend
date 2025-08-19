'use client';

import { Button } from '@/components/ui/Button';
import { GradientCard } from '@/components/ui/GradientCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tv2 } from 'lucide-react';

interface ContinueWatchingSectionProps {
  currentDrama?: {
    id: string;
    title: string;
    currentEpisode: number;
    totalEpisodes: number;
    currentSeason: number;
    progress: number;
  };
  otherDramas: Array<{
    id: string;
    title: string;
    currentEpisode: number;
    totalEpisodes: number;
    progress: number;
    gradient: 'pink' | 'blue' | 'green' | 'orange' | 'purple';
  }>;
}

export const ContinueWatchingSection = ({
  currentDrama,
  otherDramas,
}: ContinueWatchingSectionProps) => {
  if (!currentDrama && otherDramas.length === 0) {
    return null;
  }

  return (
    <>
      {/* Hero Section com Drama Principal */}
      {currentDrama && (
        <section className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-purple-200 mb-2 text-sm font-medium">
                  Continue assistindo
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {currentDrama.title}
                </h1>
                <p className="text-xl text-purple-100 mb-2">
                  Episódio {currentDrama.currentEpisode} de{' '}
                  {currentDrama.totalEpisodes} • Temporada{' '}
                  {currentDrama.currentSeason}
                </p>

                <div className="mb-8 max-w-md">
                  <ProgressBar
                    progress={currentDrama.progress}
                    color="blue"
                    size="lg"
                    showPercentage={true}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    size="md"
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                  >
                    ✏️ Atualizar Status
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    className="text-white hover:bg-white/20"
                  >
                    ℹ️ Ver Detalhes
                  </Button>
                </div>
              </div>

              {/* Ícone de máscaras de teatro */}
              <div className="hidden lg:block">
                <div className="text-8xl opacity-30">🎭</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção Continue Assistindo - Cards pequenos */}
      {otherDramas.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Tv2 className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Continue Assistindo
                </h2>
              </div>

              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Ver todos →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {otherDramas.map((drama) => (
                <GradientCard
                  key={drama.id}
                  gradient={drama.gradient}
                  className="relative h-32 flex flex-col justify-between p-4"
                >
                  {/* Ícone de máscaras no centro */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="text-4xl">🎭</span>
                  </div>

                  {/* Conteúdo */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-sm mb-1 line-clamp-2">
                      {drama.title}
                    </h3>
                    <p className="text-xs opacity-90">
                      Ep {drama.currentEpisode}/{drama.totalEpisodes}
                    </p>
                  </div>

                  {/* Barra de progresso */}
                  <div className="relative z-10">
                    <div className="w-full bg-white/20 rounded-full h-1">
                      <div
                        className="bg-white h-1 rounded-full transition-all duration-300"
                        style={{ width: `${drama.progress}%` }}
                      />
                    </div>
                  </div>
                </GradientCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
