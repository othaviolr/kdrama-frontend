'use client';

import { Star, Play, Calendar } from 'lucide-react';
import { DoramaCompleto } from '@/types/dorama';

interface DoramaGridItemProps {
  dorama: DoramaCompleto;
  rating: number;
  onClick: (dorama: DoramaCompleto) => void;
}

export default function DoramaGridItem({
  dorama,
  rating,
  onClick,
}: DoramaGridItemProps) {
  return (
    <div
      onClick={() => onClick(dorama)}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] border border-purple-100/50"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {dorama.capaUrl && dorama.capaUrl !== 'teste' ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-100 group-hover:scale-110 transition-transform duration-700"
            style={{
              backgroundImage: `url(${dorama.capaUrl})`,
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center">
            <Play className="w-16 h-16 text-white opacity-90" />
          </div>
        )}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status badge */}
        {dorama.emExibicao && (
          <div className="absolute top-3 right-3">
            <div className="relative">
              <span className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-pulse">
                Em exibição
              </span>
              <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-30 animate-ping" />
            </div>
          </div>
        )}

        {/* Rating badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-bold">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300 text-base leading-tight">
          {dorama.titulo}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{dorama.anoLancamento}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-700 font-bold">
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
              {dorama.paisOrigem}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
