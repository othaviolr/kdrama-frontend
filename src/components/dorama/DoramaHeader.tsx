'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Plus,
  Heart,
  Share2,
  Tv,
  Users,
} from 'lucide-react';
import { DoramaCompleto } from '@/types/dorama';

interface DoramaHeaderProps {
  dorama: DoramaCompleto;
  rating: number;
  totalEpisodes: number;
}

export default function DoramaHeader({
  dorama,
  rating,
  totalEpisodes,
}: DoramaHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative h-96 bg-gradient-to-r from-purple-900 to-purple-700 overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-48 h-72 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl">
              {dorama.capaUrl && dorama.capaUrl !== 'teste' ? (
                <img
                  src={dorama.capaUrl}
                  alt={dorama.titulo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <Users className="w-16 h-16 text-white opacity-80" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">
                {dorama.titulo}
              </h1>
              {dorama.tituloOriginal !== dorama.titulo && (
                <p className="text-purple-200 text-lg mb-4">
                  {dorama.tituloOriginal}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" />
                  <span>{dorama.anoLancamento}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{dorama.paisOrigem}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tv className="w-5 h-5" />
                  <span>{totalEpisodes} episódios</span>
                </div>
                {dorama.emExibicao && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Em exibição
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {dorama.generos.map((genero) => (
                  <span
                    key={genero.id}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genero.nome}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Adicionar à lista
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
