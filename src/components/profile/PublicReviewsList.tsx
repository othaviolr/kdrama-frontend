import { useState, useEffect } from 'react';
import { avaliacaoService } from 'src/services/avaliacaoService';
import { useDorama } from 'src/context/DoramaContext';
import { temporadaService } from 'src/services/temporadaService';
import { AvaliacaoCompleta } from '@/types/avaliacao';
import { ReviewCard } from './ReviewsList/ReviewCard';
import { StarIcon } from '@heroicons/react/24/outline';

interface AvaliacaoUsuarioApi {
  id: string;
  usuarioId: string;
  temporadaId: string;
  nota: number;
  comentario: string;
  recomendadoPorUsuarioId?: string;
  recomendadoPorNomeLivre: string;
  dataAvaliacao: string;
}

interface PublicReviewsListProps {
  usuarioId: string;
}

export function PublicReviewsList({ usuarioId }: PublicReviewsListProps) {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoUsuarioApi[]>([]);
  const [avaliacoesCompletas, setAvaliacoesCompletas] = useState<
    AvaliacaoCompleta[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetalhes, setLoadingDetalhes] = useState(false);
  const { buscarDoramaPorId, carregarDorama } = useDorama();

  useEffect(() => {
    carregarReviews();
  }, [usuarioId]);

  useEffect(() => {
    if (avaliacoes.length > 0) {
      carregarDetalhesAvaliacoes();
    }
  }, [avaliacoes]);

  const carregarReviews = async () => {
    setLoading(true);
    try {
      console.log('📝 Carregando reviews públicas para:', usuarioId);

      const data = await avaliacaoService.getAvaliacoesUsuario(usuarioId);

      // Converter para o formato esperado pelo resto do código
      const avaliacoesConvertidas = data.map((avaliacao: any) => ({
        id: avaliacao.id,
        usuarioId: avaliacao.usuarioId,
        temporadaId: avaliacao.temporadaId,
        nota: avaliacao.nota,
        comentario: avaliacao.comentario,
        recomendadoPorUsuarioId: avaliacao.recomendadoPorUsuarioId || undefined,
        recomendadoPorNomeLivre: avaliacao.recomendadoPorNomeLivre || '',
        dataAvaliacao: avaliacao.dataAvaliacao, // Mantém como string aqui
      }));

      setAvaliacoes(avaliacoesConvertidas);
      console.log('✅ Reviews carregadas:', avaliacoesConvertidas.length);
    } catch (error) {
      console.error('❌ Erro ao carregar reviews públicas:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarDetalhesAvaliacoes = async () => {
    setLoadingDetalhes(true);
    try {
      const avaliacoesComDetalhes = await Promise.all(
        avaliacoes.map(async (avaliacao) => {
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

            // Converter para AvaliacaoCompleta com dataAvaliacao como Date
            return {
              ...avaliacao,
              temporada,
              dorama,
              dataAvaliacao: new Date(avaliacao.dataAvaliacao), // Convertendo string para Date
            } as AvaliacaoCompleta;
          } catch (error) {
            console.error('Erro ao carregar detalhes da avaliação:', error);
            return {
              ...avaliacao,
              temporada: undefined,
              dorama: undefined,
              dataAvaliacao: new Date(avaliacao.dataAvaliacao), // Convertendo mesmo em caso de erro
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

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (avaliacoes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">⭐</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhuma avaliação ainda
        </h3>
        <p className="text-gray-600">
          Este usuário ainda não fez nenhuma avaliação.
        </p>
      </div>
    );
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
                <h2 className="text-3xl font-bold text-gray-900">Avaliações</h2>
                <p className="text-gray-600 text-lg">
                  Avaliações e comentários deste usuário
                </p>
              </div>
            </div>
          </div>

          {/* Total de reviews */}
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {avaliacoes.length}
            </div>
            <div className="text-sm text-purple-600">
              avaliação{avaliacoes.length !== 1 ? 'ões' : ''}
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
