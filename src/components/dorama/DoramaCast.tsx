'use client';

import { useState } from 'react';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Ator } from '@/types/dorama';

interface DoramaCastProps {
  actors: Ator[];
}

export default function DoramaCast({ actors }: DoramaCastProps) {
  const [showAllActors, setShowAllActors] = useState(false);

  if (actors.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-br from-white via-purple-50/30 to-white rounded-3xl p-8 shadow-xl border border-purple-100/50 overflow-hidden">
      {/* Efeitos de fundo modernos */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-300/20 to-transparent rounded-full blur-2xl" />

      {/* Header da seção */}
      <div className="relative flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">
            Elenco Principal
          </h2>
          <p className="text-purple-600 font-medium">
            {actors.length} {actors.length === 1 ? 'ator' : 'atores'}
          </p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Grid do elenco */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
        {(showAllActors ? actors : actors.slice(0, 8)).map((ator, index) => (
          <div
            key={ator.id}
            className="group text-center transform transition-all duration-500 hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards',
            }}
          >
            <div className="relative">
              {/* Avatar com efeitos modernos */}
              <div className="w-28 h-28 mx-auto mb-3 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 relative">
                {ator.fotoUrl && ator.fotoUrl !== 'teste' ? (
                  <img
                    src={ator.fotoUrl}
                    alt={ator.nome}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-white opacity-90" />
                  </div>
                )}

                {/* Overlay com gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
            </div>

            {/* Informações do ator */}
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-purple-700 transition-colors duration-300">
                {ator.nome}
              </h3>
              <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full inline-block">
                {ator.pais}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botão moderno para ver mais/menos */}
      {actors.length > 8 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllActors(!showAllActors)}
            className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 border border-purple-500/50"
          >
            <span>
              {showAllActors
                ? 'Ver menos atores'
                : `Ver todos (${actors.length})`}
            </span>
            {showAllActors ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            )}
          </button>
        </div>
      )}

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
    </section>
  );
}
