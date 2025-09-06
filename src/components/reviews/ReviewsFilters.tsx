// src/components/reviews/ReviewsFilters.tsx
import { Search, Filter, Star, X, Sparkles } from 'lucide-react';

interface ReviewsFiltersProps {
  filtros: {
    dorama: string;
    genero: string;
    nota: string;
    ordenacao: string;
  };
  generos: string[];
  onFiltroChange: (filtros: any) => void;
}

export function ReviewsFilters({
  filtros,
  generos,
  onFiltroChange,
}: ReviewsFiltersProps) {
  const handleInputChange = (campo: string, valor: string) => {
    const novosFiltros = { ...filtros, [campo]: valor };
    onFiltroChange(novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosLimpos = {
      dorama: '',
      genero: 'Todos',
      nota: '',
      ordenacao: 'recentes',
    };
    onFiltroChange(filtrosLimpos);
  };

  const removerFiltro = (campo: string) => {
    const novosFiltros = { ...filtros };
    if (campo === 'dorama') novosFiltros.dorama = '';
    if (campo === 'genero') novosFiltros.genero = 'Todos';
    if (campo === 'nota') novosFiltros.nota = '';
    onFiltroChange(novosFiltros);
  };

  const temFiltrosAtivos =
    filtros.dorama || filtros.genero !== 'Todos' || filtros.nota;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm backdrop-blur-sm">
      {/* Header modernizado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Filter className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            <p className="text-xs text-gray-500">Refine sua busca</p>
          </div>
        </div>

        {temFiltrosAtivos && (
          <button
            onClick={limparFiltros}
            className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-200 hover:border-purple-600 rounded-xl transition-all duration-300"
          >
            <Sparkles className="w-3 h-3 group-hover:scale-110 transition-transform" />
            Limpar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Buscar por dorama */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Buscar dorama
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-purple-500 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Ex: Bloodhounds..."
              value={filtros.dorama}
              onChange={(e) => handleInputChange('dorama', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium placeholder:text-gray-400"
            />
            {filtros.dorama && (
              <button
                onClick={() => removerFiltro('dorama')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filtrar por gênero */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Gênero
          </label>
          <div className="relative">
            <select
              value={filtros.genero}
              onChange={(e) => handleInputChange('genero', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium appearance-none cursor-pointer"
            >
              {generos.map((genero) => (
                <option key={genero} value={genero}>
                  {genero}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
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

        {/* Filtrar por nota */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Avaliação
          </label>
          <div className="relative">
            <select
              value={filtros.nota}
              onChange={(e) => handleInputChange('nota', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium appearance-none cursor-pointer"
            >
              <option value="">⭐ Todas as notas</option>
              <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
              <option value="4">⭐⭐⭐⭐ Muito bom</option>
              <option value="3">⭐⭐⭐ Bom</option>
              <option value="2">⭐⭐ Regular</option>
              <option value="1">⭐ Ruim</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Star className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Ordenação */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Ordenar por
          </label>
          <div className="relative">
            <select
              value={filtros.ordenacao}
              onChange={(e) => handleInputChange('ordenacao', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium appearance-none cursor-pointer"
            >
              <option value="recentes">🕒 Mais recentes</option>
              <option value="antigas">📅 Mais antigas</option>
              <option value="maior_nota">⭐ Maior nota</option>
              <option value="menor_nota">💭 Menor nota</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
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
      </div>

      {/* Filtros ativos modernizados */}
      {temFiltrosAtivos && (
        <div className="mt-6 pt-5 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Filtros ativos:
              </span>
            </div>

            {filtros.dorama && (
              <div className="group flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-xs font-medium text-purple-800 hover:bg-purple-100 transition-colors duration-200">
                <span>Dorama: {filtros.dorama}</span>
                <button
                  onClick={() => removerFiltro('dorama')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filtros.genero !== 'Todos' && (
              <div className="group flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-xs font-medium text-purple-800 hover:bg-purple-100 transition-colors duration-200">
                <span>Gênero: {filtros.genero}</span>
                <button
                  onClick={() => removerFiltro('genero')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filtros.nota && (
              <div className="group flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-xs font-medium text-purple-800 hover:bg-purple-100 transition-colors duration-200">
                <span>
                  {filtros.nota} estrela{filtros.nota !== '1' ? 's' : ''}
                </span>
                <button
                  onClick={() => removerFiltro('nota')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
