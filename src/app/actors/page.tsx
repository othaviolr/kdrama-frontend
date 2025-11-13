'use client';

import { useEffect, useState } from 'react';
import { useAtor } from '../../context/atorContext';
import ActorsHeader from '@/components/actors/ActorsHeader';
import ActorsGrid from '@/components/actors/ActorsGrid';
import ActorsOfTheMoment from '@/components/actors/ActorsOfTheMoment';
import ActorsFilters from '@/components/actors/ActorsFilters';

export default function ActorsPage() {
  const { atores, loading, carregarAtores } = useAtor();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');

  useEffect(() => {
    // Carrega todos os atores ao montar o componente
    carregarAtores(1, 100, true); // Página 1, 100 itens, completo
  }, []);

  // Atores em destaque (top 4 por algum critério - você pode ajustar)
  const featuredActors = atores
    .slice()
    .sort((a, b) => {
      // Ordenar por ano de nascimento (mais jovens primeiro) ou outro critério
      return b.anoNascimento - a.anoNascimento;
    })
    .slice(0, 4)
    .map((ator) => ({
      id: ator.id,
      nome: ator.nome,
      nomeOriginal: ator.nomeCompleto || ator.nome,
      foto: ator.fotoUrl,
      nacionalidade: ator.pais,
      idade: new Date().getFullYear() - ator.anoNascimento,
      doramas: [], // Isso virá dos doramas do ator se tiver na API
      popularidade: 0, // Calcular baseado em algo se tiver
    }));

  // Filtros
  const filteredActors = atores
    .filter((ator) => {
      const matchesSearch =
        ator.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ator.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesNationality =
        !selectedNationality || ator.pais === selectedNationality;

      return matchesSearch && matchesNationality;
    })
    .map((ator) => ({
      id: ator.id,
      nome: ator.nome,
      nomeOriginal: ator.nomeCompleto || ator.nome,
      foto: ator.fotoUrl,
      nacionalidade: ator.pais,
      idade: new Date().getFullYear() - ator.anoNascimento,
      doramas: [], // Adicionar se tiver na API
      popularidade: 0,
    }));

  if (loading && atores.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando atores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ActorsHeader />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {featuredActors.length > 0 && (
          <ActorsOfTheMoment actors={featuredActors} />
        )}

        <div className="space-y-6">
          <ActorsFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedNationality={selectedNationality}
            onNationalityChange={setSelectedNationality}
          />

          <ActorsGrid actors={filteredActors} />
        </div>
      </div>
    </div>
  );
}