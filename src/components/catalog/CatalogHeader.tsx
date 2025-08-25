'use client';

import { Search, Filter, Grid, List } from 'lucide-react';

interface CatalogHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export default function CatalogHeader({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
}: CatalogHeaderProps) {
  return (
    <div className="relative mb-8 bg-gradient-to-r from-white via-purple-50/30 to-white rounded-3xl p-8 shadow-xl border border-purple-100/50 overflow-hidden">
      {/* Efeitos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-300/20 to-transparent rounded-full blur-2xl" />

      <div className="relative">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Catálogo Completo
        </h1>
        <p className="text-gray-600 font-medium mb-6">
          Descubra doramas incríveis para assistir
        </p>

        {/* Barra de busca e controles */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar doramas, atores, gêneros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none font-medium placeholder:text-gray-500 shadow-sm"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-4 rounded-xl border-2 transition-all font-medium ${
                viewMode === 'grid'
                  ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/80 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-4 rounded-xl border-2 transition-all font-medium ${
                viewMode === 'list'
                  ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/80 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button className="p-4 rounded-xl border-2 bg-white/80 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-all font-medium">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
