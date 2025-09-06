'use client';

import { useState } from 'react';
import { ReviewsHeader } from '@/src/components/reviews/ReviewsHeader';
import { ReviewsFilters } from '@/src/components/reviews/ReviewsFilters';
import { ReviewsList } from '@/src/components/reviews/ReviewsList';
import { EmptyState } from '@/src/components/reviews/EmptyState';

const mockReviews = [
  {
    id: 1,
    usuario: {
      nome: 'Otávio Lima',
      nomeUsuario: 'othaviolr',
      fotoUrl:
        'https://i.pinimg.com/1200x/ca/1d/a5/ca1da54d42116eb09f27812af4d38b38.jpg',
    },
    dorama: {
      nome: 'Bloodhounds',
      anoLancamento: 2025,
      generos: ['Ação'],
    },
    nota: 5,
    comentario:
      'Dorama muito bom! A ação é incrível e os personagens são bem desenvolvidos. Recomendo demais!',
    dataAvaliacao: new Date('2025-01-15T14:30:00'),
    recomendacao: true,
  },
  {
    id: 2,
    usuario: {
      nome: 'May',
      nomeUsuario: 'May',
      fotoUrl:
        'https://i.pinimg.com/736x/ef/bc/70/efbc70c0a64fd3e41ddfb17e97414fbc.jpg',
    },
    dorama: {
      nome: 'Business Proposal',
      anoLancamento: 2025,
      generos: ['Romance', 'Comédia'],
    },
    nota: 4,
    comentario:
      'Romance fofo e divertido. Alguns clichês, mas muito bem executado. A química entre os protagonistas é ótima!',
    dataAvaliacao: new Date('2025-01-14T16:45:00'),
    recomendacao: true,
  },
  {
    id: 3,
    usuario: {
      nome: 'Othavio',
      nomeUsuario: 'othaviolr',
      fotoUrl:
        'https://i.pinimg.com/1200x/ca/1d/a5/ca1da54d42116eb09f27812af4d38b38.jpg',
    },
    dorama: {
      nome: 'Squid Game',
      anoLancamento: 2021,
      generos: ['Ação', 'Drama'],
    },
    nota: 5,
    comentario:
      'Obra-prima! Crítica social profunda com tensão do início ao fim. Impactante e inesquecível.',
    dataAvaliacao: new Date('2025-05-13T20:15:00'),
    recomendacao: false,
  },
  {
    id: 4,
    usuario: {
      nome: 'Teste',
      nomeUsuario: 'Teste',
      fotoUrl:
        'https://i.pinimg.com/736x/b0/0b/bc/b00bbcf79c3460deeb5c4053aa55ca5e.jpg',
    },
    dorama: {
      nome: 'Teste',
      anoLancamento: 2020,
      generos: ['Romance', 'Escola', 'Drama'],
    },
    nota: 1,
    comentario:
      'Dorama ok, mas nada excepcional. A mensagem sobre autoestima é válida, mas a execução podia ser melhor.',
    dataAvaliacao: new Date('2025-04-12T11:20:00'),
    recomendacao: false,
  },
];

const mockGeneros = [
  'Todos',
  'Romance',
  'Ação',
  'Drama',
  'Comédia',
  'Thriller',
  'Suspense',
  'Crime',
  'Escola',
];

export default function ReviewsPage() {
  const [filtros, setFiltros] = useState({
    dorama: '',
    genero: 'Todos',
    nota: '',
    ordenacao: 'recentes',
  });

  const [reviewsFiltradas, setReviewsFiltradas] = useState(mockReviews);

  const handleFiltroChange = (novosFiltros: typeof filtros) => {
    setFiltros(novosFiltros);

    // Aplicar filtros
    let reviewsFiltered = [...mockReviews];

    // Filtrar por dorama
    if (novosFiltros.dorama) {
      reviewsFiltered = reviewsFiltered.filter((review) =>
        review.dorama.nome
          .toLowerCase()
          .includes(novosFiltros.dorama.toLowerCase())
      );
    }

    // Filtrar por gênero
    if (novosFiltros.genero && novosFiltros.genero !== 'Todos') {
      reviewsFiltered = reviewsFiltered.filter((review) =>
        review.dorama.generos.includes(novosFiltros.genero)
      );
    }

    // Filtrar por nota
    if (novosFiltros.nota) {
      const notaFiltro = parseInt(novosFiltros.nota);
      reviewsFiltered = reviewsFiltered.filter(
        (review) => review.nota === notaFiltro
      );
    }

    // Ordenação
    switch (novosFiltros.ordenacao) {
      case 'recentes':
        reviewsFiltered.sort(
          (a, b) => b.dataAvaliacao.getTime() - a.dataAvaliacao.getTime()
        );
        break;
      case 'antigas':
        reviewsFiltered.sort(
          (a, b) => a.dataAvaliacao.getTime() - b.dataAvaliacao.getTime()
        );
        break;
      case 'maior_nota':
        reviewsFiltered.sort((a, b) => b.nota - a.nota);
        break;
      case 'menor_nota':
        reviewsFiltered.sort((a, b) => a.nota - b.nota);
        break;
    }

    setReviewsFiltradas(reviewsFiltered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewsHeader totalReviews={reviewsFiltradas.length} />

        <div className="mb-8">
          <ReviewsFilters
            filtros={filtros}
            generos={mockGeneros}
            onFiltroChange={handleFiltroChange}
          />
        </div>

        {reviewsFiltradas.length > 0 ? (
          <ReviewsList reviews={reviewsFiltradas} />
        ) : (
          <EmptyState filtros={filtros} />
        )}
      </div>
    </div>
  );
}
