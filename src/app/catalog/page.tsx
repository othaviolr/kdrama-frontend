'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDorama } from 'src/context/DoramaContext';
import { DoramaCompleto } from '@/types/dorama';

// Componentes separados
import CatalogHeader from '@/components/catalog/CatalogHeader';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import DoramaGridItem from '@/components/catalog/DoramaGridItem';
import DoramaListItem from '@/components/catalog/DoramaListItem';
import CatalogLoading from '@/components/catalog/CatalogLoading';
import CatalogEmptyState from '@/components/catalog/CatalogEmptyState';

export default function CatalogPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const { doramas, carregarDoramas, loading } = useDorama();

  useEffect(() => {
    carregarDoramas();
  }, []);

  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    doramas.forEach((dorama) => {
      dorama.generos.forEach((genero) => genres.add(genero.nome));
    });
    return Array.from(genres).sort();
  }, [doramas]);

  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    doramas.forEach((dorama) => {
      if (dorama.paisOrigem) countries.add(dorama.paisOrigem);
    });
    return Array.from(countries).sort();
  }, [doramas]);

  const filteredDoramas = useMemo(() => {
    let filtered = doramas;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dorama) =>
          dorama.titulo.toLowerCase().includes(query) ||
          dorama.tituloOriginal.toLowerCase().includes(query) ||
          dorama.sinopse.toLowerCase().includes(query) ||
          dorama.generos.some((genero) =>
            genero.nome.toLowerCase().includes(query)
          ) ||
          dorama.atores.some((ator) => ator.nome.toLowerCase().includes(query))
      );
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter((dorama) =>
        dorama.generos.some((genero) => genero.nome === selectedGenre)
      );
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(
        (dorama) => dorama.paisOrigem === selectedCountry
      );
    }

    return filtered;
  }, [doramas, searchQuery, selectedGenre, selectedCountry]);

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
              <CatalogEmptyState filteredCount={filteredDoramas.length} />
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredDoramas.map((dorama) => {
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
