'use client';

import { Star, Play } from 'lucide-react';
import { DoramaCompleto } from '@/types/dorama';

interface DoramaListItemProps {
  dorama: DoramaCompleto;
  rating: number;
  onClick: (dorama: DoramaCompleto) => void;
}

export default function DoramaListItem({
  dorama,
  rating,
  onClick,
}: DoramaListItemProps) {
  return (
    <div
      onClick={() => onClick(dorama)}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer p-6 border border-purple-100/50 hover:border-purple-200/50 transform hover:scale-[1.01]"
    >
      <div className="flex gap-6">
        <div className="w-32 h-44 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
          {dorama.capaUrl && dorama.capaUrl !== 'teste' ? (
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url(${dorama.capaUrl})`,
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center">
              <Play className="w-10 h-10 text-white opacity-90" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-4">
          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
              {dorama.titulo}
            </h3>

            <div className="flex items-center gap-4 mb-3 text-sm font-medium text-gray-600">
              <span>{dorama.anoLancamento}</span>
              <span>•</span>
              <span>
                {dorama.temporadas.length} temporada
                {dorama.temporadas.length > 1 ? 's' : ''}
              </span>
              <span>•</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {dorama.paisOrigem}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {dorama.generos.slice(0, 4).map((genero) => (
                <span
                  key={genero.id}
                  className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold"
                >
                  {genero.nome}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {dorama.sinopse}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-lg text-gray-900 font-bold">
                {rating.toFixed(1)}
              </span>
            </div>

            {dorama.emExibicao && (
              <div className="relative">
                <span className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-full font-bold animate-pulse">
                  Em exibição
                </span>
                <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-30 animate-ping" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
