'use client';

import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface DoramaSynopsisProps {
  synopsis: string;
}

export default function DoramaSynopsis({ synopsis }: DoramaSynopsisProps) {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-white via-purple-50/20 to-white rounded-3xl p-8 shadow-xl border border-purple-100/50 overflow-hidden">
      {/* Efeitos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-300/20 to-transparent rounded-full blur-2xl" />

      {/* Header da seção */}
      <div className="relative flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-black text-gray-900">Sinopse</h2>
      </div>

      {/* Conteúdo da sinopse */}
      <div className="relative">
        <div
          className={`overflow-hidden transition-all duration-500 ${!showFullSynopsis ? 'max-h-32' : 'max-h-none'}`}
        >
          <p className="text-gray-700 leading-relaxed text-base font-medium">
            {synopsis}
          </p>
        </div>

        {/* Gradiente de fade para texto truncado */}
        {!showFullSynopsis && synopsis.length > 200 && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
        )}

        {/* Botão expandir/contrair */}
        {synopsis.length > 200 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowFullSynopsis(!showFullSynopsis)}
              className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]"
            >
              <span>{showFullSynopsis ? 'Ver menos' : 'Ler mais'}</span>
              {showFullSynopsis ? (
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
