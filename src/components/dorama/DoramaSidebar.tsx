'use client';

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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Informações</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Plataforma:</span>
            <span className="font-medium">
              {getPlataformaName(dorama.plataforma)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium">
              {dorama.emExibicao ? 'Em exibição' : 'Finalizado'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Temporadas:</span>
            <span className="font-medium">{dorama.temporadas.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Episódios:</span>
            <span className="font-medium">{totalEpisodes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ano:</span>
            <span className="font-medium">{dorama.anoLancamento}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Suas ações</h3>
        <div className="space-y-3">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors">
            Adicionar à lista
          </button>
          <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-colors">
            Marcar como assistido
          </button>
          <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-colors">
            Avaliar
          </button>
        </div>
      </div>
    </div>
  );
}
