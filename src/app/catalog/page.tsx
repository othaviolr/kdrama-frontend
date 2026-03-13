'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDorama } from 'src/context/DoramaContext';
import { useDebounce } from 'src/hooks/useDebounce';
import { DoramaCompleto } from '@/types/dorama';

import CatalogHeader from '@/components/catalog/CatalogHeader';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import DoramaGridItem from '@/components/catalog/DoramaGridItem';
import DoramaListItem from '@/components/catalog/DoramaListItem';
import CatalogLoading from '@/components/catalog/CatalogLoading';
import CatalogEmptyState from '@/components/catalog/CatalogEmptyState';

const ITEMS_PER_PAGE = 24;

export default function CatalogPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Debounce do texto de busca — filtragem só recalcula após 300 ms de pausa
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { doramas, loading } = useDorama();

  // Reseta paginação sempre que os filtros mudam
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [debouncedSearch, selectedGenre, selectedCountry]);

  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    doramas.forEach((d) => d.generos.forEach((g) => genres.add(g.nome)));
    return Array.from(genres).sort();
  }, [doramas]);

  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    doramas.forEach((d) => { if (d.paisOrigem) countries.add(d.paisOrigem); });
    return Array.from(countries).sort();
  }, [doramas]);

  // Filtragem usa o valor debounced — não re-executa a cada tecla
  const filteredDoramas = useMemo(() => {
    let result = doramas;

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (d) =>
          d.titulo.toLowerCase().includes(q) ||
          d.tituloOriginal.toLowerCase().includes(q) ||
          d.sinopse.toLowerCase().includes(q) ||
          d.generos.some((g) => g.nome.toLowerCase().includes(q)) ||
          d.atores.some((a) => a.nome.toLowerCase().includes(q))
      );
    }

    if (selectedGenre !== 'all') {
      result = result.filter((d) =>
        d.generos.some((g) => g.nome === selectedGenre)
      );
    }

    if (selectedCountry !== 'all') {
      result = result.filter((d) => d.paisOrigem === selectedCountry);
    }

    return result;
  }, [doramas, debouncedSearch, selectedGenre, selectedCountry]);

  // Slice paginado — evita renderizar todos os itens de uma vez
  const visibleDoramas = useMemo(
    () => filteredDoramas.slice(0, visibleCount),
    [filteredDoramas, visibleCount]
  );

  const hasMore = visibleCount < filteredDoramas.length;

  const getRating = (dorama: DoramaCompleto) => {
    const hash = dorama.doramaId.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash % 11) / 10 + 4.0;
  };

  const handleDoramaClick = (dorama: DoramaCompleto) => {
    router.push(`/dorama/${dorama.doramaId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CatalogHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <CatalogFilters
          availableGenres={availableGenres}
          availableCountries={availableCountries}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        {loading ? (
          <CatalogLoading />
        ) : (
          <>
            {/* Contador de resultados */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-medium text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-100/50">
                {filteredDoramas.length === 0
                  ? 'Nenhum dorama encontrado'
                  : `${filteredDoramas.length} dorama${filteredDoramas.length > 1 ? 's' : ''} encontrado${filteredDoramas.length > 1 ? 's' : ''}`}
              </div>

              {filteredDoramas.length > 0 && (
                <div className="text-xs text-gray-500 bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  Visualização: {viewMode === 'grid' ? 'Grade' : 'Lista'}
                </div>
              )}
            </div>

            {filteredDoramas.length === 0 ? (
              <CatalogEmptyState filteredCount={0} />
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'
                      : 'space-y-6'
                  }
                >
                  {visibleDoramas.map((dorama) => {
                    const rating = getRating(dorama);
                    return viewMode === 'grid' ? (
                      <DoramaGridItem
                        key={dorama.doramaId}
                        dorama={dorama}
                        rating={rating}
                        onClick={handleDoramaClick}
                      />
                    ) : (
                      <DoramaListItem
                        key={dorama.doramaId}
                        dorama={dorama}
                        rating={rating}
                        onClick={handleDoramaClick}
                      />
                    );
                  })}
                </div>

                {/* Botão carregar mais */}
                {hasMore && (
                  <div className="flex flex-col items-center gap-2 mt-10">
                    <button
                      onClick={() =>
                        setVisibleCount((c) => c + ITEMS_PER_PAGE)
                      }
                      className="px-8 py-3 bg-white border-2 border-purple-200 text-purple-700 font-semibold rounded-2xl hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg transition-all duration-300"
                    >
                      Carregar mais
                    </button>
                    <p className="text-xs text-gray-400">
                      Exibindo {visibleDoramas.length} de {filteredDoramas.length}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
