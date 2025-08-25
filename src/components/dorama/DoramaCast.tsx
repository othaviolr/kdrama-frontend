'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import { Ator } from '@/types/dorama';

interface DoramaCastProps {
  actors: Ator[];
}

export default function DoramaCast({ actors }: DoramaCastProps) {
  const [showAllActors, setShowAllActors] = useState(false);

  if (actors.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Elenco ({actors.length})
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {showAllActors
          ? actors.map((ator) => (
              <div key={ator.id} className="text-center">
                <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
                  {ator.fotoUrl && ator.fotoUrl !== 'teste' ? (
                    <img
                      src={ator.fotoUrl}
                      alt={ator.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white opacity-80" />
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {ator.nome}
                </h3>
                <p className="text-xs text-gray-600">{ator.pais}</p>
              </div>
            ))
          : actors.slice(0, 8).map((ator) => (
              <div key={ator.id} className="text-center">
                <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
                  {ator.fotoUrl && ator.fotoUrl !== 'teste' ? (
                    <img
                      src={ator.fotoUrl}
                      alt={ator.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white opacity-80" />
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {ator.nome}
                </h3>
                <p className="text-xs text-gray-600">{ator.pais}</p>
              </div>
            ))}
      </div>
      {actors.length > 8 && (
        <button
          onClick={() => setShowAllActors(!showAllActors)}
          className="mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm"
        >
          {showAllActors ? 'Ver menos' : 'Ver todos os atores'}
        </button>
      )}
    </section>
  );
}
