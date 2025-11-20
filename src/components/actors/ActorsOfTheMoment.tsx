'use client';

import { Flame, Star, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ActorsOfTheMomentProps {
  actors: any[];
}

export default function ActorsOfTheMoment({ actors }: ActorsOfTheMomentProps) {
  if (actors.length === 0) return null;

  return (
    <section className="px-4 md:px-0">
      {/* Header modernizado - apenas roxo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-purple-50 px-5 py-2 rounded-xl border border-purple-100 mb-3">
          <div className="p-1.5 bg-purple-500 rounded-lg">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Atores do Momento
            </h2>
            <p className="text-gray-600 text-xs mt-0.5">
              Os talentos mais populares
            </p>
          </div>
        </div>
      </div>

      {/* Grid de atores - cards menores */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actors.map((actor, index) => (
          <Link
            key={actor.id}
            href={`/actors/${actor.id}`}
            className="group block"
          >
            <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-102 h-full flex flex-col border border-gray-200/60">
              
              {/* Badge de posição - apenas roxo */}
              <div className="absolute top-2 left-2 z-20">
                <div className="bg-purple-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-white" />
                  <span>#{index + 1}</span>
                </div>
              </div>

              {/* Container da imagem */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={actor.foto}
                  alt={actor.nome}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Overlay gradiente roxo */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Badge de idade */}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-1.5 py-1 border border-white/60 shadow-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-500" />
                    <span className="font-bold text-gray-900 text-xs">{actor.idade}</span>
                  </div>
                </div>
              </div>

              {/* Conteúdo compacto */}
              <div className="p-2 flex-1 flex flex-col">
                {/* Nome e nacionalidade */}
                <div className="text-center mb-1">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">
                    {actor.nome}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-1 text-gray-600 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-purple-400" />
                    <span className="text-xs">{actor.nacionalidade}</span>
                  </div>
                </div>

                {/* Nome original */}
                {actor.nomeOriginal && actor.nomeOriginal !== actor.nome && (
                  <div className="text-center mb-1">
                    <p className="text-purple-600 font-medium text-xs line-clamp-1">
                      {actor.nomeOriginal}
                    </p>
                  </div>
                )}

                {/* Dorama principal */}
                {actor.doramas && actor.doramas.length > 0 && (
                  <div className="mt-auto pt-1">
                    <div className="text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium border border-purple-100 line-clamp-1">
                          {actor.doramas[0]}
                        </span>
                        {actor.doramas.length > 1 && (
                          <span className="bg-gray-100 text-gray-600 px-1.5 py-1 rounded text-xs font-medium">
                            +{actor.doramas.length - 1}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Efeito de borda no hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-200 transition-colors duration-300 pointer-events-none" />
            </div>
          </Link>
        ))}
      </div>

      {/* Separador decorativo */}
      <div className="mt-8 flex justify-center">
        <div className="w-16 h-0.5 bg-purple-300 rounded-full"></div>
      </div>
    </section>
  );
}