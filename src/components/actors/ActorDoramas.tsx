// src/components/actors/ActorDoramas.tsx

import { Tv, Star, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ActorDoramasProps {
  doramas: any[];
}

export default function ActorDoramas({ doramas }: ActorDoramasProps) {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Tv className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Filmografia</h2>
          <p className="text-gray-600">Principais doramas e papéis</p>
        </div>
      </div>

      <div className="grid gap-4">
        {doramas.map((dorama, index) => (
          <Link
            key={dorama.id}
            href={`/doramas/${dorama.id}`}
            className="group"
          >
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all duration-300 transform hover:-translate-y-1">
              {/* Poster do dorama */}
              <div className="flex-shrink-0">
                <div className="w-16 h-24 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={dorama.poster}
                    alt={dorama.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Informações do dorama */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-lg">
                      {dorama.titulo}
                    </h3>
                    <p className="text-purple-600 font-medium">
                      {dorama.papel}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors opacity-0 group-hover:opacity-100" />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{dorama.ano}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{dorama.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Botão para ver mais */}
      <div className="mt-6 text-center">
        <button className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors">
          Ver filmografia completa
        </button>
      </div>
    </section>
  );
}
