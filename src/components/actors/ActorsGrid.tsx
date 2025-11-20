'use client';

import { MapPin, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';

interface ActorsGridProps {
  actors: any[];
}

export default function ActorsGrid({ actors }: ActorsGridProps) {
  if (actors.length === 0) {
    return (
      <div className="text-center py-16 md:py-24 px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Eye className="w-10 h-10 text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Nenhum ator encontrado
        </h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Tente ajustar os filtros para encontrar o que você está procurando.
        </p>
      </div>
    );
  }

  return (
    <section className="px-4 md:px-0">
      {/* Header minimalista */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Elenco de Atores
        </h2>
        <p className="text-gray-500 text-lg">
          {actors.length} {actors.length === 1 ? 'ator encontrado' : 'atores encontrados'}
        </p>
      </div>

      {/* Grid com cards modernos e compactos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {actors.map((actor) => (
          <Link 
            key={actor.id} 
            href={`/actors/${actor.id}`} 
            className="group block"
          >
            {/* Card compacto */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col border border-gray-200/60">
              
              {/* Container da imagem - maior proporção */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={actor.foto}
                  alt={actor.nome}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay gradiente suave */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Badge de idade compacta */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-2 py-1.5 border border-white/60 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    <span className="font-bold text-gray-900 text-sm">{actor.idade}</span>
                    <span className="text-gray-500 text-xs">anos</span>
                  </div>
                </div>
              </div>

              {/* Conteúdo do card - SUPER COMPACTO */}
              <div className="p-3 flex-1 flex flex-col">
                {/* Nome e nacionalidade */}
                <div className="text-center mb-2">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">
                    {actor.nome}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    <span className="text-xs font-medium">{actor.nacionalidade}</span>
                  </div>
                </div>

                {/* Nome original (se diferente) */}
                {actor.nomeOriginal && actor.nomeOriginal !== actor.nome && (
                  <div className="text-center mb-2">
                    <p className="text-purple-600 font-medium text-xs line-clamp-1">
                      {actor.nomeOriginal}
                    </p>
                  </div>
                )}

                {/* Doramas em tags compactas */}
                {actor.doramas && actor.doramas.length > 0 && (
                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {actor.doramas.slice(0, 1).map((dorama: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium border border-purple-100 line-clamp-1"
                        >
                          {dorama}
                        </span>
                      ))}
                      {actor.doramas.length > 1 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                          +{actor.doramas.length - 1}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}