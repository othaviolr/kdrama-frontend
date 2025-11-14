// app/actors/page.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useAtor } from '../../context/atorContext';
import ActorsHeader from '@/components/actors/ActorsHeader';
import ActorsGrid from '@/components/actors/ActorsGrid';
import ActorsOfTheMoment from '@/components/actors/ActorsOfTheMoment';
import ActorsFilters from '@/components/actors/ActorsFilters';

// Função helper para normalizar texto
const normalizeText = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export default function ActorsPage() {
  const { 
    atores, 
    loading, 
    carregarAtores, 
    carregarMaisAtores,
    carregarAtorPorNome,
    totalItens,
    temProximaPagina 
  } = useAtor();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const observerTarget = useRef(null);
  const [filtrosAtivos, setFiltrosAtivos] = useState(false);
  const [buscandoPorNome, setBuscandoPorNome] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Carrega a primeira página ao montar
  useEffect(() => {
    carregarAtores(1, 20, true, false);
  }, [carregarAtores]);

  // Debounce na busca por nome
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchTerm.length >= 3) {
      setBuscandoPorNome(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          await carregarAtorPorNome(searchTerm);
        } catch (error) {
          console.log('Ator não encontrado por nome, buscando localmente...');
        }
        setBuscandoPorNome(false);
      }, 500);
    } else {
      setBuscandoPorNome(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm, carregarAtorPorNome]);

useEffect(() => {
  const hasFilters = !!(searchTerm || selectedNationality); // Converte para boolean
  setFiltrosAtivos(hasFilters);
  
  if (hasFilters && searchTerm.length < 3) {
    carregarTodosAtores();
  }
}, [searchTerm, selectedNationality, carregarAtores]);

  const carregarTodosAtores = useCallback(async () => {
    await carregarAtores(1, 1000, true, false);
  }, [carregarAtores]);

  // Scroll infinito
  useEffect(() => {
    if (filtrosAtivos || !temProximaPagina || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('📜 Carregando mais atores...');
          carregarMaisAtores();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [temProximaPagina, loading, filtrosAtivos, carregarMaisAtores]);

  // Dados processados
  const featuredActors = atores
    .slice()
    .sort((a, b) => b.anoNascimento - a.anoNascimento)
    .slice(0, 4)
    .map((ator) => ({
      id: ator.id,
      nome: ator.nome,
      nomeOriginal: ator.nomeCompleto || ator.nome,
      foto: ator.fotoUrl,
      nacionalidade: ator.pais,
      idade: new Date().getFullYear() - ator.anoNascimento,
      doramas: [],
      popularidade: 0,
    }));

  const filteredActors = atores
    .filter((ator) => {
      if (!ator) return false;
      
      const normalizedSearchTerm = normalizeText(searchTerm);
      const normalizedNome = normalizeText(ator.nome);
      const normalizedNomeCompleto = normalizeText(ator.nomeCompleto || '');
      const normalizedPais = normalizeText(ator.pais);
      const normalizedSelectedNationality = normalizeText(selectedNationality);

      const matchesSearch = !searchTerm ||
        normalizedNome.includes(normalizedSearchTerm) ||
        normalizedNomeCompleto.includes(normalizedSearchTerm);
      
      const matchesNationality = !selectedNationality || 
        normalizedPais.includes(normalizedSelectedNationality) ||
        normalizedSelectedNationality.includes(normalizedPais);

      return matchesSearch && matchesNationality;
    })
    .map((ator) => ({
      id: ator.id,
      nome: ator.nome,
      nomeOriginal: ator.nomeCompleto || ator.nome,
      foto: ator.fotoUrl,
      nacionalidade: ator.pais,
      idade: new Date().getFullYear() - ator.anoNascimento,
      doramas: [],
      popularidade: 0,
    }));

  const isLoading = loading || buscandoPorNome;

  const limparFiltros = useCallback(() => {
    setSearchTerm('');
    setSelectedNationality('');
    carregarAtores(1, 20, true, false);
  }, [carregarAtores]);

  // Loading state
  if (isLoading && atores.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-rose-500 mx-auto mb-3 md:mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">
            {buscandoPorNome ? 'Buscando ator...' : 'Carregando atores...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ActorsHeader />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6 lg:py-8 space-y-6 md:space-y-8 lg:space-y-12">
        {/* Estatísticas */}
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-sm md:text-base">
            <span className="font-semibold text-purple-600">{filteredActors.length}</span> atores{' '}
            {filtrosAtivos ? 'encontrados' : 'carregados'} de{' '}
            <span className="font-semibold text-gray-900">{totalItens}</span> no total
          </p>
          {searchTerm.length > 0 && searchTerm.length < 3 && (
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Digite pelo menos 3 caracteres para buscar
            </p>
          )}
        </div>

        {/* Atores do Momento */}
        {!filtrosAtivos && featuredActors.length > 0 && (
          <ActorsOfTheMoment actors={featuredActors} />
        )}

        <div className="space-y-4 md:space-y-6">
          {/* Filtros */}
          <ActorsFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedNationality={selectedNationality}
            onNationalityChange={setSelectedNationality}
          />

          {/* Filtros ativos */}
          {filtrosAtivos && (
            <div className="flex items-center gap-2 flex-wrap bg-white rounded-lg p-3 md:p-4 shadow-sm">
              <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                Filtros ativos:
              </span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs md:text-sm">
                  Busca: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="hover:text-purple-900 ml-0.5 text-xs"
                    aria-label="Remover busca"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedNationality && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs md:text-sm">
                  País: {selectedNationality}
                  <button
                    onClick={() => setSelectedNationality('')}
                    className="hover:text-purple-900 ml-0.5 text-xs"
                    aria-label="Remover país"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={limparFiltros}
                className="text-xs md:text-sm text-gray-500 hover:text-gray-700 underline whitespace-nowrap"
              >
                Limpar todos
              </button>
            </div>
          )}

          {/* Loading da busca */}
          {buscandoPorNome && (
            <div className="text-center py-3 md:py-4">
              <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-rose-500 mx-auto"></div>
              <p className="text-xs md:text-sm text-gray-500 mt-2">Buscando atores...</p>
            </div>
          )}

          {/* Grid de atores ou estado vazio */}
          {filteredActors.length === 0 && !isLoading ? (
            <div className="text-center py-8 md:py-12 px-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <p className="text-gray-600 text-lg md:text-xl font-medium mb-2">
                Nenhum ator encontrado
              </p>
              <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
                Tente ajustar os filtros para encontrar o que você está procurando.
              </p>
            </div>
          ) : (
            <>
              <ActorsGrid actors={filteredActors} />
              
              {/* Scroll infinito */}
              {!filtrosAtivos && (
                <div ref={observerTarget} className="py-6 md:py-8">
                  {loading && (
                    <div className="flex justify-center items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-rose-500"></div>
                      <span className="text-sm text-gray-500">Carregando mais atores...</span>
                    </div>
                  )}
                  {!temProximaPagina && atores.length > 0 && (
                    <p className="text-center text-gray-500 text-sm md:text-base">
                      Todos os atores foram carregados 🎭
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}