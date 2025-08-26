'use client';

import { useEffect, useState } from 'react';
import { useAvaliacao } from 'src/context/AvaliacaoContext';
import { useDorama } from 'src/context/DoramaContext';
import { AvaliacaoCompleta } from '@/types/avaliacao';
import { temporadaService } from 'src/services/temporadaService';
import { ReviewCard } from './ReviewsList/ReviewCard';
import { LoadingSkeleton } from './ReviewsList/LoadingSkeleton';
import { EmptyReviews } from './ReviewsList/EmptyReviews';
import { StarIcon } from '@heroicons/react/24/outline';

interface ReviewsListProps {
  usuarioId: string;
}

export function ReviewsList({ usuarioId }: ReviewsListProps) {
  const { minhasAvaliacoes, loadingAvaliacoes, carregarMinhasAvaliacoes } =
    useAvaliacao();
  const { buscarDoramaPorId, carregarDorama } = useDorama();

  const [avaliacoesCompletas, setAvaliacoesCompletas] = useState<
    AvaliacaoCompleta[]
  >([]);
  const [loadingDetalhes, setLoadingDetalhes] = useState(false);

  useEffect(() => {
    carregarMinhasAvaliacoes();
  }, [usuarioId]);

  useEffect(() => {
    if (minhasAvaliacoes.length > 0) {
      carregarDetalhesAvaliacoes();
    }
  }, [minhasAvaliacoes]);

  const carregarDetalhesAvaliacoes = async () => {
    setLoadingDetalhes(true);
    try {
      const avaliacoesComDetalhes = await Promise.all(
        minhasAvaliacoes.map(async (avaliacao) => {
          try {
            // Buscar dados da temporada
            const temporada = await temporadaService.getTemporada(
              avaliacao.temporadaId
            );

            // Buscar dados do dorama
            let dorama = buscarDoramaPorId(temporada.doramaId);
            if (!dorama) {
              await carregarDorama(temporada.doramaId);
              dorama = buscarDoramaPorId(temporada.doramaId);
            }

            return {
              ...avaliacao,
              temporada,
              dorama,
            } as AvaliacaoCompleta;
          } catch (error) {
            console.error('Erro ao carregar detalhes da avaliação:', error);
            return {
              ...avaliacao,
              temporada: undefined,
              dorama: undefined,
            } as AvaliacaoCompleta;
          }
        })
      );

      setAvaliacoesCompletas(avaliacoesComDetalhes);
    } catch (error) {
      console.error('Erro ao carregar detalhes das avaliações:', error);
    } finally {
      setLoadingDetalhes(false);
    }
  };

  if (loadingAvaliacoes) {
    return <LoadingSkeleton />;
  }

  if (minhasAvaliacoes.length === 0) {
    return <EmptyReviews />;
  }

  return (
    <div className="space-y-8">
      {/* Header da seção */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <StarIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Minhas Reviews
                </h2>
                <p className="text-gray-600 text-lg">
                  Suas avaliações e comentários sobre doramas
                </p>
              </div>
            </div>
          </div>

          {/* Total de reviews - versão minimalista */}
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {minhasAvaliacoes.length}
            </div>
            <div className="text-sm text-purple-600">
              avaliação{minhasAvaliacoes.length !== 1 ? 'ões' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de reviews */}
      {loadingDetalhes ? (
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm p-6 animate-pulse border border-gray-100"
            >
              <div className="flex gap-4">
                <div className="w-16 h-20 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {avaliacoesCompletas.map((avaliacao, index) => (
            <div
              key={avaliacao.id}
              className="animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ReviewCard avaliacao={avaliacao} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
