// components/actors/ActorsFilters.tsx
'use client';

import { Search, Filter, Globe, X } from 'lucide-react';

interface ActorsFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedNationality: string;
  onNationalityChange: (nationality: string) => void;
}

export default function ActorsFilters({
  searchTerm,
  onSearchChange,
  selectedNationality,
  onNationalityChange,
}: ActorsFiltersProps) {
  const nationalities = [
    'Todos',
    'Coreia do Sul',
    'Japão',
    'China',
    'Tailândia',
    'Taiwan',
    'Filipinas',
  ];

  const limparFiltros = () => {
    onSearchChange('');
    onNationalityChange('');
  };

  const temFiltrosAtivos = searchTerm || selectedNationality;

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-4 md:p-6 border border-gray-100 md:border-purple-100">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg flex-shrink-0">
          <Filter className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Filtros</h3>
      </div>

      {/* Grid de filtros - empilhado no mobile */}
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-4 lg:gap-6">
        {/* Busca por nome */}
        <div className="space-y-1.5 md:space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Buscar Ator
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <input
              type="text"
              placeholder="Digite o nome do ator..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm md:text-base"
            />
          </div>
        </div>

        {/* Filtro por nacionalidade */}
        <div className="space-y-1.5 md:space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nacionalidade
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <select
              value={selectedNationality}
              onChange={(e) =>
                onNationalityChange(
                  e.target.value === 'Todos' ? '' : e.target.value
                )
              }
              className="w-full pl-9 md:pl-10 pr-8 md:pr-10 py-2.5 md:py-3 border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white appearance-none cursor-pointer text-sm md:text-base"
            >
              {nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
            <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-3 h-3 md:w-4 md:h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Botão de limpar filtros */}
        <div className="space-y-1.5 md:space-y-2">
          <label className="block text-sm font-medium text-gray-700 md:invisible md:h-0">
            Ações
          </label>
          <button
            onClick={limparFiltros}
            disabled={!temFiltrosAtivos}
            className="w-full py-2.5 md:py-3 px-4 bg-purple-50 text-purple-600 rounded-lg md:rounded-xl hover:bg-purple-100 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium border border-purple-200 disabled:border-gray-200 text-sm md:text-base"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Filtros ativos */}
      {temFiltrosAtivos && (
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Filter className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Filtros ativos:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {searchTerm && (
              <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs md:text-sm">
                <span className="max-w-[120px] md:max-w-none truncate">
                  Busca: "{searchTerm}"
                </span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:text-purple-900 transition-colors flex-shrink-0 ml-0.5"
                  aria-label="Remover busca"
                >
                  <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </button>
              </div>
            )}
            {selectedNationality && (
              <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs md:text-sm">
                <span className="max-w-[100px] md:max-w-none truncate">
                  {selectedNationality}
                </span>
                <button
                  onClick={() => onNationalityChange('')}
                  className="hover:text-purple-900 transition-colors flex-shrink-0 ml-0.5"
                  aria-label="Remover nacionalidade"
                >
                  <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}