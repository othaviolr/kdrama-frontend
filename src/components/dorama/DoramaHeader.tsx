'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Plus,
  Heart,
  Share2,
  Tv,
  Users,
  Play,
  Bookmark,
} from 'lucide-react';
import { DoramaCompleto } from '@/types/dorama';

interface DoramaHeaderProps {
  dorama: DoramaCompleto;
  rating: number;
  totalEpisodes: number;
}

export default function DoramaHeader({
  dorama,
  rating,
  totalEpisodes,
}: DoramaHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative min-h-[100vh] overflow-hidden">
      {/* Background com imagem de fundo desfocada */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-purple-800/90 to-indigo-900/95" />
        {dorama.capaUrl && dorama.capaUrl !== 'teste' && (
          <img
            src={dorama.capaUrl}
            alt=""
            className="w-full h-full object-cover opacity-20 blur-sm scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Efeitos visuais modernos */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Botão de voltar moderno */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 hover:bg-black/30 border border-white/10 hover:border-white/20"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Voltar</span>
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-20 flex items-end min-h-[100vh] p-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-end">
            {/* Capa do dorama com efeitos */}
            <div className="relative group flex-shrink-0">
              <div className="w-64 h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl">
                {dorama.capaUrl && dorama.capaUrl !== 'teste' ? (
                  <img
                    src={dorama.capaUrl}
                    alt={dorama.titulo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center">
                    <Users className="w-20 h-20 text-white opacity-90" />
                  </div>
                )}
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </div>

            {/* Informações do dorama */}
            <div className="flex-1 space-y-6">
              {/* Título */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  {dorama.titulo}
                </h1>
                {dorama.tituloOriginal !== dorama.titulo && (
                  <p className="text-xl text-purple-200/90 font-medium">
                    {dorama.tituloOriginal}
                  </p>
                )}
              </div>

              {/* Estatísticas */}
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-500/30">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-white">
                    {rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">{dorama.anoLancamento}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">{dorama.paisOrigem}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tv className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">{totalEpisodes} episódios</span>
                </div>
                {dorama.emExibicao && (
                  <div className="relative">
                    <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      Em exibição
                    </span>
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-30 animate-ping" />
                  </div>
                )}
              </div>

              {/* Gêneros */}
              <div className="flex flex-wrap gap-3">
                {dorama.generos.map((genero, index) => (
                  <span
                    key={genero.id}
                    className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                  >
                    {genero.nome}
                  </span>
                ))}
              </div>

              {/* Botões de ação modernos */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 border border-purple-500/50">
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  Assistir agora
                </button>

                <button className="group bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 border border-indigo-500/50">
                  <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                  Minha Lista
                </button>

                <button className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 transform hover:scale-105 shadow-lg">
                  <Heart className="w-6 h-6 group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-300" />
                </button>

                <button className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 transform hover:scale-105 shadow-lg">
                  <Bookmark className="w-6 h-6 group-hover:fill-current transition-all duration-300" />
                </button>

                <button className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30 transform hover:scale-105 shadow-lg">
                  <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente inferior para transição suave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />

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
      `}</style>
    </div>
  );
}
