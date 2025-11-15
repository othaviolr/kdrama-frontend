'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Heart,
  Share2,
  Bookmark,
  Users,
  Award,
} from 'lucide-react';

interface ActorHeaderProps {
  actor: any;
}

export default function ActorHeader({ actor }: ActorHeaderProps) {
  const router = useRouter();

  if (!actor) return null;

  const stats = [
    { icon: Calendar, label: `${actor.idade} anos` },
    { icon: MapPin, label: actor.nacionalidade },
    { icon: Users, label: actor.agency },
    { icon: Award, label: `${actor.premios?.length || 0} prêmios` },
  ].filter(stat => stat.label && stat.label !== 'undefined');

  return (
    <div className="relative min-h-[50vh] md:min-h-[60vh] overflow-hidden">
      {/* Background com foto do ator */}
      <div className="absolute inset-0">
        {actor.fotoBackground && (
          <img
            src={actor.fotoBackground}
            alt=""
            className="w-full h-full object-cover opacity-20 blur-[2px] md:blur-[3px] scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-900/75 to-indigo-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/30" />
      </div>

      {/* Efeitos visuais */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-8 left-8 w-56 h-56 md:top-16 md:left-16 md:w-80 md:h-80 bg-purple-900 rounded-full blur-2xl md:blur-3xl animate-pulse" />
        <div className="absolute bottom-8 right-8 w-72 h-72 md:bottom-16 md:right-16 md:w-96 md:h-96 bg-indigo-800 rounded-full blur-2xl md:blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Botão de voltar */}
      <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 z-30">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 md:px-4 md:py-2 hover:bg-black/40 border border-white/20 hover:border-white/30 text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Voltar</span>
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-20 flex items-center justify-center min-h-[50vh] md:min-h-[60vh] p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center space-y-4 md:space-y-6">
            {/* Foto do ator - 5% MENOR */}
            <div className="relative group">
              <div className="w-52 h-64 md:w-60 md:h-72 lg:w-68 lg:h-80 xl:w-76 xl:h-88 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl md:shadow-3xl transform transition-all duration-500 group-hover:scale-105 border-4 border-white/20">
                <img
                  src={actor.foto}
                  alt={actor.nome}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Badge de popularidade */}
              {actor.popularidade > 0 && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="bg-purple-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base font-bold flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    {actor.popularidade}%
                  </div>
                </div>
              )}
            </div>

            {/* Nome e Informações */}
            <div className="text-center space-y-3 md:space-y-4 w-full">
              {/* Nome */}
              <div className="space-y-1 md:space-y-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                  {actor.nome}
                </h1>
                {actor.nomeOriginal && actor.nomeOriginal !== actor.nome && (
                  <p className="text-sm md:text-base lg:text-lg text-purple-200/90 font-medium">
                    {actor.nomeOriginal}
                  </p>
                )}
              </div>

              {/* Informações básicas - 10% MENOR */}
              <div className="flex flex-wrap justify-center items-center gap-1.5 md:gap-2 text-white/90">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-1 md:gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                    <stat.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-300 flex-shrink-0" />
                    <span className="font-medium text-xs md:text-sm whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Botões de ação - RETÂNGULO COM BORDER RADIUS */}
              <div className="flex justify-center gap-2 md:gap-3 pt-1 md:pt-2">
                <button 
                  className="group bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/30 hover:border-white/40"
                  aria-label="Favoritar ator"
                >
                  <Heart className="w-4 h-4 md:w-4.5 md:h-4.5 group-hover:fill-red-400 group-hover:text-red-400 transition-all duration-300" />
                </button>

                <button 
                  className="group bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl transition-all duration-300 border border-white/30 hover:border-white/40 transform hover:scale-105 shadow-lg"
                  aria-label="Salvar ator"
                >
                  <Bookmark className="w-4 h-4 md:w-4.5 md:h-4.5 group-hover:fill-current transition-all duration-300" />
                </button>

                <button 
                  className="group bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl transition-all duration-300 border border-white/30 hover:border-white/40 transform hover:scale-105 shadow-lg"
                  aria-label="Compartilhar ator"
                >
                  <Share2 className="w-4 h-4 md:w-4.5 md:h-4.5 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />
    </div>
  );
}