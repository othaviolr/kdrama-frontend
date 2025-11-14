// components/actors/ActorsOfTheMoment.tsx
'use client';

import { Flame, Star, Eye } from 'lucide-react';
import Link from 'next/link';

interface ActorsOfTheMomentProps {
  actors: any[];
}

export default function ActorsOfTheMoment({ actors }: ActorsOfTheMomentProps) {
  if (actors.length === 0) return null;

  return (
    <section className="px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg flex-shrink-0">
          <Flame className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
            Atores do Momento
          </h2>
          <p className="text-gray-600 text-xs md:text-sm mt-0.5">
            Os mais populares e em alta no mundo dos doramas
          </p>
        </div>
      </div>

      {/* Grid de atores - mais compacto */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {actors.map((actor, index) => (
          <Link
            key={actor.id}
            href={`/actors/${actor.id}`}
            className="group block"
          >
            <div className="relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-0.5 border border-gray-100 hover:border-purple-200 h-full flex flex-col">
              
              {/* Badge de posição */}
              <div className="absolute top-1.5 left-1.5 z-10">
                <div className="bg-purple-600 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5" />
                  <span>#{index + 1}</span>
                </div>
              </div>

              {/* Foto do ator - menor */}
              <div className="aspect-[3/4] overflow-hidden relative flex-shrink-0">
                <img
                  src={actor.foto}
                  alt={actor.nome}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay de popularidade */}
                <div className="absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-0.5 bg-black/70 text-white px-1.5 py-0.5 rounded-full text-xs backdrop-blur-sm">
                    <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    <span>{actor.popularidade}%</span>
                  </div>
                </div>
              </div>

              {/* Informações compactas */}
              <div className="p-2 md:p-3 flex-1 flex flex-col">
                {/* Nome */}
                <div className="mb-1.5 flex-1">
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-purple-600 transition-colors line-clamp-1 leading-tight">
                    {actor.nome}
                  </h3>
                  {actor.nomeOriginal && actor.nomeOriginal !== actor.nome && (
                    <p className="text-purple-600 text-xs font-medium line-clamp-1 mt-0.5">
                      {actor.nomeOriginal}
                    </p>
                  )}
                </div>

                {/* Informações básicas */}
                <div className="space-y-1 text-xs text-gray-600 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="truncate flex-1" title={actor.nacionalidade}>
                      {actor.nacionalidade}
                    </span>
                    <span className="flex-shrink-0 ml-1">{actor.idade} anos</span>
                  </div>
                </div>

                {/* Dorama principal */}
                {actor.doramas && actor.doramas.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 line-clamp-1" title={actor.doramas[0]}>
                      {actor.doramas[0]}
                      {actor.doramas.length > 1 && ` +${actor.doramas.length - 1}`}
                    </p>
                  </div>
                )}

                {/* Barra de popularidade compacta */}
                <div className="mt-auto">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-purple-600 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${actor.popularidade}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Efeito de hover na borda */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-lg md:rounded-xl transition-colors duration-300 pointer-events-none" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}