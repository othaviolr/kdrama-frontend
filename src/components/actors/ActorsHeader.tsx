// components/actors/ActorsHeader.tsx
'use client';

import { Star, Users, Award, Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ActorsHeader() {
  const router = useRouter();

  const stats = [
    { icon: Star, label: '500+ Atores', color: 'text-yellow-400' },
    { icon: Award, label: '50+ Premiações', color: 'text-purple-300' },
    { icon: Heart, label: '1M+ Fãs', color: 'text-purple-300' },
    { icon: Users, label: '20+ Países', color: 'text-purple-300' },
  ];

  const categories = [
    'Atores Coreanos', 'Estrelas em Ascensão', 'Veteranos', 'K-Drama',
    'C-Drama', 'J-Drama', 'Romance', 'Ação'
  ];

  return (
    <div className="relative min-h-[40vh] md:min-h-[50vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1489749798305-4fea3ae436d8?w=1600&h=900&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-20 blur-[2px] md:blur-[3px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/75 via-purple-900/70 to-indigo-900/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/30" />
      </div>

      {/* Botão de voltar */}
      <div className="absolute top-4 left-4 right-4 z-30 md:p-6">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 bg-black/20 backdrop-blur-md rounded-full px-3 py-2 md:px-4 md:py-2 hover:bg-black/30 border border-white/10 hover:border-white/20 text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Voltar</span>
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-20 flex items-center justify-center min-h-[40vh] md:min-h-[50vh] p-4 md:p-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center text-center">
            <div className="space-y-4 md:space-y-6 max-w-4xl">
              {/* Título */}
              <div className="space-y-2 md:space-y-3">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  Conheça os Atores
                </h1>
                <p className="text-base md:text-xl text-purple-200/90 font-medium px-4">
                  Os talentos por trás dos seus doramas favoritos
                </p>
              </div>

              {/* Estatísticas */}
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-white/90">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2 border border-white/20 text-xs md:text-sm"
                  >
                    <stat.icon className={`w-3 h-3 md:w-4 md:h-4 ${stat.color}`} />
                    <span className="font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Categorias */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl mx-auto">
                {categories.map((categoria, index) => (
                  <span
                    key={categoria}
                    className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  >
                    {categoria}
                  </span>
                ))}
              </div>

              {/* Descrição */}
              <div className="text-sm md:text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed px-4">
                Descubra biografias, filmografias e curiosidades dos atores mais
                amados. Explore trajetórias inspiradoras e conecte-se com os
                talentos que dão vida aos seus personagens favoritos.
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