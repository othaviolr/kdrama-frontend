import { Heart, MapPin, Calendar, Star, Eye } from 'lucide-react';
import Link from 'next/link';

interface ActorsGridProps {
  actors: any[];
}

export default function ActorsGrid({ actors }: ActorsGridProps) {
  if (actors.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhum ator encontrado
        </h3>
        <p className="text-gray-500">
          Tente ajustar os filtros para encontrar o que você está procurando.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Todos os Atores</h2>
        <div className="text-sm text-gray-500">
          {actors.length}{' '}
          {actors.length === 1 ? 'ator encontrado' : 'atores encontrados'}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {actors.map((actor) => (
          <Link key={actor.id} href={`/actors/${actor.id}`} className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-100 hover:border-purple-200">
              {/* Foto do ator - menor */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={actor.foto}
                  alt={actor.nome}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay com ícone de favorito */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart className="w-3 h-3 text-purple-600" />
                  </button>
                </div>

                {/* Badge de popularidade */}
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{actor.popularidade}%</span>
                  </div>
                </div>
              </div>

              {/* Informações do ator - mais compactas */}
              <div className="p-3">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-purple-600 transition-colors line-clamp-1">
                    {actor.nome}
                  </h3>
                  {actor.nomeOriginal && (
                    <p className="text-purple-600 text-xs font-medium line-clamp-1">
                      {actor.nomeOriginal}
                    </p>
                  )}
                </div>

                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-400 flex-shrink-0" />
                    <span className="truncate">{actor.nacionalidade}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-400 flex-shrink-0" />
                    <span>{actor.idade} anos</span>
                  </div>
                </div>

                {/* Lista de doramas - mais compacta */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full line-clamp-1">
                      {actor.doramas[0]}
                    </span>
                    {actor.doramas.length > 1 && (
                      <span className="text-xs text-gray-400 px-1 py-0.5">
                        +{actor.doramas.length - 1}
                      </span>
                    )}
                  </div>
                </div>

                {/* Barra de popularidade - menor */}
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
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-300 rounded-xl transition-colors duration-300 pointer-events-none"></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
