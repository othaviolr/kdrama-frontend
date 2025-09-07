import { Flame, Star, Eye } from 'lucide-react';
import Link from 'next/link';

interface ActorsOfTheMomentProps {
  actors: any[];
}

export default function ActorsOfTheMoment({ actors }: ActorsOfTheMomentProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Flame className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Atores do Momento
          </h2>
          <p className="text-gray-600">
            Os mais populares e em alta no mundo dos doramas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actors.map((actor, index) => (
          <Link
            key={actor.id}
            href={`/actors/${actor.id}`}
            className="group relative"
          >
            <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              {/* Badge de posição */}
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />#{index + 1}
                </div>
              </div>

              {/* Foto do ator - menor */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={actor.foto}
                  alt={actor.nome}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay mais sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1 text-white text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{actor.popularidade}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações do ator - mais compactas */}
              <div className="p-3">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-purple-600 transition-colors line-clamp-1">
                    {actor.nome}
                  </h3>
                  {actor.nomeOriginal && (
                    <p className="text-purple-600 text-xs font-medium line-clamp-1">
                      {actor.nomeOriginal}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="truncate">{actor.nacionalidade}</span>
                    <span>{actor.idade} anos</span>
                  </div>

                  <div className="text-xs text-gray-500">
                    <p className="line-clamp-1">
                      {actor.doramas.slice(0, 1).join(', ')}
                      {actor.doramas.length > 1 &&
                        ` +${actor.doramas.length - 1}`}
                    </p>
                  </div>

                  {/* Barra de popularidade mais compacta */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${actor.popularidade}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Efeito de hover na borda */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-xl transition-colors duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
