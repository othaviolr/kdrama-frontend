// src/components/reviews/EmptyState.tsx
import { Search, Star, Filter } from 'lucide-react';

interface EmptyStateProps {
  filtros: {
    dorama: string;
    genero: string;
    nota: string;
    ordenacao: string;
  };
}

export function EmptyState({ filtros }: EmptyStateProps) {
  const temFiltrosAtivos =
    filtros.dorama || filtros.genero !== 'Todos' || filtros.nota;

  if (temFiltrosAtivos) {
    return (
      <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-purple-600" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhuma avaliação encontrada
        </h3>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Não encontramos nenhuma avaliação que corresponda aos filtros
          aplicados. Tente ajustar os critérios de busca.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {filtros.dorama && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              <Filter className="w-3 h-3 mr-1" />
              Dorama: {filtros.dorama}
            </span>
          )}

          {filtros.genero !== 'Todos' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              <Filter className="w-3 h-3 mr-1" />
              Gênero: {filtros.genero}
            </span>
          )}

          {filtros.nota && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              <Star className="w-3 h-3 mr-1" />
              {filtros.nota} estrela{filtros.nota !== '1' ? 's' : ''}
            </span>
          )}
        </div>

        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
          Limpar filtros
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Star className="w-8 h-8 text-purple-600" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Ainda não há avaliações
      </h3>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Seja o primeiro a avaliar um dorama! Compartilhe sua opinião e ajude
        outros fãs a descobrirem novas obras incríveis.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
          Avaliar dorama
        </button>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Explorar catálogo
        </button>
      </div>
    </div>
  );
}
