// components/actors/ActorsGrid.tsx
'use client';

import { Heart, MapPin, Calendar, Star, Eye } from 'lucide-react';
import Link from 'next/link';

interface ActorsGridProps {
  actors: any[];
}

export default function ActorsGrid({ actors }: ActorsGridProps) {
  if (actors.length === 0) {
    return (
      <div className="text-center py-8 md:py-16 px-4">
        <div className="mb-4">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Eye className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </div>
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
          Nenhum ator encontrado
        </h3>
        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
          Tente ajustar os filtros para encontrar o que você está procurando.
        </p>
      </div>
    );
  }

  return (
    <section className="px-4 md:px-0">
      {/* Header com contagem */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Todos os Atores
        </h2>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {actors.length}{' '}
          {actors.length === 1 ? 'ator encontrado' : 'atores encontrados'}
        </div>
      </div>

      {/* Grid responsivo */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
        {actors.map((actor) => (
          <Link 
            key={actor.id} 
            href={`/actors/${actor.id}`} 
            className="group block"
          >
            <div className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-100 hover:border-purple-200 h-full flex flex-col">
              
              {/* Imagem do ator */}
              <div className="aspect-[3/4] overflow-hidden relative flex-shrink-0">
                <img
                  src={actor.foto}
                  alt={actor.nome}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Botão de favorito */}
                <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="p-1 md:p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-purple-600" />
                  </button>
                </div>

                {/* Badge de popularidade */}
                <div className="absolute bottom-1.5 left-1.5 md:bottom-2 md:left-2">
                  <div className="flex items-center gap-0.5 md:gap-1 bg-black/70 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs backdrop-blur-sm">
                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{actor.popularidade}%</span>
                  </div>
                </div>
              </div>

              {/* Informações do ator */}
              <div className="p-2 md:p-3 flex-1 flex flex-col">
                {/* Nome */}
                <div className="mb-1.5 md:mb-2 flex-1">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-purple-600 transition-colors line-clamp-1 leading-tight">
                    {actor.nome}
                  </h3>
                  {actor.nomeOriginal && actor.nomeOriginal !== actor.nome && (
                    <p className="text-purple-600 text-xs md:text-sm font-medium line-clamp-1 mt-0.5">
                      {actor.nomeOriginal}
                    </p>
                  )}
                </div>

                {/* Informações básicas */}
                <div className="space-y-1 text-xs text-gray-600 mb-2 md:mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-400 flex-shrink-0" />
                    <span className="truncate text-xs">{actor.nacionalidade}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-400 flex-shrink-0" />
                    <span className="text-xs">{actor.idade} anos</span>
                  </div>
                </div>

                {/* Doramas */}
                {actor.doramas && actor.doramas.length > 0 && (
                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded-full line-clamp-1 flex-1 min-w-0">
                        <span className="truncate block">{actor.doramas[0]}</span>
                      </span>
                      {actor.doramas.length > 1 && (
                        <span className="text-xs text-gray-400 px-1 py-0.5 flex-shrink-0">
                          +{actor.doramas.length - 1}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Barra de popularidade */}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-purple-600 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${actor.popularidade}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Indicador de hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-300 rounded-lg md:rounded-xl transition-colors duration-300 pointer-events-none" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}