'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, Play, Calendar } from 'lucide-react';
import { useDorama } from '../../context/DoramaContext';
import { DoramaCompleto } from '@/types/dorama';

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const { doramas, carregarDoramas, loading } = useDorama();

  // Carregar doramas quando o componente monta
  useEffect(() => {
    carregarDoramas();
  }, []);

  // Extrair gêneros únicos dos doramas
  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    doramas.forEach((dorama) => {
      dorama.generos.forEach((genero) => genres.add(genero.nome));
    });
    return Array.from(genres).sort();
  }, [doramas]);

  // Extrair países únicos dos doramas
  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    doramas.forEach((dorama) => {
      if (dorama.paisOrigem) countries.add(dorama.paisOrigem);
    });
    return Array.from(countries).sort();
  }, [doramas]);

  // Filtrar doramas baseado nos filtros ativos
  const filteredDoramas = useMemo(() => {
    let filtered = doramas;

    // Filtro de busca
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

    // Filtro de gênero
    if (selectedGenre !== 'all') {
      filtered = filtered.filter((dorama) =>
        dorama.generos.some((genero) => genero.nome === selectedGenre)
      );
    }

    // Filtro de país
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(
        (dorama) => dorama.paisOrigem === selectedCountry
      );
    }

    return filtered;
  }, [doramas, searchQuery, selectedGenre, selectedCountry]);

  // Função para gerar rating simulado
  const getRating = (dorama: DoramaCompleto) => {
    const hash = dorama.doramaId.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash % 11) / 10 + 4.0;
  };

  const handleDoramaClick = (dorama: DoramaCompleto) => {
    console.log('Navegando para:', dorama.titulo);
    // router.push(`/dorama/${dorama.doramaId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Catálogo</h1>

          {/* Barra de busca e controles de visualização */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar doramas, atores, gêneros..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl border transition-all ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl border transition-all ${
                  viewMode === 'list'
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
              <button className="p-3 rounded-xl border bg-white border-gray-200 text-gray-600 hover:border-purple-300 transition-all">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Filtros rápidos - Gêneros */}
          {availableGenres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700 mr-2 py-1">
                Gênero:
              </span>
              <button
                onClick={() => setSelectedGenre('all')}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  selectedGenre === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todos
              </button>
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    selectedGenre === genre
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}

          {/* Filtros rápidos - Países */}
          {availableCountries.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm font-medium text-gray-700 mr-2 py-1">
                País:
              </span>
              <button
                onClick={() => setSelectedCountry('all')}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  selectedCountry === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todos
              </button>
              {availableCountries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    selectedCountry === country
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-purple-600 font-medium">
                Carregando catálogo...
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Resultados */}
            <div className="text-sm text-gray-600 mb-4">
              {filteredDoramas.length === 0
                ? 'Nenhum dorama encontrado'
                : `${filteredDoramas.length} dorama${filteredDoramas.length > 1 ? 's' : ''} encontrado${filteredDoramas.length > 1 ? 's' : ''}`}
            </div>

            {/* Grid/Lista de doramas */}
            {filteredDoramas.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar os filtros ou usar outros termos de busca.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'
                    : 'space-y-4'
                }
              >
                {filteredDoramas.map((dorama) => {
                  const rating = getRating(dorama);

                  if (viewMode === 'grid') {
                    return (
                      <div
                        key={dorama.doramaId}
                        onClick={() => handleDoramaClick(dorama)}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
                      >
                        <div className="aspect-[3/4] relative overflow-hidden">
                          {dorama.capaUrl && dorama.capaUrl !== 'teste' ? (
                            <div
                              className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-100 group-hover:scale-110 transition-transform duration-500"
                              style={{
                                backgroundImage: `url(${dorama.capaUrl})`,
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                              <Play className="w-12 h-12 text-white opacity-80" />
                            </div>
                          )}

                          {/* Status badge */}
                          {dorama.emExibicao && (
                            <div className="absolute top-2 right-2">
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Em exibição
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {dorama.titulo}
                          </h3>

                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {dorama.anoLancamento}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-700 font-medium">
                              {rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={dorama.doramaId}
                        onClick={() => handleDoramaClick(dorama)}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer p-4"
                      >
                        <div className="flex gap-4">
                          <div className="w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                            {dorama.capaUrl && dorama.capaUrl !== 'teste' ? (
                              <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${dorama.capaUrl})`,
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white opacity-80" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                              {dorama.titulo}
                            </h3>

                            <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                              <span>{dorama.anoLancamento}</span>
                              <span>•</span>
                              <span>
                                {dorama.temporadas.length} temporada
                                {dorama.temporadas.length > 1 ? 's' : ''}
                              </span>
                              <span>•</span>
                              <span>{dorama.paisOrigem}</span>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-2">
                              {dorama.generos.slice(0, 3).map((genero) => (
                                <span
                                  key={genero.id}
                                  className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-md font-medium"
                                >
                                  {genero.nome}
                                </span>
                              ))}
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {dorama.sinopse}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-700 font-medium">
                                  {rating.toFixed(1)}
                                </span>
                              </div>

                              {dorama.emExibicao && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                  Em exibição
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
