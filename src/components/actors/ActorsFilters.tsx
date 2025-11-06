import { Search, Filter, Globe } from 'lucide-react';

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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Filter className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Busca por nome */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Buscar Ator
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Digite o nome do ator..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filtro por nacionalidade */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nacionalidade
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedNationality}
              onChange={(e) =>
                onNationalityChange(
                  e.target.value === 'Todos' ? '' : e.target.value
                )
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white appearance-none cursor-pointer"
            >
              {nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
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
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ações
          </label>
          <button
            onClick={() => {
              onSearchChange('');
              onNationalityChange('');
            }}
            className="w-full py-3 px-4 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors duration-200 font-medium border border-purple-200"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Filtros ativos */}
      {(searchTerm || selectedNationality) && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Filter className="w-4 h-4" />
            <span>Filtros ativos:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                <span>Busca: "{searchTerm}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:text-purple-900 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
            {selectedNationality && (
              <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                <span>{selectedNationality}</span>
                <button
                  onClick={() => onNationalityChange('')}
                  className="hover:text-purple-900 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}