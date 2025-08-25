'use client';

import {
  Tv,
  Calendar,
  Play,
  Hash,
  Plus,
  Check,
  Star,
  Info,
  Zap,
  User,
} from 'lucide-react';
import { DoramaCompleto } from '@/types/dorama';

interface DoramaSidebarProps {
  dorama: DoramaCompleto;
  totalEpisodes: number;
}

export default function DoramaSidebar({
  dorama,
  totalEpisodes,
}: DoramaSidebarProps) {
  const getPlataformaName = (plataforma: number) => {
    const plataformas = {
      0: 'Netflix',
      1: 'Amazon Prime',
      2: 'Viki',
      3: 'Disney+',
      4: 'Apple TV+',
    };
    return (
      plataformas[plataforma as keyof typeof plataformas] || 'Desconhecida'
    );
  };

  const getPlatformIcon = (plataforma: number) => {
    const icons = {
      0: '📺', // Netflix
      1: '🎬', // Amazon Prime
      2: '💜', // Viki
      3: '🏰', // Disney+
      4: '🍎', // Apple TV+
    };
    return icons[plataforma as keyof typeof icons] || '📱';
  };

  return (
    <div className="space-y-6">
      {/* Card de Informações */}
      <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-white rounded-3xl p-6 shadow-xl border border-purple-100/50 overflow-hidden">
        {/* Efeito decorativo */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-2xl" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-5 h-5 text-purple-600" />
          <h3 className="font-black text-gray-900 text-lg">Detalhes</h3>
        </div>

        {/* Lista de informações */}
        <div className="space-y-4">
          <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-purple-50/50 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-medium">Plataforma</span>
            </div>
            <span className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              {getPlataformaName(dorama.plataforma)}
            </span>
          </div>

          <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-purple-50/50 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600 font-medium">Status</span>
            </div>
            <div className="flex items-center gap-2">
              {dorama.emExibicao ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-bold text-green-600">Em exibição</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="font-bold text-gray-600">Finalizado</span>
                </>
              )}
            </div>
          </div>

          <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-purple-50/50 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <Hash className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600 font-medium">Temporadas</span>
            </div>
            <span className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              {dorama.temporadas.length}
            </span>
          </div>

          <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-purple-50/50 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <Play className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600 font-medium">Episódios</span>
            </div>
            <span className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              {totalEpisodes}
            </span>
          </div>

          <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-purple-50/50 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600 font-medium">Lançamento</span>
            </div>
            <span className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              {dorama.anoLancamento}
            </span>
          </div>
        </div>
      </div>

      {/* Card de Ações */}
      <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-white rounded-3xl p-6 shadow-xl border border-purple-100/50 overflow-hidden">
        {/* Efeito decorativo */}
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-300/20 to-transparent rounded-full blur-2xl" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-purple-600" />
          <h3 className="font-black text-gray-900 text-lg">Minhas Ações</h3>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          <button className="group w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-purple-500/20 transform hover:scale-[1.01]">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            Adicionar à Lista
          </button>

          <button className="group w-full bg-white border border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-sm transform hover:scale-[1.01]">
            <Check className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Marcar como Assistido
          </button>

          <button className="group w-full bg-white border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-sm transform hover:scale-[1.01]">
            <Star className="w-4 h-4 group-hover:fill-current group-hover:text-yellow-500 transition-all duration-300" />
            Avaliar Dorama
          </button>
        </div>

        {/* Divider sutil */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-purple-200/50 to-transparent"></div>

        {/* Dica */}
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            💡 Crie sua lista personalizada para nunca mais esquecer!
          </p>
        </div>
      </div>
    </div>
  );
}
