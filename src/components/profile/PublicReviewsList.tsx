import { useState, useEffect } from 'react';
import { avaliacaoService } from 'src/services/avaliacaoService';

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
  const [reviews, setReviews] = useState<AvaliacaoUsuarioApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarReviews();
  }, [usuarioId]);

  const carregarReviews = async () => {
    setLoading(true);
    try {
      console.log('📝 Carregando reviews públicas para:', usuarioId);

      const data = await avaliacaoService.getAvaliacoesUsuario(usuarioId);
      setReviews(data);

      console.log('✅ Reviews carregadas:', data.length);
    } catch (error) {
      console.error('❌ Erro ao carregar reviews públicas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
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
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < review.nota ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {new Date(review.dataAvaliacao).toLocaleDateString()}
              </span>
            </div>
          </div>

          {review.comentario && (
            <p className="text-gray-700 leading-relaxed">{review.comentario}</p>
          )}

          {review.recomendadoPorNomeLivre && (
            <p className="text-sm text-gray-500 mt-2">
              Recomendado por: {review.recomendadoPorNomeLivre}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
