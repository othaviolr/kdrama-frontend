'use client';

import { useEffect, useState, useRef } from 'react';
import { useAtor } from '../../context/atorContext';
import ActorsHeader from '@/components/actors/ActorsHeader';
import ActorsGrid from '@/components/actors/ActorsGrid';
import ActorsOfTheMoment from '@/components/actors/ActorsOfTheMoment';
import ActorsFilters from '@/components/actors/ActorsFilters';

// Função helper para normalizar texto (remove acentos e converte para minúsculas)
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
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const observerTarget = useRef(null);
  const [filtrosAtivos, setFiltrosAtivos] = useState(false);
  const [buscandoPorNome, setBuscandoPorNome] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Carrega a primeira página ao montar
    carregarAtores(1, 20, true, false);
  }, []);

  // Debounce na busca por nome
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchTerm.length >= 3) {
      // Se digitou 3+ caracteres, busca por nome na API
      setBuscandoPorNome(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          await carregarAtorPorNome(searchTerm);
        } catch (error) {
          console.log('Ator não encontrado por nome, buscando localmente...');
        }
        setBuscandoPorNome(false);
      }, 500); // Aguarda 500ms após parar de digitar
    } else {
      setBuscandoPorNome(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  // Quando houver filtros, carrega TODOS os atores
  useEffect(() => {
    if (searchTerm || selectedNationality) {
      setFiltrosAtivos(true);
      // Só carrega todos se não estiver buscando por nome específico
      if (searchTerm.length < 3) {
        carregarTodosAtores();
      }
    } else {
      setFiltrosAtivos(false);
    }
  }, [searchTerm, selectedNationality]);

  const carregarTodosAtores = async () => {
    // Carrega com um número grande para pegar todos
    await carregarAtores(1, 1000, true, false);
  };

  // Intersection Observer para scroll infinito (só funciona quando não há filtros)
  useEffect(() => {
    if (filtrosAtivos) return; // Não usa scroll infinito quando há filtros

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && temProximaPagina && !loading) {
          console.log('📜 Carregando mais atores...');
          carregarMaisAtores();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [temProximaPagina, loading, filtrosAtivos]);

  // Atores em destaque (top 4)
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

  // Filtros com normalização de texto
  const filteredActors = atores
    .filter((ator) => {
      // Normaliza os textos para comparação (remove acentos, converte para minúsculas)
      const normalizedSearchTerm = normalizeText(searchTerm);
      const normalizedNome = normalizeText(ator.nome);
      const normalizedNomeCompleto = normalizeText(ator.nomeCompleto || '');
      const normalizedPais = normalizeText(ator.pais);
      const normalizedSelectedNationality = normalizeText(selectedNationality);

      const matchesSearch =
        !searchTerm ||
        normalizedNome.includes(normalizedSearchTerm) ||
        normalizedNomeCompleto.includes(normalizedSearchTerm);
      
      const matchesNationality =
        !selectedNationality || 
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

  if (isLoading && atores.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {buscandoPorNome ? 'Buscando ator...' : 'Carregando atores...'}
          </p>
        </div>
      </div>
    );
  }

  const limparFiltros = () => {
    setSearchTerm('');
    setSelectedNationality('');
    // Recarrega apenas a primeira página
    carregarAtores(1, 20, true, false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ActorsHeader />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Estatísticas */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600">
            <span className="font-semibold text-purple-600">{filteredActors.length}</span> atores{' '}
            {filtrosAtivos ? 'encontrados' : 'carregados'} de{' '}
            <span className="font-semibold text-gray-900">{totalItens}</span> no total
          </p>
          {searchTerm.length > 0 && searchTerm.length < 3 && (
            <p className="text-sm text-gray-500 mt-1">
              Digite pelo menos 3 caracteres para buscar
            </p>
          )}
        </div>

        {!filtrosAtivos && featuredActors.length > 0 && (
          <ActorsOfTheMoment actors={featuredActors} />
        )}

        <div className="space-y-6">
          <ActorsFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedNationality={selectedNationality}
            onNationalityChange={setSelectedNationality}
          />

          {filtrosAtivos && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Filtros ativos:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                  Busca: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="hover:text-rose-900 ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedNationality && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm">
                  País: {selectedNationality}
                  <button
                    onClick={() => setSelectedNationality('')}
                    className="hover:text-rose-900 ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={limparFiltros}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Limpar todos
              </button>
            </div>
          )}

          {buscandoPorNome && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500 mx-auto"></div>
            </div>
          )}

          {filteredActors.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhum ator encontrado</p>
              <p className="text-gray-500 mt-2">
                Tente ajustar os filtros para encontrar o que você está procurando.
              </p>
            </div>
          ) : (
            <>
              <ActorsGrid actors={filteredActors} />
              
              {/* Elemento observador para scroll infinito (só aparece sem filtros) */}
              {!filtrosAtivos && (
                <div ref={observerTarget} className="py-8">
                  {loading && (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
                    </div>
                  )}
                  {!temProximaPagina && atores.length > 0 && (
                    <p className="text-center text-gray-500">
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