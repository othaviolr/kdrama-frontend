'use client';

import { useState } from 'react';
import ActorsHeader from '@/components/actors/ActorsHeader';
import ActorsGrid from '@/components/actors/ActorsGrid';
import ActorsOfTheMoment from '@/components/actors/ActorsOfTheMoment';
import ActorsFilters from '@/components/actors/ActorsFilters';

export default function ActorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');

  // Mock data dos atores
  const mockActors = [
    {
      id: '1',
      nome: 'Park Bo-gum',
      nomeOriginal: '박보검',
      foto: 'https://i.pinimg.com/1200x/c3/f1/e3/c3f1e3606e6150499c879b35fa1c3933.jpg',
      nacionalidade: 'Coreia do Sul',
      idade: 31,
      doramas: ['Reply 1988', 'Love in the Moonlight', 'Record of Youth'],
      popularidade: 95,
    },
    {
      id: '2',
      nome: 'IU',
      nomeOriginal: '아이유',
      foto: 'https://i.pinimg.com/736x/cc/5e/70/cc5e70669062e339e6add34dd466e951.jpg',
      nacionalidade: 'Coreia do Sul',
      idade: 31,
      doramas: ['Hotel Del Luna', 'My Mister', 'Dream High'],
      popularidade: 98,
    },
    {
      id: '3',
      nome: 'Song Joong-ki',
      nomeOriginal: '송중기',
      foto: 'https://i.pinimg.com/736x/29/26/55/29265542e5f00d2209d06395413a5a53.jpg',
      nacionalidade: 'Coreia do Sul',
      idade: 39,
      doramas: ['Descendants of the Sun', 'Vincenzo', 'Space Sweepers'],
      popularidade: 92,
    },
    {
      id: '4',
      nome: 'Park Shin-hye',
      nomeOriginal: '박신혜',
      foto: 'https://i.pinimg.com/736x/41/3d/a3/413da356286d481ae270cf6cd722fb71.jpg',
      nacionalidade: 'Coreia do Sul',
      idade: 34,
      doramas: ['The Heirs', 'Doctors', 'Memories of the Alhambra'],
      popularidade: 89,
    },
    {
      id: '5',
      nome: 'Lee Min-ho',
      nomeOriginal: '이민호',
      foto: 'https://i.pinimg.com/1200x/95/22/47/952247ff1ecde63ce4cb2d443a85b6dc.jpg',
      nacionalidade: 'Coreia do Sul',
      idade: 37,
      doramas: ['Boys Over Flowers', 'The King: Eternal Monarch', 'Pachinko'],
      popularidade: 94,
    },
    {
      id: '6',
      nome: 'Jun Ji-hyun',
      nomeOriginal: '전지현',
      foto: 'https://i.pinimg.com/736x/be/35/a7/be35a77e2afd474cd03dab0bac5c7203.jpg',
      nacionalidade: 'Coreia do Sul',
      idade: 43,
      doramas: [
        'My Love from the Star',
        'Legend of the Blue Sea',
        'Kingdom: Ashin of the North',
      ],
      popularidade: 96,
    },
    {
      id: '7',
      nome: 'Hyun Bin',
      nomeOriginal: '현빈',
      foto: 'https://i.pinimg.com/1200x/8c/b6/a7/8cb6a7907b3284d0d45f3829ca99e108.jpg',
      nacionalidade: 'Coreia do Sul',
      idade: 42,
      doramas: [
        'Crash Landing on You',
        'Secret Garden',
        'Memories of the Alhambra',
      ],
      popularidade: 93,
    },
    {
      id: '8',
      nome: 'Son Ye-jin',
      nomeOriginal: '손예진',
      foto: 'https://i.pinimg.com/736x/8e/9a/f2/8e9af2a04d173d827415efc72fa8b778.jpg',
      nacionalidade: 'Coreia do Sul',
      idade: 42,
      doramas: [
        'Crash Landing on You',
        'Something in the Rain',
        'Pretty Noona Who Buys Me Food',
      ],
      popularidade: 91,
    },
  ];

  // Atores em destaque (os mais populares)
  const featuredActors = mockActors
    .sort((a, b) => b.popularidade - a.popularidade)
    .slice(0, 4);

  // Filtros
  const filteredActors = mockActors.filter((actor) => {
    const matchesSearch =
      actor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      actor.nomeOriginal?.includes(searchTerm);
    const matchesNationality =
      !selectedNationality || actor.nacionalidade === selectedNationality;

    return matchesSearch && matchesNationality;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ActorsHeader />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        <ActorsOfTheMoment actors={featuredActors} />

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
