'use client';

import { Search } from 'lucide-react';

interface CatalogEmptyStateProps {
  filteredCount: number;
}

export default function CatalogEmptyState({
  filteredCount,
}: CatalogEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Search className="w-12 h-12 text-purple-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {filteredCount === 0
          ? 'Nenhum resultado encontrado'
          : 'Catálogo em construção'}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
        {filteredCount === 0
          ? 'Tente ajustar os filtros ou usar outros termos de busca para encontrar o dorama perfeito.'
          : 'Estamos trabalhando para trazer mais doramas incríveis para você.'}
      </p>
    </div>
  );
}
