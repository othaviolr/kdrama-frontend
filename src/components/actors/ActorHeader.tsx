// src/components/actors/ActorHeader.tsx

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

  return (
    <div className="relative min-h-[50vh] overflow-hidden">
      {/* Background com foto do ator desfocada */}
      <div className="absolute inset-0">
        {actor.fotoBackground && (
          <img
            src={actor.fotoBackground}
            alt=""
            className="w-full h-full object-cover opacity-20 blur-[3px] scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/75 via-purple-900/70 to-indigo-900/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-black/20" />
      </div>

      {/* Efeitos visuais modernos - mais escuros */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-900 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-800 rounded-full blur-3xl animate-pulse delay-1000" />
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
      <div className="relative z-20 flex items-center justify-center min-h-[50vh] p-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Foto do ator */}
            <div className="relative group flex-shrink-0">
              <div className="w-48 h-64 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                <img
                  src={actor.foto}
                  alt={actor.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Badge de popularidade */}
              <div className="absolute top-4 right-4">
                <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {actor.popularidade}%
                </div>
              </div>
            </div>

            {/* Informações do ator */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              {/* Nome */}
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  {actor.nome}
                </h1>
                {actor.nomeOriginal && actor.nomeOriginal !== actor.nome && (
                  <p className="text-lg text-purple-200/90 font-medium">
                    {actor.nomeOriginal}
                  </p>
                )}
              </div>

              {/* Informações básicas */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-300" />
                  <span className="font-medium text-sm">
                    {actor.idade} anos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-300" />
                  <span className="font-medium text-sm">
                    {actor.nacionalidade}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-300" />
                  <span className="font-medium text-sm">{actor.agency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-300" />
                  <span className="font-medium text-sm">
                    {actor.premios?.length || 0} prêmios
                  </span>
                </div>
              </div>

              {/* Biografia resumida */}
              <div className="text-purple-100/90 text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {actor.biografia?.substring(0, 180)}...
              </div>

              {/* Botões de ação */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <button className="group bg-white/95 hover:bg-white text-purple-700 hover:text-purple-800 px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-white/25 transform hover:scale-105 border border-white/50 text-sm">
                  <Heart className="w-4 h-4 group-hover:fill-red-400 group-hover:text-red-400 transition-all duration-300" />
                </button>

                <button className="group bg-white/15 backdrop-blur-md hover:bg-white/25 text-white p-2 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/40 transform hover:scale-105 shadow-md">
                  <Bookmark className="w-4 h-4 group-hover:fill-current transition-all duration-300" />
                </button>

                <button className="group bg-white/15 backdrop-blur-md hover:bg-white/25 text-white p-2 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/40 transform hover:scale-105 shadow-md">
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente inferior */}
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
